import type {
  IProviderAdapter,
  BaseProviderConfig,
  GenerateContentParams,
  ProviderResponse,
} from "../../interfaces";

/**
 * Anthropic-specific configuration
 */
export interface AnthropicProviderConfig extends BaseProviderConfig {
  defaultModel?: "claude-3-5-sonnet-20241022" | "claude-3-opus-20240229" | "claude-3-sonnet-20240229" | "claude-3-haiku-20240307" | string;
}

/**
 * Anthropic adapter implementation
 * 
 * Implements IProviderAdapter interface following SOLID principles:
 * - Single Responsibility: Handles Anthropic API interactions only
 * - Open/Closed: Can be extended via IProviderAdapter interface
 * - Liskov Substitution: Can be used anywhere IProviderAdapter is expected
 * - Interface Segregation: Implements only the required interface methods
 * - Dependency Inversion: Depends on IProviderAdapter abstraction
 * 
 * @example
 * ```typescript
 * import { createAnthropicAdapter } from '@nathanhfoster/llm-adapter';
 * 
 * const adapter = createAnthropicAdapter({
 *   apiKey: process.env.ANTHROPIC_API_KEY!,
 *   defaultModel: 'claude-3-5-sonnet-20241022',
 * });
 * 
 * const response = await adapter.generateContent({
 *   prompt: 'Hello, Claude!',
 * });
 * ```
 */
export class AnthropicAdapter implements IProviderAdapter {
  private client: unknown; // Will be Anthropic client when SDK is installed
  private config: Required<
    Pick<
      AnthropicProviderConfig,
      "defaultModel" | "defaultTemperature" | "defaultMaxTokens"
    >
  > &
    Omit<
      AnthropicProviderConfig,
      "defaultModel" | "defaultTemperature" | "defaultMaxTokens"
    >;

  constructor(config: AnthropicProviderConfig) {
    if (!config.apiKey) {
      throw new Error("API key is required for AnthropicAdapter");
    }

    this.config = {
      defaultModel: config.defaultModel || "claude-3-5-sonnet-20241022",
      defaultTemperature: config.defaultTemperature ?? 0.7,
      defaultMaxTokens: config.defaultMaxTokens ?? 1600,
      ...config,
    };

    // Initialize Anthropic client when @anthropic-ai/sdk is installed
    // For now, this is a placeholder structure
    try {
      // Dynamic import to avoid requiring the package if not installed
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { Anthropic } = require("@anthropic-ai/sdk");
      this.client = new Anthropic({
        apiKey: this.config.apiKey,
        baseURL: this.config.baseURL,
        timeout: this.config.timeout,
        maxRetries: this.config.maxRetries,
      });
    } catch (error) {
      // If SDK is not installed, we'll throw a helpful error when trying to use it
      this.client = null;
    }
  }

  /**
   * Get the provider name
   */
  getProviderName(): string {
    return "anthropic";
  }

  /**
   * Get the underlying Anthropic client instance
   */
  getClient(): unknown {
    if (!this.client) {
      throw new Error(
        "@anthropic-ai/sdk is not installed. Install it with: pnpm add @anthropic-ai/sdk",
      );
    }
    return this.client;
  }

  /**
   * Generate content using Anthropic API
   */
  async generateContent(
    params: GenerateContentParams,
  ): Promise<ProviderResponse> {
    if (!this.client) {
      return {
        success: false,
        error: {
          message:
            "@anthropic-ai/sdk is not installed. Install it with: pnpm add @anthropic-ai/sdk",
          type: "missing_dependency",
          provider: "anthropic",
        },
      };
    }

    try {
      const content = await this.createMessage(params);

      if (!content) {
        return {
          success: false,
          error: {
            message: "No content generated from Anthropic response",
            type: "empty_response",
            provider: "anthropic",
          },
        };
      }

      return {
        success: true,
        content,
        metadata: {
          model: params.model || this.config.defaultModel,
          provider: "anthropic",
        },
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";

      return {
        success: false,
        error: {
          message: errorMessage,
          type: "api_error",
          provider: "anthropic",
        },
      };
    }
  }

  /**
   * Generate content with retry logic and exponential backoff
   */
  async generateContentWithRetry(
    params: GenerateContentParams,
    maxRetries = 3,
    baseDelay = 1000,
  ): Promise<ProviderResponse> {
    let lastError: ProviderResponse["error"];

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      const result = await this.generateContent(params);

      if (result.success) {
        return result;
      }

      lastError = result.error;

      if (attempt < maxRetries) {
        const delay = baseDelay * Math.pow(2, attempt - 1);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    return {
      success: false,
      error:
        lastError || {
          message: "Max retries exceeded",
          type: "retry_limit_exceeded",
          provider: "anthropic",
        },
    };
  }

  /**
   * Create a message using Anthropic API
   * This is the Anthropic-specific method (similar to askOpenAI for OpenAI)
   */
  private async createMessage(
    params: GenerateContentParams,
  ): Promise<string | undefined> {
    if (!this.client) {
      throw new Error(
        "@anthropic-ai/sdk is not installed. Install it with: pnpm add @anthropic-ai/sdk",
      );
    }

    const {
      prompt,
      messages,
      temperature = this.config.defaultTemperature,
      max_tokens = this.config.defaultMaxTokens,
      model = this.config.defaultModel,
    } = params;

    // Convert messages format if needed
    const anthropicMessages = messages
      ? messages.map((msg) => ({
          role: msg.role === "system" ? "user" : msg.role,
          content: msg.content,
        }))
      : [{ role: "user" as const, content: prompt! }];

    // Extract system message if present
    const systemMessage = messages?.find((msg) => msg.role === "system")?.content;

    try {
      // Use the Anthropic SDK
      // Type assertion needed because we're using dynamic require
      const anthropicClient = this.client as {
        messages: {
          create: (params: {
            model: string;
            max_tokens: number;
            temperature?: number;
            messages: Array<{ role: string; content: string }>;
            system?: string;
          }) => Promise<{
            content: Array<{ type: string; text?: string }>;
          }>;
        };
      };

      const response = await anthropicClient.messages.create({
        model,
        max_tokens,
        temperature,
        messages: anthropicMessages,
        ...(systemMessage && { system: systemMessage }),
      });

      // Extract text content from response
      const textContent = response.content.find((item) => item.type === "text");
      return textContent?.text?.trim();
    } catch (error) {
      console.error("Anthropic API error:", error);
      throw new Error("Failed to generate content from Anthropic");
    }
  }
}

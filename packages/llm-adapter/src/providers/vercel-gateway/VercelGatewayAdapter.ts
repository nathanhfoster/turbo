import type {
  IProviderAdapter,
  BaseProviderConfig,
  GenerateContentParams,
  ProviderResponse,
} from "../../interfaces";

/**
 * Vercel AI Gateway-specific configuration
 * 
 * Vercel AI Gateway provides a unified API to multiple providers with:
 * - Budgets and monitoring
 * - Load-balancing and fallbacks
 * - Provider routing
 * - Model discovery
 */
export interface VercelGatewayProviderConfig extends BaseProviderConfig {
  /**
   * Vercel AI Gateway API key
   * Can use API key or OIDC token (in Vercel deployments)
   */
  apiKey: string;
  
  /**
   * Base URL for AI Gateway (defaults to Vercel's gateway)
   */
  baseURL?: string;
  
  /**
   * Default model in format: "provider/model-name"
   * Examples: "openai/gpt-4o", "anthropic/claude-3-5-sonnet-20241022"
   */
  defaultModel?: string;
  
  /**
   * Provider routing order (optional)
   * AI Gateway will try providers in this order
   */
  providerOrder?: string[];
  
  /**
   * Restrict to specific providers (optional)
   */
  onlyProviders?: string[];
  
  /**
   * Fallback models (optional)
   * If primary model unavailable, try these
   */
  fallbackModels?: string[];
}

/**
 * Vercel AI Gateway adapter implementation
 * 
 * Implements IProviderAdapter interface following SOLID principles.
 * Uses Vercel AI Gateway's OpenAI-compatible API to access multiple providers.
 * 
 * @example
 * ```typescript
 * import { createVercelGatewayAdapter } from '@nathanhfoster/llm-adapter';
 * 
 * const adapter = createVercelGatewayAdapter({
 *   apiKey: process.env.AI_GATEWAY_API_KEY!,
 *   defaultModel: 'openai/gpt-4o',
 *   providerOrder: ['openai', 'anthropic'],
 * });
 * 
 * const response = await adapter.generateContent({
 *   prompt: 'Hello!',
 * });
 * ```
 */
export class VercelGatewayAdapter implements IProviderAdapter {
  private client: unknown; // Will be OpenAI client configured for AI Gateway
  private config: Required<
    Pick<
      VercelGatewayProviderConfig,
      "defaultModel" | "defaultTemperature" | "defaultMaxTokens"
    >
  > &
    Omit<
      VercelGatewayProviderConfig,
      "defaultModel" | "defaultTemperature" | "defaultMaxTokens"
    >;

  constructor(config: VercelGatewayProviderConfig) {
    if (!config.apiKey) {
      throw new Error("API key is required for VercelGatewayAdapter");
    }

    this.config = {
      defaultModel: config.defaultModel || "openai/gpt-4o",
      defaultTemperature: config.defaultTemperature ?? 0.7,
      defaultMaxTokens: config.defaultMaxTokens ?? 1600,
      ...config,
    };

    // Initialize OpenAI client configured for AI Gateway
    // AI Gateway uses OpenAI-compatible API, so we can use OpenAI SDK
    try {
      // Dynamic import to avoid requiring the package if not installed
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { OpenAI } = require("openai");
      
      this.client = new OpenAI({
        apiKey: this.config.apiKey,
        // Vercel AI Gateway OpenAI-compatible endpoint
        // Defaults to Vercel's gateway, but can be overridden for custom gateways
        baseURL: this.config.baseURL || "https://ai-gateway.vercel.sh/v1",
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
    return "vercel-gateway";
  }

  /**
   * Get the underlying OpenAI client instance (configured for AI Gateway)
   */
  getClient(): unknown {
    if (!this.client) {
      throw new Error(
        "openai SDK is not installed. Install it with: pnpm add openai",
      );
    }
    return this.client;
  }

  /**
   * Generate content using Vercel AI Gateway
   * 
   * AI Gateway supports model strings like "openai/gpt-4o" or "anthropic/claude-3-5-sonnet-20241022"
   */
  async generateContent(
    params: GenerateContentParams,
  ): Promise<ProviderResponse> {
    if (!this.client) {
      return {
        success: false,
        error: {
          message:
            "openai SDK is not installed. Install it with: pnpm add openai",
          type: "missing_dependency",
          provider: "vercel-gateway",
        },
      };
    }

    try {
      const content = await this.createChatCompletion(params);

      if (!content) {
        return {
          success: false,
          error: {
            message: "No content generated from AI Gateway response",
            type: "empty_response",
            provider: "vercel-gateway",
          },
        };
      }

      return {
        success: true,
        content,
        metadata: {
          model: params.model || this.config.defaultModel,
          provider: "vercel-gateway",
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
          provider: "vercel-gateway",
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
          provider: "vercel-gateway",
        },
    };
  }

  /**
   * Create a chat completion using AI Gateway's OpenAI-compatible API
   */
  private async createChatCompletion(
    params: GenerateContentParams,
  ): Promise<string | undefined> {
    if (!this.client) {
      throw new Error(
        "openai SDK is not installed. Install it with: pnpm add openai",
      );
    }

    const {
      prompt,
      messages,
      temperature = this.config.defaultTemperature,
      max_tokens = this.config.defaultMaxTokens,
      model = this.config.defaultModel,
    } = params;

    // Convert messages format
    const chatMessages =
      messages ?? [{ role: "user" as const, content: prompt! }];

    try {
      // Use OpenAI SDK (configured for AI Gateway)
      // Type assertion needed because we're using dynamic require
      const openaiClient = this.client as {
        chat: {
          completions: {
            create: (params: {
              model: string;
              messages: Array<{ role: string; content: string }>;
              temperature?: number;
              max_tokens?: number;
            }) => Promise<{
              choices: Array<{
                message: { content: string | null };
              }>;
            }>;
          };
        };
      };

      const response = await openaiClient.chat.completions.create({
        model, // AI Gateway supports "provider/model" format
        messages: chatMessages,
        temperature,
        max_tokens,
      });

      // Extract text content from response
      const textContent = response.choices[0]?.message.content?.trim();
      return textContent;
    } catch (error) {
      console.error("AI Gateway API error:", error);
      throw new Error("Failed to generate content from AI Gateway");
    }
  }
}

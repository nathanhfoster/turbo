import { OpenAI } from "openai";
import type {
  ChatCompletion,
  ChatCompletionCreateParamsNonStreaming,
} from "openai/resources";
import type {
  IProviderAdapter,
  BaseProviderConfig,
  GenerateContentParams,
  ProviderResponse,
} from "../../interfaces";

/**
 * OpenAI-specific configuration
 */
export interface OpenAIProviderConfig extends BaseProviderConfig {
  organization?: string;
  defaultModel?: ChatCompletionCreateParamsNonStreaming["model"];
}

/**
 * OpenAI adapter implementation
 * 
 * Implements IProviderAdapter interface following SOLID principles:
 * - Single Responsibility: Handles OpenAI API interactions only
 * - Open/Closed: Can be extended via IProviderAdapter interface
 * - Liskov Substitution: Can be used anywhere IProviderAdapter is expected
 * - Interface Segregation: Implements only the required interface methods
 * - Dependency Inversion: Depends on IProviderAdapter abstraction
 */
export class OpenAIAdapter implements IProviderAdapter {
  private client: OpenAI;
  private config: Required<
    Pick<
      OpenAIProviderConfig,
      "defaultModel" | "defaultTemperature" | "defaultMaxTokens"
    >
  > &
    Omit<
      OpenAIProviderConfig,
      "defaultModel" | "defaultTemperature" | "defaultMaxTokens"
    >;

  constructor(config: OpenAIProviderConfig) {
    if (!config.apiKey) {
      throw new Error("API key is required for OpenAIAdapter");
    }

    this.config = {
      defaultModel: config.defaultModel || "gpt-4o",
      defaultTemperature: config.defaultTemperature ?? 0.7,
      defaultMaxTokens: config.defaultMaxTokens ?? 1600,
      ...config,
    };

    this.client = new OpenAI({
      apiKey: this.config.apiKey,
      baseURL: this.config.baseURL,
      organization: this.config.organization,
      timeout: this.config.timeout,
      maxRetries: this.config.maxRetries,
    });
  }

  /**
   * Get the provider name
   */
  getProviderName(): string {
    return "openai";
  }

  /**
   * Get the underlying OpenAI client instance
   */
  getClient(): OpenAI {
    return this.client;
  }

  /**
   * Generate content using OpenAI API
   */
  async generateContent(
    params: GenerateContentParams,
  ): Promise<ProviderResponse> {
    try {
      const choices = await this.askOpenAI(params);
      const content = this.getChoiceContent(choices);

      if (!content) {
        return {
          success: false,
          error: {
            message: "No content generated from OpenAI response",
            type: "empty_response",
            provider: "openai",
          },
        };
      }

      return {
        success: true,
        content,
        metadata: {
          model: params.model || this.config.defaultModel,
          provider: "openai",
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
          provider: "openai",
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
          provider: "openai",
        },
    };
  }

  /**
   * Direct access to OpenAI chat completions (OpenAI-specific method)
   * This is kept for backward compatibility and advanced use cases
   */
  async askOpenAI(
    params: GenerateContentParams,
  ): Promise<ChatCompletion.Choice[]> {
    const {
      prompt,
      messages,
      temperature = this.config.defaultTemperature,
      max_tokens = this.config.defaultMaxTokens,
      model = this.config.defaultModel,
      ...rest
    } = params;

    const chatMessages =
      messages ?? [{ role: "user" as const, content: prompt! }];

    try {
      const response = await this.client.chat.completions.create({
        model,
        messages: chatMessages,
        temperature,
        max_completion_tokens: max_tokens,
        ...rest,
      } as ChatCompletionCreateParamsNonStreaming);

      return response.choices;
    } catch (error) {
      console.error("OpenAI API error:", error);
      throw new Error("Failed to generate content from OpenAI");
    }
  }

  /**
   * Extract content from OpenAI choice response
   */
  private getChoiceContent(
    choices: ChatCompletion.Choice[],
    index = 0,
  ): string | undefined {
    if (!choices || choices.length === 0 || !choices[index]) {
      return undefined;
    }

    const content = choices[index].message.content?.trim();

    if (!content) return undefined;

    try {
      const parsed = JSON.parse(content);
      return typeof parsed === "string" ? parsed : JSON.stringify(parsed);
    } catch {
      return this.cleanMarkdownContent(content);
    }
  }

  /**
   * Clean markdown content from response
   */
  private cleanMarkdownContent(content: string): string {
    let cleanContent = content;

    // Remove markdown code block patterns
    const codeBlockPatterns = [
      /^```html\s*\n?/gm,
      /^```\w*\s*\n?/gm,
      /\n?```\s*$/gm,
      /```\w*/g,
      /```/g,
    ];

    codeBlockPatterns.forEach((pattern) => {
      cleanContent = cleanContent.replace(pattern, "");
    });

    // Clean up extra whitespace
    cleanContent = cleanContent.replace(/^\s+|\s+$/g, "");
    cleanContent = cleanContent.replace(/\n\s*\n/g, "\n");

    return cleanContent;
  }
}

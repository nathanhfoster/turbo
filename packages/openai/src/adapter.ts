import { OpenAI } from "openai";
import type { ChatCompletion, ChatCompletionCreateParamsNonStreaming } from "openai/resources";
import type { AskOpenAIProps, OpenAIResponse } from "./types";

/**
 * Configuration options for OpenAI client instances
 */
export interface OpenAIAdapterConfig {
  apiKey: string;
  baseURL?: string;
  defaultModel?: ChatCompletionCreateParamsNonStreaming["model"];
  defaultTemperature?: number;
  defaultMaxTokens?: number;
  organization?: string;
  timeout?: number;
  maxRetries?: number;
}

/**
 * Adapter interface for OpenAI operations
 * Follows the Adapter pattern to allow for different implementations
 */
export interface IOpenAIAdapter {
  /**
   * Generate content using OpenAI API
   */
  generateContent(params: AskOpenAIProps): Promise<OpenAIResponse>;

  /**
   * Generate content with retry logic
   */
  generateContentWithRetry(
    params: AskOpenAIProps,
    maxRetries?: number,
    baseDelay?: number,
  ): Promise<OpenAIResponse>;

  /**
   * Direct access to OpenAI chat completions
   */
  askOpenAI(params: AskOpenAIProps): Promise<ChatCompletion.Choice[]>;

  /**
   * Get the underlying OpenAI client instance
   */
  getClient(): OpenAI;
}

/**
 * Concrete implementation of OpenAI adapter
 * Follows SOLID principles:
 * - Single Responsibility: Handles OpenAI API interactions
 * - Open/Closed: Can be extended without modification via adapter interface
 * - Liskov Substitution: Implements IOpenAIAdapter interface
 * - Interface Segregation: Focused interface for OpenAI operations
 * - Dependency Inversion: Depends on abstraction (IOpenAIAdapter)
 */
export class OpenAIAdapter implements IOpenAIAdapter {
  private client: OpenAI;
  private config: Required<Pick<OpenAIAdapterConfig, "defaultModel" | "defaultTemperature" | "defaultMaxTokens">> &
    Omit<OpenAIAdapterConfig, "defaultModel" | "defaultTemperature" | "defaultMaxTokens">;

  constructor(config: OpenAIAdapterConfig) {
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
   * Get the underlying OpenAI client instance
   */
  getClient(): OpenAI {
    return this.client;
  }

  /**
   * Direct access to OpenAI chat completions
   */
  async askOpenAI({
    prompt,
    messages,
    temperature = this.config.defaultTemperature,
    max_tokens = this.config.defaultMaxTokens,
    model = this.config.defaultModel,
    ...rest
  }: AskOpenAIProps): Promise<ChatCompletion.Choice[]> {
    const chatMessages = messages ?? [{ role: "user", content: prompt! }];

    try {
      const response = await this.client.chat.completions.create({
        model,
        messages: chatMessages,
        temperature,
        max_completion_tokens: max_tokens,
        ...rest,
      });

      return response.choices;
    } catch (error) {
      console.error("OpenAI API error:", error);
      throw new Error("Failed to generate content from OpenAI");
    }
  }

  /**
   * Generate content with standardized error handling and response formatting
   */
  async generateContent(params: AskOpenAIProps): Promise<OpenAIResponse> {
    try {
      const choices = await this.askOpenAI(params);
      const content = this.getOpenAiChoiceContent(choices);

      if (!content) {
        return {
          success: false,
          error: {
            message: "No content generated from OpenAI response",
            type: "empty_response",
          },
        };
      }

      return {
        success: true,
        content,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";

      return {
        success: false,
        error: {
          message: errorMessage,
          type: "api_error",
        },
      };
    }
  }

  /**
   * Generate content with retry logic and exponential backoff
   */
  async generateContentWithRetry(
    params: AskOpenAIProps,
    maxRetries = 3,
    baseDelay = 1000,
  ): Promise<OpenAIResponse> {
    let lastError: OpenAIResponse["error"];

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
      error: lastError || {
        message: "Max retries exceeded",
        type: "retry_limit_exceeded",
      },
    };
  }

  /**
   * Extract content from OpenAI choice response
   */
  private getOpenAiChoiceContent(
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


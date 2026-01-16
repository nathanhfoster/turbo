/**
 * Generic LLM Provider Adapter Interfaces
 * 
 * Follows SOLID principles:
 * - Single Responsibility: Each interface has one clear purpose
 * - Open/Closed: Open for extension (new providers), closed for modification
 * - Liskov Substitution: All provider adapters are interchangeable
 * - Interface Segregation: Focused, minimal interfaces
 * - Dependency Inversion: Depend on abstractions, not concrete implementations
 */

/**
 * Standardized response format for all LLM providers
 */
export interface ProviderResponse {
  success: boolean;
  content?: string;
  error?: ProviderError;
  metadata?: ResponseMetadata;
}

/**
 * Error information from provider
 */
export interface ProviderError {
  message: string;
  type?: string;
  code?: string;
  statusCode?: number;
  provider?: string;
}

/**
 * Additional metadata about the response
 */
export interface ResponseMetadata {
  model?: string;
  tokensUsed?: number;
  finishReason?: string;
  provider?: string;
}

/**
 * Base configuration for all LLM providers
 */
export interface BaseProviderConfig {
  apiKey: string;
  baseURL?: string;
  timeout?: number;
  maxRetries?: number;
  defaultModel?: string;
  defaultTemperature?: number;
  defaultMaxTokens?: number;
}

/**
 * Request parameters for generating content
 */
export interface GenerateContentParams {
  prompt?: string;
  messages?: Array<{
    role: "user" | "assistant" | "system";
    content: string;
  }>;
  model?: string;
  temperature?: number;
  max_tokens?: number;
  [key: string]: unknown; // Allow provider-specific parameters
}

/**
 * Core interface that all LLM provider adapters must implement
 * 
 * This interface defines the contract that all providers must follow,
 * ensuring they can be used interchangeably (Liskov Substitution Principle)
 */
export interface IProviderAdapter {
  /**
   * Get the provider name (e.g., "openai", "anthropic", "google")
   */
  getProviderName(): string;

  /**
   * Generate content using the provider's API
   * Returns a standardized ProviderResponse
   */
  generateContent(params: GenerateContentParams): Promise<ProviderResponse>;

  /**
   * Generate content with automatic retry logic
   */
  generateContentWithRetry(
    params: GenerateContentParams,
    maxRetries?: number,
    baseDelay?: number,
  ): Promise<ProviderResponse>;

  /**
   * Get the underlying provider client (provider-specific)
   * Useful for advanced use cases that require provider-specific features
   */
  getClient(): unknown;
}

/**
 * Provider type enum for factory pattern
 */
export enum ProviderType {
  OPENAI = "openai",
  ANTHROPIC = "anthropic",
  GOOGLE = "google",
  // Add more providers as needed
}

/**
 * Factory configuration for creating provider adapters
 */
export interface ProviderFactoryConfig extends BaseProviderConfig {
  provider: ProviderType;
}

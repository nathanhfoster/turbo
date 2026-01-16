/**
 * Type definitions for LLM adapter package
 * 
 * These types are re-exported from interfaces for backward compatibility
 * and convenience.
 */

import type {
  ProviderResponse,
  ProviderError,
  ResponseMetadata,
  BaseProviderConfig,
  GenerateContentParams,
  IProviderAdapter,
  ProviderType,
  ProviderFactoryConfig,
} from "./interfaces";

// Re-export for convenience
export type {
  ProviderResponse,
  ProviderError,
  ResponseMetadata,
  BaseProviderConfig,
  GenerateContentParams,
  IProviderAdapter,
  ProviderType,
  ProviderFactoryConfig,
};

/**
 * @deprecated Use ProviderResponse instead
 * Maintained for backward compatibility
 */
export type OpenAIResponse = ProviderResponse;

/**
 * @deprecated Use ProviderError instead
 * Maintained for backward compatibility
 */
export type OpenAIError = ProviderError;

/**
 * @deprecated Use GenerateContentParams instead
 * Maintained for backward compatibility
 */
export type AskOpenAIProps = GenerateContentParams;

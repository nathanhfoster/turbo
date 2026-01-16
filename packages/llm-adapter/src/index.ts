/**
 * LLM Provider Adapter Package
 * 
 * A generic, provider-agnostic adapter for LLM APIs following SOLID principles.
 * Supports multiple providers (OpenAI, Anthropic, Google, etc.) through a unified interface.
 */

// Core interfaces and types
export * from "./interfaces";
export * from "./types";

// Provider implementations
export * from "./providers/openai";

// Factory functions
export * from "./factory";

// Helpers and utilities
export * from "./cache";
export * from "./helpers";

// Backward compatibility exports
export {
  OpenAIAdapter,
  type OpenAIProviderConfig,
} from "./providers/openai";
export {
  AnthropicAdapter,
  type AnthropicProviderConfig,
} from "./providers/anthropic";
export { createOpenAIAdapter, createAnthropicAdapter } from "./factory";

// Re-export for backward compatibility
import type { ChatCompletion } from "openai/resources";
export type { ChatCompletion };

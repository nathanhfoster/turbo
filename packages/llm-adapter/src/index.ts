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
export * from "./providers/anthropic";
export * from "./providers/vercel-gateway";

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
export {
  VercelGatewayAdapter,
  type VercelGatewayProviderConfig,
} from "./providers/vercel-gateway";
export {
  createOpenAIAdapter,
  createAnthropicAdapter,
  createVercelGatewayAdapter,
} from "./factory";

import type {
  IProviderAdapter,
  ProviderFactoryConfig,
  BaseProviderConfig,
} from "./interfaces";
import { ProviderType } from "./interfaces";
import { OpenAIAdapter, type OpenAIProviderConfig } from "./providers/openai";
import {
  AnthropicAdapter,
  type AnthropicProviderConfig,
} from "./providers/anthropic";
import {
  VercelGatewayAdapter,
  type VercelGatewayProviderConfig,
} from "./providers/vercel-gateway";

/**
 * Factory function to create provider adapters
 * 
 * Follows the Factory pattern and Dependency Inversion Principle:
 * - Clients depend on IProviderAdapter abstraction, not concrete implementations
 * - New providers can be added without modifying existing code (Open/Closed Principle)
 */
export function createProviderAdapter(
  config: ProviderFactoryConfig,
): IProviderAdapter {
  const baseConfig: BaseProviderConfig = {
    apiKey: config.apiKey,
    baseURL: config.baseURL,
    timeout: config.timeout,
    maxRetries: config.maxRetries,
    defaultModel: config.defaultModel,
    defaultTemperature: config.defaultTemperature,
    defaultMaxTokens: config.defaultMaxTokens,
  };

  switch (config.provider) {
    case ProviderType.OPENAI: {
      return new OpenAIAdapter({
        ...baseConfig,
        organization: (config as OpenAIProviderConfig).organization,
        defaultModel: (config as OpenAIProviderConfig).defaultModel,
      } as OpenAIProviderConfig);
    }

    case ProviderType.ANTHROPIC: {
      return new AnthropicAdapter({
        ...baseConfig,
        defaultModel: (config as AnthropicProviderConfig).defaultModel,
      } as AnthropicProviderConfig);
    }

    case ProviderType.GOOGLE:
      // TODO: Implement Google adapter
      throw new Error(
        "Google adapter not yet implemented. Use ProviderType.OPENAI for now.",
      );

    case ProviderType.VERCEL_GATEWAY: {
      return new VercelGatewayAdapter({
        ...baseConfig,
        providerOrder: (config as VercelGatewayProviderConfig).providerOrder,
        onlyProviders: (config as VercelGatewayProviderConfig).onlyProviders,
        fallbackModels: (config as VercelGatewayProviderConfig).fallbackModels,
      } as VercelGatewayProviderConfig);
    }

    default:
      throw new Error(
        `Unknown provider type: ${config.provider}. Supported providers: ${Object.values(ProviderType).join(", ")}`,
      );
  }
}

/**
 * Convenience function to create an OpenAI adapter
 * Maintains backward compatibility with existing code
 */
export function createOpenAIAdapter(
  config: OpenAIProviderConfig,
): OpenAIAdapter {
  return new OpenAIAdapter(config);
}

/**
 * Convenience function to create an Anthropic adapter
 */
export function createAnthropicAdapter(
  config: AnthropicProviderConfig,
): AnthropicAdapter {
  return new AnthropicAdapter(config);
}

/**
 * Convenience function to create a Vercel AI Gateway adapter
 * 
 * Vercel AI Gateway provides unified access to multiple providers with:
 * - Budgets and monitoring
 * - Load-balancing and fallbacks
 * - Provider routing
 * - Model discovery
 */
export function createVercelGatewayAdapter(
  config: VercelGatewayProviderConfig,
): VercelGatewayAdapter {
  return new VercelGatewayAdapter(config);
}

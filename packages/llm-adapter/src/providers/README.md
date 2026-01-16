# Provider Adapters

This directory contains provider-specific adapter implementations following the SOLID adapter pattern.

## Structure

Each provider follows this structure:

```
providers/
  {provider-name}/
    {ProviderName}Adapter.ts    # Main adapter implementation
    index.ts                     # Exports
```

## Adding a New Provider

To add a new provider (e.g., Google, Cohere, etc.):

### 1. Create Provider Directory

```bash
mkdir -p src/providers/{provider-name}
```

### 2. Create Adapter Class

Create `{ProviderName}Adapter.ts` following this template:

```typescript
import type {
  IProviderAdapter,
  BaseProviderConfig,
  GenerateContentParams,
  ProviderResponse,
} from "../../interfaces";

/**
 * {Provider}-specific configuration
 */
export interface {Provider}ProviderConfig extends BaseProviderConfig {
  // Add provider-specific config options here
  // defaultModel?: string;
  // customOption?: string;
}

/**
 * {Provider} adapter implementation
 * 
 * Implements IProviderAdapter interface following SOLID principles
 */
export class {Provider}Adapter implements IProviderAdapter {
  private client: unknown; // Replace with actual client type
  private config: Required<
    Pick<{Provider}ProviderConfig, "defaultModel" | "defaultTemperature" | "defaultMaxTokens">
  > & Omit<{Provider}ProviderConfig, "defaultModel" | "defaultTemperature" | "defaultMaxTokens">;

  constructor(config: {Provider}ProviderConfig) {
    if (!config.apiKey) {
      throw new Error("API key is required for {Provider}Adapter");
    }

    this.config = {
      defaultModel: config.defaultModel || "default-model",
      defaultTemperature: config.defaultTemperature ?? 0.7,
      defaultMaxTokens: config.defaultMaxTokens ?? 1600,
      ...config,
    };

    // Initialize provider client
    // this.client = new ProviderClient({ apiKey: this.config.apiKey });
  }

  getProviderName(): string {
    return "{provider-name}";
  }

  getClient(): unknown {
    return this.client;
  }

  async generateContent(params: GenerateContentParams): Promise<ProviderResponse> {
    try {
      // Implement provider-specific API call
      const content = await this.callProviderAPI(params);

      if (!content) {
        return {
          success: false,
          error: {
            message: "No content generated",
            type: "empty_response",
            provider: "{provider-name}",
          },
        };
      }

      return {
        success: true,
        content,
        metadata: {
          model: params.model || this.config.defaultModel,
          provider: "{provider-name}",
        },
      };
    } catch (error) {
      return {
        success: false,
        error: {
          message: error instanceof Error ? error.message : "Unknown error",
          type: "api_error",
          provider: "{provider-name}",
        },
      };
    }
  }

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
      error: lastError || {
        message: "Max retries exceeded",
        type: "retry_limit_exceeded",
        provider: "{provider-name}",
      },
    };
  }

  private async callProviderAPI(params: GenerateContentParams): Promise<string | undefined> {
    // Implement provider-specific API call logic
    // Return the generated content as a string
    throw new Error("Not implemented");
  }
}
```

### 3. Create Index File

Create `index.ts`:

```typescript
export * from "./{ProviderName}Adapter";
export type { {Provider}ProviderConfig } from "./{ProviderName}Adapter";
```

### 4. Add to ProviderType Enum

Update `src/interfaces.ts`:

```typescript
export enum ProviderType {
  OPENAI = "openai",
  ANTHROPIC = "anthropic",
  GOOGLE = "google",
  {PROVIDER} = "{provider-name}", // Add here
}
```

### 5. Update Factory

Update `src/factory.ts`:

```typescript
import { {Provider}Adapter, type {Provider}ProviderConfig } from "./providers/{provider-name}";

// In createProviderAdapter function:
case ProviderType.{PROVIDER}: {
  return new {Provider}Adapter({
    ...baseConfig,
    // Add provider-specific config mapping
  } as {Provider}ProviderConfig);
}
```

### 6. Add Convenience Function

Add to `src/factory.ts`:

```typescript
export function create{Provider}Adapter(
  config: {Provider}ProviderConfig,
): {Provider}Adapter {
  return new {Provider}Adapter(config);
}
```

### 7. Export from Main Index

Update `src/index.ts`:

```typescript
export * from "./providers/{provider-name}";
export { create{Provider}Adapter } from "./factory";
```

## SOLID Principles Applied

- **Single Responsibility**: Each adapter handles one provider only
- **Open/Closed**: Add new providers without modifying existing code
- **Liskov Substitution**: All adapters are interchangeable via `IProviderAdapter`
- **Interface Segregation**: Focused interface, no unnecessary methods
- **Dependency Inversion**: Depend on `IProviderAdapter` abstraction

## Examples

See existing implementations:
- `openai/OpenAIAdapter.ts` - OpenAI implementation
- `anthropic/AnthropicAdapter.ts` - Anthropic implementation
- `vercel-gateway/VercelGatewayAdapter.ts` - Vercel AI Gateway implementation (uses OpenAI-compatible API)

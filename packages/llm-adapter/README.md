# @nathanhfoster/llm-adapter

A generic, provider-agnostic LLM adapter package following SOLID principles. Supports multiple LLM providers (OpenAI, Anthropic, Google, etc.) through a unified interface.

## Table of Contents

- [Purpose](#purpose)
- [Architecture](#architecture)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Examples](#examples)
- [Adding New Providers](#adding-new-providers)
- [Environment Variables](#environment-variables)
- [Error Handling](#error-handling)
- [Prompt Engineering](#prompt-engineering)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)
- [Architecture](#architecture-1)
- [Related Packages](#related-packages)
- [Migration Guide](#migration-guide)

---

## Purpose

This package provides a clean, type-safe interface for interacting with multiple LLM providers, with built-in caching, error handling, and response parsing. It follows the Adapter pattern and SOLID principles to allow easy switching between providers without changing application code.

### When to Use

- ✅ You need to support multiple LLM providers (OpenAI, Anthropic, Google, etc.)
- ✅ You want provider-agnostic code that can switch providers easily
- ✅ You need a clean, type-safe interface for LLM interactions
- ✅ You want built-in retry logic and error handling
- ✅ You're building features that may need to switch providers (cost optimization, feature availability, etc.)

### When NOT to Use

- ❌ You only need one provider and don't plan to switch (though this package still works great!)
- ❌ You need advanced agent capabilities (consider LangChain instead)
- ❌ You need complex multi-step reasoning chains (consider LangChain instead)

---

## Architecture

This package follows SOLID principles:

- **Single Responsibility**: Each adapter handles one provider's API interactions
- **Open/Closed**: Open for extension (new providers), closed for modification
- **Liskov Substitution**: All provider adapters are interchangeable via `IProviderAdapter` interface
- **Interface Segregation**: Focused, minimal interfaces
- **Dependency Inversion**: Depend on abstractions (`IProviderAdapter`), not concrete implementations

### Design Patterns

- **Adapter Pattern**: Unified interface for different provider APIs
- **Factory Pattern**: `createProviderAdapter()` for provider-agnostic code
- **Strategy Pattern**: Switch providers at runtime without code changes

---

## Installation

This package is part of the monorepo workspace. Install dependencies from the root:

```bash
pnpm install
```

### Optional Provider SDKs

For specific providers, you may need to install their SDKs:

```bash
# For OpenAI (included by default)
# openai package is already a dependency

# For Anthropic
pnpm add @anthropic-ai/sdk

# For Google (when implemented)
# pnpm add @google/generative-ai
```

---

## Quick Start

```typescript
import { createProviderAdapter, ProviderType } from '@nathanhfoster/llm-adapter';

// Create adapter
const adapter = createProviderAdapter({
  provider: ProviderType.OPENAI,
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
  defaultModel: 'gpt-4o',
});

// Generate content
const response = await adapter.generateContent({
  prompt: 'Write a short story about a robot',
});

if (response.success) {
  console.log(response.content);
} else {
  console.error(response.error);
}
```

---

## Usage

### Using the Factory Pattern (Recommended)

The factory pattern allows you to write provider-agnostic code:

```typescript
import { createProviderAdapter, ProviderType } from '@nathanhfoster/llm-adapter';

// Create an adapter - works with any provider
const adapter = createProviderAdapter({
  provider: ProviderType.OPENAI, // or ProviderType.ANTHROPIC
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
  defaultModel: 'gpt-4o',
  defaultTemperature: 0.7,
  defaultMaxTokens: 2000,
});

// Use the adapter (same interface for all providers)
const response = await adapter.generateContent({
  prompt: 'Write a short story about a robot',
});

if (response.success) {
  console.log(response.content);
} else {
  console.error(response.error);
}
```

### Using Provider-Specific Adapters

For provider-specific features or when you know which provider you're using:

```typescript
import { createOpenAIAdapter } from '@nathanhfoster/llm-adapter';

// Create OpenAI adapter directly
const adapter = createOpenAIAdapter({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
  defaultModel: 'gpt-4o',
  defaultTemperature: 0.7,
  defaultMaxTokens: 2000,
});

// Generate content
const response = await adapter.generateContent({
  prompt: 'Explain quantum computing',
  temperature: 0.5,
});

if (response.success) {
  console.log(response.content);
}
```

### Using Anthropic

```typescript
import { createAnthropicAdapter } from '@nathanhfoster/llm-adapter';

const adapter = createAnthropicAdapter({
  apiKey: process.env.ANTHROPIC_API_KEY!,
  defaultModel: 'claude-3-5-sonnet-20241022',
});

const response = await adapter.generateContent({
  prompt: 'Hello, Claude!',
});
```

**Note**: Install `@anthropic-ai/sdk` to use the Anthropic adapter:
```bash
pnpm add @anthropic-ai/sdk
```

### Switching Providers

Switch providers without changing your application code:

```typescript
import { createProviderAdapter, ProviderType } from '@nathanhfoster/llm-adapter';

// Determine provider from environment or user preference
const provider = process.env.LLM_PROVIDER === 'anthropic' 
  ? ProviderType.ANTHROPIC 
  : ProviderType.OPENAI;

const adapter = createProviderAdapter({
  provider,
  apiKey: process.env.LLM_API_KEY!,
  defaultModel: process.env.LLM_MODEL || 'gpt-4o',
});

// Same code works regardless of provider
const response = await adapter.generateContent({
  prompt: 'Your prompt here',
});
```

### With Retry Logic

Automatic retry with exponential backoff:

```typescript
import { createOpenAIAdapter } from '@nathanhfoster/llm-adapter';

const adapter = createOpenAIAdapter({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
});

// Automatic retry with exponential backoff
const response = await adapter.generateContentWithRetry(
  {
    prompt: 'Generate content',
  },
  3, // max retries
  1000 // base delay in ms
);
```

### Advanced: Provider-Specific Features

Access provider-specific features when needed:

```typescript
import { createOpenAIAdapter } from '@nathanhfoster/llm-adapter';
import type { OpenAIAdapter } from '@nathanhfoster/llm-adapter';

const adapter = createOpenAIAdapter({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
});

// Access OpenAI-specific features
if (adapter instanceof OpenAIAdapter) {
  const client = adapter.getClient();
  // Use OpenAI client directly for advanced features
  const choices = await adapter.askOpenAI({
    prompt: 'Your prompt',
  });
}
```

---

## API Reference

### Core Interfaces

#### `IProviderAdapter`

The main interface that all provider adapters implement:

```typescript
interface IProviderAdapter {
  getProviderName(): string;
  generateContent(params: GenerateContentParams): Promise<ProviderResponse>;
  generateContentWithRetry(
    params: GenerateContentParams,
    maxRetries?: number,
    baseDelay?: number
  ): Promise<ProviderResponse>;
  getClient(): unknown;
}
```

#### `ProviderResponse`

Standardized response format for all providers:

```typescript
interface ProviderResponse {
  success: boolean;
  content?: string;
  error?: ProviderError;
  metadata?: ResponseMetadata;
}
```

#### `GenerateContentParams`

Request parameters:

```typescript
interface GenerateContentParams {
  prompt?: string;
  messages?: Array<{
    role: "user" | "assistant" | "system";
    content: string;
  }>;
  model?: string;
  temperature?: number;
  max_tokens?: number;
  [key: string]: unknown; // Provider-specific parameters
}
```

### Factory Functions

#### `createProviderAdapter`

Creates a provider adapter based on provider type:

```typescript
function createProviderAdapter(
  config: ProviderFactoryConfig
): IProviderAdapter;
```

#### `createOpenAIAdapter`

Convenience function for creating OpenAI adapter:

```typescript
function createOpenAIAdapter(
  config: OpenAIProviderConfig
): OpenAIAdapter;
```

#### `createAnthropicAdapter`

Convenience function for creating Anthropic adapter:

```typescript
function createAnthropicAdapter(
  config: AnthropicProviderConfig
): AnthropicAdapter;
```

### Provider Types

```typescript
enum ProviderType {
  OPENAI = "openai",
  ANTHROPIC = "anthropic",
  GOOGLE = "google",
}
```

---

## Examples

### Resume Improvement

```typescript
import { createProviderAdapter, ProviderType } from '@nathanhfoster/llm-adapter';

const adapter = createProviderAdapter({
  provider: ProviderType.OPENAI,
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
  defaultModel: 'gpt-4o',
});

export async function improveResume(
  resumeContent: string,
  instructions?: string
): Promise<string | null> {
  const prompt = instructions
    ? `${instructions}\n\nResume:\n${resumeContent}`
    : `Improve this resume:\n\n${resumeContent}`;

  const response = await adapter.generateContent({
    prompt,
    temperature: 0.7,
  });

  if (response.success && response.content) {
    return response.content;
  }

  console.error('Failed to improve resume:', response.error);
  return null;
}
```

### Multi-Provider Support

```typescript
import { createProviderAdapter, ProviderType } from '@nathanhfoster/llm-adapter';

// Determine provider from environment or user preference
function getProvider(): ProviderType {
  const provider = process.env.LLM_PROVIDER?.toLowerCase();
  
  switch (provider) {
    case 'anthropic':
      return ProviderType.ANTHROPIC;
    case 'google':
      return ProviderType.GOOGLE;
    default:
      return ProviderType.OPENAI;
  }
}

// Create adapter - works with any provider
const adapter = createProviderAdapter({
  provider: getProvider(),
  apiKey: process.env.LLM_API_KEY!,
  defaultModel: process.env.LLM_MODEL || 'gpt-4o',
});

// Same code works regardless of provider
const response = await adapter.generateContent({
  prompt: 'Your prompt here',
});
```

### Using Messages (Conversational)

```typescript
import { createOpenAIAdapter } from '@nathanhfoster/llm-adapter';

const adapter = createOpenAIAdapter({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
});

const response = await adapter.generateContent({
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'What is React?' },
    { role: 'assistant', content: 'React is a JavaScript library...' },
    { role: 'user', content: 'How does it work?' },
  ],
});
```

---

## Adding New Providers

The package is designed to easily add new providers following the SOLID adapter pattern. See `src/providers/README.md` for a complete guide.

### Quick Start

1. **Create provider directory**: `src/providers/{provider-name}/`
2. **Implement adapter**: Create `{Provider}Adapter.ts` implementing `IProviderAdapter`
3. **Add to factory**: Update `factory.ts` to handle the new provider type
4. **Export**: Add exports to `index.ts`

### Example: Using Anthropic

```typescript
import { createAnthropicAdapter, ProviderType } from '@nathanhfoster/llm-adapter';

// Option 1: Direct adapter creation
const adapter = createAnthropicAdapter({
  apiKey: process.env.ANTHROPIC_API_KEY!,
  defaultModel: 'claude-3-5-sonnet-20241022',
});

// Option 2: Factory pattern (provider-agnostic)
const adapter = createProviderAdapter({
  provider: ProviderType.ANTHROPIC,
  apiKey: process.env.ANTHROPIC_API_KEY!,
  defaultModel: 'claude-3-5-sonnet-20241022',
});

const response = await adapter.generateContent({
  prompt: 'Hello, Claude!',
});
```

**Note**: Install `@anthropic-ai/sdk` to use the Anthropic adapter:
```bash
pnpm add @anthropic-ai/sdk
```

For detailed instructions, see `src/providers/README.md`.

---

## Environment Variables

```bash
# Required (for OpenAI)
NEXT_PUBLIC_OPENAI_API_KEY=sk-your-api-key-here

# Optional (for Anthropic)
ANTHROPIC_API_KEY=sk-ant-your-api-key-here

# Optional (for multi-provider support)
LLM_PROVIDER=openai
LLM_API_KEY=sk-your-api-key-here
LLM_MODEL=gpt-4o
```

**Note:** Using `NEXT_PUBLIC_` prefix exposes the key to the browser. For server-side only usage, use a private environment variable and pass it to the adapter.

---

## Error Handling

Always check `response.success` before using content:

```typescript
import { createProviderAdapter, ProviderType } from '@nathanhfoster/llm-adapter';

const adapter = createProviderAdapter({
  provider: ProviderType.OPENAI,
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
});

const response = await adapter.generateContent({
  prompt: 'Your prompt here',
});

if (!response.success) {
  // Handle error
  console.error('Provider:', response.error?.provider);
  console.error('Type:', response.error?.type);
  console.error('Message:', response.error?.message);
  console.error('Code:', response.error?.code);
  console.error('Status:', response.error?.statusCode);
  
  // Handle specific error types
  if (response.error?.type === 'missing_dependency') {
    console.error('Install the required SDK:', response.error.message);
  }
}
```

### Error Types

- `api_error` - API request failed
- `empty_response` - No content in response
- `missing_dependency` - Required SDK not installed
- `retry_limit_exceeded` - Max retries reached
- `missing_api_key` - API key not provided

---

## Prompt Engineering

📖 **Master Prompt Engineering Guide:** [PROMPT_ENGINEERING.md](../../PROMPT_ENGINEERING.md)

For comprehensive guidance on writing effective prompts, see the master prompt engineering guide. It covers:
- Core principles and best practices
- Prompt structure and patterns
- System message strategies
- Temperature and parameter tuning
- Advanced techniques (chain-of-thought, few-shot, etc.)
- Codebase examples and templates

### Quick Tips

1. **Be Specific** - Clear instructions yield better results
2. **Provide Context** - Include relevant background information
3. **Use System Messages** - Set the model's role and behavior
4. **Specify Output Format** - Tell the model exactly what you want
5. **Test and Iterate** - Refine prompts based on results

---

## Best Practices

1. **Use the Factory Pattern** - Prefer `createProviderAdapter()` for provider-agnostic code
2. **Depend on Abstractions** - Use `IProviderAdapter` interface in your code
3. **Error Handling** - Always check `response.success` before using content
4. **Environment Variables** - Never hardcode API keys
5. **Provider-Specific Features** - Use provider-specific adapters only when needed
6. **Type Safety** - Leverage TypeScript for compile-time safety
7. **Retry Logic** - Use `generateContentWithRetry()` for production code
8. **Caching** - Consider caching responses for repeated queries

---

## Troubleshooting

### "Missing dependency" Error

If you see an error about a missing SDK:

```bash
# For Anthropic
pnpm add @anthropic-ai/sdk

# For OpenAI (should already be installed)
pnpm add openai
```

### API Key Not Working

- Check that your API key is correct
- Verify the key has the right permissions
- Ensure you're using the correct environment variable name
- For server-side usage, don't use `NEXT_PUBLIC_` prefix

### Provider Not Found

- Ensure the provider type is correctly spelled
- Check that the provider is implemented in the factory
- Verify the provider SDK is installed

### Type Errors

- Ensure you're importing types correctly
- Check that your TypeScript version is compatible
- Verify all dependencies are installed

---

## Architecture

This package follows the monorepo's [FRONTEND_ARCHITECTURE.md](../../FRONTEND_ARCHITECTURE.md) principles:

- **SOLID Principles** - Adapter pattern with clear separation of concerns
- **Type Safety** - Full TypeScript support
- **Clean API** - Simple, intuitive interface
- **Framework Agnostic** - Works with any framework
- **Extensible** - Easy to add new providers

### Package Structure

```
packages/llm-adapter/
├── src/
│   ├── interfaces.ts          # Core interfaces (IProviderAdapter, etc.)
│   ├── types.ts               # Type definitions
│   ├── factory.ts             # Factory functions
│   ├── helpers.ts             # Utility functions
│   ├── cache.ts               # Caching utilities
│   ├── index.ts               # Main exports
│   ├── providers/
│   │   ├── openai/            # OpenAI adapter
│   │   ├── anthropic/          # Anthropic adapter
│   │   └── README.md          # Guide for adding providers
│   └── prompts/
│       └── blogs/              # Blog prompt utilities
```

---

## Related Packages

- `@nathanhfoster/resurrection` - State management
- `@nathanhfoster/utils` - Utility functions
- `@nathanhfoster/ui` - UI components

---

## Migration Guide

### From @nathanhfoster/openai

If you're migrating from the old `@nathanhfoster/openai` package:

1. **Update imports:**
   ```typescript
   // Old
   import { createOpenAIAdapter } from '@nathanhfoster/openai';
   
   // New (still works for backward compatibility)
   import { createOpenAIAdapter } from '@nathanhfoster/llm-adapter';
   ```

2. **The API is backward compatible** - existing code should work without changes

3. **Consider migrating to the factory pattern** for better provider flexibility:
   ```typescript
   // Recommended
   import { createProviderAdapter, ProviderType } from '@nathanhfoster/llm-adapter';
   
   const adapter = createProviderAdapter({
     provider: ProviderType.OPENAI,
     // ... config
   });
   ```

### Breaking Changes

None! The package maintains full backward compatibility with `@nathanhfoster/openai`.

---

## Deprecated APIs

The following functions are deprecated but maintained for backward compatibility:

- `askOpenAI()` - Use `adapter.generateContent()` instead
- `getOpenAiChoiceContent()` - Content is returned in `ProviderResponse.content`

These will be removed in a future version. Migrate to the new API.

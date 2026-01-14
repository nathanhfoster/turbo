# @nathanhfoster/openai

A type-safe OpenAI API adapter with caching, error handling, and flexible configuration.

## Purpose

This package provides a clean, type-safe interface for interacting with OpenAI's API, with built-in caching, error handling, and response parsing.

## Installation

This package is part of the monorepo workspace. Install dependencies from the root:

```bash
pnpm install
```

## Usage

### Basic Setup

```typescript
import { createOpenAIAdapter } from '@nathanhfoster/openai';

// Create adapter instance
const adapter = createOpenAIAdapter({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
  defaultModel: 'gpt-4o',
  defaultTemperature: 0.7,
  defaultMaxTokens: 2000,
});

// Use the adapter
const response = await adapter.askOpenAI({
  prompt: 'Write a short story about a robot',
  model: 'gpt-4o',
});
```

### Using OpenAIAdapter Class

```typescript
import { OpenAIAdapter } from '@nathanhfoster/openai';

const adapter = new OpenAIAdapter({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
  defaultModel: 'gpt-4o',
  defaultTemperature: 0.7,
  defaultMaxTokens: 2000,
});

// Ask OpenAI
const choices = await adapter.askOpenAI({
  prompt: 'Explain quantum computing',
  model: 'gpt-4o',
  temperature: 0.5,
});

// Get content from choices
const content = adapter.getChoiceContent(choices, 0);
```

### With Caching

```typescript
import { OpenAIAdapter } from '@nathanhfoster/openai';

const adapter = new OpenAIAdapter({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
  cache: {
    enabled: true,
    ttl: 3600, // Cache for 1 hour
  },
});

// First call - hits API
const response1 = await adapter.askOpenAI({
  prompt: 'What is React?',
});

// Second call - uses cache
const response2 = await adapter.askOpenAI({
  prompt: 'What is React?',
});
```

### Response Helpers

```typescript
import { OpenAIAdapter, getOpenAiChoiceContent } from '@nathanhfoster/openai';

const adapter = new OpenAIAdapter({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
});

const choices = await adapter.askOpenAI({
  prompt: 'Generate a JSON object with user data',
});

// Get content from first choice
const content = adapter.getChoiceContent(choices, 0);

// Or use helper function
const content2 = getOpenAiChoiceContent(choices, 0);
```

## API Reference

### createOpenAIAdapter

Factory function to create an adapter instance.

```typescript
function createOpenAIAdapter(
  config: OpenAIAdapterConfig
): OpenAIAdapter;
```

### OpenAIAdapter

Main adapter class.

```typescript
class OpenAIAdapter {
  constructor(config: OpenAIAdapterConfig);

  // Main method
  askOpenAI(params: AskOpenAIProps): Promise<ChatCompletion.Choice[]>;

  // Helper methods
  getChoiceContent(choices: ChatCompletion.Choice[], index?: number): string | undefined;
}
```

### OpenAIAdapterConfig

```typescript
interface OpenAIAdapterConfig {
  apiKey: string; // OpenAI API key
  defaultModel?: string; // Default model (default: 'gpt-4o')
  defaultTemperature?: number; // Default temperature (default: 0.7)
  defaultMaxTokens?: number; // Default max tokens (default: 2000)
  cache?: {
    enabled: boolean;
    ttl?: number; // Time to live in seconds
  };
}
```

### AskOpenAIProps

```typescript
interface AskOpenAIProps {
  prompt: string; // The prompt/question
  model?: string; // Model to use (overrides default)
  temperature?: number; // Temperature (overrides default)
  maxTokens?: number; // Max tokens (overrides default)
  systemMessage?: string; // System message for context
  messages?: ChatMessage[]; // Previous conversation messages
}
```

## Examples

### Resume Improvement

```typescript
import { createOpenAIAdapter } from '@nathanhfoster/openai';

const adapter = createOpenAIAdapter({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
  defaultModel: 'gpt-4o',
});

export async function improveResume(
  resumeContent: string,
  instructions?: string
): Promise<string | null> {
  try {
    const systemMessage = `You are a professional resume writer. 
      Improve resumes while maintaining the original structure and key information.`;

    const prompt = instructions
      ? `${instructions}\n\nResume:\n${resumeContent}`
      : `Improve this resume:\n\n${resumeContent}`;

    const choices = await adapter.askOpenAI({
      prompt,
      systemMessage,
      temperature: 0.7,
    });

    return adapter.getChoiceContent(choices, 0) || null;
  } catch (error) {
    console.error('Failed to improve resume:', error);
    return null;
  }
}
```

### Job Tailoring

```typescript
import { createOpenAIAdapter } from '@nathanhfoster/openai';

const adapter = createOpenAIAdapter({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
});

export async function tailorResumeForJob(
  resumeContent: string,
  jobDescription: string
): Promise<string | null> {
  const systemMessage = `You are a professional resume writer specializing in 
    tailoring resumes for specific job descriptions.`;

  const prompt = `Tailor this resume for the following job description:\n\n
    Job Description:\n${jobDescription}\n\n
    Resume:\n${resumeContent}`;

  const choices = await adapter.askOpenAI({
    prompt,
    systemMessage,
    temperature: 0.5, // Lower temperature for more focused output
  });

  return adapter.getChoiceContent(choices, 0) || null;
}
```

### Conversational AI

```typescript
import { createOpenAIAdapter } from '@nathanhfoster/openai';

const adapter = createOpenAIAdapter({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
});

export async function chatWithAI(
  message: string,
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>
): Promise<string> {
  const choices = await adapter.askOpenAI({
    prompt: message,
    messages: conversationHistory,
    temperature: 0.8,
  });

  return adapter.getChoiceContent(choices, 0) || '';
}
```

## Environment Variables

Set your OpenAI API key:

```bash
# .env.local
NEXT_PUBLIC_OPENAI_API_KEY=sk-your-api-key-here
```

**Note:** Using `NEXT_PUBLIC_` prefix exposes the key to the browser. For server-side only usage, use a private environment variable and pass it to the adapter.

## Error Handling

```typescript
import { createOpenAIAdapter } from '@nathanhfoster/openai';

const adapter = createOpenAIAdapter({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
});

try {
  const response = await adapter.askOpenAI({
    prompt: 'Your prompt here',
  });
} catch (error) {
  if (error instanceof Error) {
    console.error('OpenAI API Error:', error.message);
    // Handle error appropriately
  }
}
```

## Best Practices

1. **Use Environment Variables** - Never hardcode API keys
2. **Error Handling** - Always wrap API calls in try-catch
3. **Rate Limiting** - Implement rate limiting for production
4. **Caching** - Use caching for repeated queries
5. **Temperature** - Adjust temperature based on use case (lower for factual, higher for creative)
6. **Token Limits** - Set appropriate max tokens to control costs
7. **Server-Side** - Consider using server-side API routes for sensitive operations

## Architecture

This package follows the monorepo's [FRONTEND_ARCHITECTURE.md](../../FRONTEND_ARCHITECTURE.md) principles:

- **Type Safety** - Full TypeScript support
- **Clean API** - Simple, intuitive interface
- **Framework Agnostic** - Works with any framework

## Related Packages

- `@nathanhfoster/resurrection` - State management
- `@nathanhfoster/utils` - Utility functions

## Deprecated APIs

The following functions are deprecated but maintained for backward compatibility:

- `askOpenAI()` - Use `OpenAIAdapter.askOpenAI()` instead
- `getOpenAiChoiceContent()` - Use `OpenAIAdapter.getChoiceContent()` instead

These will be removed in a future version. Migrate to the class-based API.

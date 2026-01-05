import { MemoryCache } from '@nathanhfoster/utils/memoryCache';

// Singleton instances for different cache types
export const responseCache = new MemoryCache<string>({
  defaultTTL: 15 * 60 * 1000, // 15 minutes
  maxSize: 500,
});

export const promptCache = new MemoryCache<string>({
  defaultTTL: 60 * 60 * 1000, // 1 hour
  maxSize: 200,
});

/**
 * Generate a cache key from OpenAI parameters
 */
export const generateCacheKey = (params: {
  prompt?: string;
  messages?: unknown[];
  model?: string;
  temperature?: number;
  max_tokens?: number;
}): string => {
  const normalizedParams = {
    model: params.model || 'gpt-4o',
    temperature: params.temperature || 0.7,
    max_tokens: params.max_tokens || 1600,
    content: params.prompt || JSON.stringify(params.messages || []),
  };

  return responseCache.generateKey('openai', normalizedParams);
};


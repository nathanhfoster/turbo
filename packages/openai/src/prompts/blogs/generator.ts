import { generateContentWithRetry, validateGeneratedContent } from '../../helpers';
import { responseCache, generateCacheKey } from '../../cache';
import { getBlogPrompt, generateRandomTopic } from './index';
import type {
  BlogPromptParams,
  BlogGenerationConfig,
  BlogGenerationResult,
  BlogValidationResult,
  BlogTone,
  ManifestConfig,
} from './types';

/**
 * Validates blog content quality and structure
 */
export const validateBlogContent = (content: string): BlogValidationResult => {
  const issues: string[] = [];

  // Word count check
  const wordCount = content.split(/\s+/).length;
  if (wordCount < 1000) {
    issues.push(`Content too short: ${wordCount} words (minimum 1000)`);
  }

  // Structure checks
  const hasProperStructure =
    content.includes('<article') && content.includes('<h1') && content.includes('<h2');
  if (!hasProperStructure) {
    issues.push('Missing proper HTML structure (article, h1, h2 tags)');
  }

  // Call to action check
  const hasCallToAction =
    content.includes('Call-to-Action') ||
    content.includes('call-to-action') ||
    content.includes('bg-gradient-to-r from-purple-600 to-blue-600');
  if (!hasCallToAction) {
    issues.push('Missing call-to-action section');
  }

  // Basic content validation
  if (!validateGeneratedContent(content)) {
    issues.push('Content failed basic quality validation');
  }

  return {
    isValid: issues.length === 0,
    wordCount,
    hasProperStructure,
    hasCallToAction,
    issues,
  };
};

/**
 * Generates a blog post with comprehensive error handling and validation
 */
export const generateBlogPost = async (
  params: BlogPromptParams,
  manifest: ManifestConfig,
  config: BlogGenerationConfig = {}
): Promise<BlogGenerationResult> => {
  const {
    useCache = true,
    maxRetries = 3,
    temperature = 0.7,
    maxTokens = 2500,
    validateContent = true,
  } = config;

  const {
    topic,
    tone = 'informative',
    targetAudience = 'local businesses',
    category = 'business',
  } = params;

  // Generate cache key
  const prompt = getBlogPrompt(params, manifest);
  const cacheKey = generateCacheKey({
    prompt,
    model: 'gpt-4o',
    temperature,
    max_tokens: maxTokens,
  });

  // Check cache first
  if (useCache && responseCache.has(cacheKey)) {
    const cachedContent = responseCache.get(cacheKey);
    if (cachedContent) {
      return {
        success: true,
        content: cachedContent,
        metadata: {
          topic,
          category,
          audience: targetAudience,
          tone: tone as BlogTone,
          wordCount: cachedContent.split(/\s+/).length,
          generatedAt: new Date(),
        },
      };
    }
  }

  try {
    // Generate content with retry logic
    const result = await generateContentWithRetry(
      {
        prompt,
        temperature,
        max_tokens: maxTokens,
        model: 'gpt-4o',
      },
      maxRetries
    );

    if (!result.success || !result.content) {
      return {
        success: false,
        error: result.error?.message || 'Failed to generate content',
      };
    }

    // Validate content if requested
    if (validateContent) {
      const validation = validateBlogContent(result.content);
      if (!validation.isValid) {
        return {
          success: false,
          error: `Content validation failed: ${validation.issues.join(', ')}`,
        };
      }
    }

    // Cache successful result
    if (useCache) {
      responseCache.set(cacheKey, result.content);
    }

    return {
      success: true,
      content: result.content,
      metadata: {
        topic,
        category,
        audience: targetAudience,
        tone: tone as BlogTone,
        wordCount: result.content.split(/\s+/).length,
        generatedAt: new Date(),
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

/**
 * Generates a random blog post with automatic topic selection
 */
export const generateRandomBlogPost = async (
  manifest: ManifestConfig,
  category?: string,
  config?: BlogGenerationConfig
): Promise<BlogGenerationResult> => {
  const selectedCategory =
    category || ['business', 'community', 'local', 'professional'][Math.floor(Math.random() * 4)];
  const topic = generateRandomTopic(selectedCategory);

  const audiences = [
    'local businesses',
    'economic developers',
    'city leaders',
    'professionals',
    'community members',
  ];
  const tones: BlogTone[] = ['informative', 'creative', 'technical', 'casual'];

  const params: BlogPromptParams = {
    topic,
    category: selectedCategory,
    targetAudience: audiences[Math.floor(Math.random() * audiences.length)],
    tone: tones[Math.floor(Math.random() * tones.length)],
  };

  return generateBlogPost(params, manifest, config);
};

/**
 * Batch generate multiple blog posts
 */
export const generateMultipleBlogPosts = async (
  manifest: ManifestConfig,
  count: number,
  categories?: string[],
  config?: BlogGenerationConfig
): Promise<BlogGenerationResult[]> => {
  const results: BlogGenerationResult[] = [];

  for (let i = 0; i < count; i++) {
    const category = categories?.[i % categories.length];
    const result = await generateRandomBlogPost(manifest, category, config);
    results.push(result);

    // Add small delay to avoid rate limiting
    if (i < count - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  return results;
};


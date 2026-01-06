import { askOpenAI } from "./index";
import type { AskOpenAIProps, OpenAIResponse } from "./types";
import type { IOpenAIAdapter } from "./adapter";

/**
 * Wrapper function that provides standardized error handling and response formatting
 * @deprecated Use OpenAIAdapter.generateContent() instead
 * Maintained for backward compatibility
 */
export const generateContent = async (
  params: AskOpenAIProps,
  adapter?: IOpenAIAdapter,
): Promise<OpenAIResponse> => {
  // If adapter is provided, use it; otherwise use default (backward compatibility)
  if (adapter) {
    return adapter.generateContent(params);
  }

  // Fallback to default adapter for backward compatibility
  try {
    const choices = await askOpenAI(params);
    const content = getOpenAiChoiceContent(choices);

    if (!content) {
      return {
        success: false,
        error: {
          message: "No content generated from OpenAI response",
          type: "empty_response",
        },
      };
    }

    return {
      success: true,
      content,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return {
      success: false,
      error: {
        message: errorMessage,
        type: "api_error",
      },
    };
  }
};

/**
 * Retry wrapper for OpenAI requests with exponential backoff
 * @deprecated Use OpenAIAdapter.generateContentWithRetry() instead
 * Maintained for backward compatibility
 */
export const generateContentWithRetry = async (
  params: AskOpenAIProps,
  maxRetries = 3,
  baseDelay = 1000,
  adapter?: IOpenAIAdapter,
): Promise<OpenAIResponse> => {
  // If adapter is provided, use it; otherwise use default (backward compatibility)
  if (adapter) {
    return adapter.generateContentWithRetry(params, maxRetries, baseDelay);
  }

  // Fallback to default implementation for backward compatibility
  let lastError: OpenAIResponse["error"];

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const result = await generateContent(params);

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
    },
  };
};

/**
 * Helper function to extract content from choices
 * @deprecated This is now internal to OpenAIAdapter
 */
const getOpenAiChoiceContent = (
  choices: Array<{ message: { content?: string | null } }>,
  index = 0,
): string | undefined => {
  if (!choices || choices.length === 0 || !choices[index]) {
    return undefined;
  }

  const content = choices[index].message.content?.trim();

  if (!content) return undefined;

  try {
    const parsed = JSON.parse(content);
    return typeof parsed === "string" ? parsed : JSON.stringify(parsed);
  } catch {
    return cleanMarkdownContent(content);
  }
};

const cleanMarkdownContent = (content: string): string => {
  let cleanContent = content;

  // Remove markdown code block patterns
  const codeBlockPatterns = [
    /^```html\s*\n?/gm,
    /^```\w*\s*\n?/gm,
    /\n?```\s*$/gm,
    /```\w*/g,
    /```/g,
  ];

  codeBlockPatterns.forEach((pattern) => {
    cleanContent = cleanContent.replace(pattern, "");
  });

  // Clean up extra whitespace
  cleanContent = cleanContent.replace(/^\s+|\s+$/g, "");
  cleanContent = cleanContent.replace(/\n\s*\n/g, "\n");

  return cleanContent;
};

/**
 * Validates content meets minimum quality standards
 */
export const validateGeneratedContent = (content: string): boolean => {
  if (!content || content.length < 100) {
    return false;
  }

  // Check for common error patterns
  const errorPatterns = [
    /error/i,
    /sorry/i,
    /cannot/i,
    /unable to/i,
    /i don't/i,
    /i can't/i,
  ];

  return !errorPatterns.some((pattern) => pattern.test(content));
};

/**
 * Estimates token count for content (rough approximation)
 */
export const estimateTokenCount = (text: string): number => {
  return Math.ceil(text.length / 4);
};

/**
 * Truncates content to fit within token limits
 */
export const truncateToTokenLimit = (
  text: string,
  maxTokens: number,
): string => {
  const estimatedTokens = estimateTokenCount(text);

  if (estimatedTokens <= maxTokens) {
    return text;
  }

  const targetLength = Math.floor((maxTokens * text.length) / estimatedTokens);
  return text.substring(0, targetLength);
};

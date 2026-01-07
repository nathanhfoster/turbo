import { createOpenAIAdapter } from "@nathanhfoster/openai";
import type {
  ImproveResumeRequest,
  TailorResumeRequest,
  GenerateSuggestionsRequest,
  AIApiResponse,
} from "./types";

/**
 * OpenAI API integration for Resume domain
 * Following FSD pattern - API integration layer
 *
 * This layer separates API calls from business logic,
 * making it easier to mock for testing and migrate to
 * different AI providers in the future.
 */

/**
 * Create and configure OpenAI adapter instance
 */
export function createResumeOpenAIAdapter() {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

  if (!apiKey) {
    console.warn("NEXT_PUBLIC_OPENAI_API_KEY is not set");
    return null;
  }

  return createOpenAIAdapter({
    apiKey,
    defaultModel: "gpt-4o",
    defaultTemperature: 0.7,
    defaultMaxTokens: 2000,
  });
}

/**
 * Improve resume content using AI
 */
export async function improveResumeContent(
  request: ImproveResumeRequest,
): Promise<AIApiResponse> {
  const adapter = createResumeOpenAIAdapter();

  if (!adapter) {
    return {
      success: false,
      error: {
        message: "OpenAI API key is not configured",
        code: "MISSING_API_KEY",
      },
    };
  }

  try {
    const prompt = request.instructions
      ? `Improve the following resume based on these instructions: ${request.instructions}\n\nResume content:\n${request.content}`
      : `Improve the following resume content to make it more professional and impactful:\n\n${request.content}`;

    const result = await adapter.generateContent({ prompt });

    if (result.success && result.content) {
      return {
        success: true,
        content: result.content,
      };
    } else {
      return {
        success: false,
        error: {
          message: result.error?.message || "Failed to generate improved resume",
          code: result.error?.code,
        },
      };
    }
  } catch (err) {
    return {
      success: false,
      error: {
        message: err instanceof Error ? err.message : "Failed to improve resume",
        code: "UNKNOWN_ERROR",
      },
    };
  }
}

/**
 * Tailor resume for a specific job description
 */
export async function tailorResumeForJob(
  request: TailorResumeRequest,
): Promise<AIApiResponse> {
  const adapter = createResumeOpenAIAdapter();

  if (!adapter) {
    return {
      success: false,
      error: {
        message: "OpenAI API key is not configured",
        code: "MISSING_API_KEY",
      },
    };
  }

  try {
    const prompt = `Tailor the following resume to match this job description. Keep the same structure and format, but adjust the content to highlight relevant skills and experiences:\n\nJob Description:\n${request.jobDescription}\n\nResume content:\n${request.content}`;

    const result = await adapter.generateContent({ prompt });

    if (result.success && result.content) {
      return {
        success: true,
        content: result.content,
      };
    } else {
      return {
        success: false,
        error: {
          message: result.error?.message || "Failed to tailor resume for job",
          code: result.error?.code,
        },
      };
    }
  } catch (err) {
    return {
      success: false,
      error: {
        message: err instanceof Error ? err.message : "Failed to tailor resume",
        code: "UNKNOWN_ERROR",
      },
    };
  }
}

/**
 * Generate suggestions for improving specific sections
 */
export async function generateResumeSuggestions(
  request: GenerateSuggestionsRequest,
): Promise<AIApiResponse> {
  const adapter = createResumeOpenAIAdapter();

  if (!adapter) {
    return {
      success: false,
      error: {
        message: "OpenAI API key is not configured",
        code: "MISSING_API_KEY",
      },
    };
  }

  try {
    const prompt = request.section
      ? `Analyze the following resume and provide specific suggestions for improving the "${request.section}" section:\n\nResume content:\n${request.content}`
      : `Analyze the following resume and provide specific suggestions for improvement:\n\n${request.content}`;

    const result = await adapter.generateContent({
      prompt,
      max_tokens: 1000,
    });

    if (result.success && result.content) {
      return {
        success: true,
        content: result.content,
      };
    } else {
      return {
        success: false,
        error: {
          message: result.error?.message || "Failed to generate suggestions",
          code: result.error?.code,
        },
      };
    }
  } catch (err) {
    return {
      success: false,
      error: {
        message:
          err instanceof Error ? err.message : "Failed to generate suggestions",
        code: "UNKNOWN_ERROR",
      },
    };
  }
}

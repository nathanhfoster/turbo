import type { ChatCompletion } from "openai/resources";
import type { AskOpenAIProps } from "./types";
import { OpenAIAdapter } from "./adapter";
import type { OpenAIAdapterConfig } from "./adapter";

export * from "./adapter";
export * from "./helpers";
export * from "./types";
export * from "./cache";

// Default instance for backward compatibility
// Uses environment variable if available
let defaultAdapter: OpenAIAdapter | null = null;

/**
 * Get or create the default OpenAI adapter instance
 * This maintains backward compatibility with the old API
 * @deprecated Use OpenAIAdapter class directly for better control
 */
const getDefaultAdapter = (): OpenAIAdapter => {
  if (!defaultAdapter) {
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error(
        "NEXT_PUBLIC_OPENAI_API_KEY environment variable is required",
      );
    }
    defaultAdapter = new OpenAIAdapter({ apiKey });
  }
  return defaultAdapter;
};

/**
 * Create a new OpenAI adapter instance with custom configuration
 * Recommended approach for new code
 */
export const createOpenAIAdapter = (
  config: OpenAIAdapterConfig,
): OpenAIAdapter => {
  return new OpenAIAdapter(config);
};

/**
 * @deprecated Use OpenAIAdapter instance methods instead
 * Maintained for backward compatibility
 */
export const askOpenAI = async (
  params: AskOpenAIProps,
): Promise<ChatCompletion.Choice[]> => {
  const adapter = getDefaultAdapter();
  return adapter.askOpenAI(params);
};

/**
 * @deprecated Use OpenAIAdapter instance methods instead
 * Maintained for backward compatibility
 */
export const getOpenAiChoiceContent = (
  choices: ChatCompletion.Choice[],
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

import { OpenAI } from "openai";
import type { ChatCompletion } from "openai/resources";
import type { AskOpenAIProps } from "./types";

export * from "./helpers";
export * from "./types";
export * from "./cache";

let openaiClient: OpenAI | null = null;

const getOpenAIClient = () => {
  if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
    throw new Error(
      "NEXT_PUBLIC_OPENAI_API_KEY environment variable is required",
    );
  }

  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });
  }

  return openaiClient;
};

export const askOpenAI = async ({
  prompt,
  messages,
  temperature = 0.7,
  max_tokens = 1600,
  model = "gpt-4o",
  ...rest
}: AskOpenAIProps): Promise<ChatCompletion.Choice[]> => {
  const openai = getOpenAIClient();
  const chatMessages = messages ?? [{ role: "user", content: prompt! }];

  try {
    const response = await openai.chat.completions.create({
      model,
      messages: chatMessages,
      temperature,
      max_completion_tokens: max_tokens,
      ...rest,
    });

    return response.choices;
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to generate content from OpenAI");
  }
};

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

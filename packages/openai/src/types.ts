import type { ChatCompletionCreateParamsNonStreaming } from 'openai/resources/chat/completions';

type BaseProps = Omit<ChatCompletionCreateParamsNonStreaming, 'messages' | 'model'> & {
  model?: ChatCompletionCreateParamsNonStreaming['model'];
};

export type AskOpenAIProps =
  | (BaseProps & { prompt: string; messages?: undefined })
  | (BaseProps & {
      prompt?: undefined;
      messages: ChatCompletionCreateParamsNonStreaming['messages'];
    });

export interface OpenAIError {
  message: string;
  type?: string;
  code?: string;
  statusCode?: number;
}

export interface OpenAIResponse {
  success: boolean;
  content?: string;
  error?: OpenAIError;
}


---
name: react-ai-features
description: Build AI-powered React features with standardized patterns for hooks, error handling, streaming, cancellation, and multi-step agents. Use when building AI chat, AI content generation, AI actions, or integrating LLM APIs into React.
---

# React AI Feature Development

Standardized patterns for building AI-powered features in React applications. Covers hook architecture, async patterns, error taxonomy, request cancellation, streaming readiness, and multi-step agent interfaces.

## Quick Start Workflow

1. Determine async pattern (one-shot vs async job vs streaming)
2. Confirm API endpoint
3. Scaffold the hook
4. Add the feature flag
5. Create translation/i18n keys
6. Wire analytics
7. Add error handling with typed errors
8. Add request cancellation
9. Run type check + lint

Steps 3-6 can execute in parallel (no data dependencies between them).

## Hook Pattern

Every AI operation gets a dedicated hook using `useMutation` from `@tanstack/react-query`. The hook is a thin typed wrapper — business logic lives in the component.

### One-Shot Mutations

```ts
export const useMyAiFeature = ({
  projectId,
  onSuccess,
  onError,
}: {
  projectId: number;
  onSuccess?: (data: ResponseType) => void;
  onError?: (error: ApiError) => void;
}) => {
  return useMutation<ResponseType, ApiError, ParamsType>({
    mutationFn: async (params) => {
      const response = await request({
        url: `projects/${projectId}/ai_feature`,
        method: 'post',
        data: params,
      });
      return response.data;
    },
    onSuccess,
    onError,
  });
};
```

**Rules**:
- `onError` always receives the typed error — never `onError?: () => void`
- Hooks do not call `toast`, log to console, or set loading state
- Hooks that update cached entities call `queryClient.setQueryData` or `invalidateQueries`

### Async Job Mutations (WebSocket Completion)

For features triggering background jobs, the hook fires the job and returns the job ID. The component handles the WebSocket subscription with a timeout fallback:

```tsx
const AI_JOB_TIMEOUT_MS = 15_000;
const pendingJobIdRef = useRef<number | null>(null);
const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

const handleWsEvent = (data: { id: number; status: string }) => {
  if (data.id !== pendingJobIdRef.current) return;
  clearTimeout(timeoutRef.current);
  pendingJobIdRef.current = null;
  if (data.status === 'completed') { /* navigate or refetch */ }
  else { toast.error(translate('error')) }
};
```

## Request Cancellation

Every AI hook must expose a `stop()` function:

```ts
export const useMyAiFeature = (options: Options) => {
  const abortControllerRef = useRef<AbortController | null>(null);

  const mutation = useMutation<ResponseType, ApiError, ParamsType>({
    mutationFn: async (params) => {
      abortControllerRef.current = new AbortController();
      const response = await request({
        url: 'ai_feature',
        method: 'post',
        data: params,
        signal: abortControllerRef.current.signal,
      });
      return response.data;
    },
    onError: (error) => {
      if (error.name === 'CanceledError') return;
      options.onError?.(error);
    },
  });

  const stop = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
  }, []);

  useEffect(() => () => { abortControllerRef.current?.abort(); }, []);

  return { ...mutation, stop };
};
```

Chat interfaces should wire `stop()` to a visible "Stop generating" button.

## Typed AI Error Taxonomy

Create AI-specific error types the UI can branch on:

```ts
type AiErrorCode =
  | 'quota_exceeded' | 'model_unavailable' | 'content_filtered'
  | 'timeout' | 'rate_limited' | 'invalid_input'
  | 'generation_failed' | 'unknown';

type AiError = {
  code: AiErrorCode;
  message: string;
  isRetryable: boolean;
  original?: ApiError;
};
```

Map errors to UX: `quota_exceeded` → paywall modal, `rate_limited` → toast with retry, `content_filtered` → inline message, `timeout` → toast + reset loading.

## Shared Types

AI-specific types live in a central `types.ts` file, not inline in components:

```ts
type AiMessagePart =
  | { type: 'text'; text: string; state?: 'streaming' | 'done' }
  | { type: 'tool-call'; toolCallId: string; toolName: string; input: unknown; state: 'pending' | 'complete' | 'error' }
  | { type: 'error'; text: string };

type AiMessage = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  parts: AiMessagePart[];
  createdAt?: Date;
};

type AiRequestStatus = 'idle' | 'streaming' | 'complete' | 'error' | 'aborted';
```

## Loading States

| Pattern | Loading UX |
|---------|-----------|
| One-shot (chat, insert) | Disable trigger; show inline indicator |
| Async job (new entity) | Modal overlay with translated message |

Never use skeleton screens for AI loading (content shape unknown). Disable all inputs while request is in flight.

## Alignment Scorecard

Review each AI feature against these criteria before merging:

1. **Context selection**: Context assembled in a typed object, not scattered `useState`
2. **Separation**: Context prep and response handling are in distinct functions/hooks
3. **Parallelism**: Independent sub-tasks execute in parallel (no unnecessary sequential `await`)
4. **Reversibility**: User can undo/rollback AI output
5. **Standard types**: Inputs/outputs use shared type definitions
6. **Ordering**: Conversation history carries explicit position or timestamp
7. **Scope**: No cross-company/cross-project data leakage; feature flags gate access
8. **DAG workflow**: Steps that can run concurrently do run concurrently

For full architectural principles and streaming patterns, see [references/architecture.md](references/architecture.md).

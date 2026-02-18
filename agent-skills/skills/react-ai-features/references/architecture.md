# AI Feature Architecture Reference

## Transformer-Informed Principles

These architectural principles map concepts from the Transformer architecture to frontend AI feature design.

### Self-Attention → Context Selection

Agents should receive precisely the context they need. Each AI call should declare its context dependencies upfront:

```ts
type AiContext<TParams> = {
  params: TParams;
  conversationHistory?: ConversationMessage[];
  selectedAssetIds?: number[];
  pageSnapshot?: string;
  metadata?: {
    projectId: number;
    pageId?: number;
    userId: number;
    companyId: number;
  };
};
```

### Encoder-Decoder → Input/Output Separation

- **Encoder** = gathering and normalizing context (user input, state, conversation history, images, permissions, quotas)
- **Decoder** = AI model generating output via API + frontend transforming response into UI actions

### Multi-Head Attention → Parallel Sub-Tasks

For features needing multiple independent AI operations, fire parallel mutations and merge results:

```tsx
const useMultiHeadAi = ({
  heads,
  onAllSettled,
}: {
  heads: UseMutationResult[];
  onAllSettled: (results: PromiseSettledResult[]) => void;
}) => {
  const fireAll = async (params: unknown[]) => {
    const results = await Promise.allSettled(
      heads.map((head, i) => head.mutateAsync(params[i])),
    );
    onAllSettled(results);
  };
  const isPending = heads.some((h) => h.isPending);
  return { fireAll, isPending };
};
```

Rules:
- Each head is an independent `useMutation` hook
- Use `Promise.allSettled` (not `Promise.all`) so one failure doesn't cancel others
- Merge step handles partial failures gracefully

### Residual Connections → Reversibility

Never discard original user input/content when applying AI output.

**Reversibility tiers**:

| Tier | Description |
|------|-------------|
| Tier 1 — Full undo | Editor state snapshot before/after; one-click undo |
| Tier 2 — Soft delete | AI content marked, not committed, until user confirms |
| Tier 3 — Navigation rollback | AI creates new entity; user can delete from destination |

Snapshot-based rollback for editor mutations:

```ts
const snapshotRef = useRef<JSONContent | null>(null);

const applyAiChanges = (editor: Editor, newContent: JSONContent) => {
  snapshotRef.current = editor.getJSON();
  editor.commands.setContent(newContent);
};

const undoAiChanges = (editor: Editor) => {
  if (snapshotRef.current) {
    editor.commands.setContent(snapshotRef.current);
    snapshotRef.current = null;
  }
};
```

### Layer Normalization → Standardized Interfaces

Every component in the AI pipeline should accept and produce standardized typed shapes. Types come from a central `types.ts` file, not inline in components.

### Masking → Scope Restrictions

Enforce scope boundaries so agents never access data outside their permitted context:
- Guard WebSocket events against other entities' IDs
- Feature flags gate capabilities
- Agents declare required scope (project-level, page-level, company-level)

## Streaming Pattern (SSE)

When the backend supports SSE:

```
POST /api/ai_chat (Accept: text/event-stream)
  → SSE chunks: { type: 'text', text: '...' }
  → SSE chunks: { type: 'finish', finishReason: 'stop' }
  → Progressive rendering in chat UI
```

Before backend SSE support, adopt the message state model:

```ts
type AiRequestStatus = 'idle' | 'streaming' | 'complete' | 'error' | 'aborted';
```

## Transport Abstraction

Decouple hooks from the network layer:

```ts
type AiTransport = {
  send: <T>(options: {
    url: string;
    method: 'post' | 'get';
    data?: unknown;
    signal?: AbortSignal;
  }) => Promise<T>;
};
```

Benefits: testability (mock transport), streaming migration (swap transport), cancellation (`signal` threaded through all requests).

## Agent Interface

For multi-step features with tool calling:

```ts
type AiAgentStep = {
  id: string;
  type: 'text' | 'tool-call' | 'tool-result';
  content: unknown;
  timestamp: number;
};

type AiFinishReason = 'stop' | 'length' | 'content-filter' | 'tool-calls' | 'error' | 'aborted';

type AiAgent = {
  id: string;
  send: (options: {
    messages: AiMessage[];
    signal?: AbortSignal;
    onStep?: (step: AiAgentStep) => void;
    onFinish?: (result: { messages: AiMessage[]; finishReason: AiFinishReason }) => void;
    onError?: (error: AiError) => void;
  }) => Promise<void>;
  stop: () => void;
};
```

Use `useMutation` for simple one-shot calls. Use the agent pattern for multi-turn tool use or multi-step reasoning.

## Workflow Dependency Graphs

Model agent workflows as DAGs, not linear lists:

```ts
type WorkflowStep = {
  id: string;
  dependsOn: string[];
  execute: (context: WorkflowContext) => Promise<StepResult>;
};
```

Steps with no data dependency must not depend on each other. Use `Promise.allSettled` at each wavefront.

## Error Taxonomy Implementation

```ts
const parseAiError = (error: ApiError): AiError => {
  const status = error.response?.status;
  const serverCode = error.response?.data?.error?.code;

  if (status === 429 || serverCode === 'rate_limited')
    return { code: 'rate_limited', message: 'Rate limited', isRetryable: true, original: error };
  if (status === 402 || serverCode === 'quota_exceeded')
    return { code: 'quota_exceeded', message: 'Quota exceeded', isRetryable: false, original: error };
  if (status === 503 || serverCode === 'model_unavailable')
    return { code: 'model_unavailable', message: 'Model unavailable', isRetryable: true, original: error };
  if (serverCode === 'content_filtered')
    return { code: 'content_filtered', message: 'Content filtered', isRetryable: false, original: error };
  return { code: 'unknown', message: 'An error occurred', isRetryable: false, original: error };
};
```

| Error Code | UX Action |
|-----------|-----------|
| `quota_exceeded` | Open paywall modal |
| `rate_limited` | Toast with retry-after; auto-retry if retryable |
| `model_unavailable` | Toast; suggest trying again |
| `content_filtered` | Inline assistant message |
| `timeout` | Toast; reset loading state |
| `generation_failed` | Inline assistant message with translated error |
| `unknown` | Toast with generic error |

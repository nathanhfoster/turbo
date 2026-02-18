---
name: graphql-codegen-migration
description: Migrate GraphQL operations to TypeScript with generated types, custom hooks, and MSW test handlers. Use when migrating GraphQL queries or mutations to typed hooks, running graphql codegen, or creating typed GraphQL wrappers.
---

# GraphQL Codegen Migration

Migrates **one GraphQL operation at a time** from legacy patterns to a standardized TypeScript architecture with generated types, custom hooks, and MSW test handlers.

## Workflow

### 1. Identify the Operation

Accept a file path (`.gql.ts`, `.graphql.ts`, `.tsx`, `.jsx`, `.ts`, `.js`) and choose ONE query or mutation to migrate. Fragments are migrated as needed to support the primary operation.

### 2. Create Feature Folder

Target: `data/graphql/<feature-name>/`

```
data/graphql/<feature-name>/
├── queries.gql.ts
├── mutations.gql.ts
├── fragments.gql.ts
└── use<OperationName>.ts
```

### 3. Copy and Organize

**COPY** (don't move) the chosen operation and its required fragments into the feature folder.

**Remove suffixes** from operation names to avoid double suffixes in generated types:
- `FAVORITED_STATUS_QUERY` → `FAVORITED_STATUS`
- `CREATE_FAVORITE_MUTATION` → `CREATE_FAVORITE`
- `PROJECT_LABEL_FRAGMENT` → `PROJECT_LABEL`

**CRITICAL: Update all fragment spread references** after renaming (e.g., `...CommentFragment` → `...Comment`). Search the entire codebase for old fragment names.

### 4. Run Codegen

```bash
yarn graphql:codegen
```

Confirm types in `data/graphql/operations.types.ts` and mock handlers in `__tests__/mocks/handlers/graphql/generated.ts`.

### 5. Create the Hook

Place in `data/graphql/<feature-name>/use<OperationName>.ts`.

**For existing JS hooks**: Copy line-for-line, convert to TypeScript, preserve all logic. Use named exports.

**For missing hooks** (operations used directly in components): Create minimal typed wrappers:

```ts
export const useCreateLabel = () => {
  return useMutation<CreateLabelMutation, CreateLabelMutationVariables>(CREATE_LABEL);
};
```

Add options parameter only when component usage requires it (`onCompleted`, `onError`, `update`, etc.):

```ts
export const useCreateLabel = (
  options?: Pick<
    MutationHookOptions<CreateLabelMutation, CreateLabelMutationVariables>,
    'onCompleted' | 'onError' | 'update'
  >,
) => {
  return useMutation<CreateLabelMutation, CreateLabelMutationVariables>(CREATE_LABEL, options);
};
```

### 6. Update Component Imports

- Update imports for the **single migrated operation only**
- Preserve import aliases
- For legacy Apollo `<Query>`/`<Mutation>` components: only update the import path, add TODO comment, do NOT refactor to hooks
- For inline GraphQL operations: refactor to use the new hook

### 7. Type the Hook

- Import generated types from `data/graphql/operations.types.ts`
- Prefer type inference over explicit return type annotations
- Derive custom types from operation types (not manual definitions):
  ```ts
  type CustomItem = GetExampleQuery['viewer']['items']['edges'][number]['node'];
  ```
- Check for `any` types in return values; add explicit annotations if needed

### 8. Create Test Handler

Use **generated mock handler functions** from `__tests__/mocks/handlers/graphql/generated.ts`. Define mock data **inline** within handlers (no separate mock data files):

```ts
import { type GraphQLHandler, HttpResponse } from 'msw';
import { mockExampleQuery } from './generated';

export const exampleHandlers: GraphQLHandler[] = [
  mockExampleQuery(() => {
    return HttpResponse.json({
      data: {
        exampleQuery: {
          __typename: 'ExamplePayload',
          id: 'example-id',
          name: 'Example Name',
        },
      },
    });
  }),
];
```

Register in `__tests__/mocks/handlers/index.ts`.

### 9. Verify

```bash
yarn tsc
yarn eslint <modified-files>
yarn prettier --write <modified-files>
```

### 10. Suggest Next Steps

- Suggest next migration target (same file or same feature area)
- Suggest TypeScript migration for consuming `.jsx` components
- Suggest writing component tests with the new MSW handlers

## TypeScript Rules

- Avoid `any` — always use proper types
- Prefer `type` over `interface`
- Prefer type inference; only add explicit annotations when needed
- Use `Pick`, `Omit`, and union/intersection to compose types
- Derive types from generated operation types, not manual definitions
- Use named exports, not default exports

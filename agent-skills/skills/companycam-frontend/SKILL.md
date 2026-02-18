---
name: companycam-frontend
description: CompanyCam frontend development conventions for React with TypeScript, styled-components, TanStack Query, Apollo Client, MSW testing, and Vitest. Use when working on CompanyCam frontend code, writing React components, creating hooks, or writing frontend tests.
---

# CompanyCam Frontend Development

React + TypeScript conventions and testing patterns for the CompanyCam frontend.

## TypeScript

- Prefer TypeScript over JavaScript (`.tsx` for components, `.ts` for everything else)
- Avoid `any` — always use proper types
- Prefer `type` over `interface`
- Prefer explicit type annotations over type casting (`const value: Type =` instead of `as Type`)
- Use `Pick`, `Omit`, union/intersection types to compose from existing types
- Derive types from libraries (Apollo, TanStack Query) rather than manually recreating them

After creating or updating files:
```bash
yarn lint:check
yarn tsc --noEmit --skipLibCheck
```

### Type Derivation

```ts
// Apollo mutation hooks
type HookOptions = Pick<MutationHookOptions<MutationType, VariablesType>, 'onCompleted' | 'update' | 'refetchQueries'>;

// Apollo query hooks  
type HookOptions = Pick<QueryHookOptions<QueryType, VariablesType>, 'onCompleted' | 'onError' | 'fetchPolicy'>;
```

Always import types from generated operation types or Apollo Client when available.

## Component Patterns

- Prefer named exports over default exports
- Avoid barrel files that cut across concerns

```tsx
import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

type ExampleProps = {
  title: string;
  onSubmit: (value: string) => void;
};

export const Example = ({ title, onSubmit }: ExampleProps) => {
  const [value, setValue] = useState('');
  return (
    <Container>
      <h2>{title}</h2>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={() => onSubmit(value)}>Submit</button>
    </Container>
  );
};
```

## Styling (styled-components)

```tsx
// #region styled-components
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;
// #endregion
```

- Use semantic names (`Container`, `Header`, `Button`)
- Co-locate styles with components
- Define styled components before they're used

## State Management

- `@tanstack/react-query` for v3 REST API
- `@apollo/client` for GraphQL API

### TanStack Query Example

```ts
import { useQuery } from '@tanstack/react-query';
import { request, type V3ApiError, type V3ApiSuccessData } from 'services/v3ApiClient';
import type { ExampleData } from 'data/v3/data-contracts';

type GetExampleDataResponse = V3ApiSuccessData<ExampleData>;

export const useGetExampleData = (id: string) => {
  return useQuery<GetExampleDataResponse, V3ApiError>({
    queryKey: ['ExampleData'],
    queryFn: async () => {
      const response = await request({ url: `example_data/${id}` });
      return response.data;
    },
  });
};
```

## Feature Flags

Use Amplitude via `services/featureFlagManager`. Define flags in `constants/featureFlags.ts` with `LD_` prefix. Always provide a default fallback value using `??`.

## Testing

Use Vitest + `@testing-library/react` + MSW. Write tests in TypeScript. Place test files next to the modules they test.

- Prefer `@testing-library/user-event` over `fireEvent`
- Don't start `it()` descriptions with "should"
- Test loading, happy path, empty, and error states

### MSW Pattern

Intercept network requests with MSW instead of mocking hooks directly. Happy path handlers go in the global handler module; override for other scenarios:

```tsx
import { screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { renderWithProviders } from 'javascripts/__tests__/support/helper';
import { server } from 'javascripts/__tests__/mocks/server';

describe('<Example />', () => {
  it('renders happy path UI', async () => {
    renderWithProviders(<Example />);
    expect(await screen.findByTestId('example__happy-path')).toBeInTheDocument();
  });

  it('renders error UI', async () => {
    server.use(http.get('/v3/example', () => HttpResponse.error()));
    renderWithProviders(<Example />);
    expect(await screen.findByText('Uh Oh!')).toBeInTheDocument();
  });
});
```

### LaunchDarkly Mocking

```tsx
import { mockFlags, resetLDMocks } from 'vitest-launchdarkly-mock';

afterEach(() => resetLDMocks());

it('renders new UI when flag is true', () => {
  mockFlags({ [LD_NEW_UI_FLAG]: true });
  renderWithProviders(<Component />);
  expect(screen.getByTestId('new-ui')).toBeInTheDocument();
});
```

### Feature Access Mocking

Use `setMockFeatures` for billing/plan features (not LaunchDarkly flags). All features accessible by default; mock is auto-reset before each test:

```tsx
import { setMockFeatures, renderWithProviders } from 'javascripts/__tests__/support/helper';

it('disables option when feature not accessible', async () => {
  setMockFeatures('TEMPLATES', { canAccess: false });
  renderWithProviders(<Component />);
  expect(screen.getByText(/From Templates/i)).toHaveAttribute('disabled');
});
```

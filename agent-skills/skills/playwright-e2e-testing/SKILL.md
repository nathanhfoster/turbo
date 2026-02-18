---
name: playwright-e2e-testing
description: Write, debug, and plan Playwright E2E tests following best practices for test structure, element selection, and helper organization. Use when writing Playwright tests, debugging failing E2E tests, creating test plans, or setting up E2E test infrastructure.
---

# Playwright E2E Testing

Patterns and best practices for writing reliable Playwright end-to-end tests.

## Test Directory Structure

Organize by feature with co-located helpers:

```
e2e/
├── auth/
│   └── helpers.ts
├── task-lists/
│   ├── helpers.ts
│   └── section-collapse.spec.ts
├── project-groups/
│   ├── helpers.ts
│   └── access.spec.ts
└── utils/
    └── helpers.ts
```

Test files within a feature directory do NOT need the feature name prefix — the directory provides namespace context.

## Test Helpers

Export a single namespaced object per feature:

```typescript
// e2e/auth/helpers.ts
export const auth = {
  login: async (page: Page, email: string, password: string) => { ... },
  loginAsDevAdmin: async (page: Page) => { ... },
  loginWithPlan: async (page: Page, plan: string, role: UserRole) => { ... },
};

// e2e/task-lists/helpers.ts
export const taskLists = {
  navigateToChecklist: async (page: Page, projectId: number, todoId: number) => { ... },
  createSection: async (page: Page, name: string) => { ... },
};
```

Usage:
```typescript
import { auth } from '../auth/helpers';
import { taskLists } from './helpers';

test('collapses section', async ({ page }) => {
  await auth.loginAsDevAdmin(page);
  await taskLists.navigateToChecklist(page, 101, 104);
});
```

## Element Selection Strategy

1. **Best**: `data-testid` with `page.getByTestId('test-id')`
2. **Partial match**: `page.getByTestId(/partial-match/)`
3. **Fallback**: `page.getByRole('button', { name: /text/i })`
4. **Never**: `page.locator('[data-testid="..."]')` — use `getByTestId` instead

## Test Naming

Use concise, present-tense names without "should":

```typescript
// Good
test('collapses section when clicking button', ...)
test('redirects unauthorized users to projects', ...)

// Bad
test('should be able to collapse section when clicking button', ...)
```

## Test Organization and Nesting

**Nesting = common preconditions only, never just for grouping.**

```typescript
// Good: "Always" catch-all group first (no shared setup)
test.describe('Always', () => {
  test('admin can create sections', async ({ page }) => {
    await auth.loginAsDevAdmin(page);
    // test logic
  });
});

// Good: Conditional describe with beforeEach
test.describe('When section exists', () => {
  test.beforeEach(async ({ page }) => {
    await auth.loginAsDevAdmin(page);
    await taskLists.createSection(page, 'Test Section');
  });
  test('collapses on click', async ({ page }) => { ... });
});
```

Use "When x, y, z" naming for conditional describe blocks.

## URL Assertions

Always use a stable URL assertion helper that waits for page idle before checking:

```typescript
// Good
await utils.assertStableURL(page, /\/checklists/);

// Bad — doesn't wait for redirects
await expect(page).toHaveURL(/\/checklists/);
```

## Configuration

- Base URL in `playwright.config.ts` — never hardcode URLs
- Always use relative paths in `page.goto()`
- Environment variables in `.env.test` (gitignored)
- Every test logs in fresh — no persistent auth state

## Best Practices

- Prefer `page.waitForLoadState('domcontentloaded')` over `networkidle`
- Use `page.waitForTimeout()` sparingly — only for animations
- Use `expect().toBeVisible()` which has built-in waiting
- Run tests: `yarn test:e2e:ui` (visual), `yarn test:e2e:debug` (step-through)

## Agent Patterns

For automated test workflows, see specialized agent references:

- [Test Planner](references/test-planner.md) — create comprehensive test plans
- [Test Generator](references/test-generator.md) — generate tests from plans
- [Test Healer](references/test-healer.md) — debug and fix failing tests

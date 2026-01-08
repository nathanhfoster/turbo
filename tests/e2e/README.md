# E2E Tests

This directory contains unified end-to-end tests for all applications in the monorepo using Playwright.

## Structure

```
tests/e2e/
├── main/          # Tests for the main application
│   └── navbar.spec.ts
├── astralpoet/    # Tests for the astralpoet application
│   └── entry-view.spec.ts
└── README.md      # This file
```

## Setup

Install Playwright browsers:

```bash
pnpm test:e2e:install
```

## Running Tests

### Run all tests

```bash
pnpm test:e2e
```

### Run tests in UI mode (interactive)

```bash
pnpm test:e2e:ui
```

### Run tests in headed mode (see browser)

```bash
pnpm test:e2e:headed
```

### Run tests in debug mode

```bash
pnpm test:e2e:debug
```

### Run specific test file

```bash
pnpm exec playwright test tests/e2e/main/navbar.spec.ts
```

### Run tests for specific browser

```bash
pnpm exec playwright test --project=chromium
```

## Configuration

Tests are configured in `playwright.config.ts` at the root of the monorepo.

The test server automatically starts the main dev server on port 3000 before running tests. The main app proxies requests to other apps (astralpoet, resume) as needed.

## Environment Variables

- `PLAYWRIGHT_TEST_BASE_URL` - Override the base URL for tests (default: `http://localhost:3000`)
- `CI` - Set to `true` in CI environments for optimized test runs

## CI/CD

In CI environments:

- Tests run with retries (2 retries on failure)
- Tests run sequentially (1 worker) for reliability
- Test reports are uploaded as artifacts
- Builds and PRs will fail if tests don't pass

## Test Structure

### Main App Tests

- `navbar.spec.ts` - Tests for navbar functionality including:
  - Top navbar visibility and navigation
  - Bottom navbar on mobile devices
  - Responsive behavior
  - Accessibility
  - Hamburger menu functionality
  - Scroll behavior

### Astralpoet App Tests

- `entry-view.spec.ts` - Tests for entry view functionality including:
  - Entry loading in all three panes (calendar, editor, list)
  - Calendar date selection
  - Entry list interaction
  - Mobile/desktop responsive behavior

## Best Practices

1. **Test Isolation**: Each test should be independent and not rely on other tests
2. **Clean State**: Use `beforeEach` hooks to set up clean test state
3. **Wait Strategies**: Prefer waiting for specific conditions over fixed timeouts
4. **Selectors**: Use semantic selectors (roles, labels) over CSS selectors when possible
5. **Mobile Testing**: Test responsive behavior on both desktop and mobile viewports

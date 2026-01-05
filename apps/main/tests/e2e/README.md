# E2E Tests

This directory contains end-to-end tests for the main application using Playwright.

## Setup

Install Playwright browsers:

```bash
pnpm exec playwright install
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
pnpm exec playwright test navbar.spec.ts
```

### Run tests for specific browser

```bash
pnpm exec playwright test --project=chromium
```

## Test Structure

- `navbar.spec.ts` - Tests for navbar functionality including:
  - Top navbar visibility and navigation
  - Bottom navbar on mobile devices
  - Responsive behavior
  - Accessibility
  - Hamburger menu functionality

## Configuration

Tests are configured in `playwright.config.ts` at the root of the app directory.

The test server automatically starts the dev server on port 3000 before running tests.

## Environment Variables

- `PLAYWRIGHT_TEST_BASE_URL` - Override the base URL for tests (default: `http://localhost:3000`)
- `CI` - Set to `true` in CI environments for optimized test runs

# Testing Guide

This monorepo uses Turbo to run tests across all packages and apps. Tests are organized into unit tests and e2e (end-to-end) tests.

## Running Tests

### First Time Setup

Before running e2e tests, you need to install Playwright browsers:

```bash
cd apps/main
pnpm test:e2e:install
```

Or from the root:
```bash
cd turbo/apps/main && pnpm test:e2e:install
```

### Run All Tests (Unit + E2E)

```bash
pnpm test
```

This runs all tests (both unit and e2e) across all packages and apps that have test scripts configured.

### Run Only Unit Tests

```bash
pnpm test:unit
```

This runs unit tests in packages that have unit test configurations:
- `@nathanhfoster/auth` - Uses Jest
- `@nathanhfoster/resurrection` - Uses Vitest

### Run Only E2E Tests

```bash
pnpm test:e2e
```

This runs end-to-end tests in apps that have e2e test configurations:
- `@nathanhfoster/main` - Uses Playwright

## Test Configuration by Package

### Apps

#### `apps/main`
- **E2E Tests**: Playwright
- **Location**: `tests/e2e/`
- **Commands**:
  - `pnpm test` - Run all e2e tests
  - `pnpm test:e2e:ui` - Run tests in UI mode
  - `pnpm test:e2e:headed` - Run tests with browser visible
  - `pnpm test:e2e:debug` - Run tests in debug mode

### Packages

#### `packages/auth`
- **Unit Tests**: Jest
- **Location**: `tests/` directory
- **Command**: `pnpm test` or `pnpm test:unit`

#### `packages/resurrection`
- **Unit Tests**: Vitest
- **Location**: `src/**/__tests__/`
- **Command**: `pnpm test` or `pnpm test:unit`
- **Coverage**: `pnpm test:coverage`

## Turbo Configuration

The test tasks in `turbo.json` are configured as follows:

- `test` - Runs all tests (unit + e2e)
- `test:unit` - Runs only unit tests
- `test:e2e` - Runs only e2e tests (caching disabled for reliability)

## Adding Tests to a New Package

1. Add a `test` script to your `package.json`:
   ```json
   {
     "scripts": {
       "test": "your-test-runner",
       "test:unit": "your-test-runner"
     }
   }
   ```

2. The test will automatically be included when running `pnpm test` or `pnpm test:unit` from the root.

## CI/CD

In CI environments, tests run with:
- Caching enabled for unit tests
- Caching disabled for e2e tests (for reliability)
- Parallel execution where possible

## Test Outputs

- **Unit Tests**: Coverage reports in `coverage/` directories
- **E2E Tests**: Test results in `test-results/` and reports in `playwright-report/` directories


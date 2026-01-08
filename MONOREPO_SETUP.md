# Monorepo Setup & Quality Assurance

This document outlines the quality assurance and CI/CD setup for this monorepo.

## Overview

This monorepo is configured with world-class quality standards including:

- **Strict TypeScript** configuration with enhanced type checking
- **Comprehensive linting** with ESLint
- **Unified E2E testing** at the monorepo root level
- **Automated CI/CD** with GitHub Actions
- **Build-time validation** that prevents deployments with failing checks

## Quality Gates

### Pre-Build Checks

All builds are gated by the following checks (configured in `turbo.json`):

1. **Lint** - ESLint checks across all packages
2. **Type Check** - TypeScript compilation without emit
3. **Tests** - Unit and E2E tests

Builds will **fail** if any of these checks fail.

### TypeScript Configuration

Enhanced strictness includes:

- `strict: true` - All strict type checking options enabled
- `noUncheckedIndexedAccess: true` - Array/object access requires null checks
- `noUnusedLocals: true` - Unused local variables are errors
- `noUnusedParameters: true` - Unused parameters are errors
- `noFallthroughCasesInSwitch: true` - Switch cases must have breaks
- `noImplicitReturns: true` - Functions must explicitly return
- `noPropertyAccessFromIndexSignature: true` - Require bracket notation for index signatures
- `forceConsistentCasingInFileNames: true` - Enforce consistent file naming

## Testing Strategy

### E2E Tests (Monorepo Root)

E2E tests are unified at the monorepo root level (`tests/e2e/`) for better organization and shared configuration.

**Location**: `tests/e2e/`

- `main/` - Tests for the main application
- `astralpoet/` - Tests for the astralpoet application

**Running E2E Tests**:

```bash
# Run all e2e tests
pnpm test:e2e

# Interactive UI mode
pnpm test:e2e:ui

# Headed mode (see browser)
pnpm test:e2e:headed

# Debug mode
pnpm test:e2e:debug

# Install Playwright browsers
pnpm test:e2e:install
```

### Unit Tests

Unit tests remain at the package/app level and can be run with:

```bash
# Run all unit tests
pnpm test:unit

# Run tests for specific package
cd apps/astralpoet && pnpm test
```

## CI/CD Pipeline

### GitHub Actions

The CI pipeline (`.github/workflows/ci.yml`) runs on:

- Pull requests to any branch
- Pushes to `main` or `master`

**Pipeline Stages**:

1. **Lint & Type Check** - Runs ESLint and TypeScript checks
2. **Unit Tests** - Runs all unit tests
3. **E2E Tests** - Runs Playwright e2e tests
4. **Build** - Builds all packages (only after lint/type-check pass)
5. **All Checks** - Final validation that all stages passed

**Failure Behavior**: If any stage fails, the PR check fails and the PR cannot be merged.

### Vercel Deployments

Vercel builds are configured to:

1. Run `pnpm lint` before build
2. Run `pnpm check-types` before build
3. Build the application

**Note**: E2E tests run in GitHub Actions, not in Vercel builds, as Vercel builds don't have a running server for e2e tests.

## Scripts Reference

### Root Level Scripts

```bash
# Development
pnpm dev              # Start all apps in dev mode

# Quality Checks
pnpm lint             # Run ESLint on all packages
pnpm lint:fix          # Run ESLint with auto-fix
pnpm check-types       # Run TypeScript type checking
pnpm format            # Format code with Prettier
pnpm format:check      # Check code formatting

# Testing
pnpm test             # Run all tests (unit + e2e)
pnpm test:unit         # Run unit tests only
pnpm test:e2e          # Run e2e tests (from root)
pnpm test:e2e:ui       # Run e2e tests in UI mode
pnpm test:e2e:headed    # Run e2e tests in headed mode
pnpm test:e2e:debug     # Run e2e tests in debug mode

# Build
pnpm build            # Build all packages (includes lint + type-check)

# Validation
pnpm validate         # Run lint + type-check + e2e tests
pnpm ci               # Run all CI checks (lint + type-check + tests)
```

## Turbo Configuration

The `turbo.json` file defines task dependencies:

- **build** depends on: `^build`, `lint`, `check-types`
  - This ensures lint and type-check run before any build
- **lint** depends on: `^lint` (packages lint before apps)
- **check-types** depends on: `^check-types` (packages type-check before apps)
- **test:e2e** runs at root level, depends on `^build`

## Best Practices

1. **Always run checks locally before pushing**:

   ```bash
   pnpm validate
   ```

2. **Fix linting issues**:

   ```bash
   pnpm lint:fix
   ```

3. **Check types before committing**:

   ```bash
   pnpm check-types
   ```

4. **Run e2e tests locally** before pushing:

   ```bash
   pnpm test:e2e
   ```

5. **Use the CI script** to simulate CI locally:
   ```bash
   pnpm ci
   ```

## Troubleshooting

### Build Fails on Vercel

If a Vercel build fails:

1. Check the build logs for lint/type errors
2. Run `pnpm lint` and `pnpm check-types` locally
3. Fix any errors before pushing

### E2E Tests Fail in CI

If e2e tests fail in CI:

1. Check the GitHub Actions logs
2. Download the Playwright report artifact
3. Run tests locally: `pnpm test:e2e`
4. Check for flaky tests or timing issues

### Type Errors

If you see TypeScript errors:

1. Ensure you're using the shared TypeScript config
2. Check that `strict: true` is enabled
3. Fix type errors - they're required for builds to pass

## Migration Notes

### E2E Tests Migration

E2E tests were moved from app-level to monorepo root:

- **Before**: `apps/main/tests/e2e/` and `apps/astralpoet/tests/e2e/`
- **After**: `tests/e2e/main/` and `tests/e2e/astralpoet/`

The old test directories can be removed after confirming the new structure works.

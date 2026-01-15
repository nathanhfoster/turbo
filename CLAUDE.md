# CLAUDE.md

This file provides guidance to AI coding agents (Claude Code, Cursor, Copilot, etc.) when working with code in this repository.

## Repository Overview

A TypeScript/React monorepo managed by Turborepo and pnpm. Contains production applications, reusable packages, and AI agent skills.

## Project Structure

```
turbo/
  apps/                    # Application packages
  packages/                # Reusable library packages
  agent-skills/            # AI agent skills and guidelines
    skills/                # Individual skill definitions
    packages/              # Skill build tooling
  tests/                   # E2E tests (Playwright)
```

## Tech Stack

- **Package Manager**: pnpm 9.x
- **Build System**: Turborepo
- **Framework**: Next.js 16.x, React 19.x
- **Language**: TypeScript 5.9.x
- **Styling**: Tailwind CSS 4.x
- **Testing**: Vitest (unit), Playwright (E2E)
- **Linting**: ESLint 9.x with flat config

## Common Commands

```bash
# Development
pnpm dev                    # Start all apps in dev mode
pnpm build                  # Build all packages

# Testing
pnpm test:unit              # Run unit tests
pnpm test:e2e               # Run E2E tests
pnpm test                   # Run all tests

# Quality
pnpm lint                   # Lint all packages
pnpm check-types            # TypeScript type checking
pnpm format                 # Format with Prettier

# Maintenance
pnpm clean                  # Clean build artifacts
pnpm clean:all              # Deep clean including node_modules
```

## Package Naming

All workspace packages use the `@nathanhfoster/` namespace:
- `@nathanhfoster/ui` - UI components
- `@nathanhfoster/utils` - Utility functions
- `@nathanhfoster/react-hooks` - React hooks
- `@nathanhfoster/eslint-config` - ESLint configuration
- `@nathanhfoster/typescript-config` - TypeScript configuration

## Turborepo Tasks

The build pipeline ensures proper ordering:
- `build` depends on `lint` and `check-types`
- `test` depends on `^build` (builds dependencies first)
- `dev` runs without caching for live development

## Agent Skills

This monorepo includes AI agent skills in `agent-skills/`. Reference these when working on React/Next.js code:

### Available Skills

| Skill | When to Use |
|-------|-------------|
| `react-best-practices` | Writing, reviewing, or refactoring React/Next.js code |
| `web-design-guidelines` | UI code review, accessibility, UX patterns |

### Skill Files Location

```
agent-skills/skills/react-best-practices/
  SKILL.md              # Quick reference
  AGENTS.md             # Full guidelines (2000+ lines)
  rules/                # Individual rule files

agent-skills/skills/web-design-guidelines/
  SKILL.md              # Design guidelines
```

### React Performance Priority

When optimizing React code, follow this priority order:
1. **CRITICAL**: Eliminate waterfalls, optimize bundle size
2. **HIGH**: Server-side performance
3. **MEDIUM-HIGH**: Client-side data fetching
4. **MEDIUM**: Re-render optimization, rendering performance
5. **LOW-MEDIUM**: JavaScript micro-optimizations

## Code Patterns

### Imports

Prefer direct imports over barrel files:
```typescript
// Good
import Button from '@mui/material/Button'

// Avoid
import { Button } from '@mui/material'
```

### Component Structure

```typescript
// Server Component (default in Next.js App Router)
export default async function Page() {
  const data = await fetchData()
  return <div>{data}</div>
}

// Client Component (when needed)
'use client'
export function InteractiveComponent() {
  const [state, setState] = useState()
  return <button onClick={() => setState(v => !v)}>Toggle</button>
}
```

### State Updates

Use functional updates for state based on previous value:
```typescript
// Good - stable callback reference
setItems(curr => [...curr, newItem])

// Avoid - recreates callback, risk of stale closure
setItems([...items, newItem])
```

## Documentation

- `FRONTEND_ARCHITECTURE.md` - Detailed architecture guide
- `MONOREPO_SETUP.md` - Monorepo configuration
- `PROMPT_ENGINEERING.md` - AI prompt patterns
- `TESTING.md` - Testing strategy
- `DOCUMENTATION_STRATEGY.md` - Documentation approach

## Build Dependencies

Build order is managed by Turborepo:
1. `lint` and `check-types` run first
2. `build` runs after both pass
3. Tests run after build completes

## Environment Variables

Required for builds (see `turbo.json`):
- `NODE_ENV`
- App-specific URLs (`APPS_*`)
- VAPID keys for PWA

## Creating New Packages

1. Create directory in `packages/`
2. Add `package.json` with `@nathanhfoster/` namespace
3. Extend shared configs from `@nathanhfoster/typescript-config` and `@nathanhfoster/eslint-config`
4. Run `pnpm install` to link workspace dependencies

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About This Project

Resurrection is a lightweight React state management library that provides Redux-like patterns using React's Context API and hooks. It's built as an npm package with TypeScript support.

## Development Commands

- `pnpm build` - Build the library for distribution
- `pnpm test` - Run tests with Vitest in watch mode
- `pnpm test:coverage` - Run tests with coverage reporting
- `vitest run` - Run tests once without watch mode
- `vitest run --coverage` - Run tests once with coverage

## Key Architecture Components

### Core State Management Pattern

The library follows a predictable state flow similar to Redux:

1. **createSlice** - Creates reducers with typed actions using Immer for immutability
2. **createContextWithName** - Creates typed React contexts for state and dispatch
3. **Provider** - Wraps components to provide state and dispatch contexts
4. **connect** HOC - Redux-style component connection with optimized memoization

### Main Entry Points

- `src/index.ts` - Main export file that re-exports all public APIs
- `src/lib/index.ts` - Core library exports including types and components

### Key Files and Their Purpose

- `src/lib/utils/createSlice/index.ts` - Redux Toolkit-style slice creation with Immer
- `src/lib/utils/createContextWithName.ts` - Context factory with typed selectors/dispatch
- `src/lib/Provider/index.tsx` - Context provider with thunk support
- `src/lib/connect/index.tsx` - HOC for connecting components to context stores
- `src/lib/hooks/` - Custom hooks for state management (selectors, dispatch, utilities)

### Dependencies

- **immer** - Immutable state updates (peer dependency)
- **use-context-selector** - Optimized context selection (peer dependency)
- **react** - Core React library (peer dependency)

### Build Configuration

- Uses Vite for building with TypeScript declarations
- Outputs ES modules to `dist/` directory
- Preserves modules for tree-shaking optimization
- External dependencies are not bundled (React, Immer, etc.)

### Testing Setup

- Vitest with jsdom environment for React component testing
- Test files: `**/*.{test,spec}.{js,ts,jsx,tsx}` in `src/` or `tests/`
- Setup file: `vitest.setup.ts`
- Coverage output: `../../coverage/packages/resurrection`

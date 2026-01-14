# Turbo Monorepo

A modern, scalable monorepo built with Turborepo, Next.js, and TypeScript, following Clean Architecture and Feature-Sliced Design principles.

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ 
- **pnpm** 9.0.0+

### Installation

```bash
pnpm install
```

### Development

Run all apps in development mode:

```bash
pnpm dev
```

Run a specific app:

```bash
# Main app (portfolio & blog)
pnpm --filter main dev

# Resume builder app
pnpm --filter resume dev

# Astral Poet app
pnpm --filter astralpoet dev
```

### Building

Build all apps and packages:

```bash
pnpm build
```

Build a specific app:

```bash
pnpm --filter main build
```

## 📦 What's Inside?

### Apps

- **`apps/main`** - Portfolio & Consultancy App (Next.js 15, PWA)
  - Blog system with MDX support
  - Portfolio showcase
  - PWA with offline support
  
- **`apps/resume`** - AI Resume Builder (Next.js 16, PWA)
  - Resume management with AI assistance
  - Inline editing
  - IndexedDB persistence
  
- **`apps/astralpoet`** - Poetry/journaling app

### Packages

#### Cross-App Packages (Shared Across All Apps)

- **`@nathanhfoster/ui`** - Component library (Atomic Design)
  - Storybook-driven design system
  - Reusable atoms, molecules, organisms, templates
  
- **`@nathanhfoster/auth`** - Authentication package
  - Cross-app authentication
  - Email validation services
  
- **`@nathanhfoster/resurrection`** - State management
  - Redux-like state management
  - Hooks and utilities
  
- **`@nathanhfoster/pwa`** - PWA utilities
  - Service worker management
  - Device detection
  - Install prompts

#### Utility Packages

- **`@nathanhfoster/utils`** - Shared utilities
- **`@nathanhfoster/cookies`** - Cookie management
- **`@nathanhfoster/indexeddb`** - IndexedDB wrapper
- **`@nathanhfoster/openai`** - OpenAI integration
- **`@nathanhfoster/eslint-config`** - ESLint configurations
- **`@nathanhfoster/typescript-config`** - TypeScript configurations
- **`@nathanhfoster/tailwind`** - Tailwind CSS preset

## 🏗️ Architecture

This monorepo follows a unified architecture combining:

- **Feature-Sliced Design (FSD)** - Domain organization
- **Atomic Design** - UI component organization (in `packages/ui/`)
- **Container/Presentation Pattern** - State management separation
- **Clean Architecture** - Dependency flow and separation of concerns

### Key Principles

1. **Top-Down Dependency Flow** - Dependencies flow from packages → core → domains → UI
2. **Domain-Centric** - Business logic organized by domain
3. **Framework-Agnostic** - Core logic independent of Next.js
4. **Shared Packages** - Cross-app features in `packages/`
5. **App Isolation** - Each app is self-contained

📖 **Read the full architecture documentation:** [FRONTEND_ARCHITECTURE.md](./FRONTEND_ARCHITECTURE.md)

## 📚 Documentation

- **[FRONTEND_ARCHITECTURE.md](./FRONTEND_ARCHITECTURE.md)** - Complete architecture guide
- **[TESTING.md](./TESTING.md)** - Testing strategy and patterns
- **[DOCUMENTATION_STRATEGY.md](./DOCUMENTATION_STRATEGY.md)** - Documentation approach

### Package Documentation

- `packages/ui/README.md` - Component library usage
- `packages/auth/README.md` - Authentication setup
- `packages/resurrection/README.md` - State management
- `packages/pwa/README.md` - PWA utilities

### App Documentation

- `apps/main/README.md` - Main app documentation
- `apps/resume/README.md` - Resume builder documentation

## 🛠️ Development

### Monorepo Commands

```bash
# Install dependencies
pnpm install

# Run all apps in dev mode
pnpm dev

# Build all apps
pnpm build

# Run linting
pnpm lint

# Type check
pnpm check-types

# Run tests
pnpm test

# Run E2E tests
pnpm test:e2e
```

### Turbo Commands

```bash
# Build with filters
pnpm turbo build --filter=main

# Run tasks in parallel
pnpm turbo run lint build

# Clear cache
pnpm turbo clean
```

## 🧪 Testing

- **Unit Tests** - Jest/Vitest with Testing Library
- **E2E Tests** - Playwright
- **Component Tests** - Storybook + Vitest

See [TESTING.md](./TESTING.md) for detailed testing strategy.

## 📦 Package Management

This monorepo uses:

- **pnpm** - Fast, disk space efficient package manager
- **Turborepo** - High-performance build system
- **Workspaces** - Shared dependencies and code

### Adding a New Package

1. Create package in `packages/[name]/`
2. Add to workspace in `pnpm-workspace.yaml`
3. Update `turbo.json` if needed
4. Create `README.md` for public APIs

### Adding a New App

1. Create app in `apps/[name]/`
2. Add to workspace in `pnpm-workspace.yaml`
3. Update `turbo.json` if needed
4. Create `README.md` with app documentation

## 🔧 Configuration

### Environment Variables

Each app has its own `.env.local` file. See app-specific READMEs for required variables.

### TypeScript

Shared TypeScript configurations in `packages/typescript-config/`:
- `base.json` - Base configuration
- `nextjs.json` - Next.js apps
- `react-library.json` - React libraries

### ESLint

Shared ESLint configurations in `packages/eslint-config/`:
- `base.js` - Base rules
- `next.js` - Next.js specific
- `react-internal.js` - React internal rules

## 🚢 Deployment

### Multi-Zone Architecture

This monorepo supports multi-zone deployment:
- Main app at root domain
- Sub-apps at subpaths (e.g., `/apps/resume`)

See [FRONTEND_ARCHITECTURE.md](./FRONTEND_ARCHITECTURE.md) for multi-zone configuration.

### Vercel Deployment

Each app can be deployed independently to Vercel:
- Configure build settings per app
- Set environment variables
- Use Turbo filters for builds

## 🤝 Contributing

1. Follow the architecture patterns in [FRONTEND_ARCHITECTURE.md](./FRONTEND_ARCHITECTURE.md)
2. Use the code review checklist
3. Write tests for new features
4. Update documentation as needed

## 📝 License

[Add your license here]

## 🔗 Useful Links

- [Turborepo Documentation](https://turborepo.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Feature-Sliced Design](https://feature-sliced.design/)
- [Atomic Design](https://atomicdesign.bradfrost.com/)

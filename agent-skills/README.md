# Agent Skills

AI agent skills integrated into this monorepo. Skills are packaged instructions that extend AI agent capabilities for code generation, review, and optimization.

Skills follow the [Agent Skills](https://agentskills.io/) format.

## Available Skills

### react-best-practices

React and Next.js performance optimization guidelines from Vercel Engineering. Contains 40+ rules across 8 categories, prioritized by impact.

**Use when:**
- Writing new React components or Next.js pages
- Implementing data fetching (client or server-side)
- Reviewing code for performance issues
- Optimizing bundle size or load times

**Categories covered:**
- Eliminating waterfalls (Critical)
- Bundle size optimization (Critical)
- Server-side performance (High)
- Client-side data fetching (Medium-High)
- Re-render optimization (Medium)
- Rendering performance (Medium)
- JavaScript micro-optimizations (Low-Medium)

### web-design-guidelines

Review UI code for compliance with web interface best practices. Audits your code for 100+ rules covering accessibility, performance, and UX.

**Use when:**
- "Review my UI"
- "Check accessibility"
- "Audit design"
- "Review UX"
- "Check my site against best practices"

**Categories covered:**
- Accessibility (aria-labels, semantic HTML, keyboard handlers)
- Focus States (visible focus, focus-visible patterns)
- Forms (autocomplete, validation, error handling)
- Animation (prefers-reduced-motion, compositor-friendly transforms)
- Typography (curly quotes, ellipsis, tabular-nums)
- Images (dimensions, lazy loading, alt text)
- Performance (virtualization, layout thrashing, preconnect)
- Navigation & State (URL reflects state, deep-linking)
- Dark Mode & Theming (color-scheme, theme-color meta)
- Touch & Interaction (touch-action, tap-highlight)
- Locale & i18n (Intl.DateTimeFormat, Intl.NumberFormat)

### formik-to-react-hook-form

Migrate Formik forms to react-hook-form one component at a time while preserving validation and behavior.

**Use when:**
- Migrating forms from Formik to react-hook-form
- Replacing `useFormik` with `useForm`
- Converting `<Formik>` render props to `FormProvider`

### graphql-codegen-migration

Migrate GraphQL operations to TypeScript with generated types, custom hooks, and MSW test handlers.

**Use when:**
- Migrating legacy GraphQL queries/mutations to TypeScript
- Setting up new GraphQL operations with proper types
- Creating MSW handlers for GraphQL testing

### rswag-schema-migration

Migrate inline Swagger schemas to reusable schema components that generate proper TypeScript types.

**Use when:**
- Fixing `Rswag/InlineSchema` violations
- Creating reusable Swagger schema components
- Generating TypeScript types from Rails API specs

### react-ai-features

Build AI-powered React features with standardized patterns for hooks, error handling, streaming, cancellation, and multi-step agents.

**Use when:**
- Building AI chat or AI content generation features
- Integrating LLM APIs into React applications
- Designing error taxonomy and cancellation for AI requests
- Implementing streaming or multi-step agent interfaces

### playwright-e2e-testing

Write, debug, and plan Playwright E2E tests following best practices for test structure, element selection, and helper organization.

**Use when:**
- Writing Playwright E2E tests
- Debugging failing E2E tests
- Creating test plans for web applications
- Setting up E2E test infrastructure

**Includes agent references for:**
- Test planning (comprehensive scenario design)
- Test generation (from plans to code)
- Test healing (debugging and fixing failures)

### companycam-frontend

CompanyCam frontend development conventions for React with TypeScript, styled-components, TanStack Query, Apollo Client, MSW testing, and Vitest.

**Use when:**
- Working on CompanyCam frontend code
- Writing React components or custom hooks
- Writing frontend tests with Vitest + MSW

### companycam-backend

CompanyCam Rails backend development conventions covering Docker, Sidekiq, coding philosophy, review standards, testing with RSpec, and Ruby style.

**Use when:**
- Working on CompanyCam Rails backend code
- Writing models, controllers, or migrations
- Writing RSpec tests or Swagger specs

### pull-request-guidelines

Guidelines for creating pull requests with concise descriptions, proper template usage, and no AI signatures.

**Use when:**
- Creating pull requests
- Writing PR descriptions

## Skill Structure

Each skill contains:
- `SKILL.md` - Quick reference for the agent
- `AGENTS.md` - Full guidelines (loaded on demand)
- `rules/` - Individual rule files with examples

## Build Tooling

The skill documentation is built using `@nathanhfoster/agent-skills-build` located in `packages/agent-skills-build/`.

```bash
# Build/validate skills
pnpm --filter @nathanhfoster/agent-skills-build build
pnpm --filter @nathanhfoster/agent-skills-build validate
```

## License

MIT

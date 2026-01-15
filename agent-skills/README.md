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

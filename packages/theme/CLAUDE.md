# @nathanhfoster/theme - CLAUDE.md

This file provides guidance to Claude Code when working with the theme package.

## Package Purpose

This package is the **single source of truth** for all design tokens across the platform. It provides:

- Centralized design system tokens (colors, spacing, typography, etc.)
- Framework-agnostic token definitions
- Exports for both Tailwind CSS (v3 and v4) and Panda CSS
- Type-safe design token access

## Architecture

```
packages/theme/
├── src/
│   ├── tokens.ts      # Core design tokens (source of truth)
│   ├── tailwind.ts    # Tailwind CSS exports and utilities
│   ├── panda.ts       # Panda CSS exports and utilities
│   └── index.ts       # Main package exports
├── package.json
├── tsconfig.json
├── .eslintrc.js
├── README.md          # User-facing documentation
└── CLAUDE.md          # This file
```

## Design Tokens Overview

### Primary Brand Color

- **Yellow**: `#FFE500` - The signature yellow brand color
- Available as `colors.primary.DEFAULT` in tokens
- Has variants: 10, 20, 30, 40, 50, 60

### Color System

- **Primary**: Yellow with variants
- **Secondary**: Purple palette (50-950)
- **Neutral**: Gray scale (50-950)
- **Semantic**: accent, error, success, warning, info
- **Background/Foreground**: Light and dark theme support

### Typography

- **Fonts**: Volkhov, Inter, Staatliches, Rubik, Poppins, Dharma Gothic Bold
- **Sizes**: Standard scale (xs-8xl) + custom numeric sizes (28, 32, 40, 56, 64)
- **Line Heights**: 120%, 140%, 155%
- **Letter Spacing**: 1.2px, 1.4px

### Layout

- **Spacing**: Standard scale (xs-3xl) + custom values for precise control
- **Breakpoints**: xs (460px), sm-3xl (640px-1920px)
- **Border Radius**: sm-full + custom numeric values
- **Container**: Responsive padding and max-width

## Usage Patterns

### Tailwind CSS v4 (ui package)

```css
/* index.css */
@import "tailwindcss" source(".");

@theme {
  /* Copy values from @nathanhfoster/theme/tokens */
  --color-primary: #ffe500;
  /* ... other tokens ... */
}
```

Note: Tailwind v4 uses CSS-first configuration, so tokens are manually synchronized.

### Panda CSS (panda-ui package)

```ts
// panda.config.ts
import { pandaTheme, pandaBreakpoints } from "@nathanhfoster/theme/panda";

export default defineConfig({
  theme: {
    extend: pandaTheme,
    breakpoints: pandaBreakpoints,
  },
});
```

### Direct Token Access

```ts
import { colors, spacing, fontFamily } from "@nathanhfoster/theme/tokens";

// Use in components, styled-components, CSS-in-JS, etc.
const primaryColor = colors.primary.DEFAULT; // '#FFE500'
```

## Rules for Working with This Package

### When Adding New Tokens

1. **Always add to `src/tokens.ts` first** - This is the source of truth
2. **Update Tailwind export** in `src/tailwind.ts` if needed
3. **Update Panda export** in `src/panda.ts` if needed
4. **Update README.md** with the new token documentation
5. **Manually sync Tailwind v4** tokens in `packages/ui/src/index.css` if applicable

### Token Naming Conventions

- Use semantic names when possible (e.g., `primary`, `secondary`, not `yellow`, `purple`)
- Numeric scales for color variants: 50, 100, 200... 900, 950
- Use descriptive names for custom values (e.g., `gameCardAnimation` not `shadow1`)
- Follow existing patterns for consistency

### Breaking Changes

Changing existing token values is a **breaking change** and affects all consuming packages:

- `packages/ui` (Tailwind v4)

Always coordinate token changes across the team.

### Type Safety

All tokens are exported with `as const` to provide literal type inference:

```ts
const primary = colors.primary.DEFAULT; // Type: "#FFE500" (not string)
```

This ensures type safety when consuming tokens in TypeScript.

## Development Workflow

### Testing Changes

After modifying tokens:

1. Run `pnpm install` from root to link the updated package
2. For Panda CSS packages: Run `pnpm prepare` in the consuming package
3. For Tailwind packages: Restart the dev server to pick up changes
4. Verify changes in browser/storybook

### Linting

```bash
pnpm lint          # Check for linting errors
pnpm check-types   # Verify TypeScript types
```

## Common Tasks

### Adding a New Color

1. Add to `colors` object in `src/tokens.ts`
2. Export in Tailwind theme (`src/tailwind.ts`)
3. Add to Panda color tokens (`src/panda.ts`)
4. Document in README.md

### Adding a New Spacing Value

1. Add to `spacing` object in `src/tokens.ts`
2. Automatically picked up by Tailwind and Panda exports
3. Document if it's for a specific use case

### Adding a New Shadow

1. Add to `boxShadow` object in `src/tokens.ts`
2. Export in Tailwind theme (`src/tailwind.ts`)
3. Convert to Panda token in `src/panda.ts`
4. Give it a semantic name that describes its use

## Dependencies

This package has minimal dependencies:

- `@nathanhfoster/eslint-config` - For linting
- `@nathanhfoster/typescript-config` - For TypeScript configuration

It intentionally has **no runtime dependencies** to keep it lightweight.

## Package Consumers

Current packages using `@nathanhfoster/theme`:

- ✅ `packages/ui` - Tailwind v4 implementation
- ✅ `packages/panda-ui` - Panda CSS implementation

Future consumers:

- `apps/main` - When SolidStart app needs shared theming

## Troubleshooting

### "Cannot find module '@nathanhfoster/theme'"

Run `pnpm install` from the monorepo root to link workspace packages.

### Panda not picking up token changes

Run `pnpm prepare` in the panda-ui package to regenerate styled-system.

### Tailwind not showing new tokens

Restart the dev server and clear cache if needed.

### TypeScript errors about token types

Run `pnpm check-types` in the theme package to verify type definitions.

## Best Practices

1. **Never hardcode design values** in consuming packages - always use tokens
2. **Use semantic color names** for better maintainability
3. **Add comments** to complex or non-obvious token definitions
4. **Keep tokens DRY** - don't duplicate values across different token types
5. **Document intent** - explain why a token exists, not just what it is

## Future Enhancements

Potential improvements to consider:

- [ ] Automated token documentation generation
- [ ] Visual token browser/showcase
- [ ] Dark mode color variants
- [ ] CSS variable generation for runtime theming
- [ ] Token validation and linting
- [ ] Migration scripts for token renames

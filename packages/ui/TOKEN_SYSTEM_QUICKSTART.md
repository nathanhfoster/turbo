# Design Token System - Quick Start Guide

> Professional, SOLID-compliant design system for multi-zone architectures

## What You Get

✅ **Centralized tokens** - Single source of truth for all visual design
✅ **SOLID principles** - Single responsibility, dependency inversion, DRY
✅ **Multi-app support** - Each app can override tokens independently
✅ **Type-safe** - Full TypeScript support
✅ **Scalable** - Works across unlimited apps in monorepo
✅ **Flexible** - Easy to customize per component or per app

## Quick Start

### 1. Import Tokens in Your App

**apps/your-app/app/globals.css:**

```css
/* Import base design tokens */
@import '@nathanhfoster/ui/index.css';

/* Import Tailwind */
@import 'tailwindcss';

/* Optional: Override tokens for this app */
@theme {
  --color-primary: #your-primary-color;
  --color-secondary: #your-secondary-color;
}
```

### 2. Use Components

```tsx
import { Button, Input, Card } from '@nathanhfoster/ui';

function MyApp() {
  return (
    <>
      <Button color="primary" size="md" variant="contained">
        Click Me
      </Button>

      <Input color="primary" size="md" placeholder="Enter text" />

      <Card size="lg" variant="elevated">
        Card content
      </Card>
    </>
  );
}
```

That's it! Components automatically use your app's tokens.

## Architecture Overview

```
Design Tokens (CSS)     →    Token Utilities (TS)    →    Components
------------------           --------------------          ----------
@theme {                     COLOR_TOKENS               Button
  --color-primary           generateColorStyles()       Input
  --spacing-md              BUTTON_SIZES                Card
  --shadow-lg               DISABLED_STYLES             ...
}                            ...
```

### Three Layers

1. **Design Tokens** (`packages/ui/src/index.css`)
   - CSS custom properties
   - Visual values (colors, spacing, shadows, etc.)
   - Can be overridden by apps

2. **Token Utilities** (`packages/ui/src/tokens/`)
   - TypeScript utilities
   - Generate component styles from tokens
   - Centralized style logic

3. **Components** (`packages/ui/src/common/`)
   - Use token utilities
   - Flexible and customizable
   - Consistent API across all components

## Common Use Cases

### Override Primary Color

```css
@theme {
  --color-primary: #ff6b6b;
}
```

All components using `color="primary"` now use your custom color!

### Add Custom Color

```css
@theme {
  --color-brand: #your-brand-color;
}
```

Then extend token system (optional):

```typescript
// In your app
import { COLOR_TOKENS } from '@nathanhfoster/ui/tokens';

const APP_COLOR_TOKENS = {
  ...COLOR_TOKENS,
  brand: 'brand',
};
```

### Customize Component Defaults

Create a wrapper component in your app:

```tsx
// apps/your-app/components/Button.tsx
import { Button as BaseButton } from '@nathanhfoster/ui';
import type { ComponentProps } from 'react';

export function Button(props: ComponentProps<typeof BaseButton>) {
  return (
    <BaseButton
      variant="outlined"  // Your app's default
      color="primary"     // Your app's default
      {...props}          // Allow overrides
    />
  );
}
```

### Dark Mode Support

Built-in with semantic tokens:

```css
@theme {
  /* Light mode */
  --color-background-DEFAULT: #ffffff;
  --color-foreground-DEFAULT: #000000;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  @theme {
    --color-background-DEFAULT: #0f172a;
    --color-foreground-DEFAULT: #f8fafc;
  }
}
```

Or use Tailwind's `dark:` variant:

```css
@theme {
  --color-background-DEFAULT: light-dark(#ffffff, #0f172a);
}
```

## Token Reference

### Colors

```typescript
"primary"    // --color-primary
"secondary"  // --color-secondary
"accent"     // --color-accent
"error"      // --color-error
"success"    // --color-success
"warning"    // --color-warning
"info"       // --color-info
"white"      // white
"black"      // black
"gray"       // neutral-500
"inherit"    // inherit
```

### Sizes

```typescript
"xs"  | "sm"  | "md"  | "lg"  | "xl"  |
"2xl" | "3xl" | "4xl" | "5xl" | "6xl" |
"7xl" | "8xl" | "9xl"
```

### Variants

```typescript
"contained"  // Filled background
"outlined"   // Border with transparent background
"text"       // No border or background
```

## Component Props

All components share common props:

```typescript
interface CommonProps {
  color?: ComponentColor;     // "primary" | "secondary" | ...
  size?: Size;                // "xs" | "sm" | "md" | ...
  variant?: ComponentVariant; // "contained" | "outlined" | "text"
  disabled?: boolean;
  className?: string;
}
```

### Button-Specific Props

```tsx
<Button
  type="button"        // button | submit | reset
  href="/path"         // Renders as <a> if provided
  isActive={false}
>
  Label
</Button>
```

### Input-Specific Props

```tsx
<Input
  type="text"          // text | email | password | ...
  placeholder="..."
  error="Error message"
  label="Field Label"
/>
```

### Card-Specific Props

```tsx
<Card
  variant="elevated"   // default | elevated | flat | bordered
  hover={true}         // Enable hover effect
>
  Content
</Card>
```

## Building Custom Components

### Use Token Utilities

```typescript
import {
  generateColorStylesMapping,
  TRANSITION_STYLES,
  DISABLED_STYLES,
} from '@nathanhfoster/ui/tokens/styleUtils';

import { BUTTON_SIZES } from '@nathanhfoster/ui/tokens/sizeUtils';

// Generate color styles for your component
const COLOR_STYLES = generateColorStylesMapping("contained");

// Use in component
const MyComponent = ({ color = "primary", size = "md" }) => {
  const colorStyles = COLOR_STYLES[color];
  const sizeStyles = BUTTON_SIZES[size];

  return (
    <div className={combineClassNames(
      colorStyles.bg,
      colorStyles.text,
      sizeStyles,
      TRANSITION_STYLES.colors
    )}>
      Content
    </div>
  );
};
```

## Best Practices

### ✅ DO

- Use semantic tokens (`bg-background-DEFAULT` not `bg-white`)
- Use centralized utilities for styles
- Override tokens in app's globals.css
- Follow component prop patterns
- Test all color/size/variant combinations

### ❌ DON'T

- Hardcode colors (`bg-blue-500`)
- Duplicate style logic across components
- Modify UI library components directly
- Skip using token utilities
- Create component-specific tokens (use shared ones)

## Troubleshooting

### Styles Not Applying

**Problem:** Custom token not working

```css
/* ❌ Wrong import order */
@import 'tailwindcss';
@import '@nathanhfoster/ui/index.css';

/* ✅ Correct import order */
@import '@nathanhfoster/ui/index.css';
@import 'tailwindcss';

@theme {
  /* Your overrides */
}
```

### TypeScript Errors

**Problem:** Can't find ColorStyles type

```typescript
// ❌ Wrong
import type { ColorStyles } from './types';

// ✅ Correct
import type { ColorStyles } from '@nathanhfoster/ui/tokens/styleUtils';
```

### Token Not Updating

**Problem:** Changed token but component looks the same

**Solution:** Clear cache and rebuild:

```bash
rm -rf .next node_modules/.cache
pnpm install
pnpm dev
```

## File Structure Reference

```
packages/ui/
├── src/
│   ├── index.css              # 🎨 Design tokens (@theme)
│   ├── tokens/
│   │   ├── index.ts           # Token mappings (COLOR_TOKENS, etc.)
│   │   ├── styleUtils.ts      # Style generation utilities
│   │   └── sizeUtils.ts       # Size utilities (BUTTON_SIZES, etc.)
│   ├── common/
│   │   └── atoms/
│   │       ├── Button/
│   │       │   ├── index.tsx       # Component
│   │       │   ├── constants.ts    # Uses token utilities
│   │       │   └── types.ts        # TypeScript types
│   │       ├── Input/
│   │       ├── Card/
│   │       └── ...
│   └── constants.ts           # Re-exports (backward compat)
├── DESIGN_SYSTEM.md           # 📖 Full architecture guide
├── MIGRATION_EXAMPLES.md      # 🔄 Migration examples
└── TOKEN_SYSTEM_QUICKSTART.md # ⚡ This file
```

## Next Steps

1. **Read full guide:** [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)
2. **See migration examples:** [MIGRATION_EXAMPLES.md](./MIGRATION_EXAMPLES.md)
3. **Explore tokens:** `packages/ui/src/tokens/`
4. **View Storybook:** `pnpm --filter @nathanhfoster/ui storybook`
5. **Override tokens** in your app's globals.css

## Support

- **Documentation:** See DESIGN_SYSTEM.md for detailed guide
- **Examples:** See MIGRATION_EXAMPLES.md for component examples
- **Architecture:** See /FRONTEND_ARCHITECTURE.md for overall architecture
- **Source:** Explore `packages/ui/src/tokens/` for implementation

---

**Remember:** The token system follows SOLID principles and scales across unlimited apps. Each app can customize tokens independently while sharing component logic. 🚀

# @monkey-tilt/theme

MonkeyTilt Design System Theme Package - A unified source of truth for design tokens across Tailwind CSS and Panda CSS implementations.

## Overview

This package provides centralized design system tokens that ensure visual consistency across all MonkeyTilt applications and packages. It supports both:

- **Tailwind CSS** (v3 and v4)
- **Panda CSS**

## Installation

```bash
pnpm add @monkey-tilt/theme
```

## Usage

### With Tailwind CSS (v3)

```js
// tailwind.config.js
const { theme, tailwindPlugins } = require('@monkey-tilt/theme/tailwind');

module.exports = {
  theme: {
    extend: theme
  },
  plugins: tailwindPlugins
};
```

### With Tailwind CSS (v4)

```css
/* index.css */
@import 'tailwindcss' source('.');

@theme {
  /* Import shared theme tokens */
}
```

Use the `generateTailwindV4Theme()` helper to generate CSS variables:

```ts
import { generateTailwindV4Theme } from '@monkey-tilt/theme/tailwind';

const themeCSS = generateTailwindV4Theme();
```

### With Panda CSS

```ts
// panda.config.ts
import { defineConfig } from '@pandacss/dev';
import { pandaTheme, pandaBreakpoints } from '@monkey-tilt/theme/panda';

export default defineConfig({
  theme: {
    extend: pandaTheme,
    breakpoints: pandaBreakpoints
  }
});
```

### Direct Token Access

You can also import tokens directly for use in JavaScript/TypeScript:

```ts
import { colors, spacing, fontFamily } from '@monkey-tilt/theme/tokens';

// Use in styled components, CSS-in-JS, etc.
const primaryColor = colors.primary.DEFAULT; // '#FFE500'
const mediumSpacing = spacing.md; // '1rem'
```

## Design Tokens

### Colors

- **Primary**: MonkeyTilt Yellow (`#FFE500`) with variants (10-60)
- **Secondary**: Purple palette (50-950)
- **Neutral**: Gray scale (50-950)
- **Semantic**: accent, error, success, warning, info
- **Background/Foreground**: Light and dark variants

### Typography

- **Font Families**: Volkhov, Inter, Staatliches, Rubik, Poppins, Dharma Gothic Bold
- **Font Sizes**: xs through 8xl, plus custom numeric sizes (28, 32, 40, 56, 64)
- **Line Heights**: 120%, 140%, 155%
- **Letter Spacing**: 1.2px, 1.4px

### Spacing

Standard scale (xs-3xl) plus custom numeric values for precise spacing needs.

### Border Radius

From `sm` (0.25rem) to `full` (9999px), plus custom numeric values.

### Shadows

Specialized shadows including:
- `rankShadow`
- `gameCardAnimation`
- `toast-card`
- `search-input`
- `dark-shadow`
- `real-play`

### Breakpoints

- **xs**: 460px
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **1xl**: 1440px
- **2xl**: 1536px
- **3xl**: 1920px

### Background Gradients

Pre-defined gradients for various UI elements:
- Interactive backgrounds
- Casino/Sports lists
- Model backgrounds
- Live wins displays

### Animations

- `spin-slow`: Slow spinning animation
- `fadeIn`: Fade in with slide up
- `marquee-on-overflow`: Marquee scroll effect

## Architecture

```
packages/theme/
├── src/
│   ├── tokens.ts      # Core design tokens (source of truth)
│   ├── tailwind.ts    # Tailwind-specific exports
│   ├── panda.ts       # Panda CSS-specific exports
│   └── index.ts       # Main exports
├── package.json
├── tsconfig.json
└── README.md
```

## Benefits

✅ **Single Source of Truth**: All design tokens defined in one place
✅ **Type Safety**: Full TypeScript support with exported types
✅ **Framework Agnostic**: Works with both Tailwind and Panda CSS
✅ **Consistency**: Ensures visual consistency across all apps
✅ **Maintainability**: Update tokens in one place, reflect everywhere
✅ **Scalability**: Easy to extend with new tokens as needed

## Contributing

When adding new design tokens:

1. Add the token to `src/tokens.ts`
2. Update the Tailwind export in `src/tailwind.ts` if needed
3. Update the Panda export in `src/panda.ts` if needed
4. Update this README with the new token information

## Migration Guide

### Migrating from inline Tailwind config

Before:
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#FFE500'
      }
    }
  }
}
```

After:
```js
// tailwind.config.js
const { theme } = require('@monkey-tilt/theme/tailwind');

module.exports = {
  theme: {
    extend: theme
  }
}
```

### Migrating from inline Panda config

Before:
```ts
// panda.config.ts
export default defineConfig({
  theme: {
    extend: {
      tokens: {
        colors: {
          primary: { value: '#FFE500' }
        }
      }
    }
  }
})
```

After:
```ts
// panda.config.ts
import { pandaTheme } from '@monkey-tilt/theme/panda';

export default defineConfig({
  theme: {
    extend: pandaTheme
  }
})
```

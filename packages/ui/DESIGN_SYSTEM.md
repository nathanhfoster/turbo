# Design System Architecture

## Overview

This design system follows **SOLID principles** and provides a **flexible, scalable token system** that works across multiple apps in a multi-zone architecture.

## Core Principles

### SOLID Principles Applied

1. **Single Responsibility Principle (SRP)**
   - Each token has one clear purpose
   - Components are separated into atoms/molecules/organisms
   - Style utilities handle one specific concern

2. **Open/Closed Principle (OCP)**
   - Components are open for extension via props/variants
   - Components are closed for modification (don't edit component code, extend via composition)
   - Apps can override tokens without modifying UI library code

3. **Liskov Substitution Principle (LSP)**
   - Component variants (outlined, contained, text) are interchangeable
   - All size props work consistently across components

4. **Interface Segregation Principle (ISP)**
   - Props interfaces are minimal and component-specific
   - Components only depend on props they actually use

5. **Dependency Inversion Principle (DIP)**
   - Components depend on token abstractions (COLOR_TOKENS), not concrete values
   - Style utilities provide abstraction layer between components and Tailwind

## Architecture Layers

```
┌─────────────────────────────────────────────────────┐
│         Apps (apps/main, apps/casino)               │
│   Can override tokens via @theme in globals.css    │
└─────────────────────────────────────────────────────┘
                        ↓ uses
┌─────────────────────────────────────────────────────┐
│          UI Components (packages/ui/src/common)     │
│         Button, Input, Card, Typography, etc.       │
└─────────────────────────────────────────────────────┘
                        ↓ uses
┌─────────────────────────────────────────────────────┐
│       Style Utilities (packages/ui/src/tokens)      │
│    generateColorStyles(), BUTTON_SIZES, etc.        │
└─────────────────────────────────────────────────────┘
                        ↓ references
┌─────────────────────────────────────────────────────┐
│        Design Tokens (packages/ui/src/index.css)    │
│      @theme { --color-primary, --spacing-md }       │
└─────────────────────────────────────────────────────┘
```

## Token System

### Location: `packages/ui/src/tokens/`

#### Core Files

1. **`index.ts`** - Central token mappings
   - `COLOR_TOKENS` - Maps component colors to CSS custom properties
   - `SPACING_TOKENS` - Size scale mappings
   - `RADIUS_TOKENS` - Border radius values
   - `SHADOW_TOKENS` - Elevation system
   - `DURATION_TOKENS` - Animation timings

2. **`styleUtils.ts`** - Style generation utilities
   - `createColorStyles()` - Generate color styles for any variant
   - `generateColorStylesMapping()` - Generate all color styles at once
   - `DISABLED_STYLES` - Centralized disabled states
   - `TRANSITION_STYLES` - Centralized transitions

3. **`sizeUtils.ts`** - Size-related utilities
   - `BUTTON_SIZES` - Button/interactive element sizes
   - `INPUT_SIZES` - Input field sizes
   - `PADDING_SIZES` - Container padding
   - `ICON_SIZES` - Icon dimensions

### Design Tokens: `packages/ui/src/index.css`

All visual values are defined as CSS custom properties in the `@theme` block:

```css
@theme {
  /* Colors */
  --color-primary: #06b6d4;
  --color-secondary: #a855f7;

  /* Spacing */
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;

  /* Shadows */
  --shadow-md: 0 10px 15px -3px rgb(0 0 0 / 0.1);

  /* And many more... */
}
```

## Component Architecture

### Standard Component Structure

Every component follows this pattern:

```
ComponentName/
├── index.tsx          # Component implementation + HOCs
├── constants.ts       # Style mappings using token utilities
├── types.ts          # TypeScript interfaces
└── ComponentName.stories.tsx  # Storybook stories
```

### Component Pattern (Example: Button)

#### 1. constants.ts - Uses Centralized Utilities

```typescript
import {
  generateColorStylesMapping,
  VARIANT_BASE_STYLES,
  DISABLED_STYLES,
  TRANSITION_STYLES,
} from "../../../tokens/styleUtils";

// Generate color styles for all variants
export const COLOR_STYLES = generateColorStylesMapping("contained");
export const COLOR_STYLES_OUTLINED = generateColorStylesMapping("outlined");
export const COLOR_STYLES_TEXT = generateColorStylesMapping("text");

// Use centralized base styles
export const VARIANT_STYLES = VARIANT_BASE_STYLES;
export const DISABLED_COMMON_STYLES = DISABLED_STYLES.common;
export const BASE_STYLES = `rounded-md ${TRANSITION_STYLES.colors}`;
```

#### 2. index.tsx - Component Implementation

```typescript
import { TAILWIND_SIZES } from "../../../constants";
import { COLOR_STYLES, VARIANT_STYLES, BASE_STYLES } from "./constants";

const BaseButton = ({
  variant = "contained",
  color = "primary",
  size = "md",
  // ...props
}) => {
  const variantStyles = VARIANT_STYLES[variant];
  const colorStyles = COLOR_STYLES[color];
  const sizeStyles = TAILWIND_SIZES[size];

  const className = combineClassNames(
    BASE_STYLES,
    variantStyles,
    !disabled && colorStyles.bg,
    !disabled && colorStyles.text,
    !disabled && colorStyles.hover,
    sizeStyles,
    disabled && DISABLED_COMMON_STYLES,
    // ...more styles
  );

  return <button className={className}>{children}</button>;
};
```

## How to Use

### For Component Authors

#### Creating a New Component

1. **Import style utilities:**

```typescript
import {
  generateColorStylesMapping,
  DISABLED_STYLES,
  TRANSITION_STYLES,
} from "../../../tokens/styleUtils";
import { BUTTON_SIZES } from "../../../tokens/sizeUtils";
```

2. **Generate style mappings:**

```typescript
export const COLOR_STYLES = generateColorStylesMapping("contained");
export const BASE_STYLES = `rounded-md ${TRANSITION_STYLES.colors}`;
```

3. **Use in component:**

```typescript
const colorStyles = COLOR_STYLES[color];
const className = combineClassNames(
  BASE_STYLES,
  colorStyles.bg,
  colorStyles.text,
  colorStyles.hover,
);
```

#### Customizing Color Styles

If you need custom color behavior:

```typescript
import { createColorStyles } from "../../../tokens/styleUtils";

// Custom variant
const customStyles = createColorStyles("primary", "outlined");
```

### For App Developers

#### Overriding Tokens

In your app's `globals.css`:

```css
/* Import UI library tokens first */
@import "@nathanhfoster/ui/index.css";
@import "tailwindcss";

/* Override specific tokens */
@theme {
  /* Change primary color for this app */
  --color-primary: #ff6b6b;

  /* Change spacing scale */
  --spacing-md: 1.25rem;

  /* Add app-specific tokens */
  --color-brand: #your-color;
}
```

#### Using Components

```tsx
import { Button, Input, Card } from '@nathanhfoster/ui';

// All components use the same token system
<Button color="primary" size="md" variant="contained">
  Click Me
</Button>

<Input color="primary" size="md" />

<Card size="md" variant="elevated">
  Content
</Card>
```

## Migration Guide

### Refactoring Existing Components

To migrate an existing component to the new token system:

#### Before (Input/constants.ts):

```typescript
export const COLOR_STYLES: Record<ComponentColor, InputColorStyles> = {
  primary: {
    border: "border-primary",
    focus: "focus:border-primary focus:ring-primary",
  },
  secondary: {
    border: "border-secondary",
    focus: "focus:border-secondary focus:ring-secondary",
  },
  // ... repeated for all colors
};
```

#### After (Input/constants.ts):

```typescript
import { generateInputColorStylesMapping } from "../../../tokens/styleUtils";

export const COLOR_STYLES = generateInputColorStylesMapping();
```

**Benefits:**

- ✅ 90% less code
- ✅ Centralized logic
- ✅ Consistent across components
- ✅ Easy to maintain
- ✅ Apps can override tokens

### Step-by-Step Migration

1. **Import utilities:**

   ```typescript
   import { generateColorStylesMapping } from "../../../tokens/styleUtils";
   ```

2. **Replace hardcoded styles:**

   ```typescript
   // Before
   export const COLOR_STYLES: Record<ComponentColor, ColorStyles> = {
     primary: { bg: "bg-primary", text: "text-white", ... },
     // ... 50+ lines
   };

   // After
   export const COLOR_STYLES = generateColorStylesMapping("contained");
   ```

3. **Update type imports:**

   ```typescript
   // Before
   import type { ColorStyles } from "./types";

   // After
   import type { ColorStyles } from "../../../tokens/styleUtils";
   ```

4. **Test component:**
   - Verify all color variants work
   - Check all size props
   - Test disabled states
   - Validate responsive behavior

## Best Practices

### DO ✅

- **Use centralized token utilities** for all styling
- **Reference CSS custom properties** via token mappings
- **Generate style mappings** using utilities
- **Document component props** with examples
- **Create Storybook stories** for all variants
- **Follow mobile-first** responsive design
- **Test accessibility** (WCAG 2.1 AA minimum)

### DON'T ❌

- **Hardcode colors** like `"text-white"` or `"bg-blue-500"`
- **Duplicate style logic** across components
- **Skip using token utilities** - always use them
- **Modify components directly** - extend via composition
- **Create component-specific tokens** - use shared tokens
- **Ignore responsive design** - always mobile-first

## Scaling Across Apps

### Multi-Zone Architecture Support

The token system is designed for multi-zone architectures:

```
apps/
├── main/          # Next.js app
│   └── app/
│       └── globals.css     # Can override tokens
├── casino/        # Next.js app
│   └── app/
│       └── globals.css     # Can override tokens independently
└── ...
```

Each app can:

- ✅ Override any token independently
- ✅ Use all UI components
- ✅ Maintain consistent component APIs
- ✅ Share design language while customizing appearance

### Example: App-Specific Theming

**apps/main/app/globals.css:**

```css
@import "@nathanhfoster/ui/index.css";
@import "tailwindcss";

@theme {
  --color-primary: #3b82f6; /* Blue theme */
  --color-secondary: #8b5cf6;
}
```

**apps/casino/app/globals.css:**

```css
@import "@nathanhfoster/ui/index.css";
@import "tailwindcss";

@theme {
  --color-primary: #f59e0b; /* Gold theme */
  --color-secondary: #ef4444;
}
```

Both apps use the same `<Button color="primary" />` component, but render different colors!

## Component Customization

### Default Props Pattern

Components should expose sensible defaults via props:

```typescript
interface ButtonProps {
  variant?: "contained" | "outlined" | "text"; // Default: "contained"
  color?: ComponentColor; // Default: "primary"
  size?: Size; // Default: "md"
  disabled?: boolean; // Default: false
}
```

### Composition Over Configuration

Prefer composing components over adding configuration props:

```tsx
// ❌ Bad - Too many props
<Button
  icon={<Icon />}
  iconPosition="left"
  iconSize="md"
  iconColor="primary"
/>

// ✅ Good - Composition
<Button>
  <Icon size="md" color="primary" />
  Label
</Button>
```

## Testing Components

### Required Tests

1. **Variant tests** - Test all variants render correctly
2. **Color tests** - Test all color props work
3. **Size tests** - Test all size props work
4. **State tests** - Test disabled/active/hover states
5. **Accessibility tests** - WCAG 2.1 AA compliance
6. **Responsive tests** - Mobile/tablet/desktop

### Example Test

```typescript
describe("Button", () => {
  it("renders all color variants", () => {
    const colors: ComponentColor[] = ["primary", "secondary", "accent"];
    colors.forEach(color => {
      const { container } = render(<Button color={color}>Test</Button>);
      expect(container.firstChild).toHaveClass(`bg-${COLOR_TOKENS[color]}`);
    });
  });
});
```

## Storybook Integration

### Component Stories Pattern

```typescript
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './index';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'error'],
    },
    variant: {
      control: 'select',
      options: ['contained', 'outlined', 'text'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    color: 'primary',
    variant: 'contained',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="text">Text</Button>
    </div>
  ),
};
```

## Troubleshooting

### Token Not Updating

**Problem:** Changed token in globals.css but component doesn't update

**Solution:** Ensure import order is correct:

```css
/* Correct order */
@import "@nathanhfoster/ui/index.css"; /* Base tokens */
@import "tailwindcss"; /* Tailwind */

@theme {
  /* Your overrides */
}
```

### Style Not Applying

**Problem:** Custom style not applying to component

**Solution:** Check if you're using token utilities:

```typescript
// ❌ Wrong - Hardcoded
const styles = "bg-blue-500";

// ✅ Correct - Using tokens
import { getBgColor } from "../../../tokens/styleUtils";
const styles = getBgColor("primary");
```

### Type Errors

**Problem:** TypeScript errors about missing ColorStyles type

**Solution:** Import from centralized location:

```typescript
// ❌ Wrong
import type { ColorStyles } from "./types";

// ✅ Correct
import type { ColorStyles } from "../../../tokens/styleUtils";
```

## Resources

- [FRONTEND_ARCHITECTURE.md](/FRONTEND_ARCHITECTURE.md) - Overall architecture
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)

## Contributing

When contributing components:

1. **Follow the token system** - Use utilities, not hardcoded values
2. **Write tests** - Unit tests + accessibility tests
3. **Create stories** - Document all variants in Storybook
4. **Update docs** - Add examples to this guide
5. **Follow SOLID** - Single responsibility, proper abstractions

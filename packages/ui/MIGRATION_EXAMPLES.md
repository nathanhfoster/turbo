# Component Migration Examples

This document provides step-by-step examples of migrating components to the new token system.

## Example 1: Input Component

### Before Migration

**packages/ui/src/common/atoms/Input/constants.ts:**

```typescript
import type { ComponentColor } from "../types";

export type InputColorStyles = {
  border: string;
  focus: string;
  hover?: string;
};

export const COLOR_STYLES: Record<ComponentColor, InputColorStyles> = {
  primary: {
    border: "border-primary",
    focus: "focus:border-primary focus:ring-primary",
  },
  secondary: {
    border: "border-secondary",
    focus: "focus:border-secondary focus:ring-secondary",
  },
  accent: {
    border: "border-accent",
    focus: "focus:border-accent focus:ring-accent",
  },
  error: {
    border: "border-error",
    focus: "focus:border-error focus:ring-error",
  },
  success: {
    border: "border-success",
    focus: "focus:border-success focus:ring-success",
  },
  warning: {
    border: "border-warning",
    focus: "focus:border-warning focus:ring-warning",
  },
  info: {
    border: "border-info",
    focus: "focus:border-info focus:ring-info",
  },
  white: {
    border: "border-white",
    focus: "focus:border-white focus:ring-white",
  },
  inherit: {
    border: "border-inherit",
    focus: "focus:border-inherit focus:ring-inherit",
  },
  black: {
    border: "border-black",
    focus: "focus:border-black focus:ring-black",
  },
  gray: {
    border: "border-neutral-500",
    focus: "focus:border-neutral-500 focus:ring-neutral-500",
  },
};

export const BASE_STYLES =
  "rounded-md border shadow-sm focus:outline-none focus:ring-1 transition-colors duration-200";

export const ERROR_STYLES = "absolute mt-1";
```

**Problems:**

- ❌ Duplicate color logic (repeated across all colors)
- ❌ Hardcoded for every color variant
- ❌ Not using centralized utilities
- ❌ Hard to maintain (11 color definitions)

### After Migration

**packages/ui/src/common/atoms/Input/constants.ts:**

```typescript
/**
 * Input Component Constants
 *
 * Uses centralized design tokens and style utilities.
 * Follows SOLID principles - DRY and dependency inversion.
 */

import {
  generateInputColorStylesMapping,
  type InputColorStyles,
  TRANSITION_STYLES,
  FOCUS_STYLES,
} from "../../../tokens/styleUtils";

/**
 * Color styles for all input colors
 * Generated from centralized utilities - no duplication!
 */
export const COLOR_STYLES = generateInputColorStylesMapping();

/**
 * Base input styles
 * Uses centralized transition and focus styles
 */
export const BASE_STYLES = `rounded-md border shadow-sm ${FOCUS_STYLES.ringSmall} ${TRANSITION_STYLES.fast}`;

/**
 * Error message positioning
 */
export const ERROR_STYLES = "absolute mt-1";

/**
 * Re-export type for component use
 */
export type { InputColorStyles };
```

**Benefits:**

- ✅ Reduced from 66 lines to 30 lines
- ✅ No duplicate color logic
- ✅ Uses centralized utilities
- ✅ Easy to maintain
- ✅ Consistent with other components

## Example 2: Card Component

### Before Migration

**packages/ui/src/common/atoms/Card/constants.ts:**

```typescript
import type { Size } from "../types";
import type { CardVariant } from "./types";

export const BASE_STYLES = "rounded-lg bg-white";
export const BORDER_STYLES = "border border-neutral-200";
export const HOVER_STYLES =
  "transition-all hover:shadow-md hover:cursor-pointer";

export const PADDING_STYLES: Record<Size, string> = {
  inherit: "p-inherit",
  xs: "p-2 sm:p-3",
  sm: "p-3 sm:p-4",
  md: "p-4 sm:p-5 md:p-6",
  lg: "p-5 sm:p-6 md:p-8",
  xl: "p-6 sm:p-8 md:p-10",
  "2xl": "p-8 sm:p-10 md:p-12",
  "3xl": "p-10 sm:p-12 md:p-14",
  "4xl": "p-12 sm:p-14 md:p-16",
  "5xl": "p-14 sm:p-16 md:p-18",
  "6xl": "p-16 sm:p-18 md:p-20",
  "7xl": "p-18 sm:p-20 md:p-22",
  "8xl": "p-20 sm:p-22 md:p-24",
  "9xl": "p-22 sm:p-24 md:p-26",
};

export const CARD_VARIANTS: Record<CardVariant, string> = {
  default: "",
  elevated: "shadow-md",
  flat: "shadow-none",
  bordered: BORDER_STYLES,
};
```

**Problems:**

- ❌ Hardcoded `bg-white` instead of using semantic tokens
- ❌ Hardcoded `border-neutral-200`
- ❌ Duplicate padding definitions (could be centralized)

### After Migration

**packages/ui/src/common/atoms/Card/constants.ts:**

```typescript
/**
 * Card Component Constants
 *
 * Uses centralized design tokens and style utilities.
 */

import type { CardVariant } from "./types";
import { PADDING_SIZES } from "../../../tokens/sizeUtils";
import { TRANSITION_STYLES } from "../../../tokens/styleUtils";

/**
 * Base card styles
 * Uses semantic background token instead of hardcoded white
 */
export const BASE_STYLES = "rounded-lg bg-background-elevated";

/**
 * Border styles using semantic border tokens
 */
export const BORDER_STYLES = "border border-border-DEFAULT";

/**
 * Hover interaction styles
 */
export const HOVER_STYLES = `${TRANSITION_STYLES.all} hover:shadow-md hover:cursor-pointer`;

/**
 * Padding sizes - uses centralized padding utilities
 */
export const PADDING_STYLES = PADDING_SIZES;

/**
 * Card variant styles
 */
export const CARD_VARIANTS: Record<CardVariant, string> = {
  default: "",
  elevated: "shadow-md",
  flat: "shadow-none",
  bordered: BORDER_STYLES,
};
```

**Benefits:**

- ✅ Uses semantic tokens (`bg-background-elevated` instead of `bg-white`)
- ✅ Uses semantic border tokens
- ✅ Centralized padding (no duplication)
- ✅ Apps can override via tokens
- ✅ Dark mode support built-in

## Example 3: Typography Component

### Before Migration

**packages/ui/src/common/atoms/Typography/constants.ts:**

```typescript
export const TYPOGRAPHY_COLOR_STYLES: Record<ComponentColor, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  accent: "text-accent",
  error: "text-error",
  warning: "text-warning",
  info: "text-info",
  success: "text-success",
  inherit: "text-inherit",
  white: "text-white",
  black: "text-black",
  gray: "text-neutral-500",
};

export const TYPOGRAPHY_DISABLED_STYLES = "opacity-50 cursor-not-allowed";
```

**Problems:**

- ❌ Hardcoded `text-white`, `text-black`
- ❌ Doesn't use semantic foreground tokens
- ❌ Duplicate color logic

### After Migration

**packages/ui/src/common/atoms/Typography/constants.ts:**

```typescript
/**
 * Typography Component Constants
 */

import type { ComponentColor } from "../types";
import { getTextColor } from "../../../tokens/styleUtils";
import { DISABLED_STYLES } from "../../../tokens/styleUtils";
import { COLOR_TOKENS } from "../../../tokens";

/**
 * Color styles generated using centralized utilities
 */
export const TYPOGRAPHY_COLOR_STYLES: Record<ComponentColor, string> = {
  primary: getTextColor("primary"),
  secondary: getTextColor("secondary"),
  accent: getTextColor("accent"),
  error: getTextColor("error"),
  warning: getTextColor("warning"),
  info: getTextColor("info"),
  success: getTextColor("success"),
  inherit: getTextColor("inherit"),
  white: getTextColor("white"),
  black: getTextColor("black"),
  gray: getTextColor("gray"),
};

/**
 * Or use a generator function
 */
export function generateTypographyColorStyles(): Record<
  ComponentColor,
  string
> {
  return Object.keys(COLOR_TOKENS).reduce(
    (acc, color) => {
      acc[color as ComponentColor] = getTextColor(color as ComponentColor);
      return acc;
    },
    {} as Record<ComponentColor, string>,
  );
}

/**
 * Disabled styles
 */
export const TYPOGRAPHY_DISABLED_STYLES = DISABLED_STYLES.common;
```

**Benefits:**

- ✅ Uses centralized utility functions
- ✅ Can generate styles dynamically
- ✅ Consistent with other components

## Migration Checklist

When migrating a component, follow these steps:

### 1. Analyze Current Implementation

- [ ] Identify hardcoded colors (`text-white`, `bg-blue-500`, etc.)
- [ ] Find duplicate style definitions
- [ ] Check for hardcoded spacing/sizing
- [ ] Look for variant-specific logic

### 2. Update constants.ts

- [ ] Import token utilities

  ```typescript
  import {
    generateColorStylesMapping,
    TRANSITION_STYLES,
    DISABLED_STYLES,
  } from "../../../tokens/styleUtils";
  ```

- [ ] Replace color style definitions

  ```typescript
  // Before
  export const COLOR_STYLES = { primary: {...}, secondary: {...} };

  // After
  export const COLOR_STYLES = generateColorStylesMapping("contained");
  ```

- [ ] Replace size definitions with centralized utilities

  ```typescript
  // Before
  export const PADDING_STYLES = { xs: "p-2", sm: "p-3", ... };

  // After
  import { PADDING_SIZES } from "../../../tokens/sizeUtils";
  export const PADDING_STYLES = PADDING_SIZES;
  ```

- [ ] Use semantic tokens for backgrounds/borders

  ```typescript
  // Before
  export const BASE_STYLES = "bg-white border-gray-200";

  // After
  export const BASE_STYLES = "bg-background-elevated border-border-DEFAULT";
  ```

### 3. Update Type Imports

- [ ] Move shared types to token utilities
  ```typescript
  // Remove from component types.ts if duplicated
  // Import from centralized location
  import type { ColorStyles } from "../../../tokens/styleUtils";
  ```

### 4. Test Component

- [ ] Visual regression tests
- [ ] All color variants work
- [ ] All size variants work
- [ ] Disabled states work
- [ ] Hover/active states work
- [ ] Responsive behavior works
- [ ] Apps can override tokens

### 5. Update Documentation

- [ ] Add component to Storybook
- [ ] Document all props
- [ ] Show variant examples
- [ ] Add usage examples

## Common Patterns

### Pattern 1: Color Style Generation

```typescript
// For most components
import { generateColorStylesMapping } from "../../../tokens/styleUtils";

export const COLOR_STYLES_CONTAINED = generateColorStylesMapping("contained");
export const COLOR_STYLES_OUTLINED = generateColorStylesMapping("outlined");
export const COLOR_STYLES_TEXT = generateColorStylesMapping("text");
```

### Pattern 2: Input-Specific Color Styles

```typescript
import { generateInputColorStylesMapping } from "../../../tokens/styleUtils";

export const COLOR_STYLES = generateInputColorStylesMapping();
```

### Pattern 3: Custom Color Logic

If you need component-specific color behavior:

```typescript
import {
  createColorStyles,
  getTextColor,
  getBgColor,
} from "../../../tokens/styleUtils";
import type { ComponentColor } from "../types";

// Custom color styles for a specific component
export function createCustomColorStyles(color: ComponentColor) {
  return {
    text: getTextColor(color),
    bg: getBgColor(color),
    custom: `custom-${color}-specific-class`,
  };
}
```

### Pattern 4: Size Utilities

```typescript
// For buttons/interactive elements
import { BUTTON_SIZES } from "../../../tokens/sizeUtils";
export const SIZE_STYLES = BUTTON_SIZES;

// For inputs
import { INPUT_SIZES } from "../../../tokens/sizeUtils";
export const SIZE_STYLES = INPUT_SIZES;

// For containers/cards
import { PADDING_SIZES } from "../../../tokens/sizeUtils";
export const PADDING_STYLES = PADDING_SIZES;
```

## Automated Migration Script

You can use this template to semi-automate migrations:

```bash
#!/bin/bash
# migrate-component.sh
# Usage: ./migrate-component.sh Input

COMPONENT=$1
COMPONENT_DIR="packages/ui/src/common/atoms/$COMPONENT"

if [ ! -d "$COMPONENT_DIR" ]; then
  echo "Component directory not found: $COMPONENT_DIR"
  exit 1
fi

echo "Migrating $COMPONENT component..."
echo "1. Backup current constants.ts"
cp "$COMPONENT_DIR/constants.ts" "$COMPONENT_DIR/constants.ts.backup"

echo "2. Review constants.ts and update imports manually"
echo "3. Replace color styles with generateColorStylesMapping()"
echo "4. Replace size styles with centralized utilities"
echo "5. Test component in Storybook"
echo "6. Run tests"
echo ""
echo "Manual steps required:"
echo "  - Update imports in $COMPONENT_DIR/constants.ts"
echo "  - Replace COLOR_STYLES with generated version"
echo "  - Replace hardcoded values with tokens"
echo "  - Test all variants"
```

## Next Steps

After migrating components:

1. **Update Storybook stories** to showcase all variants
2. **Write/update tests** to cover all color/size combinations
3. **Document component** in DESIGN_SYSTEM.md
4. **Create PR** with before/after comparisons
5. **Review with team** to ensure consistency

## Questions?

Refer to:

- [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) - Full architecture guide
- [/FRONTEND_ARCHITECTURE.md](/FRONTEND_ARCHITECTURE.md) - Overall architecture
- Token utilities source code in `packages/ui/src/tokens/`

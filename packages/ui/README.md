# @nathanhfoster/ui

A comprehensive React component library built with TypeScript, Tailwind CSS, and following Atomic Design principles.

## Purpose

This package provides a shared, reusable component library used across all applications in the monorepo. Components are organized using Atomic Design (atoms → molecules → organisms → templates) and are designed to be framework-agnostic where possible.

## Installation

This package is part of the monorepo workspace. Install dependencies from the root:

```bash
pnpm install
```

## Usage

### Basic Import

```typescript
import { Button, Input, Box, Typography } from '@nathanhfoster/ui';
import '@nathanhfoster/ui/index.css';
```

### Component Examples

```typescript
import { Button, Input, Box, Typography } from '@nathanhfoster/ui';

function MyComponent() {
  return (
    <Box variant="main" className="p-4">
      <Typography variant="h1">Hello World</Typography>
      <Input
        type="text"
        placeholder="Enter text..."
        onChange={(e) => console.log(e.target.value)}
      />
      <Button variant="primary" onClick={() => alert('Clicked!')}>
        Click Me
      </Button>
    </Box>
  );
}
```

## Component Organization

Components are organized using **Atomic Design**:

### Atoms
Base building blocks (buttons, inputs, labels, icons)
- Simple, prop-only components
- No business logic
- Highly reusable

### Molecules
Simple combinations (form fields, search bars, card headers)
- Combine atoms
- Still relatively simple
- Reusable across contexts

### Organisms
Complex compositions (headers, cards, forms, navigation)
- Combine molecules and atoms
- More context-specific
- Still reusable

### Templates
Generic page-level layouts
- Page structure templates
- Layout patterns
- Framework-agnostic where possible

## Available Components

### Atoms
- `Button` - Button component with variants
- `Input` - Text input component
- `TextArea` - Textarea component
- `Typography` - Text component with variants
- `Box` - Container component
- `Icon` - Icon wrapper component
- `Error` - Error display component
- `Loading` - Loading indicator
- `FileDropper` - File upload component

### Molecules
- `FormField` - Form field with label and error
- `SearchBar` - Search input with icon
- `Card` - Card container component

### Organisms
- `Header` - Page header component
- `Navigation` - Navigation component
- `Form` - Form wrapper component

### Templates
- `PageLayout` - Generic page layout
- `DashboardLayout` - Dashboard layout template

## Design System

This component library is part of a Storybook-driven design system:

- **Storybook** - Component documentation and testing
- **Design Tokens** - Centralized design tokens
- **Chromatic** - Visual regression testing
- **Accessibility** - Built-in a11y validation

📖 **Design System Documentation:** [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)

📖 **Token System Guide:** [TOKEN_SYSTEM_QUICKSTART.md](./TOKEN_SYSTEM_QUICKSTART.md)

## Styling

Components use **Tailwind CSS** for styling:

```typescript
import { Box } from '@nathanhfoster/ui';

<Box className="p-4 bg-blue-500 text-white">
  Content
</Box>
```

### Design Tokens

Use design tokens for consistent styling:

```typescript
import { Box } from '@nathanhfoster/ui';

<Box className="bg-primary text-primary-foreground">
  Uses design tokens
</Box>
```

## TypeScript Support

All components are fully typed:

```typescript
import { Button } from '@nathanhfoster/ui';
import type { ButtonProps } from '@nathanhfoster/ui';

const props: ButtonProps = {
  variant: 'primary',
  onClick: () => {},
  children: 'Click me',
};
```

## Storybook

View and test components in Storybook:

```bash
cd packages/ui
pnpm storybook
```

Open [http://localhost:6006](http://localhost:6006) to view components.

## Development

### Adding a New Component

1. Create component in appropriate atomic level:
   - `src/common/atoms/[ComponentName]/`
   - `src/common/molecules/[ComponentName]/`
   - `src/common/organisms/[ComponentName]/`
   - `src/common/templates/[ComponentName]/`

2. Follow component structure:
   ```
   [ComponentName]/
   ├── types.ts
   ├── [ComponentName].tsx
   ├── index.tsx
   └── [ComponentName].stories.tsx (optional)
   ```

3. Export from `src/index.tsx`

4. Add Storybook stories

### Component Structure

```typescript
// types.ts
export interface ComponentNameProps {
  // Props definition
}

// ComponentName.tsx
import type { ComponentNameProps } from './types';

export function ComponentName(props: ComponentNameProps) {
  // Implementation
}

// index.tsx
export { ComponentName } from './ComponentName';
export type { ComponentNameProps } from './types';
```

## Best Practices

1. **Keep atoms "dumb"** - No business logic, prop-only
2. **Use TypeScript** - All components fully typed
3. **Follow Atomic Design** - Organize by complexity level
4. **Write Stories** - Document components in Storybook
5. **Test Accessibility** - Use a11y addon in Storybook
6. **Use Design Tokens** - Don't hardcode colors/sizes

## Architecture

This package follows the monorepo's [FRONTEND_ARCHITECTURE.md](../../FRONTEND_ARCHITECTURE.md) principles:

- **Atomic Design** - Component organization
- **TypeScript** - Type safety
- **Clean Architecture** - Separation of concerns
- **Storybook** - Documentation and testing

## Related Packages

- `@nathanhfoster/utils` - Utility functions
- `@nathanhfoster/resurrection` - State management hooks
- `@nathanhfoster/cookies` - Cookie utilities

## Migration

See [MIGRATION_EXAMPLES.md](./MIGRATION_EXAMPLES.md) for migration examples and patterns.

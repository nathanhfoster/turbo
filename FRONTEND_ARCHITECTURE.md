# Frontend Architecture Design Decision

## Overview

The frontend team has aligned on a unified architecture combining:

- Storybook-driven design systems
- TypeScript with Atomic Design
- State management with Container/Presentation pattern (currently Redux, designed for future TanStack migration)
- Clean Architecture principles

---

## Architecture in Monorepo Structure

### Folder Structure

```
Monorepo Root/
│
├── packages/                      # 📦 Shared packages across all apps
│   ├── ui/                        # UI Library (Atomic Design)
│   │   └── src/
│   │       └── common/
│   │           ├── atoms/         # ✅ ATOMIC DESIGN applies here
│   │           ├── molecules/
│   │           ├── organisms/
│   │           └── templates/
│   │
│   ├── auth/                      # 🟢 Cross-app authentication
│   │   ├── hooks/
│   │   ├── providers/
│   │   ├── services/
│   │   └── types/
│   │
│   ├── analytics/                 # 🟢 Cross-app analytics
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   │
│   └── error-handling/            # 🟢 Cross-app error handling
│       ├── hooks/
│       ├── providers/
│       └── utils/
│
└── apps/                          # Application instances
    └── [app-name]/                # e.g., casino, main
        │
        ├── app/                   # Next.js App Router
        │   ├── [route]/           # Application routes
        │   │   ├── page.tsx       # Page component (orchestrate domains, SSR/SSG)
        │   │   ├── layout.tsx     # Layout component (optional)
        │   │   ├── loading.tsx    # Loading UI (optional)
        │   │   ├── error.tsx      # Error UI (optional)
        │   │   └── components/    # Route-specific components (optional)
        │   ├── api/               # Next.js API routes
        │   ├── store/             # State management configuration
        │   ├── types/             # App-wide shared types
        │   └── utils/             # App-wide utilities
        │
        ├── core/                  # 🟡 APP-SPECIFIC CROSS-DOMAIN FEATURES
        │   │                      # Features shared across domains within this app only
        │   └── [FeatureName]/     # e.g., app-specific services, integrations
        │       ├── hooks/
        │       ├── services/
        │       ├── providers/
        │       ├── types/
        │       └── utils/
        │
        └── domains/               # 🟠 DOMAIN-SPECIFIC FEATURES (FSD)
            │                      # NOT organized by atomic design
            └── [Domain]/          # e.g., UserProfile, Cashier, GameLobby
                ├── index.tsx      # Domain container (orchestration)
                ├── api/           # API integration layer
                ├── model/         # Domain state layer
                │   ├── [domain]Slice.ts
                │   ├── types.ts
                │   └── selectors.ts
                ├── lib/           # Domain-specific utilities
                ├── hooks/         # Domain business logic
                │   └── use[Domain].ts
                └── ui/            # 🎨 PRESENTATION COMPONENTS
                    └── [ComponentName]/
                        ├── types.ts
                        ├── [ComponentName].tsx
                        └── index.tsx
```

### Dependency Flow

```
DEPENDENCY FLOW (Top-Down Only):
═══════════════════════════════════════════════════════════════════════
  packages/ui, packages/auth, packages/analytics, packages/error-handling
      ▲
      │ imported by all apps and domains
      │
  apps/[app-name]/app/ (Pages)
      ↓  orchestrates
  apps/[app-name]/core/ (App Core) ──→ used by ──→ apps/[app-name]/domains/
      ↓  can use packages/                             ↓  can use packages/ & core/
  Core Hooks                                      Domain Hooks
      ↓  pass to                                       ↓  pass to
  Domain Containers                               UI Components
                                                       ↑
                                                       │ can use
                                             domains/[Domain]/lib/ (domain utils)

✅ ALLOWED: Higher level → Lower level
❌ FORBIDDEN: Lower level → Higher level
```

### Architecture Layers

| Layer                  | Location                                | Purpose                                                  | Organization                      |
| ---------------------- | --------------------------------------- | -------------------------------------------------------- | --------------------------------- |
| **UI Library**         | `packages/ui/`                          | Generic reusable components                              | Atomic Design (atoms → templates) |
| **Cross-App Features** | `packages/[feature]/`                   | Shared across all apps (auth, analytics, error-handling) | By feature                        |
| **App Instance**       | `apps/[app-name]/`                      | Individual Next.js app                                   | By app                            |
| **App Core**           | `apps/[app-name]/core/`                 | App-specific cross-domain features                       | By feature                        |
| **Domains**            | `apps/[app-name]/domains/`              | Business domains                                         | FSD (by domain)                   |
| **Domain Lib**         | `apps/[app-name]/domains/[Domain]/lib/` | Domain-specific utilities                                | By domain                         |
| **Domain UI**          | `apps/[app-name]/domains/[Domain]/ui/`  | Domain-specific components                               | By purpose/functionality          |
| **Pages**              | `apps/[app-name]/app/`                  | Next.js routes                                           | By route                          |

### Where Atomic Design Applies

**✅ Atomic Design (atoms/molecules/organisms/templates):**

- **UI Library packages** (`packages/ui/src/common/`)
- Generic, reusable components shared across applications
- Organized by complexity level

**❌ NOT Atomic Design:**

- Domain components (`apps/[app-name]/domains/[Domain]/ui/`)
- Cross-app features (`packages/auth/`, `packages/analytics/`, etc.)
- App-specific features (`apps/[app-name]/core/`)
- Page components (`apps/[app-name]/app/`)

### Key Principles

1. **UI Library** (packages/ui/) - ONLY place using Atomic Design, shared across all apps
2. **Cross-App Features** (packages/[feature]/) - Shared across ALL apps (auth, analytics, error-handling)
3. **App Instances** (apps/[app-name]/) - Individual Next.js applications in monorepo
4. **App Core** (apps/[app-name]/core/) - App-specific features shared across multiple domains within one app
5. **Domains** (apps/[app-name]/domains/) - Business logic organized by domain (FSD)
6. **Domain Lib** (apps/[app-name]/domains/[Domain]/lib/) - Utilities specific to ONLY that domain
7. **Presentation** (apps/[app-name]/domains/[Domain]/ui/) - Pure UI, organized by purpose
8. **Data flows top-down** - Never import from lower levels to higher levels

---

## Storybook Design System Hub

### Purpose

Central documentation platform serving as the single source of truth for our design system.

### Architecture

- **Multi-package architecture** supporting shared components across applications
- **Co-located stories** with components for maintainability

### Add-ons & Tooling

- `a11y` - Accessibility validation
- `design-tokens` - Centralized design token management
- `docs` - Enhanced documentation
- `controls` - Interactive component controls
- `viewport` - Responsive testing
- **Chromatic** - Visual regression testing

### Automation

- Automated story generation from components
- Adoption tracking across projects
- Visual regression testing pipeline
- Accessibility validation in CI/CD

---

## TypeScript & Atomic Design

### File Organization Pattern

**IMPORTANT:** This section describes domain-specific component organization in `/apps/casino/domains/`. This is **separate** from the atomic design pattern used in `/packages/ui/`. Domain components follow Feature-Sliced Design (FSD), organized by business purpose, NOT by atomic complexity levels.

Following Feature-Sliced Design (FSD) principles, domain components are organized by domain:

```
[Domain]/
├── index.tsx                   # Domain container component (orchestration layer)
├── api/                        # API integration layer
│   └── [domain]Api.ts          # RTK Query endpoints
├── model/                      # State management layer
│   ├── [domain]Slice.ts        # Redux slice
│   ├── types.ts                # Domain state types, interfaces
│   └── selectors.ts            # Memoized selectors
├── lib/                        # Domain-specific utilities
│   ├── validation.ts           # Form validation, business rules
│   ├── [domain]Utils.ts        # Domain-specific helper functions
│   └── constants.ts            # Domain-specific constants
├── hooks/                      # Domain-specific hooks (business logic)
│   ├── use[Domain].ts          # Main domain hook
│   └── use[DomainAction].ts    # Action-specific hooks
└── ui/                         # Presentation layer (pure UI components)
    └── [ComponentName]/
        ├── types.ts            # Component-level interfaces, enums, type definitions
        ├── utils.ts            # Component-level typed utility functions (optional)
        ├── constants.ts        # Component-level typed constants (optional)
        ├── [ComponentName].tsx # Presentation component (pure UI, receives props only)
        ├── [ComponentName].stories.tsx  # Storybook stories (low priority)
        ├── index.tsx           # Public exports with function declarations and typed props
        └── components/         # Subcomponents (optional)
            └── [SubComponentName]/
                ├── types.ts            # Subcomponent-level interfaces, enums, type definitions
                ├── utils.ts            # Subcomponent-level typed utility functions (optional)
                ├── constants.ts        # Subcomponent-level typed constants (optional)
                ├── [SubComponentName].tsx # Subcomponent implementation
                ├── [SubComponentName].stories.tsx  # Storybook stories (low priority)
                └── index.tsx           # Public exports with function declarations and typed props
```

**Note:** Within a domain (`/apps/casino/domains/[Domain]/ui/`), UI components are organized by their domain-specific purpose and functionality, **NOT by atomic design levels**.

- **Atomic Design applies ONLY to** `/packages/ui/` (generic, reusable UI library)
- **Domain components** are named and grouped based on what they do within the domain context (e.g., `LoginForm`, `RegisterForm`, `AuthModal`)
- The domain container orchestrates these components based on business logic needs
- Components can be of any complexity level as long as they serve the domain's purpose
- Domain components can **use** atoms/molecules/organisms from `/packages/ui/`, but are not themselves organized by those levels

### Cross-Domain Governance

**Overview:** Some features, services, or utilities govern or are shared across multiple domains. These should be organized at a level above individual domains.

**Two Types of Cross-Domain Features:**

1. **Cross-App Features** (`packages/[feature]/`) - Shared across ALL apps (casino, main, etc.)
2. **App-Specific Features** (`apps/[app-name]/core/[feature]/`) - Shared across domains within ONE app only

**Structure for Cross-App Features:**

Location: `packages/[feature]/` (e.g., auth, analytics, error-handling)

```
packages/
└── [feature]/                  # e.g., auth, analytics, error-handling
    ├── hooks/                  # Cross-app hooks
    │   ├── use[Feature].ts     # Main hook (e.g., useAuth, useAnalytics)
    │   └── use[FeatureAction].ts
    ├── services/               # Business logic services
    │   └── [feature]Service.ts
    ├── providers/              # React context providers
    │   └── [Feature]Provider.tsx
    ├── types/                  # Shared type definitions
    │   └── index.ts
    └── utils/                  # Utility functions
        └── [feature]Utils.ts
```

**Structure for App-Specific Cross-Domain Features:**

Location: `apps/[app-name]/core/[feature]/`

```
apps/[app-name]/
└── core/
    └── [feature]/              # App-specific cross-domain feature
        ├── hooks/
        ├── services/
        ├── providers/
        ├── types/
        └── utils/
```

**When to Use Each:**

| Feature                 | Scope           | Location                                | Example                             |
| ----------------------- | --------------- | --------------------------------------- | ----------------------------------- |
| Used by multiple apps   | Cross-app       | `packages/[feature]/`                   | Auth, Analytics, Error Handling     |
| Used by one app only    | App-specific    | `apps/[app-name]/core/[feature]/`       | App-specific integrations, services |
| Used by one domain only | Domain-specific | `apps/[app-name]/domains/[Domain]/lib/` | Domain utilities                    |

**Rules:**

- Cross-domain features can be used by multiple domains
- Domains can import from `packages/` and `core/` but not from other domains
- Cross-domain features should not depend on specific domain implementations
- Cross-domain features follow the same top-down flow rule
- App core can use packages, but packages should not depend on app core

**Example Use Cases:**

- **Cross-App:** Authentication (packages/auth), Analytics (packages/analytics)
- **App Core:** App-specific payment gateway integration, app-specific API client
- **Domain Lib:** UserProfile validation utils, Cashier currency formatting

### TypeScript Conventions

**index.tsx exports:** Use function declarations with explicit props typing for type safety and IntelliSense:

```typescript
export function ComponentName(props: ComponentNameProps) {
  // Implementation
}
```

### Type Composition Patterns

**Top-Down Flow Rule:** Both type composition and logical functions (hooks, utilities) must flow from top to bottom only. Higher levels (domain) can be used by lower levels (components, subcomponents), but never the reverse.

**Type Hierarchy:**

1. **Cross-app level** (`packages/[feature]/types/index.ts`) - Shared types across all apps
2. **App core level** (`apps/[app-name]/core/[feature]/types/index.ts`) - App-specific shared types
3. **Domain level** (`apps/[app-name]/domains/[Domain]/model/types.ts`) - Domain state types (can extend cross-app or core types)
4. **Component level** (`apps/[app-name]/domains/[Domain]/ui/[ComponentName]/types.ts`) - Extends/modifies domain types
5. **Subcomponent level** (`apps/[app-name]/domains/[Domain]/ui/[ComponentName]/components/[SubComponent]/types.ts`) - Extends/modifies component types

**Function/Hook Hierarchy:**

1. **Cross-app level** (`packages/[feature]/hooks/use[Feature].ts`) - Shared hooks across all apps
2. **App core level** (`apps/[app-name]/core/[feature]/hooks/use[Feature].ts`) - App-specific shared hooks
3. **Domain level** (`apps/[app-name]/domains/[Domain]/hooks/use[Domain].ts`) - Domain hooks (can use packages/ or core/)
4. **Component level** (`apps/[app-name]/domains/[Domain]/ui/[ComponentName]/hooks/`) - Component-specific hooks (if needed)
5. **Subcomponent level** (`apps/[app-name]/domains/[Domain]/ui/[ComponentName]/components/[SubComponent]/hooks/`) - Subcomponent-specific hooks (if needed)

**Examples:**

```typescript
// ✅ CORRECT: Domain extends cross-app type
// packages/auth/types/index.ts
export interface BaseUser {
  id: string;
  email: string;
}

// apps/[app-name]/domains/[Domain]/model/types.ts
import type { BaseUser } from "@packages/auth/types";

export interface User extends BaseUser {
  name: string;
  role: "admin" | "user";
}

// ✅ CORRECT: Component extends domain type
// [Domain]/ui/UserProfile/types.ts
import type { User } from "../../../model/types";

export interface UserProfileProps extends Pick<User, "id" | "name" | "email"> {
  showRole?: boolean;
}

// ✅ CORRECT: Subcomponent extends component type
// [Domain]/ui/UserProfile/components/UserAvatar/types.ts
import type { UserProfileProps } from "../../types";

export interface UserAvatarProps extends Pick<UserProfileProps, "id" | "name"> {
  size?: "small" | "medium" | "large";
}

// ❌ INCORRECT: Domain type extending component type (bottom-up)
// [Domain]/model/types.ts
import type { UserProfileProps } from "../ui/UserProfile/types"; // ❌ Don't do this
export interface User extends UserProfileProps {} // ❌ Don't do this
```

**Function/Hook Examples:**

```typescript
// ✅ CORRECT: Domain hook uses cross-app hook
// packages/auth/hooks/useAuth.ts
export function useAuth() {
  // Cross-app authentication logic
  return { user, login, logout, isAuthenticated };
}

// apps/[app-name]/domains/[Domain]/hooks/useUserProfile.ts
import { useAuth } from "@packages/auth/hooks/useAuth";

export function useUserProfile() {
  const { user, isAuthenticated } = useAuth(); // ✅ Using cross-app hook
  // Domain-specific user logic
  return { user, profile, updateProfile };
}

// ✅ CORRECT: Component hook uses domain hook
// [Domain]/ui/LoginForm/hooks/useLoginForm.ts
import { useUserState } from "../../../hooks/useUserState";

export function useLoginForm() {
  const { user } = useUserState(); // ✅ Using domain hook
  // Component-specific logic
  return { handleSubmit, errors };
}

// ✅ CORRECT: Subcomponent hook uses component hook
// [Domain]/ui/LoginForm/components/EmailInput/hooks/useEmailInput.ts
import { useLoginForm } from "../../../hooks/useLoginForm";

export function useEmailInput() {
  const { handleSubmit } = useLoginForm(); // ✅ Using component hook
  // Subcomponent-specific logic
  return { value, onChange, validate };
}

// ❌ INCORRECT: Domain hook using component hook (bottom-up)
// [Domain]/hooks/useAuthState.ts
import { useLoginForm } from "../ui/LoginForm/hooks/useLoginForm"; // ❌ Don't do this
export function useAuthState() {
  const { handleSubmit } = useLoginForm(); // ❌ Don't do this
}
```

**Allowed Utility Types:**

- `Extend` / `&` - Add properties to base types
- `Omit<T, K>` - Remove properties from base types
- `Pick<T, K>` - Select specific properties from base types
- `Partial<T>` - Make all properties optional
- `Required<T>` - Make all properties required
- `Readonly<T>` - Make all properties readonly

**Rules:**

- **Types flow downward only**: Page → Domain → Component → Subcomponent
  - Never import types from lower levels into higher levels
  - Page types can be extended by domain types
  - Base types should be defined at the page or domain level
  - Components and subcomponents should compose/extend domain types, not redefine them
- **Functions/Hooks flow downward only**: Page → Domain → Component → Subcomponent
  - Never import hooks or utilities from lower levels into higher levels
  - Page hooks can be used by domain hooks
  - Domain hooks contain business logic and can be used by component hooks
  - Component hooks can be used by subcomponent hooks, but not by domain or page hooks
  - Higher-level hooks should not depend on lower-level implementation details
- **Page-level features are shared**: Multiple domains can use the same page-level feature
  - Page-level features should not depend on specific domain implementations
  - Domains can import and use page-level types, hooks, and utilities

### Atomic Hierarchy

Components organized by complexity level:

- **Atoms** → Base building blocks (buttons, inputs, labels)
  - Keep atoms "dumb" - prop-only components, no business logic
- **Molecules** → Simple combinations (form fields, search bars)
- **Organisms** → Complex compositions (headers, cards, forms)
- **Templates** → Generic page-level layouts (in UI library)
  - Generic, reusable templates for common page structures
  - App-specific implementations should live in app-specific component folders
  - App-specific components should follow the same design patterns as the UI library
  - **Note:** App-specific components should only be promoted to template status if they are reused across multiple domains

**UI Library vs App-Specific Components:**

- **UI Library (`packages/ui/`):** Generic, reusable templates and components
  - Templates: Generic page layouts, dashboard layouts, etc.
  - Should be framework-agnostic or support multiple frameworks
  - Follow design system patterns

- **App-Specific Components (`apps/[app]/app/components/`):** Specific implementations
  - More specific, domain-aware implementations
  - Should follow the same design patterns as UI library components
  - Can compose UI library components with app-specific logic
  - Example: `apps/casino/app/components/CashierModal/` - specific to casino domain

**Subcomponents:** Use local `components/` directories when internal structure is needed. Subcomponents follow the same structure as parent components (types.ts, utils.ts, constants.ts, [ComponentName].tsx, index.tsx) and are organized within the parent component's `components/` folder.

**Domain/Feature Organization:** Feature/domain folders contain all things relating to that domain/feature, not in atomic design atoms.

---

## State Architecture

**Note:** The current implementation uses a custom Redux-like state management library (@nathanhfoster/resurrection), but the architecture is designed to be state-management agnostic. The Container/Presentation pattern with hooks abstraction layer makes it easier to migrate to TanStack Query/Store or other state management solutions in the future without major refactoring.

### Container/Presentation Pattern with Hooks

**Separation of Concerns:**

- **Domain container** (`[Domain]/index.tsx`) - Orchestration layer, uses domain hooks, passes data to UI components
- **Domain hooks** (`[Domain]/hooks/`) - Business logic, API calls, state management
- **Presentation components** (`[Domain]/ui/[ComponentName]/`) - Pure UI rendering, no side effects, receive everything via props

**Data Flow:**

1. Domain container (`[Domain]/index.tsx`) calls domain hooks to get state and actions
2. Domain hooks handle all state management (Redux, API calls, etc.)
3. Domain container passes state and handlers as props to presentation components in `ui/`
4. Presentation components render UI based on props only

### Domain Container Component Pattern

**How the Domain Container Uses Hooks:**

The domain container component (`[Domain]/index.tsx`) is responsible for:

1. Calling domain hooks to get state and actions
2. Passing all state and handlers as props to presentation components in `ui/`
3. Acting as the bridge between state management and UI

**Example Implementation:**

**1. Domain Hook Implementation (Foundation):**

```typescript
// [Domain]/hooks/use[Domain].ts
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, updateData } from '../model/[domain]Slice';

export function use[Domain](props: [Domain]Props) {
  const dispatch = useDispatch();

  // Get state from Redux (or TanStack Query/Store in future)
  const data = useSelector((state) => state.[domain].data);
  const isLoading = useSelector((state) => state.[domain].isLoading);
  const error = useSelector((state) => state.[domain].error);

  // Business logic handlers
  const handleSubmit = (formData: FormData) => {
    dispatch(updateData(formData));
  };

  const handleChange = (field: string, value: string) => {
    // Handle field changes
  };

  const handleReset = () => {
    dispatch(fetchData());
  };

  // Return everything the presentation components need
  return {
    data,
    isLoading,
    error,
    handleSubmit,
    handleChange,
    handleReset,
  };
}
```

**2. Domain Container Component (Uses Hook):**

```typescript
// [Domain]/index.tsx - Domain Container Component
import { use[Domain] } from './hooks/use[Domain]';
import { ComponentName } from './ui/ComponentName';
import type { [Domain]Props } from './model/types';

export function [Domain](props: [Domain]Props) {
  // Domain hook handles all state management, API calls, business logic
  const {
    // State from hook
    data,
    isLoading,
    error,
    // Actions/handlers from hook
    handleSubmit,
    handleChange,
    handleReset,
  } = use[Domain](props);

  // Domain container passes everything as props to presentation components
  return (
    <ComponentName
      data={data}
      isLoading={isLoading}
      error={error}
      onSubmit={handleSubmit}
      onChange={handleChange}
      onReset={handleReset}
    />
  );
}
```

**3. Presentation Component (Receives Props):**

```typescript
// [Domain]/ui/ComponentName/ComponentName.tsx - Pure Presentation Component
import type { ComponentNameProps } from './types';

export function ComponentName({
  data,
  isLoading,
  error,
  onSubmit,
  onChange,
  onReset,
}: ComponentNameProps) {
  // Pure UI rendering - no hooks, no state management, no side effects
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <form onSubmit={onSubmit}>
      <input onChange={(e) => onChange('field', e.target.value)} />
      <button type="submit">Submit</button>
      <button type="button" onClick={onReset}>Reset</button>
    </form>
  );
}
```

### Domain Export Pattern

**Domain Container Export:**
The domain `index.tsx` file serves as the container component and the public export. Consumers import the domain container, which handles all orchestration:

```typescript
// Usage from other components/apps
import { [Domain] } from '@/domains/[Domain]';
import type { [Domain]Props } from '@/domains/[Domain]';
```

**Presentation Component Export:**
Presentation components in `ui/[ComponentName]/index.tsx` export the component and types for internal use or direct composition:

```typescript
// Internal usage within domain or direct composition
import { ComponentName } from "@/domains/[Domain]/ui/ComponentName";
import type { ComponentNameProps } from "@/domains/[Domain]/ui/ComponentName";
```

**Note:** Typically, consumers should import the domain container, not individual UI components. UI components are primarily for internal domain composition or when direct presentation-only components are needed.

### Constants and Utils Files

**When to use `constants.ts`:**

- Component-specific enums
- Configuration values (limits, thresholds, default values)
- Static data arrays/objects used only by this component
- Magic numbers or strings that should be named constants

**Example `constants.ts`:**

```typescript
// constants.ts
export const MAX_FORM_LENGTH = 100;
export const MIN_PASSWORD_LENGTH = 8;
export const DEFAULT_TIMEOUT = 5000;

export enum FormStatus {
  IDLE = "idle",
  SUBMITTING = "submitting",
  SUCCESS = "success",
  ERROR = "error",
}

export const VALIDATION_RULES = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+?[\d\s-()]+$/,
} as const;

export const DEFAULT_FORM_VALUES = {
  name: "",
  email: "",
  phone: "",
} as const;
```

**When to use `utils.ts`:**

- Pure helper functions specific to this component
- Data transformation functions
- Validation helpers
- Formatting functions
- Calculation utilities

**Example `utils.ts`:**

```typescript
// utils.ts
import type { FormData } from "./types";
import { VALIDATION_RULES } from "./constants";

export function validateEmail(email: string): boolean {
  return VALIDATION_RULES.email.test(email);
}

export function formatPhoneNumber(phone: string): string {
  return phone
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
}

export function calculateTotal(items: FormData[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, "");
}
```

**Note:** Only create these files if the component has constants or utilities that are:

- Specific to this component (not shared across components)
- Used in multiple places within the component
- Complex enough to warrant extraction

If constants/utils are simple and only used once, keep them inline. If they're shared across multiple components, move them to a shared location.

### Naming Convention

**Hook Naming:** Use `use[Domain]` for main domain hooks and `use[DomainAction]` for action-specific hooks.

**Examples:**

- `useUserProfile()` - Main domain hook for UserProfile domain
- `useUpdateProfile()` - Action-specific hook for profile updates
- `useCashier()` - Main domain hook for Cashier domain
- `useDeposit()` - Action-specific hook for deposit actions

**Rationale:**

- Concise and follows React conventions (e.g., `useAuth`, not `useAuthState`)
- Hooks already imply state management by nature
- Matches industry standards (React Query: `useQuery`, Redux: `useSelector`)

### Future Migration Path to TanStack

The Container/Presentation pattern with hooks abstraction provides a clean migration path:

**Current (Redux):**

- Domain hooks encapsulate Redux dispatch/selectors
- Domain container uses hooks and passes data to presentation components
- Presentation components receive props from domain container
- State management logic isolated in domain hooks

**Future (TanStack Query/Store):**

- Domain hooks can be updated to use TanStack Query for server state
- TanStack Store for client state (replacing Redux)
- Domain container and presentation components remain unchanged (same props interface)
- Minimal refactoring required - only hook implementations change

**Benefits of this architecture:**

- **Abstraction layer** - State management details hidden from domain container and presentation components
- **Easy migration** - Swap state management library without touching domain container or presentation layer
- **Testability** - Mock domain hooks independently of state management implementation
- **Flexibility** - Can mix Redux and TanStack during gradual migration

---

## SOLID & DRY Principles

### SOLID Application

- **Single Responsibility** - Each file/module has one clear purpose
- **Open/Closed** - Components extendable without modification
- **Liskov Substitution** - Component variants interchangeable via consistent interfaces
- **Interface Segregation** - Props interfaces scoped to component needs
- **Dependency Inversion** - Components depend on abstractions, not implementations

### DRY (Don't Repeat Yourself)

- Shared utilities across applications
- Centralized design tokens
- Reusable component library
- Eliminates code duplication

---

## Clean Architecture Principles

Our architecture applies Clean Architecture principles through the monorepo structure:

- **Dependency Rule**: Dependencies flow top-down only (packages → core → domains → UI)
- **Separation of Concerns**: Each layer has a single, clear responsibility
- **Domain-Centric**: Business logic lives in domains, isolated from framework
- **Testability**: Each layer can be tested independently
- **Framework Independence**: Domain logic doesn't depend on Next.js specifics
- **Shared Packages**: Cross-app features in `packages/` promote reusability across all apps
- **App Isolation**: Each app in `apps/[app-name]/` is self-contained with its own core features

---

## Scalable Test Strategy for Monorepo

### Overview

A comprehensive testing strategy designed for a multi-zone architecture supporting horizontal scalability and framework-agnostic testing across Next.js (apps/casino) and Solid Start (apps/main) applications.

### Test Structure

Each application maintains its own test directory while sharing common testing utilities:

```
apps/
├─ casino/
│  └─ tests/
│     ├─ unit/              # Jest unit tests
│     │  ├─ components/     # Component tests
│     │  ├─ domains/        # Domain/feature tests
│     │  ├─ hooks/          # Hook tests
│     │  ├─ lib/            # Library tests
│     │  ├─ util/           # Utility tests
│     │  └─ jest.setup.js   # Jest configuration
│     └─ e2e/               # Playwright E2E tests
│        ├─ helpers/        # Test data generators
│        └─ *.spec.ts       # E2E test files
└─ main/
   └─ tests/                # Solid Start tests (to be implemented)
      ├─ unit/              # Vitest unit tests
      └─ e2e/               # Playwright E2E tests
```

### Testing Layers

#### 1. Unit Tests

**Framework-Specific Configuration:**

- **Next.js (apps/casino):** Jest with `@testing-library/react`
  - Test files: `*.test.{js,jsx,ts,tsx}` or `*.spec.{js,jsx,ts,tsx}`
  - Location: Co-located with components or in `tests/unit/`
  - Setup: `tests/unit/jest.setup.js` (mocks, polyfills, global config)

- **Next.js (apps/main):** Jest with `@testing-library/react`
  - Test files: `*.test.{js,jsx,ts,tsx}` or `*.spec.{js,jsx,ts,tsx}`
  - Location: Co-located with components or in `tests/unit/`
  - Setup: `tests/unit/jest.setup.js` (mocks, polyfills, global config)

**Shared Testing Utilities:**

Create shared test utilities in `packages/test-utils/` for:

- Mock factories (API responses, state management state)
- Test data generators
- Custom render functions (React and SolidJS)
- Common assertions
- Accessibility testing helpers

#### 2. Integration Tests

**Cross-Framework Testing:**

- Test shared business logic in `packages/` independently of framework
- Use framework-agnostic test runners (Vitest recommended)
- Test state management stores, services, and utilities without framework dependencies

**Multi-Zone Integration:**

- Test routing between zones (casino ↔ main)
- Verify shared state management across zones
- Test authentication/authorization across zones
- Validate API contract consistency

#### 3. End-to-End Tests

**Playwright Configuration:**

- **Multi-app support:** Configure Playwright to test both apps
- **Zone routing:** Test navigation between Next.js and Solid Start zones
- **Shared test helpers:** Use `tests/e2e/helpers/` for reusable test data and utilities

**E2E Test Structure:**

```typescript
// tests/e2e/helpers/testData.ts
export function generateTestUser() {
  // Framework-agnostic test data generation
}

// tests/e2e/casino/registration.spec.ts
test("Registration flow in Next.js zone", async ({ page }) => {
  // Test Next.js app
});

// tests/e2e/main/portfolio.spec.ts
test("Portfolio page in main app", async ({ page }) => {
  // Test main app
});

// tests/e2e/integration/zone-navigation.spec.ts
test("Navigation between zones", async ({ page }) => {
  // Test cross-zone navigation
});
```

### Multi-Zone Architecture Testing

#### Zone-Specific Testing

**apps/casino (Next.js):**

- Server-side rendering tests
- Next.js routing and middleware
- React component lifecycle
- Next.js API routes

**apps/main (Next.js):**

- Server-side rendering tests
- PWA functionality testing
- MDX blog post rendering
- Next.js App Router features

#### Cross-Zone Testing

**Navigation Testing:**

- Verify seamless navigation between zones
- Test shared authentication state
- Validate shared state management synchronization
- Test shared design system components

**Performance Testing:**

- Measure and compare performance between zones
- Track Core Web Vitals (LCP, FID, CLS)
- Monitor bundle sizes and load times
- Optimize each app for its specific use case

### Horizontal Scalability Considerations

#### Parallel Test Execution

**Turbo Integration:**

```json
// turbo.json
{
  "tasks": {
    "test": {
      "dependsOn": ["^build"],
      "inputs": ["$TURBO_DEFAULT$", "jest.config.*", "vitest.config.*"],
      "outputs": ["coverage/**"]
    },
    "test:e2e": {
      "dependsOn": ["^build"],
      "cache": false,
      "persistent": true
    }
  }
}
```

**Test Distribution:**

- Run unit tests in parallel across apps
- Use Turbo's caching for unchanged code
- Distribute E2E tests across multiple workers
- Isolate test environments per app

#### CI/CD Strategy

**Test Pipeline:**

1. **Unit Tests:** Run in parallel for all apps
2. **Integration Tests:** Run after unit tests pass
3. **E2E Tests:** Run against staging environment
4. **Performance Tests:** Run on critical paths

**Scalability:**

- Use matrix builds for multiple app versions
- Cache test dependencies and build artifacts
- Run tests only for changed apps (Turbo filtering)
- Parallel E2E test execution with proper isolation

### Performance Testing Strategy

#### Performance as High Priority

Given performance is a high priority, implement comprehensive performance testing:

**Metrics to Track:**

- **Time to Interactive (TTI)** - Measure when app becomes interactive
- **First Contentful Paint (FCP)** - Measure initial render time
- **Largest Contentful Paint (LCP)** - Measure main content load
- **Cumulative Layout Shift (CLS)** - Measure visual stability
- **Bundle Size** - Track JavaScript bundle sizes
- **Memory Usage** - Monitor memory consumption

**Performance Test Structure:**

```typescript
// tests/performance/lighthouse.spec.ts
test("Lighthouse scores meet thresholds", async ({ page }) => {
  // Run Lighthouse audits
});

// tests/performance/bundle-size.spec.ts
test("Bundle sizes within limits", () => {
  // Analyze bundle sizes
});

// tests/performance/load-time.spec.ts
test("Critical pages load within threshold", async ({ page }) => {
  // Measure load times
});
```

**Performance Optimization Testing:**

- Compare performance metrics across iterations
- Test performance-critical pages and optimizations
- Validate performance improvements meet targets
- Monitor for performance regressions

### Framework-Agnostic Testing Patterns

#### Shared Test Utilities

**Location:** `packages/test-utils/`

```typescript
// packages/test-utils/src/mocks/apiMocks.ts
export function createMockApiResponse<T>(data: T) {
  // Framework-agnostic API mock
}

// packages/test-utils/src/render/react.tsx
export function renderWithProviders(component: ReactElement) {
  // React-specific render helper for Next.js apps
}
```

#### Component Testing Patterns

**React/Next.js (All Apps):**

```typescript
import { render, screen } from '@testing-library/react';
import { ComponentName } from './ComponentName';

test('ComponentName renders correctly', () => {
  render(<ComponentName {...props} />);
  expect(screen.getByText('Expected Text')).toBeInTheDocument();
});
```

### Test Coverage Strategy

#### Coverage Targets

- **Unit Tests:** 80%+ coverage for business logic
- **Component Tests:** 70%+ coverage for UI components
- **Integration Tests:** Critical user flows covered
- **E2E Tests:** All critical paths covered

#### Coverage Reporting

- Generate coverage reports per app
- Aggregate coverage across monorepo
- Track coverage trends over time
- Set coverage gates in CI/CD

### Best Practices

1. **Co-locate tests** with source code when possible
2. **Use shared test utilities** to avoid duplication
3. **Mock external dependencies** (APIs, services, browser APIs)
4. **Test behavior, not implementation** - focus on user-facing functionality
5. **Keep tests fast** - unit tests should run in milliseconds
6. **Write deterministic tests** - avoid flaky tests with proper async handling
7. **Test accessibility** - use `@testing-library/jest-dom` and `jest-axe`
8. **Performance test critical paths** - especially for Solid Start migrations
9. **Maintain test data generators** - use `tests/e2e/helpers/testData.js` pattern
10. **Document test patterns** - keep test READMEs updated

### Performance Optimization Strategy

When optimizing application performance:

1. **Baseline Metrics:** Measure current performance with Lighthouse and Core Web Vitals
2. **Identify Bottlenecks:** Use profiling tools to find optimization opportunities
3. **Implement Optimizations:** Apply performance improvements (code splitting, caching, lazy loading, etc.)
4. **Performance Validation:** Verify optimizations meet/exceed performance targets
5. **Feature Parity:** Ensure all features work identically after optimization
6. **Iterative Approach:** Optimize incrementally with comprehensive testing

---

## Next Steps

1. **Create templates** - Scaffold generators for standard component structure
2. **Document examples** - Add real-world implementations to Storybook
3. **Team training** - Walkthrough sessions on architecture patterns

---

## Package Export Patterns

### Explicit Exports for TypeScript Resolution

**Problem:** TypeScript's module resolution can fail with deep `export *` chains, especially when:

- Multiple levels of re-exports (`index.ts` → `lib/index.ts` → `hooks/index.ts`)
- Default exports are re-exported as named exports
- Package.json has `"development"` condition pointing to source while types point to dist

**Solution:** Use explicit named exports instead of `export *` for better TypeScript resolution.

**Pattern:**

```typescript
// ❌ AVOID: Deep export * chains that TypeScript may not resolve
export * from "./hooks";
export * from "./utils";

// ✅ PREFER: Explicit named exports
export {
  useEffectAfterMount,
  useLayoutEffectAfterMount,
  useThrottledCallback,
  // ... all other exports
} from "./hooks";
export {
  combineClassNames,
  // ... all other exports
} from "./utils";
```

**When to Use Explicit Exports:**

1. **Package entry points** (`packages/*/src/index.ts`) - Main exports that other packages import
2. **Intermediate index files** (`packages/*/src/lib/index.ts`) - When re-exporting from subdirectories
3. **Any export that consumers directly import** - If TypeScript can't resolve it, use explicit exports

**When `export *` is Acceptable:**

- Internal module organization within a single package
- Type-only exports (`export type * from`)
- Simple, single-level re-exports that don't cause resolution issues

**Example Implementation:**

```typescript
// packages/resurrection/src/lib/index.ts
// ✅ Explicit exports for all hooks
export {
  useBooleanToggler,
  useDebouncedCallback,
  useEffectAfterMount,
  // ... all hooks explicitly listed
} from "./hooks";

// packages/resurrection/src/index.ts
// ✅ Re-export commonly used items explicitly for safety
export {
  useEffectAfterMount,
  useLayoutEffectAfterMount,
  useThrottledCallback,
} from "./lib";
export * from "./lib"; // Still use export * for everything else
```

**Benefits:**

- **Reliable TypeScript resolution** - TypeScript can always find the exports
- **Better IDE support** - Autocomplete and IntelliSense work correctly
- **Clearer API surface** - Explicit exports document what's available
- **Easier debugging** - Import errors are more obvious

**Apply This Pattern To:**

- All `packages/*/src/index.ts` files (package entry points)
- All `packages/*/src/lib/index.ts` or similar intermediate index files
- Any file where TypeScript reports "has no exported member" errors

---

## Key Takeaways for AI Tools

When generating or modifying frontend code:

1. **Always use TypeScript** with function declarations and explicit props typing
2. **Atomic Design ONLY in UI Library** - `packages/ui/` uses atoms → molecules → organisms → templates. Domain components (`domains/[Domain]/ui/`) are organized by purpose, NOT atomic levels
3. **Keep atoms "dumb"** - prop-only components, no business logic
4. **Templates exist** - Generic templates in UI library, app-specific implementations in app component folders
5. **Separate concerns** - Domain container at domain level, domain hooks for business logic, Presentation components in ui/ folder
6. **Co-locate stories** - Storybook stories should be with components
7. **Organize domains by feature (FSD)** - Use `domains/[Domain]/` structure, organize UI by purpose not atomic levels
8. **Follow Clean Architecture** - Separate layers: app/ (routes), lib/ (cross-domain), domains/ (business logic)
9. **Apply SOLID principles** - Single responsibility, proper abstractions
10. **Avoid duplication** - Use shared utilities and design tokens
11. **Export pattern** - Use `index.tsx` with function declarations and typed exports
12. **Explicit exports for packages** - Use explicit named exports in package entry points instead of `export *` to ensure TypeScript resolution works correctly
13. **Write tests** - Co-locate unit tests with components, use shared test utilities
14. **Test framework-agnostic code** - Business logic in `packages/` should be framework-independent
15. **Consider multi-zone architecture** - Code may run in Next.js (casino) or Solid Start (main)
16. **Performance is critical** - Optimize for performance, especially when migrating to Solid Start
17. **Use shared test utilities** - Leverage `packages/test-utils/` for common testing patterns
18. **Cross-app features in packages/** - Features used by ALL apps go in `packages/[feature]/` (auth, analytics, error-handling)
19. **App core in core/** - App-specific cross-domain features go in `apps/[app-name]/core/[feature]/`
20. **Domain lib/** - Domain-specific utilities ONLY go in `apps/[app-name]/domains/[Domain]/lib/`
21. **Top-down flow rule** - Types, hooks, and functions flow from packages/ → core/ → domain → component → subcomponent only. Never import lower-level code into higher levels
22. **Hook naming** - Use `use[Domain]` for main hooks (e.g., `useUserProfile`, `useCashier`), not `use[Domain]State`

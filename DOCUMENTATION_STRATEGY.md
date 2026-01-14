# Documentation Strategy

## Overview

This document outlines our documentation strategy for the monorepo, balancing discoverability with maintenance efficiency.

## Documentation Philosophy

**Principle:** Documentation should be **co-located** with code when it provides immediate context, and **centralized** when it provides architectural guidance.

**Goals:**
- ✅ Quick discovery of "how to use this"
- ✅ Clear understanding of "why this exists"
- ✅ Easy onboarding for new developers
- ✅ Minimal maintenance burden
- ✅ Single source of truth for architecture

---

## Documentation Hierarchy

### 1. Root Level (Centralized)

**Files:**
- `README.md` - **NEEDS UPDATE** - Project overview, quick start, links to other docs
- `FRONTEND_ARCHITECTURE.md` - Complete architecture reference (source of truth)
- `TESTING.md` - Testing strategy and patterns
- `DOCUMENTATION_STRATEGY.md` - This file

**Purpose:** High-level overview, architecture decisions, cross-cutting concerns

---

### 2. Package Level (Co-located)

**Location:** `packages/[package-name]/README.md`

**When to Create:**
- ✅ Package has public API that others import
- ✅ Package has complex setup or configuration
- ✅ Package has non-obvious usage patterns
- ✅ Package has multiple ways to use it

**What to Include:**
- Purpose and use case
- Installation (if needed)
- Basic usage examples
- API overview (link to detailed docs if needed)
- Configuration options
- Link to architecture doc for patterns

**Examples:**
- ✅ `packages/ui/README.md` - Component library usage
- ✅ `packages/auth/README.md` - Authentication setup
- ✅ `packages/resurrection/README.md` - State management
- ❌ `packages/utils/README.md` - Probably not needed (simple utilities)

**Current Status:**
- ✅ `packages/auth/README.md` - Exists
- ✅ `packages/resurrection/README.md` - Exists
- ✅ `packages/pwa/README.md` - Exists
- ✅ `packages/eslint-config/README.md` - Exists
- ❌ `packages/ui/README.md` - **MISSING** (has DESIGN_SYSTEM.md, but needs README)
- ❌ `packages/cookies/README.md` - **MISSING**
- ❌ `packages/indexeddb/README.md` - **MISSING**
- ❌ `packages/openai/README.md` - **MISSING**
- ❌ `packages/utils/README.md` - **MISSING** (may not be needed)

---

### 3. App Level (Co-located)

**Location:** `apps/[app-name]/README.md`

**When to Create:**
- ✅ Always (every app should have one)

**What to Include:**
- App purpose and features
- Tech stack
- Getting started (dev, build, deploy)
- Environment variables
- Project structure (high-level)
- Link to architecture doc

**Current Status:**
- ✅ `apps/main/README.md` - Exists
- ✅ `apps/resume/README.md` - Exists
- ❌ `apps/astralpoet/readme.md` - Exists (lowercase, should be README.md)

---

### 4. Core Feature Level (Co-located)

**Location:** `apps/[app-name]/core/[feature]/README.md`

**When to Create:**
- ✅ Feature has complex setup
- ✅ Feature has non-obvious usage patterns
- ✅ Feature is shared across multiple domains
- ✅ Feature has configuration that needs explanation

**What to Include:**
- Feature purpose
- Setup/configuration
- Usage examples
- Integration with domains
- Common patterns

**Examples:**
- `apps/main/core/pwa/README.md` - PWA configuration for main app
- `apps/casino/core/payments/README.md` - Payment gateway integration

**Current Status:**
- ❌ No core feature READMEs exist yet

---

### 5. Domain Level (Co-located)

**Location:** `apps/[app-name]/domains/[Domain]/README.md`

**When to Create:**
- ✅ Domain has complex business logic
- ✅ Domain has non-obvious API
- ✅ Domain has specific patterns or conventions
- ✅ Domain is large or has many components

**What to Include:**
- Domain purpose and scope
- Key concepts
- Usage examples
- Component overview
- Hooks overview
- API endpoints (if applicable)
- Common patterns

**Examples:**
- `apps/resume/domains/Resume/README.md` - Resume domain overview
- `apps/main/domains/Blog/README.md` - Blog domain overview

**Current Status:**
- ❌ No domain READMEs exist yet

---

### 6. Complex Service/Utility Level (Co-located)

**Location:** `[location]/[ServiceName]/README.md`

**When to Create:**
- ✅ Service has complex logic or algorithms
- ✅ Service has non-obvious usage
- ✅ Service has configuration options
- ✅ Service is reused in multiple places

**What to Include:**
- Service purpose
- Usage examples
- Configuration
- API reference
- Common patterns

**Examples:**
- ✅ `packages/auth/src/services/EmailValidationService/README.md` - Exists
- `packages/utils/src/formatDate/README.md` - Probably not needed (simple)

**Current Status:**
- ✅ `packages/auth/src/services/EmailValidationService/README.md` - Exists

---

## Recommended README Structure Template

### Package/App README Template

```markdown
# [Package/App Name]

## Purpose
Brief description of what this is and why it exists.

## Installation
```bash
pnpm install @nathanhfoster/[package-name]
```

## Usage
Basic usage examples.

## API
Link to detailed API docs or list main exports.

## Configuration
Configuration options if applicable.

## Examples
More complex usage examples.

## Architecture
This [package/app] follows the monorepo's [FRONTEND_ARCHITECTURE.md](../../FRONTEND_ARCHITECTURE.md) principles.

## Related
- Link to related packages/apps
- Link to architecture doc
```

### Domain README Template

```markdown
# [Domain Name] Domain

## Purpose
Business domain description and scope.

## Structure
```
[Domain]/
├── index.tsx          # Domain container
├── api/               # API integration
├── model/            # State management
├── lib/               # Domain utilities
├── hooks/             # Business logic
└── ui/                # Presentation components
```

## Key Concepts
Important domain concepts and terminology.

## Usage
```typescript
import { [Domain] } from '@/domains/[Domain]';

<[Domain] {...props} />
```

## Components
- ComponentName - Description
- AnotherComponent - Description

## Hooks
- use[Domain]() - Main domain hook
- use[DomainAction]() - Action-specific hook

## API
API endpoints if applicable.

## Patterns
Common patterns and best practices for this domain.

## Related
- Link to related domains
- Link to architecture doc
```

---

## Priority Recommendations

### High Priority (Do First)

1. **Update Root README.md**
   - Replace template content
   - Add project overview
   - Link to architecture docs
   - Quick start guide

2. **Add Package READMEs for Public APIs**
   - `packages/ui/README.md` - Component library usage
   - `packages/cookies/README.md` - Cookie management
   - `packages/indexeddb/README.md` - IndexedDB utilities
   - `packages/openai/README.md` - OpenAI integration

3. **Add Domain READMEs for Complex Domains**
   - `apps/resume/domains/Resume/README.md` - Resume domain
   - `apps/main/domains/Blog/README.md` - Blog domain (if complex)

### Medium Priority

4. **Add Core Feature READMEs**
   - `apps/main/core/pwa/README.md` - PWA configuration

5. **Standardize Existing READMEs**
   - Fix `apps/astralpoet/readme.md` → `README.md`
   - Ensure consistent structure across all READMEs

### Low Priority (Nice to Have)

6. **Add READMEs for Simple Utilities**
   - Only if usage is non-obvious
   - Prefer JSDoc comments for simple utilities

---

## Documentation Maintenance

### When to Update Documentation

- ✅ When adding new public APIs
- ✅ When changing architecture patterns
- ✅ When adding complex features
- ✅ When onboarding reveals gaps
- ✅ During code reviews (if docs are outdated)

### When NOT to Create Documentation

- ❌ For simple, self-explanatory code
- ❌ For private/internal implementations
- ❌ For code that's well-documented with JSDoc
- ❌ For code that changes frequently (prefer code comments)

### Documentation Review

- Review documentation during code reviews
- Update architecture doc when patterns change
- Remove outdated documentation
- Consolidate duplicate information

---

## Documentation Tools

### JSDoc Comments
Use JSDoc for inline documentation:
```typescript
/**
 * Validates an email address format.
 * @param email - The email address to validate
 * @returns True if email is valid, false otherwise
 * @example
 * ```typescript
 * const isValid = validateEmail('user@example.com');
 * ```
 */
export function validateEmail(email: string): boolean {
  // ...
}
```

### TypeScript Types as Documentation
Well-named types and interfaces serve as documentation:
```typescript
/**
 * User profile data structure
 */
export interface UserProfile {
  /** Unique user identifier */
  id: string;
  /** User's display name */
  name: string;
  /** User's email address */
  email: string;
}
```

### Code Comments
Use comments for:
- Complex algorithms
- Non-obvious workarounds
- Business logic explanations
- TODO items with context

---

## Best Practices

1. **Keep it Simple** - Don't over-document simple code
2. **Keep it Updated** - Outdated docs are worse than no docs
3. **Link, Don't Duplicate** - Link to architecture doc instead of repeating
4. **Examples Over Explanations** - Show, don't just tell
5. **Co-locate When Helpful** - Put docs where developers will look
6. **Centralize Architecture** - Keep architecture decisions in one place
7. **Review Regularly** - Update docs during code reviews

---

## Quick Reference: Where to Put Docs

| Type | Location | When |
|------|----------|------|
| **Architecture decisions** | `FRONTEND_ARCHITECTURE.md` | Always |
| **Package usage** | `packages/[name]/README.md` | If public API |
| **App overview** | `apps/[name]/README.md` | Always |
| **Core feature** | `apps/[name]/core/[feature]/README.md` | If complex |
| **Domain overview** | `apps/[name]/domains/[Domain]/README.md` | If complex |
| **Service/utility** | `[location]/[Service]/README.md` | If non-obvious |
| **Inline docs** | JSDoc comments | Always for public APIs |
| **Type docs** | TypeScript types | Always |

---

## Next Steps

1. Update root `README.md` with project overview
2. Add missing package READMEs (ui, cookies, indexeddb, openai)
3. Add domain READMEs for complex domains (Resume, Blog)
4. Standardize existing READMEs
5. Review and update during next code review cycle

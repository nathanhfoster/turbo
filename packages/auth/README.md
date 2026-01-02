# @turbo/auth

Cross-app authentication utilities and services for the platform.

## Overview

This package provides authentication-related functionality that can be shared across all applications in the monorepo.

## Installation

This package is part of the monorepo and is automatically available as a workspace dependency.

```bash
# In your app's package.json
{
  "dependencies": {
    "@nathanhfoster/auth": "workspace:*"
  }
}
```

## Usage

### EmailValidationService

Comprehensive email validation service with multiple validation strategies.

```typescript
import {
  emailValidationService,
  VALIDATION_CHECKS,
} from '@nathanhfoster/auth';

// Validate email syntax and check against disposable email blacklist
const result = await emailValidationService.validate('user@example.com', [
  VALIDATION_CHECKS.CHECK_BLACKLIST,
]);

if (result.ok) {
  // Email is valid and not disposable
  console.log('Email accepted!');
} else {
  // Show error to user
  console.log('Validation failed:', result.value?.errors);
}
```

#### Available Validation Checks

- **CHECK_SYNTAX**: Validates email format using RFC 5322 compliant regex
- **CHECK_BLACKLIST**: Checks against 50K+ disposable email domains using mailchecker
- **CHECK_DOMAIN**: Verifies email domain has valid DNS records (server-side only)

#### Factory Functions

Create custom validators for testing or specialized use cases:

```typescript
import {
  createEmailValidationService,
  createSyntaxValidator,
  createBlacklistValidator,
  createDnsValidator,
} from '@nathanhfoster/auth';

// Create service with custom validators
const customService = createEmailValidationService({
  validators: {
    [VALIDATION_CHECKS.CHECK_DOMAIN]: mockDnsValidator,
  }
});
```

## Package Structure

```
packages/auth/
├── src/
│   ├── services/
│   │   └── EmailValidationService/
│   │       ├── constants.ts       # Email regex and constants
│   │       ├── types.ts           # TypeScript types and interfaces
│   │       ├── validators.ts      # Individual validator implementations
│   │       ├── service.ts         # Main service factory
│   │       ├── index.ts           # Public exports
│   │       └── README.md          # Detailed service documentation
│   └── index.ts                   # Package entry point
├── tests/
│   └── EmailValidationService.test.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Dependencies

- **@nathanhfoster/utils**: Core utility types (DomainResult)
- **mailchecker**: Disposable email detection library

## Development

```bash
# Check TypeScript types
pnpm check-types

# Run linting
pnpm lint
```

## Architecture

This package follows the frontend architecture patterns:

- **Cross-app package**: Located in `packages/auth/` for use across all apps
- **Service-oriented**: Provides reusable services with clear interfaces
- **Type-safe**: Full TypeScript support with exported types
- **Testable**: Factory pattern enables easy mocking and testing

## Migration Notes

This package was created by migrating the EmailValidationService from `apps/casino/domains/AuthDomain/` to enable cross-app usage. The service is re-exported from the original location for backward compatibility:

```typescript
// ✅ New import path (recommended)
import { emailValidationService } from '@nathanhfoster/auth';

// ✅ Old import path (still works via re-export)
import { emailValidationService } from '@/domains/AuthDomain';
```

## Future Enhancements

Potential additions to this package:
- Password validation utilities
- JWT token handling
- OAuth provider integrations
- Session management utilities
- Two-factor authentication helpers

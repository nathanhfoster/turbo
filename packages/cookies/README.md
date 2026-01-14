# @nathanhfoster/cookies

A type-safe cookie management library for client and server-side cookie operations.

## Purpose

This package provides utilities for managing cookies in both client and server environments, with TypeScript support and type safety.

## Installation

This package is part of the monorepo workspace. Install dependencies from the root:

```bash
pnpm install
```

## Usage

### Basic Cookie Operations

```typescript
import { CookieManager } from '@nathanhfoster/cookies';

// Create a cookie manager instance
const cookieManager = new CookieManager<string>({
  name: 'myCookie',
  maxAge: 3600, // 1 hour
  path: '/',
  sameSite: 'Lax',
});

// Set a cookie (client-side)
cookieManager.set('value');

// Get a cookie (client-side)
const value = cookieManager.get();

// Remove a cookie
cookieManager.remove();
```

### Server-Side Usage (Next.js)

```typescript
import { cookies } from 'next/headers';
import { CookieManager } from '@nathanhfoster/cookies';

// In server component or API route
const cookieStore = cookies();
const cookieManager = new CookieManager({
  name: 'session',
  cookieStore, // Pass Next.js cookie store
});

// Set cookie
cookieManager.set('session-value');

// Get cookie
const session = cookieManager.get();
```

### Type-Safe Cookies

```typescript
import { CookieManager } from '@nathanhfoster/cookies';

interface UserPreferences {
  theme: 'light' | 'dark';
  language: string;
}

const prefsManager = new CookieManager<UserPreferences>({
  name: 'userPreferences',
  maxAge: 31536000, // 1 year
});

// Set typed value
prefsManager.set({
  theme: 'dark',
  language: 'en',
});

// Get typed value
const prefs = prefsManager.get(); // Type: UserPreferences | null
```

### Utility Functions

```typescript
import {
  getCookie,
  setCookie,
  removeCookie,
  hasCookie,
} from '@nathanhfoster/cookies';

// Simple cookie operations
setCookie('name', 'value', { maxAge: 3600 });
const value = getCookie('name');
removeCookie('name');
const exists = hasCookie('name');
```

### Last Visited URL Manager

```typescript
import { LastVisitedURLCookieManager } from '@nathanhfoster/cookies';

const urlManager = new LastVisitedURLCookieManager();

// Set last visited URL
urlManager.set('/previous-page');

// Get last visited URL
const lastUrl = urlManager.get(); // Returns URL or null
```

## API Reference

### CookieManager

Main cookie management class.

```typescript
class CookieManager<T> {
  constructor(options: CookieManagerOptions);
  set(value: T): void;
  get(): T | null;
  remove(): void;
  has(): boolean;
}
```

#### Options

```typescript
interface CookieManagerOptions {
  name: string; // Cookie name
  maxAge?: number; // Max age in seconds
  expires?: Date; // Expiration date
  path?: string; // Cookie path (default: '/')
  domain?: string; // Cookie domain
  secure?: boolean; // HTTPS only
  sameSite?: 'Strict' | 'Lax' | 'None'; // SameSite attribute
  httpOnly?: boolean; // HTTP only (server-side)
  cookieStore?: CookieStore; // Next.js cookie store (server-side)
}
```

### Utility Functions

```typescript
// Get cookie value
function getCookie(name: string): string | null;

// Set cookie
function setCookie(
  name: string,
  value: string,
  options?: CookieOptions
): void;

// Remove cookie
function removeCookie(name: string, options?: CookieOptions): void;

// Check if cookie exists
function hasCookie(name: string): boolean;
```

## Client-Side vs Server-Side

### Client-Side

Works automatically in browser environment:

```typescript
import { CookieManager } from '@nathanhfoster/cookies';

const manager = new CookieManager({ name: 'clientCookie' });
manager.set('value'); // Uses document.cookie
```

### Server-Side (Next.js)

Requires Next.js cookie store:

```typescript
import { cookies } from 'next/headers';
import { CookieManager } from '@nathanhfoster/cookies';

export async function GET() {
  const cookieStore = cookies();
  const manager = new CookieManager({
    name: 'serverCookie',
    cookieStore,
  });
  
  manager.set('value');
  return Response.json({ success: true });
}
```

## Best Practices

1. **Use TypeScript** - Leverage type safety for cookie values
2. **Set Appropriate Expiration** - Don't set cookies that last forever
3. **Use Secure Cookies** - Set `secure: true` in production
4. **Consider SameSite** - Use `SameSite: 'Lax'` for most cases
5. **Server-Side Validation** - Always validate cookie values on server

## Examples

### User Preferences

```typescript
import { CookieManager } from '@nathanhfoster/cookies';

interface Preferences {
  theme: 'light' | 'dark';
  fontSize: number;
}

const prefsManager = new CookieManager<Preferences>({
  name: 'preferences',
  maxAge: 31536000, // 1 year
  sameSite: 'Lax',
});

// Save preferences
prefsManager.set({
  theme: 'dark',
  fontSize: 16,
});

// Load preferences
const prefs = prefsManager.get() || {
  theme: 'light',
  fontSize: 14,
};
```

### Session Management

```typescript
import { CookieManager } from '@nathanhfoster/cookies';

const sessionManager = new CookieManager<string>({
  name: 'session',
  maxAge: 3600, // 1 hour
  secure: true,
  httpOnly: true,
  sameSite: 'Strict',
});

// Set session token
sessionManager.set('session-token-123');

// Get session token
const token = sessionManager.get();
```

## Architecture

This package follows the monorepo's [FRONTEND_ARCHITECTURE.md](../../FRONTEND_ARCHITECTURE.md) principles:

- **Type Safety** - Full TypeScript support
- **Framework Agnostic** - Works with any framework
- **Clean API** - Simple, intuitive interface

## Related Packages

- `@nathanhfoster/utils` - Additional utility functions
- `@nathanhfoster/auth` - Authentication (uses cookies)

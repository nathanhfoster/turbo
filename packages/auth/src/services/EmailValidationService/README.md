# EmailValidation Service

Email validation service for detecting disposable, temporary, and invalid email addresses.

## Quick Start

The service is **ready to use immediately** - no API keys or configuration required!

```typescript
import {
  emailValidationService,
  VALIDATION_CHECKS,
} from '@/domains/AuthDomain';

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

## Available Validation Checks

### ✅ CHECK_SYNTAX (No setup required)

Validates email format using RFC 5322 compliant regex.

```typescript
const isValid = emailValidationService.checkSyntax('user@example.com');
// Returns: true
```

**What it checks:**

- Proper @ symbol placement
- Valid domain structure
- Length constraints (local ≤64, domain ≤253, total ≤254 chars)
- Special characters handling

---

### ✅ CHECK_BLACKLIST (No setup required) **← RECOMMENDED**

Checks email against 50K+ disposable email domains using **mailchecker** library.

```typescript
const isLegit = emailValidationService.checkBlacklist('user@mailinator.com');
// Returns: false (mailinator.com is blacklisted)

const isLegit2 = emailValidationService.checkBlacklist('user@gmail.com');
// Returns: true (gmail.com is legitimate)
```

**Blocks domains like:**

- mailinator.com
- guerrillamail.com
- 10minutemail.com
- temp-mail.org
- ...and 50,000+ more

**How to update the blacklist:**

```bash
pnpm update mailchecker
```

Run this periodically (e.g., every release) to get the latest disposable email domains.

---

### 🔧 CHECK_DOMAIN (Optional - Server-side only)

Verifies the email domain has valid DNS records (MX or A records).

```typescript
// Only works on server-side (Next.js API routes, Server Components, Server Actions)
const hasDNS = await emailValidationService.checkDomain('user@gmail.com');
// Returns: true (gmail.com has MX records)
```

**Notes:**

- Automatically disabled on client-side (browser)
- Adds ~20-100ms latency due to DNS lookup
- Use only when you need extra verification

---

### ❌ CHECK_ZEROBOUNCE (Not configured - Optional)

ZeroBounce API integration is available but **NOT currently set up**.

**If you want to use ZeroBounce in the future:**

1. Sign up at https://www.zerobounce.net/
2. Get your API key
3. Add to environment variables:
   ```bash
   ZEROBOUNCE_API_KEY=your_api_key_here
   ```
4. Use in validation:
   ```typescript
   const result = await emailValidationService.validate('user@example.com', [
     VALIDATION_CHECKS.CHECK_ZEROBOUNCE,
   ]);
   ```

**Current status:** Not needed - mailchecker provides excellent coverage for free.

---

## Recommended Usage

For most cases, use `CHECK_BLACKLIST` combined with syntax validation:

```typescript
import {
  emailValidationService,
  VALIDATION_CHECKS,
} from '@/domains/AuthDomain';

async function validateUserEmail(email: string) {
  // This runs CHECK_SYNTAX automatically + CHECK_BLACKLIST
  const result = await emailValidationService.validate(email, [
    VALIDATION_CHECKS.CHECK_BLACKLIST,
  ]);

  if (!result.ok) {
    // Handle validation failure
    const errors = result.value?.errors || [];

    if (errors.includes('Invalid email syntax')) {
      return 'Please enter a valid email address';
    }

    if (
      errors.includes(
        'Email domain is blacklisted (disposable/temporary email)',
      )
    ) {
      return 'Disposable email addresses are not allowed. Please use a permanent email address.';
    }
  }

  return null; // Email is valid
}
```

## Integration with Registration Form

Example integration with your existing registration flow:

```typescript
// In your registration handler
import {
  emailValidationService,
  VALIDATION_CHECKS,
} from '@/domains/AuthDomain';

async function handleRegistration(formData) {
  // Validate email
  const emailValidation = await emailValidationService.validate(
    formData.email,
    [VALIDATION_CHECKS.CHECK_BLACKLIST],
  );

  if (!emailValidation.ok) {
    setFieldErrors((prev) => ({
      ...prev,
      email:
        'Please use a permanent email address. Temporary email services are not allowed.',
    }));
    return;
  }

  // Continue with registration...
}
```

## Maintenance

### Updating the Blacklist

The mailchecker library is actively maintained and updated regularly. To get the latest list:

```bash
pnpm update mailchecker
```

**Recommended schedule:** Update during each release cycle or monthly.

### Monitoring

The service logs warnings and errors to console:

- `[EmailValidationService] ZEROBOUNCE_API_KEY not configured` - Normal if not using ZeroBounce
- `[EmailValidationService] checkDomain() can only run on server-side` - Normal if called from client

## Testing

The service has 81 comprehensive unit tests covering:

- Valid and invalid email formats
- Disposable email detection
- DNS validation
- Edge cases and error handling

Run tests:

```bash
pnpm test tests/unit/EmailValidationService.test.ts
```

## No API Keys Required!

**✅ mailchecker** - No API key needed, works out of the box
**🔧 DNS validation** - No API key needed, uses Node.js built-in 'dns' module
**❌ ZeroBounce** - Requires API key, but not currently used

You're all set! The service is ready to use with no additional configuration.

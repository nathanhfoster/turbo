import { isValid as isValidEmail } from "mailchecker";
import { EMAIL_REGEX } from "./constants";
import type { EmailValidator, DnsCache } from "./types";
import { dnsCache as defaultDnsCache } from "./cache";

/**
 * Creates a syntax validator that validates email format against RFC 5322 compliant regex
 * @returns EmailValidator - Validator instance
 */
export const createSyntaxValidator = (): EmailValidator => ({
  errorMessage: "Invalid email address format",
  validate: async (email: string): Promise<boolean> => {
    if (!email || typeof email !== "string") {
      return false;
    }

    const trimmedEmail = email.trim();

    // Basic length checks
    if (trimmedEmail.length === 0 || trimmedEmail.length > 254) {
      return false;
    }

    // Check for @ symbol
    const atIndex = trimmedEmail.lastIndexOf("@");
    if (atIndex === -1) {
      return false;
    }

    // Split into local and domain parts
    const localPart = trimmedEmail.substring(0, atIndex);
    const domainPart = trimmedEmail.substring(atIndex + 1);

    // Check local part length (max 64 characters)
    if (localPart.length === 0 || localPart.length > 64) {
      return false;
    }

    // Check domain part length
    if (domainPart.length === 0 || domainPart.length > 253) {
      return false;
    }

    // Check against regex
    return EMAIL_REGEX.test(trimmedEmail);
  },
});

/**
 * Creates a blacklist validator that validates email against disposable email provider blacklist
 * Uses mailchecker library with 50K+ domains list
 * @returns EmailValidator - Validator instance
 */
export const createBlacklistValidator = (): EmailValidator => ({
  errorMessage: "Disposable email addresses are not allowed",
  validate: async (email: string): Promise<boolean> => {
    if (!email || typeof email !== "string") {
      return false;
    }

    const trimmedEmail = email.trim();

    // isValidEmail() returns true if email is NOT a disposable email
    // Returns false if email IS a disposable/temporary email
    return isValidEmail(trimmedEmail);
  },
});

/**
 * Creates a DNS validator that validates email domain has valid DNS records (MX or A records)
 * This validator only works on server-side (Node.js environment)
 * Uses caching to avoid repeated DNS lookups for the same domain
 * @param cache - Optional cache instance (uses default singleton if not provided)
 * @returns EmailValidator - Validator instance
 */
export const createDnsValidator = (cache?: DnsCache): EmailValidator => {
  const dnsCache = cache ?? defaultDnsCache;

  return {
    errorMessage: "Email domain does not exist",
    validate: async (email: string): Promise<boolean> => {
      // Check if we're in a Node.js environment
      if (typeof window !== "undefined") {
        console.warn(
          "[EmailValidationService] checkDomain() can only run on server-side",
        );
        return false;
      }

      if (!email || typeof email !== "string") {
        return false;
      }

      const trimmedEmail = email.trim();

      // Extract domain from email
      const atIndex = trimmedEmail.lastIndexOf("@");
      if (atIndex === -1) {
        return false;
      }

      const domain = trimmedEmail.substring(atIndex + 1).toLowerCase();

      // Check cache first (handle cache errors gracefully)
      const cacheKey = `dns:${domain}`;
      let cachedResult: boolean | null = null;
      try {
        cachedResult = dnsCache.getItem(cacheKey);
        if (cachedResult !== null) {
          return cachedResult;
        }
      } catch (cacheError) {
        // If cache fails, continue with DNS lookup
        console.warn(
          "[EmailValidationService] Cache error, proceeding with DNS lookup:",
          cacheError instanceof Error ? cacheError.message : cacheError,
        );
      }

      try {
        // Use require() for Node.js core modules to avoid webpack bundling issues
        // Note: require() is synchronous in Node.js - no await needed
        // We're accessing the .promises property which provides promise-based DNS methods
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const dns = require("dns").promises;

        let hasValidRecords = false;

        try {
          // First, try to resolve MX records (preferred for email)
          const mxRecords = await dns.resolveMx(domain);
          if (mxRecords && mxRecords.length > 0) {
            hasValidRecords = true;
          }
        } catch (mxError) {
          // MX lookup failed, try A records as fallback
          try {
            const aRecords = await dns.resolve4(domain);
            if (aRecords && aRecords.length > 0) {
              hasValidRecords = true;
            }
          } catch (aError) {
            // Both MX and A record lookups failed
            hasValidRecords = false;
          }
        }

        // Cache the result (5 minutes TTL for DNS records)
        try {
          dnsCache.setItem(cacheKey, hasValidRecords);
        } catch (cacheError) {
          // If cache set fails, log but don't fail validation
          console.warn(
            "[EmailValidationService] Failed to cache DNS result:",
            cacheError instanceof Error ? cacheError.message : cacheError,
          );
        }

        return hasValidRecords;
      } catch (error) {
        console.error(
          "[EmailValidationService] DNS validation error:",
          error instanceof Error ? error.message : error,
        );
        // Cache negative result to avoid repeated lookups for invalid domains
        try {
          dnsCache.setItem(cacheKey, false);
        } catch (cacheError) {
          // If cache set fails, log but don't fail validation
          console.warn(
            "[EmailValidationService] Failed to cache negative DNS result:",
            cacheError instanceof Error ? cacheError.message : cacheError,
          );
        }
        return false;
      }
    },
  };
};

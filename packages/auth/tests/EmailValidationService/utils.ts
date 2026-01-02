import {
  VALIDATION_CHECKS,
  createEmailValidationService,
  type ValidationResult,
  type DnsCache,
} from '../../src/services/EmailValidationService';
import { VALID_DOMAINS } from './constants';
import type { MockDnsValidator, MockDnsCache } from './types';

/**
 * Helper function to create a mock DNS validator for testing
 */
export const createMockDnsValidator = (): MockDnsValidator => ({
  errorMessage: 'Email domain does not exist',
  validate: async (email: string): Promise<boolean> => {
    if (!email || typeof email !== 'string') return false;
    const domain = email.split('@')[1];
    return VALID_DOMAINS.includes(domain?.toLowerCase());
  },
});

/**
 * Helper function to create a mock cache for testing
 * Tracks all cache operations for verification
 */
export const createMockCache = (): MockDnsCache => {
  const cache = new Map<string, { value: boolean; expire: number }>();
  let getCallCount = 0;
  let setCallCount = 0;

  return {
    getItem: (key: string): boolean | null => {
      getCallCount++;
      const item = cache.get(key);
      if (!item) {
        return null;
      }
      if (Date.now() > item.expire) {
        cache.delete(key);
        return null;
      }
      return item.value;
    },

    setItem: (key: string, value: boolean, customTTL?: number): void => {
      setCallCount++;
      const ttl = customTTL ?? 5 * 60 * 1000; // 5 minutes default
      cache.set(key, {
        value,
        expire: Date.now() + ttl,
      });
    },

    hasItem: (key: string): boolean => {
      const item = cache.get(key);
      if (!item) {
        return false;
      }
      if (Date.now() > item.expire) {
        cache.delete(key);
        return false;
      }
      return true;
    },

    deleteItem: (key: string): void => {
      cache.delete(key);
    },

    clearAll: (): void => {
      cache.clear();
    },

    getCallCount: () => getCallCount + setCallCount,
    getSetCallCount: () => setCallCount,
    getGetCallCount: () => getCallCount,
    clearCallCounts: () => {
      getCallCount = 0;
      setCallCount = 0;
    },
    getStoredKeys: () => Array.from(cache.keys()),

    setExpiredItem: (key: string, value: boolean) => {
      // Set an item that's already expired (for testing)
      cache.set(key, {
        value,
        expire: Date.now() - 1000, // Expired 1 second ago
      });
    },
  };
};

/**
 * Helper function to create test service with mock DNS validator
 */
export const createTestService = () =>
  createEmailValidationService({
    validators: {
      [VALIDATION_CHECKS.CHECK_DOMAIN]: createMockDnsValidator(),
    },
  });

/**
 * Helper function to create test service with mock cache for DNS validation
 */
export const createTestServiceWithCache = (cache?: DnsCache) => {
  const mockCache = cache ?? createMockCache();
  return {
    service: createEmailValidationService({
      dnsCache: mockCache,
    }),
    cache: mockCache as MockDnsCache,
  };
};


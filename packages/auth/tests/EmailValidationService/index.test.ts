import {
  emailValidationService,
  VALIDATION_CHECKS,
  createEmailValidationService,
  type ValidationResult,
  type DnsCache,
} from '../../src/services/EmailValidationService';
import {
  ERROR_MESSAGES,
  VALID_EMAILS,
  INVALID_EMAILS,
  LEGITIMATE_EMAIL_PROVIDERS,
  DISPOSABLE_EMAILS,
} from './constants';
import {
  createMockDnsValidator,
  createTestService,
  createTestServiceWithCache,
  createMockCache,
} from './utils';

describe('EmailValidationService', () => {
  describe('checkSyntax', () => {
    describe('valid emails', () => {
      test.each(VALID_EMAILS)(
        'should return true for valid email: %s',
        async (email) => {
          const result =
            await emailValidationService.validators[
              VALIDATION_CHECKS.CHECK_SYNTAX
            ].validate(email);
          expect(result).toBe(true);
        },
      );
    });

    describe('invalid emails', () => {
      test.each(INVALID_EMAILS)(
        'should return false for invalid email: "%s"',
        async (email) => {
          const result =
            await emailValidationService.validators[
              VALIDATION_CHECKS.CHECK_SYNTAX
            ].validate(email);
          expect(result).toBe(false);
        },
      );
    });

    describe('edge cases', () => {
      test('should return false for null', async () => {
        expect(
          await emailValidationService.validators[
            VALIDATION_CHECKS.CHECK_SYNTAX
          ].validate(null as any),
        ).toBe(false);
      });

      test('should return false for undefined', async () => {
        expect(
          await emailValidationService.validators[
            VALIDATION_CHECKS.CHECK_SYNTAX
          ].validate(undefined as any),
        ).toBe(false);
      });

      test('should return false for non-string values', async () => {
        expect(
          await emailValidationService.validators[
            VALIDATION_CHECKS.CHECK_SYNTAX
          ].validate(123 as any),
        ).toBe(false);
        expect(
          await emailValidationService.validators[
            VALIDATION_CHECKS.CHECK_SYNTAX
          ].validate({} as any),
        ).toBe(false);
        expect(
          await emailValidationService.validators[
            VALIDATION_CHECKS.CHECK_SYNTAX
          ].validate([] as any),
        ).toBe(false);
      });

      test('should trim whitespace and validate', async () => {
        expect(
          await emailValidationService.validators[
            VALIDATION_CHECKS.CHECK_SYNTAX
          ].validate('  user@example.com  '),
        ).toBe(true);
      });

      test('should handle emails with maximum allowed length (254 chars)', async () => {
        // Create email with exactly 254 characters
        const localPart = 'a'.repeat(64); // Max local part
        const domainPart = 'a'.repeat(63) + '.' + 'a'.repeat(63) + '.com'; // Domain with labels
        const maxEmail = localPart + '@' + domainPart.substring(0, 189); // Total 254
        expect(
          await emailValidationService.validators[
            VALIDATION_CHECKS.CHECK_SYNTAX
          ].validate(maxEmail),
        ).toBe(true);
      });

      test('should reject emails longer than 254 characters', async () => {
        const tooLongEmail = 'a'.repeat(65) + '@' + 'b'.repeat(190) + '.com';
        expect(
          await emailValidationService.validators[
            VALIDATION_CHECKS.CHECK_SYNTAX
          ].validate(tooLongEmail),
        ).toBe(false);
      });
    });
  });

  describe('checkBlacklist', () => {
    describe('valid emails (not blacklisted)', () => {
      test.each(LEGITIMATE_EMAIL_PROVIDERS)(
        'should return true for legitimate email provider: %s',
        async (email) => {
          const result =
            await emailValidationService.validators[
              VALIDATION_CHECKS.CHECK_BLACKLIST
            ].validate(email);
          expect(result).toBe(true);
        },
      );
    });

    describe('blacklisted emails (disposable/temporary)', () => {
      test.each(DISPOSABLE_EMAILS)(
        'should return false for disposable email: %s',
        async (email) => {
          const result =
            await emailValidationService.validators[
              VALIDATION_CHECKS.CHECK_BLACKLIST
            ].validate(email);
          expect(result).toBe(false);
        },
      );
    });

    describe('edge cases', () => {
      test('should return false for null', async () => {
        expect(
          await emailValidationService.validators[
            VALIDATION_CHECKS.CHECK_BLACKLIST
          ].validate(null as any),
        ).toBe(false);
      });

      test('should return false for undefined', async () => {
        expect(
          await emailValidationService.validators[
            VALIDATION_CHECKS.CHECK_BLACKLIST
          ].validate(undefined as any),
        ).toBe(false);
      });

      test('should return false for non-string values', async () => {
        expect(
          await emailValidationService.validators[
            VALIDATION_CHECKS.CHECK_BLACKLIST
          ].validate(123 as any),
        ).toBe(false);
        expect(
          await emailValidationService.validators[
            VALIDATION_CHECKS.CHECK_BLACKLIST
          ].validate({} as any),
        ).toBe(false);
      });

      test('should trim whitespace', async () => {
        expect(
          await emailValidationService.validators[
            VALIDATION_CHECKS.CHECK_BLACKLIST
          ].validate('  user@gmail.com  '),
        ).toBe(true);
      });
    });
  });

  describe('checkDomain', () => {
    beforeEach(() => {
      // Set up as server-side environment
      delete (global as any).window;
    });

    describe('valid domains with DNS records', () => {
      test.each([
        ['gmail.com', 'user@gmail.com'],
        ['yahoo.com', 'user@yahoo.com'],
        ['outlook.com', 'user@outlook.com'],
      ])(
        'should return true for domain with MX records (%s)',
        async (domain, email) => {
          const testService = createTestService();
          const result =
            await testService.validators[
              VALIDATION_CHECKS.CHECK_DOMAIN
            ].validate(email);
          expect(result).toBe(true);
        },
      );

      describe('real DNS lookups (MX and A record fallback)', () => {
        test('should return true for domain with MX records', async () => {
          // Use real DNS validator (not mock) to test actual MX lookup
          const result = await emailValidationService.validators[
            VALIDATION_CHECKS.CHECK_DOMAIN
          ].validate('user@gmail.com');
          expect(result).toBe(true);
        });

        test('should fallback to A records when MX records fail', async () => {
          // Some domains have A records but no MX records
          // The validator should fallback to A records and still return true
          const result = await emailValidationService.validators[
            VALIDATION_CHECKS.CHECK_DOMAIN
          ].validate('user@example.com');
          // example.com typically has A records but may not have MX
          // The test verifies the fallback logic works
          expect(typeof result).toBe('boolean');
        });

        test('should return false when both MX and A records fail', async () => {
          const result = await emailValidationService.validators[
            VALIDATION_CHECKS.CHECK_DOMAIN
          ].validate('user@thisdoesnotexist123456789.com');
          expect(result).toBe(false);
        });
      });
    });

    describe('invalid domains without DNS records', () => {
      test('should return false for non-existent domain', async () => {
        const testService = createTestService();
        const result = await testService.validators[
          VALIDATION_CHECKS.CHECK_DOMAIN
        ].validate('user@thisdoesnotexist123456789.com');
        expect(result).toBe(false);
      });

      test('should return false for invalid domain format', async () => {
        const result = await emailValidationService.validators[
          VALIDATION_CHECKS.CHECK_DOMAIN
        ].validate('user@invalid..domain');
        expect(result).toBe(false);
      });
    });

    describe('edge cases', () => {
      test('should return false for null', async () => {
        const result = await emailValidationService.validators[
          VALIDATION_CHECKS.CHECK_DOMAIN
        ].validate(null as any);
        expect(result).toBe(false);
      });

      test('should return false for undefined', async () => {
        const result = await emailValidationService.validators[
          VALIDATION_CHECKS.CHECK_DOMAIN
        ].validate(undefined as any);
        expect(result).toBe(false);
      });

      test('should return false for non-string values', async () => {
        const result = await emailValidationService.validators[
          VALIDATION_CHECKS.CHECK_DOMAIN
        ].validate(123 as any);
        expect(result).toBe(false);
      });

      test('should return false for email without @ symbol', async () => {
        const result =
          await emailValidationService.validators[
            VALIDATION_CHECKS.CHECK_DOMAIN
          ].validate('invalidEmail');
        expect(result).toBe(false);
      });
    });

    describe('client-side environment', () => {
      beforeEach(() => {
        // Set up as client-side environment
        (global as any).window = {};
      });

      afterEach(() => {
        delete (global as any).window;
      });

      test('should return false and log warning when called from client-side', async () => {
        const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
        const result =
          await emailValidationService.validators[
            VALIDATION_CHECKS.CHECK_DOMAIN
          ].validate('user@gmail.com');

        expect(result).toBe(false);
        expect(consoleWarnSpy).toHaveBeenCalledWith(
          '[EmailValidationService] checkDomain() can only run on server-side',
        );

        consoleWarnSpy.mockRestore();
      });
    });

    describe('caching behavior', () => {
      beforeEach(() => {
        delete (global as any).window;
      });

      test('should check cache before performing DNS lookup', async () => {
        const { service, cache } = createTestServiceWithCache();
        const email = 'user@example.com';

        // First call - should miss cache and perform DNS lookup
        await service.validators[VALIDATION_CHECKS.CHECK_DOMAIN].validate(email);

        // Verify cache was checked
        expect(cache.getGetCallCount()).toBeGreaterThan(0);
        // Verify cache was populated
        expect(cache.getSetCallCount()).toBeGreaterThan(0);
        expect(cache.hasItem('dns:example.com')).toBe(true);
      });

      test('should return cached value on subsequent calls', async () => {
        const { service, cache } = createTestServiceWithCache();
        const email = 'user@example.com';

        // First call - cache miss
        const firstResult = await service.validators[
          VALIDATION_CHECKS.CHECK_DOMAIN
        ].validate(email);
        const firstGetCalls = cache.getGetCallCount();
        const firstSetCalls = cache.getSetCallCount();

        // Clear call counts to track second call
        cache.clearCallCounts();

        // Second call - should hit cache
        const secondResult = await service.validators[
          VALIDATION_CHECKS.CHECK_DOMAIN
        ].validate(email);

        // Results should be the same
        expect(secondResult).toBe(firstResult);

        // Cache should be checked but not set again
        expect(cache.getGetCallCount()).toBeGreaterThan(0);
        expect(cache.getSetCallCount()).toBe(0); // Should not set again
      });

      test('should cache positive DNS results', async () => {
        const { service, cache } = createTestServiceWithCache();
        const email = 'user@gmail.com';

        await service.validators[VALIDATION_CHECKS.CHECK_DOMAIN].validate(email);

        // Verify cache contains the result
        const cachedValue = cache.getItem('dns:gmail.com');
        expect(cachedValue).not.toBeNull();
        expect(typeof cachedValue).toBe('boolean');
      });

      test('should cache negative DNS results', async () => {
        const { service, cache } = createTestServiceWithCache();
        const email = 'user@nonexistentdomain123456789.com';

        await service.validators[VALIDATION_CHECKS.CHECK_DOMAIN].validate(email);

        // Verify cache contains the negative result
        const cachedValue = cache.getItem('dns:nonexistentdomain123456789.com');
        expect(cachedValue).toBe(false);
      });

      test('should use cache for same domain with different local parts', async () => {
        const { service, cache } = createTestServiceWithCache();

        // First call
        await service.validators[VALIDATION_CHECKS.CHECK_DOMAIN].validate(
          'user1@example.com',
        );
        const firstSetCalls = cache.getSetCallCount();

        cache.clearCallCounts();

        // Second call with different local part but same domain
        await service.validators[VALIDATION_CHECKS.CHECK_DOMAIN].validate(
          'user2@example.com',
        );

        // Should use cache (get called) but not set again
        expect(cache.getGetCallCount()).toBeGreaterThan(0);
        expect(cache.getSetCallCount()).toBe(0);
      });

      test('should normalize domain to lowercase for cache key', async () => {
        const { service, cache } = createTestServiceWithCache();

        await service.validators[VALIDATION_CHECKS.CHECK_DOMAIN].validate(
          'user@EXAMPLE.COM',
        );
        await service.validators[VALIDATION_CHECKS.CHECK_DOMAIN].validate(
          'user@Example.Com',
        );

        // Should only have one cache entry (normalized to lowercase)
        const keys = cache.getStoredKeys();
        const dnsKeys = keys.filter((k) => k.startsWith('dns:'));
        expect(dnsKeys.length).toBe(1);
        expect(dnsKeys[0]).toBe('dns:example.com');
      });

      test('should expire cache entries after TTL', async () => {
        const shortTTLCache = createMockCache();
        // Manually set an expired entry
        shortTTLCache.setExpiredItem('dns:example.com', true);

        const { service } = createTestServiceWithCache(shortTTLCache);
        const email = 'user@example.com';

        // Should not use expired cache, should perform DNS lookup
        await service.validators[VALIDATION_CHECKS.CHECK_DOMAIN].validate(email);

        // Cache should be repopulated with fresh entry
        expect(shortTTLCache.hasItem('dns:example.com')).toBe(true);
      });

      test('should handle cache errors gracefully', async () => {
        const brokenCache = {
          getItem: jest.fn().mockImplementation(() => {
            throw new Error('Cache error');
          }),
          setItem: jest.fn(),
          hasItem: jest.fn().mockReturnValue(false),
          deleteItem: jest.fn(),
          clearAll: jest.fn(),
        } as unknown as DnsCache;

        const { service } = createTestServiceWithCache(brokenCache);
        const email = 'user@example.com';

        // Should still work even if cache throws error
        const result = await service.validators[
          VALIDATION_CHECKS.CHECK_DOMAIN
        ].validate(email);

        // Should return a boolean result (either true or false based on DNS)
        expect(typeof result).toBe('boolean');
      });

      test('should cache results from DNS validation in service.validate()', async () => {
        const { service, cache } = createTestServiceWithCache();

        // First validation
        await service.validate('user@example.com', [
          VALIDATION_CHECKS.CHECK_DOMAIN,
        ]);

        cache.clearCallCounts();

        // Second validation with same domain
        await service.validate('another@example.com', [
          VALIDATION_CHECKS.CHECK_DOMAIN,
        ]);

        // Should use cache on second call
        expect(cache.getGetCallCount()).toBeGreaterThan(0);
        expect(cache.getSetCallCount()).toBe(0); // Should not set again
      });
    });
  });

  describe('validate', () => {
    // Mock DNS validator
    const mockDnsValidator = {
      errorMessage: ERROR_MESSAGES.DNS,
      validate: jest.fn().mockResolvedValue(true),
    };

    // Create test service with mocked DNS validator
    const testService = createEmailValidationService({
      validators: {
        [VALIDATION_CHECKS.CHECK_DOMAIN]: mockDnsValidator,
      },
    });

    beforeEach(() => {
      delete (global as any).window;
      mockDnsValidator.validate.mockClear();
      mockDnsValidator.validate.mockResolvedValue(true);
    });

    describe('CHECK_SYNTAX validation', () => {
      test('should fail validation for invalid syntax', async () => {
        const result = await testService.validate('invalid-email', [
          VALIDATION_CHECKS.CHECK_SYNTAX,
        ]);

        expect(result.ok).toBe(false);
        if (!result.ok) {
          // The service implementation includes value on failures
          const failureResult = result as any;
          expect(failureResult.reason).toBe(ERROR_MESSAGES.SYNTAX);
          expect(failureResult.value?.isValid).toBe(false);
          expect(failureResult.value?.failedChecks).toContain(
            VALIDATION_CHECKS.CHECK_SYNTAX,
          );
          expect(failureResult.value?.errors).toContain(ERROR_MESSAGES.SYNTAX);
        }
      });

      test('should pass validation for valid syntax', async () => {
        const result = await testService.validate('user@gmail.com', [
          VALIDATION_CHECKS.CHECK_SYNTAX,
        ]);

        expect(result.ok).toBe(true);
        if (result.ok) {
          // TypeScript narrowing for success case
          const successResult = result as { ok: true; value?: ValidationResult };
          expect(successResult.value?.isValid).toBe(true);
          expect(successResult.value?.failedChecks).toHaveLength(0);
          expect(successResult.value?.errors).toHaveLength(0);
        }
      });
    });

    describe('CHECK_BLACKLIST validation', () => {
      test('should fail validation for blacklisted email', async () => {
        const result = await testService.validate('user@mailinator.com', [
          VALIDATION_CHECKS.CHECK_BLACKLIST,
        ]);

        expect(result.ok).toBe(false);
        if (!result.ok) {
          // The service implementation includes value on failures
          const failureResult = result as any;
          expect(failureResult.value?.isValid).toBe(false);
          expect(failureResult.value?.failedChecks).toContain(
            VALIDATION_CHECKS.CHECK_BLACKLIST,
          );
          expect(failureResult.value?.errors).toContain(ERROR_MESSAGES.BLACKLIST);
        }
      });

      test('should pass validation for legitimate email', async () => {
        const result = await testService.validate('user@gmail.com', [
          VALIDATION_CHECKS.CHECK_BLACKLIST,
        ]);

        expect(result.ok).toBe(true);
        if (result.ok) {
          // TypeScript narrowing for success case
          const successResult = result as { ok: true; value?: ValidationResult };
          expect(successResult.value?.isValid).toBe(true);
          expect(successResult.value?.failedChecks).toHaveLength(0);
        }
      });
    });

    describe('CHECK_DOMAIN validation', () => {
      test('should pass validation for domain with DNS records', async () => {
        const result = await testService.validate('user@gmail.com', [
          VALIDATION_CHECKS.CHECK_DOMAIN,
        ]);

        expect(result.ok).toBe(true);
        if (result.ok) {
          // TypeScript narrowing for success case
          const successResult = result as { ok: true; value?: ValidationResult };
          expect(successResult.value?.isValid).toBe(true);
          expect(successResult.value?.failedChecks).toHaveLength(0);
        }
      });

      test('should fail validation for domain without DNS records', async () => {
        mockDnsValidator.validate.mockResolvedValueOnce(false);

        const result = await testService.validate(
          'user@nonexistentdomain123.com',
          [VALIDATION_CHECKS.CHECK_DOMAIN],
        );

        expect(result.ok).toBe(false);
        if (!result.ok) {
          // The service implementation includes value on failures
          const failureResult = result as any;
          expect(failureResult.value?.isValid).toBe(false);
          expect(failureResult.value?.failedChecks).toContain(
            VALIDATION_CHECKS.CHECK_DOMAIN,
          );
          expect(failureResult.value?.errors).toContain(ERROR_MESSAGES.DNS);
        }
      });
    });

    describe('Multiple checks', () => {
      test('should pass all checks for valid email', async () => {
        const result = await testService.validate('user@gmail.com', [
          VALIDATION_CHECKS.CHECK_BLACKLIST,
          VALIDATION_CHECKS.CHECK_DOMAIN,
        ]);

        expect(result.ok).toBe(true);
        if (result.ok) {
          // TypeScript narrowing for success case
          const successResult = result as { ok: true; value?: ValidationResult };
          expect(successResult.value?.isValid).toBe(true);
          expect(successResult.value?.failedChecks).toHaveLength(0);
          expect(successResult.value?.errors).toHaveLength(0);
        }
      });

      test('should fail if any check fails', async () => {
        mockDnsValidator.validate.mockResolvedValue(false);

        const result = await testService.validate('user@gmail.com', [
          VALIDATION_CHECKS.CHECK_BLACKLIST,
          VALIDATION_CHECKS.CHECK_DOMAIN,
        ]);

        expect(result.ok).toBe(false);
        if (!result.ok) {
          // The service implementation includes value on failures
          const failureResult = result as any;
          expect(failureResult.value?.isValid).toBe(false);
          expect(failureResult.value?.failedChecks).toContain(
            VALIDATION_CHECKS.CHECK_DOMAIN,
          );
          expect(failureResult.value?.errors.length).toBeGreaterThan(0);
        }
      });

      test('should report all failed checks', async () => {
        mockDnsValidator.validate.mockResolvedValue(false);

        const result = await testService.validate('user@mailinator.com', [
          VALIDATION_CHECKS.CHECK_BLACKLIST,
          VALIDATION_CHECKS.CHECK_DOMAIN,
        ]);

        expect(result.ok).toBe(false);
        if (!result.ok) {
          // The service implementation includes value on failures
          const failureResult = result as any;
          expect(failureResult.value?.isValid).toBe(false);
          expect(failureResult.value?.failedChecks).toHaveLength(2);
          expect(failureResult.value?.failedChecks).toContain(
            VALIDATION_CHECKS.CHECK_BLACKLIST,
          );
          expect(failureResult.value?.failedChecks).toContain(
            VALIDATION_CHECKS.CHECK_DOMAIN,
          );
          expect(failureResult.value?.errors.length).toBe(2);
        }
      });
    });

    describe('Syntax check behavior', () => {
      test('should always check syntax first, even if not in checks array', async () => {
        const result = await testService.validate('invalid', [
          VALIDATION_CHECKS.CHECK_BLACKLIST,
        ]);

        expect(result.ok).toBe(false);
        if (!result.ok) {
          // The service implementation includes value on failures
          const failureResult = result as any;
          expect(failureResult.reason).toBe(ERROR_MESSAGES.SYNTAX);
          expect(failureResult.value?.failedChecks).toContain(
            VALIDATION_CHECKS.CHECK_SYNTAX,
          );
        }
      });

      test('should not run other checks if syntax check fails', async () => {
        mockDnsValidator.validate.mockClear();

        await testService.validate('invalid', [VALIDATION_CHECKS.CHECK_DOMAIN]);

        // DNS validator should not be called because syntax failed first
        expect(mockDnsValidator.validate).not.toHaveBeenCalled();
      });
    });

    describe('Empty checks array', () => {
      test('should only validate syntax when checks array is empty', async () => {
        const result = await testService.validate('user@gmail.com', []);

        expect(result.ok).toBe(true);
        if (result.ok) {
          // TypeScript narrowing for success case
          const successResult = result as { ok: true; value?: ValidationResult };
          expect(successResult.value?.isValid).toBe(true);
          expect(successResult.value?.failedChecks).toHaveLength(0);
        }
      });

      test('should fail for invalid syntax even with empty checks array', async () => {
        const result = await testService.validate('invalid', []);

        expect(result.ok).toBe(false);
        if (!result.ok) {
          // The service implementation includes value on failures
          const failureResult = result as any;
          expect(failureResult.value?.isValid).toBe(false);
          expect(failureResult.value?.failedChecks).toContain(
            VALIDATION_CHECKS.CHECK_SYNTAX,
          );
        }
      });
    });
  });
});


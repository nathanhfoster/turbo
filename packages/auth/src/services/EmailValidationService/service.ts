import type { DomainResult } from '@monkey-tilt/utils/types';
import {
  createBlacklistValidator,
  createDnsValidator,
  createSyntaxValidator,
} from './validators';
import { VALIDATION_CHECKS } from './types';
import type {
  EmailValidationService,
  EmailValidationServiceDeps,
  EmailValidator,
  ValidationResult,
} from './types';

/**
 * Creates an email validation service that combines multiple validators
 * Provides comprehensive email validation with configurable checks
 *
 * Example usage:
 * ```ts
 * // Use default validators
 * const service = createEmailValidationService();
 *
 * // Or override specific validators (e.g., for testing)
 * const service = createEmailValidationService({
 *   validators: {
 *     [VALIDATION_CHECKS.CHECK_DOMAIN]: mockDnsValidator,
 *   }
 * });
 *
 * const result = await service.validate('user@example.com', [
 *   VALIDATION_CHECKS.CHECK_BLACKLIST,
 *   VALIDATION_CHECKS.CHECK_DOMAIN
 * ]);
 * ```
 */
export const createEmailValidationService = (
  deps: EmailValidationServiceDeps = {},
): EmailValidationService => {
  // Default validators - only created if not provided
  // Pass cache to DNS validator if provided
  const defaultValidators: Record<VALIDATION_CHECKS, EmailValidator> = {
    CHECK_SYNTAX: createSyntaxValidator(),
    CHECK_BLACKLIST: createBlacklistValidator(),
    CHECK_DOMAIN: createDnsValidator(deps.dnsCache),
  };

  // Merge provided validators with defaults
  const validators: Record<VALIDATION_CHECKS, EmailValidator> = {
    ...defaultValidators,
    ...deps.validators,
  };

  /**
   * Validate email address with specified checks
   * @param email - Email address to validate
   * @param checks - Array of validation checks to perform
   * @returns Promise<DomainResult<ValidationResult>> - Domain result with validation details
   */
  const validate = async (
    email: string,
    checks: VALIDATION_CHECKS[],
  ): Promise<DomainResult<ValidationResult>> => {
    const failedChecks: VALIDATION_CHECKS[] = [];
    const errors: string[] = [];

    // Always check syntax first, regardless of what checks are requested
    const syntaxValidator = validators.CHECK_SYNTAX;
    const syntaxValid = await syntaxValidator.validate(email);
    if (!syntaxValid) {
      const result: ValidationResult = {
        isValid: false,
        failedChecks: [VALIDATION_CHECKS.CHECK_SYNTAX],
        errors: [syntaxValidator.errorMessage],
      };
      return { ok: false, reason: syntaxValidator.errorMessage, value: result };
    }

    // Perform each requested check
    for (const check of checks) {
      try {
        // Skip syntax check since we already validated it above
        if (check === 'CHECK_SYNTAX') {
          continue;
        }

        // Ensure the validator exists
        const validator = validators[check];
        if (!validator) {
          console.warn(
            `[EmailValidationService] Unknown validation check: ${check}`,
          );
          continue;
        }

        // Validate using the validator from the map
        const isValid = await validator.validate(email);

        if (!isValid) {
          errors.push(validator.errorMessage);
          failedChecks.push(check);
        }
      } catch (error) {
        console.error(
          `[EmailValidationService] Error performing ${check}:`,
          error instanceof Error ? error.message : error,
        );
        errors.push(
          `Error performing ${check}: ${error instanceof Error ? error.message : 'Unknown error'}`,
        );
        failedChecks.push(check);
      }
    }

    // Return result
    const validationResult: ValidationResult = {
      isValid: failedChecks.length === 0,
      failedChecks,
      errors,
    };

    return validationResult.isValid
      ? { ok: true, value: validationResult }
      : {
          ok: false,
          reason: 'Email validation failed',
          value: validationResult,
        };
  };

  return {
    validate,
    validators,
  };
};

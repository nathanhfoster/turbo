import type { DomainResult } from '@monkey-tilt/utils/types';

/**
 * Email validation checks that can be performed
 */
export enum VALIDATION_CHECKS {
  /**
   * Check email syntax against RFC 5322 compliant regex
   */
  CHECK_SYNTAX = 'CHECK_SYNTAX',

  /**
   * Check email domain against open-source blacklists of disposable/temporary email providers
   */
  CHECK_BLACKLIST = 'CHECK_BLACKLIST',

  /**
   * Check if email domain has valid DNS records (MX or A records)
   * Note: This check only works on server-side
   */
  CHECK_DOMAIN = 'CHECK_DOMAIN',
}

/**
 * Validation result interface
 */
export interface ValidationResult {
  isValid: boolean;
  failedChecks: VALIDATION_CHECKS[];
  errors: string[];
}

/**
 * Email validator interface - defines the contract for individual validators
 */
export interface EmailValidator {
  /**
   * Validate an email address
   * @param email - Email address to validate
   * @returns Promise<boolean> - true if valid, false otherwise
   */
  validate(email: string): Promise<boolean>;

  /**
   * Error message to return when validation fails
   */
  errorMessage: string;
}

/**
 * Cache interface for DNS validation results
 */
export interface DnsCache {
  getItem(key: string): boolean | null;
  setItem(key: string, value: boolean, customTTL?: number): void;
  hasItem(key: string): boolean;
  deleteItem(key: string): void;
  clearAll(): void;
}

/**
 * Dependencies for creating an email validation service
 * Pass validators as a map - no need to know about specific validator types
 */
export interface EmailValidationServiceDeps {
  validators?: Partial<Record<VALIDATION_CHECKS, EmailValidator>>;
  dnsCache?: DnsCache;
}

/**
 * Email validation service interface
 */
export interface EmailValidationService {
  /**
   * Validate email address with specified checks
   */
  validate: (
    email: string,
    checks: VALIDATION_CHECKS[],
  ) => Promise<DomainResult<ValidationResult>>;

  /**
   * Direct access to validators for advanced use cases
   */
  validators: Record<VALIDATION_CHECKS, EmailValidator>;
}

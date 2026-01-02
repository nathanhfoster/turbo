// Constants
export { EMAIL_REGEX } from './constants';

// Types and enums
export { VALIDATION_CHECKS } from './types';
export type {
  DnsCache,
  EmailValidator,
  EmailValidationService,
  EmailValidationServiceDeps,
  ValidationResult,
} from './types';

// Validator factories
export {
  createBlacklistValidator,
  createDnsValidator,
  createSyntaxValidator,
} from './validators';

// Service factory
export { createEmailValidationService } from './service';

// Default service instance for backward compatibility
import { createEmailValidationService } from './service';
export const emailValidationService = createEmailValidationService();

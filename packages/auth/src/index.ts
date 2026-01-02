// Export EmailValidationService
export {
  // Default service instance
  emailValidationService,
  // Enums
  VALIDATION_CHECKS,
  // Types
  type ValidationResult,
  type EmailValidator,
  type EmailValidationService,
  type EmailValidationServiceDeps,
  // Factory functions
  createSyntaxValidator,
  createBlacklistValidator,
  createDnsValidator,
  createEmailValidationService,
  // Constants
  EMAIL_REGEX,
} from './services/EmailValidationService';

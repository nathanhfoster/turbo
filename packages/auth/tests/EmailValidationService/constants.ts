import {
  createSyntaxValidator,
  createBlacklistValidator,
  createDnsValidator,
} from "../../src/services/EmailValidationService";

// Create validator instances to access error messages
export const ERROR_MESSAGES = {
  SYNTAX: createSyntaxValidator().errorMessage,
  BLACKLIST: createBlacklistValidator().errorMessage,
  DNS: createDnsValidator().errorMessage,
};

// Test data constants
export const VALID_EMAILS = [
  // Basic formats
  "user@example.com",
  "user.name@example.com",
  "user+tag@example.com",
  "user_name@example.com",
  "user-name@example.com",
  "user123@example.com",
  "a@example.com",

  // Subdomain variations
  "test@subdomain.example.com",
  "test@sub.domain.example.com",
  "user@a.b.c.d.example.com", // Multiple subdomains

  // TLD variations
  "user@example.co.uk",
  "user@example.technology", // Long TLD
  "user@example.io", // Short TLD

  // Domain with numbers and hyphens
  "user@domain123.com", // Numbers in domain
  "user@123.456.789.012", // IP address format
  "test@my-domain.com", // Hyphen in domain
  "test@my-domain-name.co.uk", // Multiple hyphens

  // Special characters in local part (all RFC 5322 allowed chars)
  "user!#$%&'*+/=?^_`{|}~@example.com",
  "test!test@example.com",
  "user#tag@example.com",
  "user$money@example.com",
  "user%percent@example.com",
  "user&and@example.com",
  "user'quote@example.com",
  "user*star@example.com",
  "user/slash@example.com",
  "user=equals@example.com",
  "user?question@example.com",
  "user^caret@example.com",
  "user_underscore@example.com",
  "user`backtick@example.com",
  "user{brace@example.com",
  "user|pipe@example.com",
  "user}brace@example.com",
  "user~tilde@example.com",

  // Multiple dots in local (but not consecutive)
  "first.middle.last@example.com",
  "a.b.c.d@example.com",

  // Mixed special characters
  "user+tag_123@example.com",
  "test.name+tag@example.com",
  "user_name-123@example.com",

  // Maximum length tests (boundary conditions)
  "a".repeat(64) + "@example.com", // Max local part length (64 chars)
  "user@" + "a".repeat(63) + "." + "b".repeat(63) + ".com", // Long domain parts

  // Numeric variations
  "123@example.com", // All numbers in local
  "123.456@example.com", // Numbers with dots

  // Very short valid emails
  "a@b.co", // Minimal valid email
  "x@y.z.com",

  // Edge cases accepted by our permissive regex
  ".user@example.com", // Dot at start of local (permissive)
  "user.@example.com", // Dot at end of local (permissive)
  "-user@example.com", // Hyphen at start of local (RFC 5322 allows)
  "user-@example.com", // Hyphen at end of local (RFC 5322 allows)
  "user@123.456.789", // Numeric domain parts (permissive)
  "user@example.123", // TLD with numbers (permissive)
  "user@example.c", // Single char TLD (permissive, though rare)

  // Consecutive dots accepted by regex (permissive)
  "user..name@example.com", // Double dots in local (regex allows)
  "user...name@example.com", // Triple dots in local (regex allows)

  // Whitespace is trimmed before validation, so these pass
  " user@example.com", // Leading space (trimmed)
  "user@example.com ", // Trailing space (trimmed)
  "  user@example.com  ", // Both (trimmed)
];

export const INVALID_EMAILS = [
  // Empty/whitespace
  "",
  " ",
  "   ", // Multiple spaces
  "\t", // Tab character
  "\n", // Newline

  // Missing components
  "invalid", // No @ symbol
  "invalid@", // No domain
  "@example.com", // No local part
  "@", // Just @ symbol

  // Malformed @ symbol
  "user@@example.com", // Double @
  "user@domain@example.com", // Multiple @ symbols
  "user @example.com", // Space before @
  "user@ example.com", // Space after @

  // Dots in wrong places
  // Note: .user@, user.@, user..name@ are accepted by our regex (permissive)
  "user@.example.com", // Dot at start of domain
  "user@example.com.", // Dot at end of domain
  "user@example..com", // Double dots in domain
  "user@.example..com.", // Multiple dot issues

  // Spaces (not allowed, except leading/trailing which are trimmed)
  "user name@example.com", // Space in local part
  "user@exam ple.com", // Space in domain
  "user@domain .com", // Space before TLD
  // Note: Leading/trailing spaces are trimmed, so moved to VALID_EMAILS

  // Hyphens in wrong places
  "user@-example.com", // Hyphen at start of domain
  "user@example-.com", // Hyphen at end of domain label
  "user@example.-com", // Hyphen at start of TLD
  "user@example.com-", // Hyphen at end

  // Invalid special characters
  "user name@example.com", // Space
  "user<test>@example.com", // Angle brackets
  "user[test]@example.com", // Square brackets
  "user(test)@example.com", // Parentheses
  "user,test@example.com", // Comma
  "user;test@example.com", // Semicolon
  "user:test@example.com", // Colon
  "user\\test@example.com", // Backslash
  'user"test@example.com', // Quote (not in allowed position)
  "user@example,com", // Comma in domain
  "user@example;com", // Semicolon in domain

  // No TLD (single word domains)
  "user@domain", // No TLD (IMPROVEMENT: now properly rejected)
  "user@localhost", // Localhost without TLD (IMPROVEMENT: now properly rejected)
  "test@server", // Single word domain (IMPROVEMENT: now properly rejected)

  // Length violations
  "a".repeat(65) + "@example.com", // Local part too long (>64 chars)
  "user@" + "a".repeat(250) + ".com", // Domain too long (>253 chars)
  "user@" + "a".repeat(64) + ".com", // Domain label too long (>63 chars for a single label)

  // Unicode/special encoding (not supported by basic regex)
  "user@exämple.com", // Umlaut in domain
  "üser@example.com", // Umlaut in local part
  "user@例え.com", // Japanese characters
  "user😀@example.com", // Emoji in local
  "user@example😀.com", // Emoji in domain

  // Malformed structure
  "user",
  "example.com",
  "user.example.com", // Looks like email but no @
  "@",
  "@@",
  "@@@example.com",
  "user@@",

  // Note: Hyphens at start/end of local part are allowed by our regex (RFC 5322 allows them)

  // Missing TLD dot
  "user@examplecom", // Missing dot before TLD
  "user@example", // No TLD separator

  // IP address format issues (if not properly formatted)
  "user@[123.456.789.012]", // Brackets around IP (might be valid IPv6 format, but not supported here)
  // Note: user@123.456.789 is accepted by our regex (looks like valid domain with numeric parts)

  // Too short
  "@.", // Way too short
  "a@b", // Missing TLD
  "a@.c", // Dot at wrong place

  // Note: Our regex allows TLDs with numbers and single-char TLDs (permissive approach)
  // These are technically valid formats even if uncommon in practice
];

export const LEGITIMATE_EMAIL_PROVIDERS = [
  "user@gmail.com",
  "user@yahoo.com",
  "user@outlook.com",
  "user@hotmail.com",
  "user@protonmail.com",
  "user@icloud.com",
];

export const DISPOSABLE_EMAILS = [
  "user@mailinator.com",
  "user@guerrillamail.com",
  "user@10minutemail.com",
  "user@temp-mail.org",
];

export const VALID_DOMAINS = ["gmail.com", "yahoo.com", "outlook.com"];

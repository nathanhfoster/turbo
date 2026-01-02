/**
 * RFC 5322 compliant email regex
 * This is a practical implementation that covers most valid email formats
 * while being more permissive than the full RFC 5322 spec (which is extremely complex)
 *
 * Improvement: Changed domain TLD quantifier from * to + to require at least one TLD (.com, .org, etc.)
 * This improves validation by rejecting emails like "user@domain" without a proper TLD
 */
export const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

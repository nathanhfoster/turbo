// Type definitions for test utilities
// This file can be extended with additional types as needed

import type { DnsCache } from "../../src/services/EmailValidationService/types";

export interface MockDnsValidator {
  errorMessage: string;
  validate: (email: string) => Promise<boolean>;
}

export interface MockDnsCache extends DnsCache {
  getCallCount: () => number;
  getSetCallCount: () => number;
  getGetCallCount: () => number;
  clearCallCounts: () => void;
  getStoredKeys: () => string[];
  setExpiredItem: (key: string, value: boolean) => void;
}

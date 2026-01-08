import { createTypedCache } from "@nathanhfoster/utils/cache";
import type { DnsCache } from "./types";

/**
 * Simple in-memory cache for DNS validation results
 * This cache is NOT persisted across server restarts and not shared between different edge instances
 *
 * Uses the generic cache implementation from @nathanhfoster/utils.
 * Cache<boolean> is compatible with DnsCache interface.
 */

const DEFAULT_TTL = 1000 * 60 * 5; // 5 minutes default TTL

/**
 * DNS cache instance for email validation
 * Uses the generic cache implementation with boolean type for DNS validation results
 * Cache<boolean> implements DnsCache interface, so no wrapper is needed
 */
export const dnsCache: DnsCache = createTypedCache<boolean>({
  cacheTTL: DEFAULT_TTL,
  debugLog: false,
  logPrefix: "DnsCache",
});

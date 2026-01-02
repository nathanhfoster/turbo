/**
 * Generic in-memory cache implementation
 * 
 * This is a simple in-memory cache for server-side data.
 * It is NOT persisted across server restarts and not shared between different edge instances.
 * Best used for caching API responses, DNS lookups, or any other server-side data.
 * 
 * @example
 * ```ts
 * import { createCache } from '@monkey-tilt/utils/cache';
 * 
 * const cache = createCache({ cacheTTL: 60000, debugLog: true });
 * cache.setItem('key', { data: 'value' });
 * const value = cache.getItem('key');
 * ```
 */

export interface CacheConfig {
  /** Time to live for cache entries in milliseconds (default: 60000 = 1 minute) */
  cacheTTL?: number;
  /** If true, will log cache hits and misses (default: false) */
  debugLog?: boolean;
  /** Optional prefix for log messages (default: 'Cache') */
  logPrefix?: string;
}

interface CacheEntry<T> {
  value: T;
  metadata: {
    timestamp: number;
    ttl: number;
    expire: number;
  };
}

export interface Cache<T = unknown> {
  /**
   * Check if a key exists in cache and is not expired
   */
  hasItem(key: string): boolean;

  /**
   * Get item from cache
   * @returns cached value or null if not found/expired
   */
  getItem(key: string): T | null;

  /**
   * Set item in cache
   * @param key - Cache key
   * @param value - Value to cache
   * @param customTTL - Optional custom TTL in milliseconds (overrides default TTL)
   */
  setItem(key: string, value: T, customTTL?: number): void;

  /**
   * Delete item from cache
   */
  deleteItem(key: string): void;

  /**
   * Clear all cache entries
   */
  clearAll(): void;

  /**
   * Get all cache keys
   */
  getAllKeys(): string[];
}

const DEFAULT_TTL = 1000 * 60 * 1; // 1 minute default TTL

class CacheImpl<T = unknown> implements Cache<T> {
  #cache = new Map<string, CacheEntry<T>>();
  #config: Required<Omit<CacheConfig, 'logPrefix'>> & { logPrefix: string };

  constructor(config: CacheConfig = {}) {
    this.#config = {
      cacheTTL: config.cacheTTL ?? DEFAULT_TTL,
      debugLog: config.debugLog ?? false,
      logPrefix: config.logPrefix ?? 'Cache',
    };
  }

  #isExpired(item: CacheEntry<T>): boolean {
    const { metadata } = item;
    return Date.now() > metadata.expire;
  }

  #log(...args: unknown[]): void {
    if (this.#config.debugLog) {
      console.debug(`[${this.#config.logPrefix}]`, ...args);
    }
  }

  hasItem(key: string): boolean {
    const item = this.#cache.get(key);
    if (!item) {
      return false;
    }
    return !this.#isExpired(item);
  }

  getItem(key: string): T | null {
    const cachedItem = this.#cache.get(key);

    if (!cachedItem) {
      this.#log(`[${key}]: CACHE MISS!`);
      return null;
    }

    if (this.#isExpired(cachedItem)) {
      this.#log(`[${key}]: CACHE EXPIRED!`);
      this.#cache.delete(key);
      return null;
    }

    this.#log(`[${key}]: CACHE HIT!`);
    return cachedItem.value;
  }

  setItem(key: string, value: T, customTTL?: number): void {
    const timestamp = Date.now();
    const itemTTL = customTTL ?? this.#config.cacheTTL;

    this.#cache.set(key, {
      value,
      metadata: {
        timestamp,
        ttl: itemTTL,
        expire: timestamp + itemTTL,
      },
    });
  }

  deleteItem(key: string): void {
    if (this.#cache.has(key)) {
      this.#cache.delete(key);
      this.#log(`[${key}]: CACHE DELETED!`);
    }
  }

  clearAll(): void {
    this.#cache.clear();
    this.#log(`CACHE CLEARED!`);
  }

  getAllKeys(): string[] {
    return Array.from(this.#cache.keys());
  }
}

/**
 * Create a new cache instance with the specified configuration
 * 
 * @param config - Cache configuration options
 * @returns A new cache instance
 */
export function createCache<T = unknown>(config: CacheConfig = {}): Cache<T> {
  return new CacheImpl<T>(config);
}

/**
 * Create a typed cache instance (for better TypeScript inference)
 * 
 * @param config - Cache configuration options
 * @returns A new typed cache instance
 */
export function createTypedCache<T>(config: CacheConfig = {}): Cache<T> {
  return new CacheImpl<T>(config);
}

// Export the class for advanced usage
export { CacheImpl };


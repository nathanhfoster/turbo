import type { CacheEntry, CacheOptions } from './types';
import { DEFAULT_CACHE_TTL, DEFAULT_MAX_SIZE } from './constants';

/**
 * Generic in-memory cache with TTL support and pattern-based invalidation
 */
export class MemoryCache<T> {
  private cache = new Map<string, CacheEntry<T>>();
  private defaultTTL: number;
  private maxSize: number;
  private cleanupTimer?: NodeJS.Timeout;

  constructor(options: CacheOptions = {}) {
    this.defaultTTL = options.defaultTTL || DEFAULT_CACHE_TTL;
    this.maxSize = options.maxSize || DEFAULT_MAX_SIZE;

    // Optional periodic cleanup
    if (options.cleanupInterval) {
      this.cleanupTimer = setInterval(() => {
        this.cleanExpired();
      }, options.cleanupInterval);
    }
  }

  /**
   * Store data in cache with optional TTL override
   */
  set(key: string, data: T, ttl?: number): void {
    // Enforce max size by removing oldest entries
    if (this.cache.size >= this.maxSize) {
      this.evictOldest();
    }

    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.defaultTTL,
    };

    this.cache.set(key, entry);
  }

  /**
   * Retrieve data from cache, returns null if expired or not found
   */
  get(key: string): T | null {
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    const isExpired = Date.now() - entry.timestamp > entry.ttl;

    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  /**
   * Check if key exists and is not expired
   */
  has(key: string): boolean {
    return this.get(key) !== null;
  }

  /**
   * Delete specific key
   */
  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  /**
   * Clear all cache or invalidate by pattern
   */
  invalidate(pattern?: string): void {
    if (!pattern) {
      this.cache.clear();
      return;
    }

    for (const key of this.cache.keys()) {
      if (key.includes(pattern)) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Clear entire cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Get current cache size (after cleaning expired entries)
   */
  size(): number {
    this.cleanExpired();
    return this.cache.size;
  }

  /**
   * Get all valid (non-expired) keys
   */
  keys(): string[] {
    this.cleanExpired();
    return Array.from(this.cache.keys());
  }

  /**
   * Generate cache key from prefix and parameters
   */
  generateKey(prefix: string, params: Record<string, unknown>): string {
    const sortedParams = Object.keys(params)
      .sort()
      .map(key => `${key}:${this.serializeValue(params[key])}`)
      .join('|');

    return `${prefix}:${Buffer.from(sortedParams).toString('base64')}`;
  }

  /**
   * Get cache statistics
   */
  getStats(): {
    size: number;
    hitRate?: number;
    memoryUsage?: number;
    } {
    this.cleanExpired();
    return {
      size: this.cache.size,
      // Add hit rate tracking if needed in the future
    };
  }

  /**
   * Clean up expired entries
   */
  private cleanExpired(): void {
    const now = Date.now();

    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Evict oldest entry when max size is reached
   */
  private evictOldest(): void {
    if (this.cache.size === 0) return;

    let oldestKey = '';
    let oldestTime = Date.now();

    for (const [key, entry] of this.cache.entries()) {
      if (entry.timestamp < oldestTime) {
        oldestTime = entry.timestamp;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey);
    }
  }

  /**
   * Serialize values for cache key generation
   */
  private serializeValue(value: unknown): string {
    if (value === null || value === undefined) return 'null';
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  }

  /**
   * Cleanup timer when cache is destroyed
   */
  destroy(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
    }
    this.clear();
  }
}


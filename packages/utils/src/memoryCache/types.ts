export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

export interface CacheOptions {
  defaultTTL?: number;
  maxSize?: number;
  cleanupInterval?: number;
}


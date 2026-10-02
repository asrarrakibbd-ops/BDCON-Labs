// ==============================================================================
// BDCON Labs — Lightweight Query Cache & Request Deduplication
// Stage 15: In-memory TTL cache preventing repeated identical Supabase requests
// ==============================================================================

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const memoryCache = new Map<string, CacheEntry<any>>();
const inFlightRequests = new Map<string, Promise<any>>();

const DEFAULT_TTL_MS = 60 * 1000; // 60 seconds TTL for public content

/**
 * Wraps an async fetcher with TTL in-memory caching and concurrent request deduplication.
 */
export async function cachedQuery<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlMs = DEFAULT_TTL_MS
): Promise<T> {
  const now = Date.now();

  // 1. Check existing fresh cache entry
  const cached = memoryCache.get(key);
  if (cached && now - cached.timestamp < ttlMs) {
    return cached.data as T;
  }

  // 2. Check if identical request is currently in-flight (Request Deduplication)
  if (inFlightRequests.has(key)) {
    return inFlightRequests.get(key) as Promise<T>;
  }

  // 3. Initiate request and track promise
  const promise = (async () => {
    try {
      const data = await fetcher();
      memoryCache.set(key, { data, timestamp: Date.now() });
      return data;
    } finally {
      inFlightRequests.delete(key);
    }
  })();

  inFlightRequests.set(key, promise);
  return promise;
}

/**
 * Invalidate a specific cache key or all cache entries
 */
export function invalidateQueryCache(keyPrefix?: string): void {
  if (!keyPrefix) {
    memoryCache.clear();
    return;
  }
  for (const k of memoryCache.keys()) {
    if (k.startsWith(keyPrefix)) {
      memoryCache.delete(k);
    }
  }
}

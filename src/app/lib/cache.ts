/**
 * Simple in-memory cache with TTL (Time To Live)
 * Weather data changes every 10 min — no need for every visitor to hit OWM
 * At 1000 concurrent users, this reduces API calls by ~99%
 */

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

class MemoryCache {
  private store = new Map<string, CacheEntry<unknown>>();

  get<T>(key: string): T | null {
    const entry = this.store.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return null;
    }
    return entry.data as T;
  }

  set<T>(key: string, data: T, ttlSeconds: number): void {
    this.store.set(key, {
      data,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
  }

  size(): number {
    return this.store.size;
  }
}

// Singleton — shared across all serverless function invocations in the same process
export const weatherCache = new MemoryCache();

// TTL constants
export const WEATHER_TTL = 600;  // 10 minutes
export const FORECAST_TTL = 1800; // 30 minutes
export const GEO_TTL = 86400;     // 24 hours

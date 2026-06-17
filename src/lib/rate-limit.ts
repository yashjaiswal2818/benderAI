/**
 * Best-effort in-memory rate limiter (fixed window).
 *
 * Keyed per-process: on a single long-lived server this is a real limit; on
 * serverless / multi-instance hosting (e.g. Vercel) each instance keeps its
 * own window, so the effective ceiling is per-instance, not global. That's
 * still enough to blunt casual abuse and accidental floods of the public
 * waitlist endpoint. For a hard global guarantee, back this with a shared
 * store (Upstash Redis / Vercel KV) — the call sites below don't change.
 */

type Entry = { count: number; resetAt: number };

const buckets = new Map<string, Entry>();

export type RateLimitResult = {
  ok: boolean;
  /** Requests left in the current window. */
  remaining: number;
  /** Seconds until the window resets (for a Retry-After header). */
  retryAfter: number;
};

export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number }
): RateLimitResult {
  const now = Date.now();
  const entry = buckets.get(key);

  if (!entry || now >= entry.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    // Opportunistic cleanup so the map can't grow without bound under a flood
    // of distinct keys (e.g. spoofed IPs).
    if (buckets.size > 10_000) sweep(now);
    return { ok: true, remaining: limit - 1, retryAfter: 0 };
  }

  entry.count += 1;
  const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
  if (entry.count > limit) {
    return { ok: false, remaining: 0, retryAfter };
  }
  return { ok: true, remaining: limit - entry.count, retryAfter };
}

function sweep(now: number) {
  for (const [k, v] of buckets) {
    if (now >= v.resetAt) buckets.delete(k);
  }
}

/**
 * Best guess at the client IP from proxy headers. Behind Vercel/most CDNs the
 * left-most x-forwarded-for entry is the real client. Falls back to a constant
 * so a missing header degrades to a shared (stricter) bucket rather than no
 * limit at all.
 */
export function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

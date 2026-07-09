// Shared per-client rate limiter for the public API routes.
//
// Identity comes from X-Real-IP, which nginx sets from $remote_addr
// (`proxy_set_header X-Real-IP $remote_addr;`). nginx OVERWRITES any client-supplied
// X-Real-IP, so unlike X-Forwarded-For it cannot be spoofed to rotate fake IPs.
//
// Fixed-window, in-memory. The site runs as a single `next start` process (systemd),
// so a process-local map is sufficient. The map is bounded + self-pruning so a flood
// of distinct IPs can't grow it without limit and OOM the droplet.

const store = new Map<string, number[]>(); // key -> request timestamps in the current window
const MAX_KEYS = 20_000; // hard ceiling; beyond this we aggressively prune expired buckets

// Resolve the real client IP. Prefer X-Real-IP (nginx, non-spoofable here). Fall back to the
// LAST X-Forwarded-For hop (closest proxy) for local dev where no nginx sits in front — never
// the FIRST entry, which is attacker-controlled.
export function clientIp(req: Request): string {
  const real = req.headers.get("x-real-ip");
  if (real && real.trim()) return real.trim();
  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    const parts = xff.split(",").map((s) => s.trim()).filter(Boolean);
    if (parts.length) return parts[parts.length - 1];
  }
  return "local";
}

// Returns true if this call puts the client OVER `limit` requests within `windowMs`.
export function rateLimited(key: string, limit: number, windowMs = 60_000): boolean {
  const now = Date.now();

  // Opportunistic prune when the map grows large: drop expired/empty buckets.
  if (store.size > MAX_KEYS) {
    for (const [k, v] of store) {
      const alive = v.filter((t) => now - t < windowMs);
      if (alive.length) store.set(k, alive);
      else store.delete(k);
      if (store.size <= MAX_KEYS * 0.9) break;
    }
  }

  const recent = (store.get(key) || []).filter((t) => now - t < windowMs);
  recent.push(now);
  store.set(key, recent);
  return recent.length > limit;
}

// Standard 429 response with a Retry-After hint.
export function tooMany(): Response {
  return Response.json({ error: "rate_limited" }, { status: 429, headers: { "Retry-After": "60" } });
}

// One-liner guard for a route: returns a 429 Response if over the limit, else null.
// Buckets are keyed per-ROUTE per-IP, so heavy use of one endpoint (e.g. many TTS
// chunks in a voice session) never eats into another endpoint's budget.
export function limit(req: Request, perMinute: number): Response | null {
  let route = "";
  try { route = new URL(req.url).pathname; } catch { /* keep empty */ }
  const key = `${route}|${clientIp(req)}`;
  return rateLimited(key, perMinute) ? tooMany() : null;
}

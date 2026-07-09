import type { NextConfig } from "next";
import path from "path";

// Content-Security-Policy in REPORT-ONLY mode. It reflects the site's real external
// sources (Google Fonts, GTM/GA4, ElevenLabs STT/TTS incl. the realtime wss:// socket,
// the Cal.com booking embed, and the icon CDNs). Report-Only can never break the page —
// it only surfaces violations in devtools. Flip to "Content-Security-Policy" to enforce
// once the console is clean (Next hydration + GTM currently need 'unsafe-inline').
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://app.cal.com https://cdn.jsdelivr.net",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob: https://cdn.simpleicons.org https://cdn.jsdelivr.net https://www.googletagmanager.com https://*.google-analytics.com",
  "connect-src 'self' https://api.elevenlabs.io wss://api.elevenlabs.io https://*.google-analytics.com https://app.cal.com",
  "media-src 'self' blob: data:",
  "frame-src https://app.cal.com https://cal.com",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

// These five are always safe (they don't touch page resources), so they run enforcing.
const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(self), geolocation=(), browsing-topics=()" },
  { key: "Content-Security-Policy-Report-Only", value: csp },
];

const nextConfig: NextConfig = {
  // Don't advertise the framework (removes `X-Powered-By: Next.js`).
  poweredByHeader: false,
  // Pin the workspace root to this project (a stray lockfile elsewhere was confusing Turbopack).
  turbopack: {
    root: path.join(__dirname),
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;

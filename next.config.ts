import type { NextConfig } from "next"
import path from "node:path"

// Baseline security headers applied to every response. The Content-Security-
// Policy is set separately in src/proxy.ts via clerkMiddleware so it can carry
// Clerk's required directives without us having to hand-maintain them here.
const securityHeaders = [
  // Stop browsers from MIME-sniffing a response into a different type.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Clickjacking: refuse to be framed by other origins (CSP frame-ancestors
  // below is the modern equivalent; this covers older browsers).
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Don't leak full URLs (which can carry query params) to other origins.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Drop powerful features the site never uses.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  // Force HTTPS for two years, including subdomains. Safe on Vercel (always TLS).
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
]

const nextConfig: NextConfig = {
  // A parent-directory lockfile makes Next guess the wrong workspace root;
  // pin it to this project so fonts and assets resolve correctly.
  turbopack: {
    root: path.resolve(__dirname),
  },
  // Don't advertise the framework/version in every response.
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }]
  },
}

export default nextConfig

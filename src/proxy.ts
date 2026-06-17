import { clerkMiddleware } from "@clerk/nextjs/server";

// Content-Security-Policy is set here (not in next.config) so Clerk can merge
// in the directives its sign-in/sign-up widgets need automatically. We only
// add the few extra sources this site uses (Vercel Analytics) and tighten the
// dangerous defaults. The Polar checkout is reached via a full top-level
// navigation (window.location), so it leaves our origin and needs no entry.
export default clerkMiddleware({
  contentSecurityPolicy: {
    directives: {
      // Clickjacking: nobody may frame this site.
      "frame-ancestors": ["'none'"],
      // No <object>/<embed>/<applet>, and links/forms can't be rewritten away.
      "object-src": ["'none'"],
      "base-uri": ["'self'"],
      "form-action": ["'self'"],
      "img-src": ["'self'", "data:", "https:"],
      "script-src": ["https://va.vercel-scripts.com"],
      "connect-src": [
        "'self'",
        "https://va.vercel-scripts.com",
        "https://*.vercel-insights.com",
      ],
    },
  },
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|mp4|mov)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

export const siteConfig = {
  name: "Bender",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "https://waitlist.benderai.app",
  description:
    "Describe your app. Get real screens to ship. Bender turns a prompt into themed mobile screens you can edit by chat and export as clean code.",

  // ── The founding offer ──────────────────────────────────────────────
  offer: {
    price: 49,
    normalMonthly: 19,
    spotsTotal: 100,
    // Manual fallback for the live counter. Used only when Polar isn't
    // configured (POLAR_ACCESS_TOKEN + POLAR_LIFETIME_PRODUCT_ID). Update
    // it by hand each morning so the number always reads as real.
    spotsClaimedManual: 11,
    // 500 credits/month, resets monthly — same allowance as the Pro plan.
    // Never describe the deal as "unlimited".
    creditsPerMonth: 500,
  },

  // ── Demo ────────────────────────────────────────────────────────────
  // Empty videoSrc runs the built-in animated demo (type → generate →
  // screens spring up, on loop). To use real footage instead, drop a
  // recording at /public/demo.mp4 and set videoSrc: "/demo.mp4".
  demo: {
    videoSrc: "",
    durationLabel: "90 seconds",
  },

  // ── Launch ──────────────────────────────────────────────────────────
  launchWindow: "next week",

  social: {
    x: "https://x.com/yashjaiswal28_",
    email: "hey@bender.app",
  },
} as const;

export type SiteConfig = typeof siteConfig;

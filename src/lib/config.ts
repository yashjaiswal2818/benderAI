export const siteConfig = {
  name: "Bender",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "https://waitlist.benderai.app",
  description:
    "Describe your app. Get real screens to ship. Bender turns a prompt into themed mobile screens you can edit by chat and export as clean code.",

  // ── The paid waitlist ───────────────────────────────────────────────
  // $5 once to join. Non-refundable commitment fee — not credited toward the
  // subscription. The reward is a permanently lower yearly price at launch.
  waitlist: {
    joinPrice: 5,
    // Yearly plan pricing at launch. Members lock in `yearlyMember` for good;
    // everyone else pays `yearlyNormal`.
    yearlyNormal: 15,
    yearlyMember: 12,
    // Manual fallback for the live "X joined" counter. Used only when Polar
    // isn't configured (POLAR_ACCESS_TOKEN + POLAR_WAITLIST_PRODUCT_ID).
    // Update by hand so the number always reads as real.
    joinedManual: 11,
    // 500 credits/month, resets monthly — the Pro allowance the yearly plan
    // includes. Never describe it as "unlimited".
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
    email: "hey@benderai.app",
  },
} as const;

export type SiteConfig = typeof siteConfig;

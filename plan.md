# Bender — Waitlist Page Build Brief (Agent Handoff)

> ⚠️ **OUTDATED (historical build log).** This brief describes the original
> *$49 lifetime for the first 100* model. As of 2026-06-21 the model is a
> **$5 paid waitlist** (locks in $12/mo vs $15/mo; no free email list, no spot
> cap). For the current model see [PRODUCT.md](PRODUCT.md) and
> [README.md](README.md). Kept only as a record of the initial build.

> **Read this first.** You are building a **waitlist landing page** for an existing SaaS called **Bender**.
> This document tells you everything about the product, its visual identity, and exactly what the
> waitlist page must do — so you can build it to match the main app perfectly without needing to
> reverse-engineer the codebase. Reference paths to the main app are given so you can copy shared assets.
>
> Main app location: `/Users/shraddhajaiswal/Desktop/spark` (repo folder is "spark", product brand is **Bender**).

---

## 1. What Bender is

Bender is an **AI UI-generation tool**. You describe an app in plain language and it generates real,
shippable product screens you can iterate on, prototype, and export to code.

- **One-line value prop (used as the landing hero):** *"Describe your app. Get real screens to ship."*
- **What users do:** type a prompt → get generated screens/frames → refine via chat → preview a
  clickable prototype → export.
- **Audience:** founders, indie hackers, and designers who want production-ready UI fast.
- **Tone:** confident, precise, builder-focused. Not hypey, not "AI-startup gradient" energy.

---

## 2. Why we're building a waitlist (the offer)

Bender launches V1 in ~1 week. The waitlist page is a **pre-launch growth + sales page** with a
scarcity offer:

- **First 100 buyers get a $49 LIFETIME deal.** One-time $49 payment → lifetime access to the Pro
  tier (which normally costs $19/month).
- **"Lifetime" is capped, not unlimited:** lifetime buyers get **500 credits per month that reset
  monthly** (same allowance as the paid Pro plan). This is deliberate — Bender pays real AI costs per
  generation, so unlimited-forever would be a margin landmine. Don't advertise "unlimited."
- **Pay now:** buyers pay the $49 **immediately** via Polar checkout to lock their spot (real
  commitment, not a free "maybe later" list).
- **Everyone else:** a secondary, free **"notify me at launch"** email capture for people who aren't
  ready to buy.

### What the page must communicate
1. What Bender is (short, punchy — reuse the value prop above).
2. The scarcity: **"First 100 founders — $49 lifetime"** with a live **"X of 100 claimed / Y left"**
   counter, and a clean **sold-out** state once 100 is reached.
3. A primary CTA to **claim the $49 deal**, and a secondary CTA to **join the free list**.

### CTA behavior
- **Primary — "Claim lifetime deal · $49":**
  - If the visitor is signed out → open the **Clerk sign-up modal** first (so they become a real
    account that the entitlement attaches to).
  - Once signed in → send them to the **Polar checkout link** for the $49 product, passing their user
    id and a success redirect. (The main app already handles granting the lifetime tier after payment;
    the waitlist page only needs to *start* the checkout.)
  - If sold out → disable the button, show "All 100 spots claimed — join the free list below."
- **Secondary — free email capture:** simple email field → posts the email to the main app's waitlist
  endpoint → inline success state.
- **"You're in" confirmation** screen/state after returning from a successful Polar checkout.

---

## 3. Visual identity — match the main site exactly

The whole point of the page is that it should feel like Bender. Reuse the **same background, colors,
fonts, and aesthetic** as the main landing page.

### Design theme: "Drafting Studio"
- **Mood:** a designer's drafting table in daylight. Calm, precise, technical-but-warm.
- **Mode:** **Light only.** No dark mode.
- **Color strategy:** restrained — tinted-neutral (near-white) surfaces, one cobalt primary, one warm
  clay accent used sparingly (≤10% of any view). Chrome recedes; content is the hero.

### Hard bans (do NOT do these)
- ❌ No gradients of any kind (including gradient text).
- ❌ No glassmorphism / decorative blur.
- ❌ No "AI SaaS" palettes (mint→cyan, neon, purple-blue gradients).
- ❌ No neobrutalism, no per-section uppercase eyebrows, no serif-italic editorial styling.

### Color tokens (OKLCH — use these exact values, never hex)
```
/* Surfaces (paper) */
--bg:            oklch(1.000 0.000 0)      /* pure white */
--surface:       oklch(0.976 0.004 245)    /* slightly cool-tinted card */
--surface-sunk:  oklch(0.958 0.005 245)    /* inset */

/* Ink (cool near-black text) */
--ink:           oklch(0.260 0.020 250)    /* primary text, ~10:1 on white */
--ink-muted:     oklch(0.520 0.014 250)    /* secondary text */
--ink-faint:     oklch(0.650 0.010 250)    /* placeholder / tertiary */

/* Primary (deep cobalt) — buttons, key actions */
--primary:       oklch(0.480 0.130 240)
--primary-hover: oklch(0.430 0.135 240)
--primary-press: oklch(0.390 0.130 240)
--primary-weak:  oklch(0.955 0.020 240)
--on-primary:    oklch(0.995 0.000 0)      /* white text on primary */

/* Accent (warm clay) — rare highlights only, ≤10% of view */
--clay:          oklch(0.680 0.130 55)
--clay-weak:     oklch(0.960 0.022 60)
--on-clay:       oklch(0.995 0.000 0)

/* Hairlines (drafting grid) */
--border-subtle: oklch(0.930 0.004 245)
--border-base:   oklch(0.890 0.005 245)
--border-strong: oklch(0.830 0.006 245)

/* States */
--success: oklch(0.560 0.130 150)
--warning: oklch(0.720 0.140 75)
--danger:  oklch(0.560 0.180 25)
--info:    oklch(0.480 0.130 240)   /* = primary */

/* Motion */
--ease-out: cubic-bezier(0.22, 1, 0.36, 1)
```

### Typography
- **Body / UI:** **Inter** (Google Fonts) — variable `--font-sans`.
- **Display / headings:** **Space Grotesk** (Google Fonts) — variable `--font-display`. Technical,
  drafting-precise. Use this for the hero headline.
- **Mono (rare):** **IBM Plex Mono** — variable `--font-mono`. Only for small technical annotations.

Type scale (key sizes):
```
display: clamp(2.4rem, 5.4vw, 4rem), 600 wt, line-height ~1.04, letter-spacing -0.025em  (hero)
h1: 2rem/1.15, 600     h2: 1.5rem/1.2, 600     h3: 1.25rem/1.3, 600
body: 0.9375rem/1.6, 400     sm: 0.8125rem/1.5, 400     label: 0.75rem/1.4, 500
```

Entrance animation used site-wide (apply to hero content):
```
@keyframes rise { 0% {opacity:0; transform:translateY(12px)} 100% {opacity:1; transform:translateY(0)} }
/* usage: animation: rise 0.7s var(--ease-out) both; */
```

---

## 4. The background — the "DotField" (most important visual to match)

The main site's signature background is **NOT** a gradient or image. It's an **interactive canvas dot
grid** called **DotField**. The waitlist page must use the same one.

**What it looks like / does:**
- A full-page grid of small dots (a "drafting grid") rendered on an HTML5 canvas.
- The dots **react to the cursor**: they bulge/push away from the pointer with smooth spring physics,
  and a soft **warm-clay radial glow** follows the mouse.
- It **scrolls with the page** (it is not a fixed viewport layer).
- **Accessibility:** if the user has `prefers-reduced-motion: reduce`, it renders a **static** grid with
  no animation. It's also performance-optimized (only repaints while the cursor is active, then settles).

**Default look (exact props — replicate these):**
```
dotRadius:     2.6
dotSpacing:    16          // 16px grid
cursorRadius:  420         // interaction zone radius
bulgeStrength: 64          // how far dots push from cursor
glowRadius:    170
gradientFrom:  rgba(51, 59, 76, 0.62)    // dot color, dark cool-gray
gradientTo:    rgba(78, 86, 103, 0.42)   // dot color, lighter cool-gray
glowColor:     rgba(200, 116, 58, 0.24)  // warm clay glow (the accent)
```

**Easiest path:** the component is self-contained and reusable. Copy it directly:
`/Users/shraddhajaiswal/Desktop/spark/components/landing/shared/dot-field.tsx`

---

## 5. Page layout pattern (how the main site stacks it)

The landing page layers the DotField behind the content. Mirror this structure:
```
<div className="relative min-h-screen overflow-x-hidden">
  <Header />                                    // simple top bar: wordmark "Bender" + minimal nav
  <div className="relative">
    <div className="pointer-events-none absolute inset-0 z-0">
      <DotField />                              // background, behind everything
    </div>
    <main className="relative z-10">            // all real content sits above the dots
      {/* Hero (headline + subcopy)            */}
      {/* Scarcity row + live "X/100" counter  */}
      {/* Primary CTA: Claim $49 lifetime      */}
      {/* Secondary CTA: free email capture    */}
    </main>
  </div>
  <Footer />
</div>
```
- Hero content is centered, max-width ~3xl, generous vertical padding, `text-center`.
- Headline in `font-display`, the `rise` entrance animation, `text-wrap: balance`.
- Keep it spare and confident — let the DotField carry the visual weight. No decorative clutter.

---

## 6. Technical context (so you make compatible choices)

You do **not** need to wire up the database or payment fulfillment — the main app already does that.
Build the waitlist as a **thin front-end** that reuses shared infrastructure.

- **Framework:** Next.js 16 (App Router), React 19, Tailwind CSS, TypeScript — match the main app.
- **Auth:** **Clerk** (`@clerk/nextjs ^7`). Use the **same Clerk keys** as the main app so buyers
  become real Bender accounts. Wrap the app in `<ClerkProvider>`; use `mode="modal"` sign-up (the main
  app has no dedicated /sign-in route — it uses modals). Same domain = shared session cookies, nothing
  extra to configure.
- **Payments:** **Polar.sh** (hosted checkout). The $49 lifetime product is a Polar product; the page
  just redirects to its checkout link with the Clerk user id appended (pattern mirrors the main app's
  Pro checkout). The main app's Polar webhook grants the lifetime tier after payment — not your concern.
- **No database in the waitlist app.** For the live "X of 100" counter and the free email signup, call
  the main app's small API endpoints (an availability endpoint and a waitlist-email endpoint).
- **Deployment intent:** the waitlist runs on the **same domain** as the main app (e.g. served under a
  path via Next.js multi-zone rewrites). Keep routes/assets path-agnostic so a `basePath` can be set.

### Assets to copy from the main app (so styling is identical)
- Background: `components/landing/shared/dot-field.tsx`
- Global tokens + fonts + `rise` animation: `app/globals.css`
- Font setup (Inter / Space Grotesk / IBM Plex Mono): see `app/layout.tsx`
- Reference for layout + hero treatment: `app/(routes)/page.tsx`, `components/landing/hero.tsx`
- Reference for the checkout-redirect pattern: `components/paywall-modal.tsx`

---

## 7. Acceptance checklist
- [ ] Page visually indistinguishable from the main Bender site (DotField bg, OKLCH colors, fonts).
- [ ] Hero clearly states what Bender is + the $49-lifetime-for-first-100 offer.
- [ ] Live "X of 100 claimed" counter; graceful **sold-out** state at 100.
- [ ] Primary CTA: signed-out → Clerk sign-up modal → Polar $49 checkout (with user id + success URL).
- [ ] Secondary CTA: free email capture with inline success.
- [ ] "You're in" confirmation after a successful checkout return.
- [ ] Respects `prefers-reduced-motion` (static dot grid).
- [ ] Light mode only; none of the banned styles (no gradients/glassmorphism/neon).

# Bender — waitlist

Pre-launch **paid waitlist** for **Bender**, an AI tool that turns a
plain-English prompt into production React Native mobile screens.

The model: **$5 once to join the waitlist.** It's a non-refundable commitment
fee (not a deposit) — paying is the signal of genuine intent, so there's no
free email list. In return, members lock in Bender Pro yearly at **$12/yr**
(vs **$15** for everyone else) at launch.

Built with Next.js 16 (App Router), React 19, Tailwind v4, `motion`,
`@number-flow/react`, and `lucide-react`. Auth is Clerk; payment is Polar.
Design and intent live in [DESIGN.md](DESIGN.md) and [PRODUCT.md](PRODUCT.md).

## Run it

```bash
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev                  # http://localhost:3000
```

## Go live

1. **Clerk.** Set `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`
   (use the same instance as the main app so buyers become real accounts).

2. **Polar — create the $5 product.** Run the helper, which creates the one-time
   $5 "Waitlist" product + checkout link and writes the two env vars for you:

   ```bash
   node scripts/setup-polar.mjs
   ```

   It sets `NEXT_PUBLIC_POLAR_WAITLIST_CHECKOUT_URL` and
   `POLAR_WAITLIST_PRODUCT_ID`. (`/claim` appends `clerk_user_id` +
   `success_url` automatically.) Until these are set, `/claim` safely shows
   "checkout unavailable" — it never charges.

3. **The "joined" counter.** With `POLAR_ACCESS_TOKEN` +
   `POLAR_WAITLIST_PRODUCT_ID` set, the counter is live (unique paying
   customers, cached 60s). Otherwise it shows `waitlist.joinedManual` from
   [`src/lib/config.ts`](src/lib/config.ts) — bump that by hand on slow days so
   the number always reads as real.

Pricing and copy knobs all live in `siteConfig.waitlist` in
[`src/lib/config.ts`](src/lib/config.ts): `joinPrice`, `yearlyNormal`,
`yearlyMember`, `joinedManual`, `creditsPerMonth`.

> **Discount enforcement is the main app's job.** This site collects the $5 and
> ties it to a `clerk_user_id` (+ email) via Polar. At launch, the main app
> must read who paid and apply the $12/yr price. This repo only makes the
> promise; it can't enforce pricing.

## Structure

```
src/
  proxy.ts                  Clerk middleware + Content-Security-Policy
  app/
    layout.tsx              fonts, metadata, ClerkProvider
    page.tsx                hero → demo → showcase → $5 offer
    claim/page.tsx          auth-gated → $5 Polar checkout redirect
    api/spots/route.ts      live "X joined" count (JSON)
  components/
    claim-button.tsx        primary CTA (sign-up → /claim)
    joined-meter.tsx        animated "X builders joined" social proof
    status-banner.tsx       post-checkout / sign-in query-flag messaging
    site-header.tsx, showcase/, bender-bot.tsx, demo-*.tsx, dot-field.tsx
  lib/
    config.ts               all the launch knobs (siteConfig.waitlist)
    spots.ts                getJoinedCount() — counts paid Polar orders
scripts/setup-polar.mjs     one-shot $5 product + checkout-link creator
```

## Deploy

Any Next.js host (Vercel recommended). Set the same env vars in the host's
environment — `.env.local` does **not** deploy. Security headers live in
[`next.config.ts`](next.config.ts); the CSP lives in
[`src/proxy.ts`](src/proxy.ts).

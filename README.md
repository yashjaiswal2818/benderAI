# Bender — waitlist

Pre-launch waitlist landing page for **Bender**, an AI tool that turns a
plain-English prompt into production React Native mobile screens.

Built with Next.js 16 (App Router), React 19, Tailwind v4, `motion`,
`@number-flow/react`, and `lucide-react`. Design system and intent live in
[DESIGN.md](DESIGN.md) and [PRODUCT.md](PRODUCT.md).

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
```

The signup form works immediately: with no API key set, the route accepts
emails in development so you can test the full flow.

## Go live (3 things)

1. **Connect Loops.** Copy `.env.example` to `.env.local` and paste your key:

   ```bash
   cp .env.example .env.local
   # LOOPS_API_KEY=your_key_here
   ```

   Get it from Loops → Settings → API. Signups are added to the `Waitlist`
   user group via `POST app.loops.so/api/v1/contacts/create`. Restart `npm run dev`.

2. **Update the spot counter daily.** In [`src/lib/config.ts`](src/lib/config.ts),
   bump `spotsClaimed`. Update it by hand every morning, even on slow days — a
   real number reads as momentum (12 looks honest, 47 looks like a line out the
   door). Never leave it at 0. `spotsTotal` is the founding cap.

3. **Swap in the real demo video.** Drop a screen recording at `public/demo.mp4`
   and set `demoVideoSrc: "/demo.mp4"` in `config.ts`. Until then the demo shows
   the live "type a prompt → generate a screen" animation as a placeholder.

Other knobs in `config.ts`: the founding price (`offer.priceNow` / `priceLater`),
your Polar checkout link (`offer.checkoutUrl`, used in the launch email), and
social links.

## Structure

```
src/
  app/
    layout.tsx              fonts (Bricolage + Geist), metadata
    page.tsx                section order: hero → demo → problem → features → outputs → offer → faq
    globals.css             design tokens (@theme), reveal + marquee CSS
    api/waitlist/route.ts   Loops integration (+ dev fallback)
  components/
    sections/               one file per page section
    screens.tsx             the six generated app mockups (pure CSS/SVG)
    phone.tsx               scalable device frame
    hero-visual.tsx         prompt → generate → morph animation
    waitlist-form.tsx       form with idle/loading/success/error states
    spot-counter.tsx        animated counter + progress
    ui/                     button, container, expandable-screen (cult-ui, hardened)
  lib/config.ts             all the launch knobs
```

## Deploy

Any Next.js host (Vercel recommended). Set `LOOPS_API_KEY` in the host's
environment. The dev-only local fallback is disabled in production, so the key
is required for live signups.

# Design

Visual source of truth for the Bender waitlist. Tokens live in
`src/app/globals.css` (`@theme`); this document explains the intent.

## Theme

Bright creative playground. Pure white surface, near-black ink, one electric
green signature, and a small set of pop colors that appear only inside the
generated phone mockups (where color variety is the point). Light, fast, and
confident, with bold colored bands (a dark "problem" interlude, a green
"offer" drench) breaking the white for rhythm. Not dark "because tools look
cool dark"; the product is daytime, optimistic, and playful.

## Color

OKLCH throughout. Strategy: full palette, used with discipline — chrome is
black/white/green; coral/cobalt/grape/sun are reserved for the app screens.

| Token | OKLCH | Role |
|---|---|---|
| `--color-bg` | `1 0 0` | Pure white page surface |
| `--color-surface` | `0.976 0.006 152` | Section bands, cards |
| `--color-surface-2` | `0.955 0.009 152` | Insets, chips |
| `--color-ink` | `0.17 0.012 152` | Body + headings + primary buttons (~16:1 on white) |
| `--color-muted` | `0.488 0.018 152` | Secondary text (~4.8:1 on white) |
| `--color-line` / `--color-line-strong` | `0.905` / `0.84` | Hairlines, borders |
| `--color-brand` | `0.852 0.182 138` | Signature green — block fills with BLACK text, highlights, glow |
| `--color-brand-deep` | `0.5 0.135 142` | Green that holds white text / small green accents |
| `--color-coral` | `0.66 0.2 27` | Pop accent (live dot, mockups) |
| `--color-cobalt` / `--color-grape` / `--color-sun` | — | Mockup-only variety |
| `--color-on-brand` | `0.17 0.04 142` | Near-black text on green fills |
| `--color-on-dark` | `0.97 0.005 152` | Text on ink |

Rule: green is **never** used as text on white (too low contrast); it is a fill
or a highlight only. Dark text on green fills; white text on saturated mid
fills (coral/cobalt) per Helmholtz-Kohlrausch.

## Typography

- **Display:** Bricolage Grotesque — characterful grotesque, used for all headings, extrabold, letter-spacing ~-0.035em.
- **Body:** Geist — neutral, highly legible. Line length capped ~65ch.
- **Mono:** Geist Mono — prompts, code snippets, counters, metadata.
- Fluid `clamp()` headings, max ~4.5rem (under the 6rem ceiling). `text-wrap: balance` on headings, `pretty` on prose.

## Layout

- 1152px max content width (`max-w-6xl`), fluid `px-6 / sm:px-8` gutters.
- Asymmetric two-column hero and offer; a bento (1 wide + smaller tiles) for features; full-bleed marquee for outputs.
- Spacing breathes: section padding `py-20 lg:py-28`, varied per section for rhythm.
- Grid children carry `min-w-0` so long content (price, code) can't force overflow.

## Components

Phone frame (scales an intrinsic canvas so screen proportions never drift),
six generated app screens (pure CSS/SVG, no images), morphing ExpandableScreen
demo (shared `layoutId`), waitlist form (idle/loading/success/already/error),
animated spot counter (NumberFlow + progress), reveal-on-scroll wrapper, FAQ
accordion, brand button (primary/brand/inverted/outline/ghost).

## Motion

- Signature: hero types a prompt, shows a generating skeleton, then morphs the finished screen in (blur + scale).
- Eases are exponential ease-out (`ease-out-quint`/`expo`); no bounce, no elastic.
- Marquee outputs, floating glow, pulse dots, blinking carets.
- Every effect has a `prefers-reduced-motion` fallback (instant/crossfade); reveals never gate content visibility.

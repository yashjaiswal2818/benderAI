import { Suspense } from "react";
import { ChevronDown } from "lucide-react";
import DotField from "@/components/dot-field";
import { SiteHeader } from "@/components/site-header";
import { ClaimButton } from "@/components/claim-button";
import { JoinedMeter } from "@/components/joined-meter";
import { DemoVideo } from "@/components/demo-video";
import { StatusBanner } from "@/components/status-banner";
import { Showcase } from "@/components/showcase/showcase";
import { BenderBot } from "@/components/bender-bot";
import { getJoinedCount } from "@/lib/spots";
import { siteConfig } from "@/lib/config";

export const dynamic = "force-dynamic";

export default async function Page() {
  const count = await getJoinedCount();
  const { waitlist } = siteConfig;

  return (
    <div id="top" className="relative min-h-screen overflow-x-hidden bg-bg">
      <SiteHeader />

      <div className="relative">
        <div className="pointer-events-none absolute inset-0 z-0">
          <DotField />
        </div>

        <main className="relative z-10">
          {/* ── Hero ───────────────────────────────────────────────── */}
          <section className="mx-auto flex min-h-[88svh] max-w-3xl flex-col items-center justify-center px-5 pb-16 pt-32 text-center md:px-8">
            <Suspense fallback={null}>
              <StatusBanner />
            </Suspense>

            <div className="rise" style={{ "--rise-delay": "0ms" } as React.CSSProperties}>
              <BenderBot size={108} />
            </div>

            <p
              className="rise mt-3 inline-flex items-center gap-2 rounded-full border border-border-base bg-bg px-4 py-1.5 font-mono text-[12.5px] font-medium text-ink-muted"
              style={{ "--rise-delay": "40ms" } as React.CSSProperties}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-clay" />
              V1 launches {siteConfig.launchWindow} · early access is open
            </p>

            <h1
              className="rise mt-5 font-display text-ink"
              style={
                {
                  "--rise-delay": "90ms",
                  fontSize: "clamp(2.5rem, 5.6vw, 4.1rem)",
                  fontWeight: 700,
                  lineHeight: 1.04,
                  letterSpacing: "-0.025em",
                } as React.CSSProperties
              }
            >
              Describe your app. Get real screens to ship.
            </h1>

            <p
              className="rise mx-auto mt-5 max-w-[48ch] text-[16px] font-medium leading-[1.6] text-ink/80 md:text-[17px]"
              style={{ "--rise-delay": "150ms" } as React.CSSProperties}
            >
              Type what you want to build, like &ldquo;a calm fitness app with a
              dark theme&rdquo;. Bender designs every screen for you. Change
              anything by chatting. Export real code when it looks right.
            </p>

            <div
              className="rise mt-8 flex flex-col items-center gap-3 sm:flex-row"
              style={{ "--rise-delay": "210ms" } as React.CSSProperties}
            >
              <ClaimButton />
              <a
                href="#demo"
                className="inline-flex h-12 items-center gap-1.5 rounded-full border border-border-base bg-bg px-6 text-[14px] font-medium text-ink transition-colors hover:bg-surface-sunk"
              >
                Watch the demo
                <ChevronDown className="size-4" strokeWidth={2} />
              </a>
            </div>

            <div
              className="rise mt-10 flex w-full flex-col items-center"
              style={{ "--rise-delay": "280ms" } as React.CSSProperties}
            >
              <JoinedMeter count={count} />
            </div>
          </section>

          {/* ── Demo ───────────────────────────────────────────────── */}
          <section id="demo" className="mx-auto max-w-4xl scroll-mt-24 px-5 pb-24 md:px-8">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-ink">
                Watch it build an app
              </h2>
              <p className="mt-2.5 text-[14.5px] leading-[1.6] text-ink-muted">
                One prompt in, finished screens out. No cuts, no editing.
              </p>
            </div>
            <div className="mt-8">
              <DemoVideo />
            </div>
            <p className="mt-4 text-center font-mono text-[12.5px] font-medium text-ink-muted">
              01 describe it &nbsp;·&nbsp; 02 get your screens &nbsp;·&nbsp; 03
              export the code
            </p>
          </section>

          {/* ── Made with Bender ───────────────────────────────────── */}
          <section id="showcase" className="mx-auto max-w-6xl scroll-mt-24 px-5 pb-24 md:px-8">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-ink">
                Five apps. Five styles. Zero designers.
              </h2>
              <p className="mt-2.5 text-[14.5px] leading-[1.6] text-ink-muted">
                Each one came from a single prompt: glass, neumorphic, even a
                mascot. Tap any phone to flip through its whole flow.
              </p>
            </div>
            <div className="mt-10">
              <Showcase />
            </div>
          </section>

          {/* ── The offer ──────────────────────────────────────────── */}
          <section id="claim" className="mx-auto max-w-4xl scroll-mt-24 px-5 pb-28 md:px-8">
            <div className="mx-auto max-w-[26rem] overflow-hidden rounded-2xl border border-border-base bg-bg shadow-pop">
              <div className="border-b border-border-subtle bg-surface px-7 py-4">
                <p className="flex items-center gap-2 font-mono text-[12px] text-ink-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-clay" />
                  Early access · be first in line
                </p>
              </div>

              <div className="px-7 pb-7 pt-6">
                <div className="flex items-baseline gap-2.5">
                  <span className="font-display text-[3.25rem] font-semibold leading-none tracking-[-0.02em] text-ink">
                    ${waitlist.joinPrice}
                  </span>
                  <span className="text-[15px] font-medium text-ink">once</span>
                  <span className="text-[13px] font-medium text-ink-muted">
                    + tax
                  </span>
                </div>
                <p className="mt-2 text-[14px] font-medium leading-[1.55] text-ink-muted">
                  A one-time fee to join the waitlist and lock in early access to
                  the Bender playground the day it opens. No free list, no spam
                  &mdash; just builders who actually want this.
                </p>

                <div className="mt-7 flex justify-center">
                  <JoinedMeter count={count} />
                </div>

                <div className="mt-5 flex flex-col gap-2.5">
                  <ClaimButton label={`Join the waitlist · $${waitlist.joinPrice}`} />
                  <p className="text-center text-[12.5px] font-medium leading-[1.5] text-ink-muted">
                    Pay once through Polar. You&rsquo;re on the list the moment
                    payment clears.
                  </p>
                </div>
              </div>

              <div className="border-t border-border-subtle bg-surface px-7 py-3.5">
                <p className="text-[12px] leading-[1.55] text-ink-muted">
                  The ${waitlist.joinPrice} is a non-refundable commitment fee to join
                  the waitlist, not a deposit.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

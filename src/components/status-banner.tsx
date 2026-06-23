"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import { PartyPopper } from "lucide-react";

/**
 * Reacts to the query flags the claim flow leaves behind:
 *  ?claimed=1   — back from a successful $5 Polar checkout → "You're in."
 *  ?owned=1     — clicked join while already a member → "You're already in."
 *  ?signin=1    — hit /claim signed out → auto-open the sign-in modal.
 *  ?checkout=unavailable — checkout link not configured yet.
 *
 * Must be rendered inside <Suspense> (uses useSearchParams).
 */
export function StatusBanner() {
  const params = useSearchParams();
  const { openSignIn } = useClerk();

  const claimed = params.get("claimed") === "1";
  const owned = params.get("owned") === "1";
  const signin = params.get("signin") === "1";
  const unavailable = params.get("checkout") === "unavailable";

  useEffect(() => {
    if (signin) openSignIn?.({ forceRedirectUrl: "/claim" });
  }, [signin, openSignIn]);

  if (claimed) {
    return (
      <div
        role="status"
        className="rise mx-auto mb-8 flex w-full max-w-md items-start gap-3 rounded-xl border border-border-subtle bg-surface px-5 py-4 text-left shadow-card"
      >
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-clay-weak">
          <PartyPopper className="h-4 w-4 text-clay" strokeWidth={2} />
        </span>
        <div>
          <p className="font-display text-[15px] font-semibold text-ink">
            You&rsquo;re on the waitlist.
          </p>
          <p className="mt-0.5 text-[13px] leading-[1.5] text-ink-muted">
            Early access secured. We&rsquo;ll email you the moment Bender opens,
            about a week from now.
          </p>
        </div>
      </div>
    );
  }

  if (owned) {
    return (
      <div
        role="status"
        className="rise mx-auto mb-8 flex w-full max-w-md items-start gap-3 rounded-xl border border-border-subtle bg-surface px-5 py-4 text-left shadow-card"
      >
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-clay-weak">
          <PartyPopper className="h-4 w-4 text-clay" strokeWidth={2} />
        </span>
        <div>
          <p className="font-display text-[15px] font-semibold text-ink">
            You&rsquo;re already in.
          </p>
          <p className="mt-0.5 text-[13px] leading-[1.5] text-ink-muted">
            You&rsquo;ve already joined the waitlist &mdash; no need to pay again.
            We&rsquo;ll email you the moment Bender opens.
          </p>
        </div>
      </div>
    );
  }

  if (unavailable) {
    return (
      <p
        role="status"
        className="rise mx-auto mb-8 w-full max-w-md rounded-xl border border-border-subtle bg-surface px-5 py-3 text-[13px] text-ink-muted"
      >
        Checkout opens shortly. Check back in a little while to grab your spot.
      </p>
    );
  }

  return null;
}

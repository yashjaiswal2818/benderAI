"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import { PartyPopper } from "lucide-react";

/**
 * Reacts to the query flags the claim flow leaves behind:
 *  ?claimed=1   — back from a successful Polar checkout → "You're in."
 *  ?signin=1    — hit /claim signed out → auto-open the sign-in modal.
 *  ?soldout=1   — tried to claim after the cap → handled by page copy.
 *  ?checkout=unavailable — checkout link not configured yet.
 *
 * Must be rendered inside <Suspense> (uses useSearchParams).
 */
export function StatusBanner() {
  const params = useSearchParams();
  const { openSignIn } = useClerk();

  const claimed = params.get("claimed") === "1";
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
            You&rsquo;re in. Spot locked.
          </p>
          <p className="mt-0.5 text-[13px] leading-[1.5] text-ink-muted">
            Your account has lifetime Pro from day one. We&rsquo;ll email you
            the moment Bender opens, about a week from now.
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
        Checkout opens shortly. Join the free list below and we&rsquo;ll email
        you the working link.
      </p>
    );
  }

  return null;
}

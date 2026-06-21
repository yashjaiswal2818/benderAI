"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SignUpButton, useUser } from "@clerk/nextjs";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/config";

const claimClasses = (size: "md" | "lg") =>
  cn(
    "inline-flex items-center justify-center gap-2 rounded-full bg-primary font-semibold text-on-primary transition-colors hover:bg-primary-press focus:outline-none focus-visible:shadow-[var(--glow-primary)]",
    size === "lg" ? "h-12 px-7 text-[15px]" : "h-11 px-6 text-[14px]"
  );

/**
 * The primary CTA. Signed out: opens the Clerk sign-up modal, and after
 * sign-up Clerk forwards to /claim, which sends the new account straight to
 * the $5 Polar checkout. Signed in: /claim directly. The waitlist is open, so
 * there's no sold-out state.
 */
export function ClaimButton({
  size = "lg",
  label,
}: {
  size?: "md" | "lg";
  label?: string;
}) {
  const { isSignedIn } = useUser();
  const text = label ?? `Join the waitlist · $${siteConfig.waitlist.joinPrice}`;

  if (isSignedIn) {
    return (
      <Link href="/claim" className={claimClasses(size)}>
        {text}
        <ArrowRight className="size-4" strokeWidth={2.25} />
      </Link>
    );
  }

  return (
    <SignUpButton mode="modal" forceRedirectUrl="/claim" signInForceRedirectUrl="/claim">
      <button type="button" className={claimClasses(size)}>
        {text}
        <ArrowRight className="size-4" strokeWidth={2.25} />
      </button>
    </SignUpButton>
  );
}

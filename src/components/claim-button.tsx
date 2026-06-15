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
 * the Polar checkout. Signed in: /claim directly. Sold out: disabled with
 * an explanation, pointing at the free list.
 */
export function ClaimButton({
  soldOut,
  size = "lg",
  label,
}: {
  soldOut: boolean;
  size?: "md" | "lg";
  label?: string;
}) {
  const { isSignedIn } = useUser();
  const text = label ?? `Claim the lifetime deal · $${siteConfig.offer.price}`;

  if (soldOut) {
    return (
      <button type="button" disabled className={cn(claimClasses(size), "opacity-55")}>
        All 100 spots claimed
      </button>
    );
  }

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

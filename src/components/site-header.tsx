"use client";

import { ArrowRight } from "lucide-react";
import { motion, MotionConfig } from "motion/react";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

/** Floating pill header, same treatment as the main site. Wordmark only. */
export function SiteHeader() {
  const { isLoaded, user } = useUser();

  return (
    <MotionConfig reducedMotion="user">
      <div className="fixed left-1/2 top-0 z-50 flex w-full max-w-4xl -translate-x-1/2 justify-center px-4 py-5">
        <motion.div
          initial={{ y: -10 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex w-full items-center justify-between gap-4 rounded-full border border-border-base bg-surface/85 px-5 py-2.5 shadow-pop backdrop-blur-xl"
        >
          <a
            href="#top"
            aria-label="Bender — top of page"
            className="font-display text-[20px] font-semibold leading-none tracking-[-0.01em] text-ink"
          >
            Bender
          </a>

          <div className="flex shrink-0 items-center gap-2">
            {isLoaded && user ? (
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-7 h-7",
                    userButtonTrigger:
                      "focus-visible:ring-2 focus-visible:ring-[var(--primary)]/40 rounded-full",
                  },
                }}
              />
            ) : (
              <SignInButton mode="modal">
                <button
                  type="button"
                  className="hidden h-9 items-center rounded-full px-3 text-[13px] font-medium text-ink-muted transition-colors hover:text-ink sm:inline-flex"
                >
                  Sign in
                </button>
              </SignInButton>
            )}

            <a
              href="#claim"
              className="inline-flex h-9 items-center gap-1.5 rounded-full bg-primary px-4 text-[13px] font-semibold text-on-primary transition-colors hover:bg-primary-press"
            >
              Join for $5
              <ArrowRight className="size-3.5" strokeWidth={2.25} />
            </a>
          </div>
        </motion.div>
      </div>
    </MotionConfig>
  );
}

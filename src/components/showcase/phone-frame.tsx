import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/* Same device treatment as the main site's showcase (shared/phone-frame.tsx)
   so phones look identical across both surfaces. */

interface PhoneFrameProps {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

export function PhoneFrame({ children, className, ariaLabel }: PhoneFrameProps) {
  return (
    <div
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
      className={cn(
        "relative shrink-0 select-none",
        "h-[378px] w-[180px] md:h-[438px] md:w-[212px]",
        "rounded-[24px] md:rounded-[28px]",
        "overflow-hidden bg-[#0c0c0c]",
        "ring-1 ring-border-strong",
        "shadow-[0_18px_44px_-18px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      <div className="relative h-full w-full">{children}</div>
    </div>
  );
}

/** Breathing room where a status bar would sit. */
export function StatusBar() {
  return <div aria-hidden className="relative z-20 h-[12px]" />;
}

"use client";

import { useEffect, useState } from "react";
import NumberFlow from "@number-flow/react";
import { cn } from "@/lib/cn";
import type { JoinedCount } from "@/lib/spots";

/**
 * Live "X people joined" social proof, drawn like a drafting annotation: mono
 * numerals, a soft pulsing dot for liveness. The waitlist is open (no cap), so
 * this is momentum, not a progress bar. Server-rendered count, animated on
 * mount.
 */
export function JoinedMeter({
  count,
  className,
}: {
  count: JoinedCount;
  className?: string;
}) {
  const { joined } = count;
  const [n, setN] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setN(joined), 350);
    return () => clearTimeout(t);
  }, [joined]);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[12.5px] text-ink-muted",
        className
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-clay opacity-60 motion-reduce:hidden" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-clay" />
      </span>
      <span>
        <span className="font-medium text-ink tabular-nums">
          <NumberFlow value={n} />
        </span>{" "}
        builders have joined
      </span>
    </div>
  );
}

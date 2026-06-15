"use client";

import { useEffect, useState } from "react";
import NumberFlow from "@number-flow/react";
import { cn } from "@/lib/cn";
import type { Spots } from "@/lib/spots";

/**
 * The live "X of 100 claimed" meter, drawn like a drafting annotation:
 * mono numerals, a hairline track, a flat cobalt fill (clay once it gets
 * urgent). Server-rendered count, animated in on mount.
 */
export function SpotMeter({
  spots,
  className,
}: {
  spots: Spots;
  className?: string;
}) {
  const { claimed, total, left } = spots;
  const pct = Math.round((claimed / total) * 100);
  const urgent = pct >= 85;

  const [n, setN] = useState(0);
  const [filled, setFilled] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => {
      setN(claimed);
      setFilled(true);
    }, 350);
    return () => clearTimeout(t);
  }, [claimed]);

  return (
    <div className={cn("w-full max-w-sm", className)}>
      <div className="flex items-baseline justify-between font-mono text-[12.5px] text-ink-muted">
        <span>
          <span className="font-medium text-ink tabular-nums">
            <NumberFlow value={n} />
          </span>{" "}
          of {total} claimed
        </span>
        <span className={cn("tabular-nums", urgent && "font-medium text-clay")}>
          {left} left
        </span>
      </div>
      <div
        className="mt-2 h-[3px] w-full bg-border-subtle"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={claimed}
        aria-label={`${claimed} of ${total} founding spots claimed`}
      >
        <div
          className={cn(
            "h-full transition-[width] duration-1000 ease-[var(--ease-out)]",
            urgent ? "bg-clay" : "bg-primary"
          )}
          style={{ width: filled ? `${pct}%` : "0%" }}
        />
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * Benny, the Bender drafting bot. Cobalt body, clay antenna, pencil in hand.
 * Alive in three ways: a gentle bob, periodic blinks, and pupils that follow
 * the visitor's cursor. Hover makes it wave the pencil. Reduced motion gets
 * a perfectly still, friendly robot.
 */
export function BenderBot({
  size = 116,
  className,
  wave = true,
}: {
  size?: number;
  className?: string;
  wave?: boolean;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const leftPupil = useRef<SVGCircleElement>(null);
  const rightPupil = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const root = rootRef.current;
    if (!root) return;
    let raf = 0;
    let mx = -9999;
    let my = -9999;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!raf) raf = requestAnimationFrame(track);
    };

    function track() {
      raf = 0;
      const rect = root!.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height * 0.38; // eye line
      const dx = mx - cx;
      const dy = my - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const reach = Math.min(dist / 60, 1) * 2.6; // max pupil travel in svg units
      const px = (dx / dist) * reach;
      const py = (dy / dist) * reach;
      const t = `translate(${px.toFixed(2)} ${py.toFixed(2)})`;
      leftPupil.current?.setAttribute("transform", t);
      rightPupil.current?.setAttribute("transform", t);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={cn("group/bot relative inline-block select-none", className)}
      style={{ width: size, height: size * 1.08 }}
      aria-hidden
    >
      <div
        className="h-full w-full motion-safe:[animation:bot-bob_4.2s_ease-in-out_infinite]"
      >
        <svg viewBox="0 0 120 130" className="h-full w-full" role="presentation">
          {/* antenna */}
          <g
            className="motion-safe:[animation:bot-antenna_3.8s_ease-in-out_infinite]"
            style={{ transformOrigin: "60px 22px" }}
          >
            <line x1="60" y1="22" x2="60" y2="9" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
            <circle cx="60" cy="7" r="5" fill="var(--clay)" stroke="var(--ink)" strokeWidth="2.5" />
          </g>

          {/* head */}
          <rect x="22" y="20" width="76" height="62" rx="20" fill="var(--primary)" stroke="var(--ink)" strokeWidth="3" />
          {/* face plate */}
          <rect x="30" y="29" width="60" height="44" rx="14" fill="#ffffff" stroke="var(--ink)" strokeWidth="2.5" />

          {/* eyes */}
          <g className="motion-safe:[animation:bot-blink_4.6s_ease-in-out_infinite]" style={{ transformOrigin: "60px 49px" }}>
            <circle cx="46" cy="49" r="8.5" fill="#fff" stroke="var(--ink)" strokeWidth="2.5" />
            <circle cx="74" cy="49" r="8.5" fill="#fff" stroke="var(--ink)" strokeWidth="2.5" />
            <circle ref={leftPupil} cx="46" cy="49" r="3.6" fill="var(--ink)" />
            <circle ref={rightPupil} cx="74" cy="49" r="3.6" fill="var(--ink)" />
          </g>

          {/* smile */}
          <path d="M50 63c4.5 4.5 15.5 4.5 20 0" fill="none" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
          {/* cheeks */}
          <circle cx="38" cy="60" r="3" fill="var(--clay)" opacity="0.45" />
          <circle cx="82" cy="60" r="3" fill="var(--clay)" opacity="0.45" />

          {/* body */}
          <rect x="34" y="86" width="52" height="30" rx="13" fill="var(--primary)" stroke="var(--ink)" strokeWidth="3" />
          <rect x="50" y="95" width="20" height="11" rx="5.5" fill="#fff" stroke="var(--ink)" strokeWidth="2.5" />

          {/* left arm (static, holds the tablet) */}
          <path d="M34 95c-8 0-12 5-11 11" fill="none" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />

          {/* right arm + pencil — waves on hover */}
          <g
            className={cn(
              wave &&
                "motion-safe:group-hover/bot:[animation:bot-wave_0.9s_ease-in-out_2]"
            )}
            style={{ transformOrigin: "86px 96px" }}
          >
            <path d="M86 96c9-2 14-9 13-16" fill="none" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
            {/* pencil */}
            <g transform="rotate(-38 99 78)">
              <rect x="95" y="64" width="8" height="24" rx="1.5" fill="var(--clay)" stroke="var(--ink)" strokeWidth="2" />
              <path d="M95 88h8l-4 7z" fill="#f3d9b0" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
              <circle cx="99" cy="95.5" r="1.4" fill="var(--ink)" />
            </g>
          </g>

          {/* feet */}
          <circle cx="46" cy="120" r="6" fill="var(--surface-sunk)" stroke="var(--ink)" strokeWidth="2.5" />
          <circle cx="74" cy="120" r="6" fill="var(--surface-sunk)" stroke="var(--ink)" strokeWidth="2.5" />
        </svg>
      </div>

      {/* shadow */}
      <div className="absolute -bottom-1 left-1/2 h-2 w-3/5 -translate-x-1/2 rounded-full bg-ink/10 blur-[3px] motion-safe:[animation:bot-bob_4.2s_ease-in-out_infinite_reverse]" />
    </div>
  );
}

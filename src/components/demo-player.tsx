"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Sparkles, RotateCcw, Check, Loader2 } from "lucide-react";
import { prefersReducedMotion } from "@/lib/motion";
import { aura } from "./showcase/apps/aura";

/* An auto-playing, looping "screen recording" of Bender building an app,
   choreographed in code so it stays pixel-crisp at any size. The whole
   stage is authored at fixed pixels and scaled like a video frame. */

const STAGE_W = 760;
const STAGE_H = 470;
const PROMPT = "a sleep app with a dreamy night-sky feel";
const PHONES = [0, 2, 3].map((i) => aura.screens[i]);

const STATUS_LINES: Array<[number, string]> = [
  [0, "reading your prompt…"],
  [22, "picking a direction: night sky, frosted glass…"],
  [48, "drawing screens…"],
  [78, "wiring the flow together…"],
];

type Phase = "typing" | "generating" | "reveal" | "done";

function DemoPhone({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-[378px] w-[180px] shrink-0 select-none overflow-hidden rounded-[24px] bg-[#0c0c0c] ring-1 ring-border-strong shadow-[0_18px_44px_-18px_rgba(0,0,0,0.8)]">
      <div className="relative h-full w-full">{children}</div>
    </div>
  );
}

export function DemoPlayer() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [phase, setPhase] = useState<Phase>("typing");
  const [typed, setTyped] = useState("");
  const [progress, setProgress] = useState(0);
  const [cycle, setCycle] = useState(0);

  // Fit the fixed stage to its container, like a video frame.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setScale(el.clientWidth / STAGE_W));
    ro.observe(el);
    setScale(el.clientWidth / STAGE_W);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setReduced(true);
      setTyped(PROMPT);
      setProgress(100);
      setPhase("done");
    }
  }, []);

  // The choreography. Each cycle: type → generate → reveal → hold → loop.
  useEffect(() => {
    if (reduced) return;
    let alive = true;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const later = (fn: () => void, ms: number) => {
      const t = setTimeout(() => alive && fn(), ms);
      timers.push(t);
    };

    setPhase("typing");
    setTyped("");
    setProgress(0);

    // 1 — typing
    for (let i = 1; i <= PROMPT.length; i++) {
      later(() => setTyped(PROMPT.slice(0, i)), 350 + i * 34);
    }
    const typedDone = 350 + PROMPT.length * 34;

    // 2 — generating
    later(() => setPhase("generating"), typedDone + 420);
    const GEN_MS = 2700;
    for (let p = 1; p <= 100; p++) {
      later(() => setProgress(p), typedDone + 420 + (p / 100) * GEN_MS);
    }

    // 3 — reveal
    later(() => setPhase("reveal"), typedDone + 420 + GEN_MS + 180);

    // 4 — done, hold, loop
    later(() => setPhase("done"), typedDone + 420 + GEN_MS + 1250);
    later(() => setCycle((c) => c + 1), typedDone + 420 + GEN_MS + 1250 + 4600);

    return () => {
      alive = false;
      timers.forEach(clearTimeout);
    };
  }, [cycle, reduced]);

  const status =
    [...STATUS_LINES].reverse().find(([at]) => progress >= at)?.[1] ?? "";
  const showPhones = phase === "reveal" || phase === "done";

  return (
    <div
      ref={wrapRef}
      className="relative w-full overflow-hidden rounded-xl border border-border-base bg-surface shadow-pop"
      style={{ height: STAGE_H * scale || undefined }}
      aria-label="Demo: Bender turns one prompt into a full set of app screens"
      role="img"
    >
      {scale > 0 && (
        <div
          className="absolute left-0 top-0"
          style={{
            width: STAGE_W,
            height: STAGE_H,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          {/* window chrome */}
          <div className="flex h-[36px] items-center justify-between border-b border-border-subtle bg-bg px-4">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#f87171]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#fbbf24]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#34d399]" />
            </div>
            <span className="font-mono text-[11px] text-ink-muted">
              bender.app / new project
            </span>
            <span className="w-[52px] text-right font-mono text-[10px] text-ink-faint">
              {phase === "done" ? "done" : phase === "typing" ? "" : "14s"}
            </span>
          </div>

          {/* canvas */}
          <div className="relative h-[434px] bg-surface-sunk">
            {/* prompt composer */}
            <div className="absolute left-1/2 top-[22px] w-[560px] -translate-x-1/2">
              <div
                className={`flex items-center gap-3 rounded-2xl border bg-bg px-4 py-3 transition-shadow duration-300 ${
                  phase === "typing"
                    ? "border-primary/60 shadow-[var(--glow-primary)]"
                    : "border-border-base shadow-card"
                }`}
              >
                <Sparkles className="size-4 shrink-0 text-primary" strokeWidth={2.25} />
                <span className="min-h-[20px] flex-1 font-mono text-[13.5px] font-medium text-ink">
                  {typed}
                  {phase === "typing" && (
                    <span className="ml-px inline-block h-[14px] w-[2px] translate-y-[2px] bg-primary [animation:caret-blink_1s_steps(1)_infinite]" />
                  )}
                </span>
                <span
                  className={`flex h-[34px] items-center gap-1.5 rounded-full px-4 text-[12.5px] font-bold text-on-primary transition-colors ${
                    phase === "generating" ? "bg-primary-press" : "bg-primary"
                  }`}
                >
                  {phase === "generating" ? (
                    <>
                      <Loader2 className="size-3.5 animate-spin" />
                      Building
                    </>
                  ) : (
                    "Generate"
                  )}
                </span>
              </div>

              {/* status line */}
              <div className="mt-2.5 flex h-[20px] items-center justify-between px-1">
                <AnimatePresence mode="wait">
                  {phase === "generating" && (
                    <motion.span
                      key={status}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.18 }}
                      className="font-mono text-[11.5px] font-medium text-ink-muted"
                    >
                      {status}
                    </motion.span>
                  )}
                </AnimatePresence>
                {phase === "generating" && (
                  <span className="font-mono text-[11.5px] font-bold text-primary">
                    {progress}%
                  </span>
                )}
              </div>
              {phase === "generating" && (
                <div className="mx-1 h-[3px] rounded-full bg-border-subtle">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}
            </div>

            {/* phones */}
            <div className="absolute bottom-[-64px] left-1/2 flex -translate-x-1/2 items-end gap-7">
              {PHONES.map((s, i) => (
                <div key={s.id} className="relative">
                  {/* skeleton while generating */}
                  {phase === "generating" && (
                    <div
                      className="shimmer h-[378px] w-[180px] rounded-[24px] border border-border-base"
                      style={{ animationDelay: `${i * 0.25}s` }}
                    />
                  )}
                  {(phase === "typing" || phase === "generating") && phase === "typing" && (
                    <div className="h-[378px] w-[180px] rounded-[24px] border border-dashed border-border-strong bg-bg/40" />
                  )}
                  {showPhones && (
                    <motion.div
                      initial={reduced ? false : { opacity: 0, y: 90, rotate: i === 1 ? 0 : i === 0 ? -4 : 4 }}
                      animate={{ opacity: 1, y: i === 1 ? -18 : 0, rotate: i === 1 ? 0 : i === 0 ? -3 : 3 }}
                      transition={{
                        type: "spring",
                        stiffness: 210,
                        damping: 22,
                        delay: reduced ? 0 : i * 0.14,
                      }}
                    >
                      <DemoPhone>
                        <s.Screen />
                      </DemoPhone>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            {/* done badge */}
            <AnimatePresence>
              {phase === "done" && (
                <motion.div
                  initial={reduced ? false : { opacity: 0, y: 14, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="absolute left-1/2 top-[88px] -translate-x-1/2"
                >
                  <div className="flex items-center gap-2 rounded-full border border-border-base bg-bg py-2 pl-2.5 pr-4 shadow-pop">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-success text-white">
                      <Check className="size-3.5" strokeWidth={3} />
                    </span>
                    <span className="text-[13px] font-bold text-ink">
                      5 screens in 14 seconds
                    </span>
                    <span className="font-mono text-[11px] text-ink-muted">
                      · ready to export
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* replay (also the only control reduced-motion users need) */}
            {phase === "done" && !reduced && (
              <button
                type="button"
                onClick={() => setCycle((c) => c + 1)}
                className="absolute bottom-3 right-3 flex h-8 items-center gap-1.5 rounded-full border border-border-base bg-bg px-3 font-mono text-[11px] font-medium text-ink-muted transition-colors hover:text-ink"
              >
                <RotateCcw className="size-3" strokeWidth={2.25} />
                replay
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

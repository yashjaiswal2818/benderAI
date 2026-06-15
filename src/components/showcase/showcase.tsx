"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";
import { PhoneFrame } from "./phone-frame";
import type { ShowcaseApp } from "./types";
import { aura } from "./apps/aura";
import { forge } from "./apps/forge";
import { crumb } from "./apps/crumb";
import { ledgr } from "./apps/ledgr";
import { wander } from "./apps/wander";

const APPS: ShowcaseApp[] = [aura, forge, crumb, ledgr, wander];

export function Showcase() {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = APPS.find((a) => a.id === openId) ?? null;

  return (
    <>
      <div className="flex flex-wrap items-start justify-center gap-x-5 gap-y-8">
        {APPS.map((app, i) => (
          <AppCard key={app.id} app={app} index={i} onOpen={() => setOpenId(app.id)} />
        ))}
      </div>
      {open && <Preview app={open} onClose={() => setOpenId(null)} />}
    </>
  );
}

function AppCard({
  app,
  index,
  onOpen,
}: {
  app: ShowcaseApp;
  index: number;
  onOpen: () => void;
}) {
  const Cover = app.screens[0].Screen;
  // Alternate a slight tilt so the shelf feels hand-placed, not stamped.
  const tilt = ["-rotate-1", "rotate-1", "-rotate-[0.5deg]", "rotate-[1.25deg]", "-rotate-[1.25deg]"][
    index % 5
  ];

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Preview ${app.name}, a ${app.niche.toLowerCase()} app, ${app.screens.length} screens`}
      className="group flex flex-col items-center rounded-2xl p-3 text-center transition-colors hover:bg-surface focus:outline-none focus-visible:shadow-[var(--glow-primary)]"
    >
      <div
        className={cn(
          "relative transition-transform duration-300 ease-[var(--ease-out)] group-hover:-translate-y-1.5 group-hover:rotate-0",
          tilt
        )}
      >
        <PhoneFrame ariaLabel={`${app.name} cover screen`}>
          <Cover />
        </PhoneFrame>
        <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-border-base bg-bg/95 px-3 py-1 text-[11px] font-semibold text-ink opacity-0 shadow-card transition-opacity duration-200 group-hover:opacity-100">
          View all {app.screens.length} screens
        </span>
      </div>
      <p className="mt-4 font-display text-[16px] font-bold tracking-[-0.01em] text-ink">
        {app.name}
        <span className="font-sans text-[13px] font-medium text-ink-muted">
          {" "}
          · {app.niche}
        </span>
      </p>
      <p className="mt-1 font-mono text-[11.5px] font-medium text-ink-muted">
        {app.themeLabel} · generated with Bender
      </p>
    </button>
  );
}

function Preview({ app, onClose }: { app: ShowcaseApp; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<Element | null>(null);

  useEffect(() => {
    restoreRef.current = document.activeElement;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      if (restoreRef.current instanceof HTMLElement) restoreRef.current.focus();
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${app.name} — all screens`}
      className="fixed inset-0 z-[60] flex flex-col bg-[oklch(0.26_0.02_250_/_0.45)] backdrop-blur-sm"
    >
      <button type="button" aria-hidden tabIndex={-1} onClick={onClose} className="absolute inset-0 cursor-default" />

      <div className="rise relative m-auto flex max-h-[92svh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-border-base bg-bg shadow-pop">
        <div className="flex items-start justify-between gap-4 border-b border-border-subtle px-6 py-4">
          <div>
            <p className="font-display text-[17px] font-semibold tracking-[-0.01em] text-ink">
              {app.name}
              <span className="font-sans text-[13px] font-normal text-ink-muted">
                {" "}
                · {app.niche} · {app.themeLabel}
              </span>
            </p>
            <p className="mt-0.5 font-mono text-[11px] text-ink-faint">
              &ldquo;{app.prompt}&rdquo; → {app.screens.length} screens, generated with
              Bender
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close preview"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-surface-sunk hover:text-ink"
          >
            <X className="size-4.5" strokeWidth={2} />
          </button>
        </div>

        <div className="overflow-x-auto overscroll-contain px-6 py-6">
          <div className="flex w-max items-start gap-6">
            {app.screens.map((s, i) => (
              <figure key={s.id} className="flex flex-col items-center">
                <PhoneFrame ariaLabel={`${app.name} — ${s.label}`}>
                  <s.Screen />
                </PhoneFrame>
                <figcaption className="mt-3 font-mono text-[10.5px] text-ink-muted">
                  <span className="text-ink-faint">{String(i + 1).padStart(2, "0")}</span>{" "}
                  {s.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <p className="border-t border-border-subtle bg-surface px-6 py-2.5 text-center font-mono text-[10.5px] text-ink-faint">
          scroll sideways for the full flow · every pixel generated, untouched
        </p>
      </div>
    </div>
  );
}

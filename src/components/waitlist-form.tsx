"use client";

import { useId, useRef, useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";

type Status = "idle" | "loading" | "ok" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Free "email me at launch" capture. POSTs to /api/waitlist. */
export function WaitlistForm({ className }: { className?: string }) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [already, setAlready] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      setError("Enter a valid email so we can reach you.");
      setStatus("error");
      inputRef.current?.focus();
      return;
    }
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Something went wrong. Try again.");
        setStatus("error");
        return;
      }
      setAlready(data.status === "already");
      setStatus("ok");
    } catch {
      setError("Couldn't reach the server. Try again.");
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div
        role="status"
        aria-live="polite"
        className={cn(
          "flex w-full max-w-md items-center gap-3 rounded-xl border border-border-subtle bg-surface px-4 py-3.5 text-left",
          className
        )}
      >
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-success text-white">
          <Check className="h-4 w-4" strokeWidth={2.5} />
        </span>
        <span className="text-[13.5px] leading-snug text-ink">
          {already
            ? "You're already on the list. One email at launch, that's it."
            : "Done. You'll get one email the day Bender opens."}
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className={cn("w-full max-w-md", className)}>
      <div className="flex items-center gap-1.5 rounded-full border border-border-base bg-bg p-1.5 transition-shadow focus-within:shadow-[var(--glow-primary-soft)]">
        <label htmlFor={id} className="sr-only">
          Email address
        </label>
        <input
          ref={inputRef}
          id={id}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          aria-invalid={status === "error"}
          aria-describedby={`${id}-note`}
          className="min-w-0 flex-1 bg-transparent px-3.5 text-[14px] text-ink placeholder:text-ink-faint focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-primary px-4 text-[13px] font-semibold text-on-primary transition-colors hover:bg-primary-press disabled:opacity-70"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Adding
            </>
          ) : (
            <>
              Notify me
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
            </>
          )}
        </button>
      </div>
      <p
        id={`${id}-note`}
        aria-live="polite"
        className={cn(
          "mt-2 min-h-5 px-4 text-[12.5px]",
          status === "error" ? "text-danger" : "text-ink-faint"
        )}
      >
        {status === "error" ? error : "Free. One email at launch, nothing else."}
      </p>
    </form>
  );
}

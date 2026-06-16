"use client";

import { useEffect } from "react";

/**
 * Sends the buyer to the Polar checkout via a real top-level navigation.
 *
 * Using window.location (rather than a server 307 or a <Link>) is what avoids
 * the cross-origin CORS failure: Next's client-side RSC navigation cannot
 * follow a redirect to buy.polar.sh, but a full-page navigation can.
 */
export function ClaimRedirect({ url }: { url: string }) {
  useEffect(() => {
    window.location.replace(url);
  }, [url]);

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <p className="font-display text-[15px] font-semibold text-ink">
          Taking you to secure checkout&hellip;
        </p>
        <p className="mt-1 text-[13px] text-ink-muted">
          If nothing happens,{" "}
          <a href={url} className="text-clay underline">
            click here
          </a>
          .
        </p>
      </div>
    </main>
  );
}

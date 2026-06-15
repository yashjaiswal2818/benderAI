"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { DemoPlayer } from "./demo-player";

/**
 * The demo slot. With no recording configured it runs the choreographed
 * DemoPlayer (an in-page "screen recording" that loops). Drop a real file
 * at /public/demo.mp4 and set `demo.videoSrc` in src/lib/config.ts to swap
 * in actual footage; if that file ever fails to load we fall back to the
 * animation rather than a broken player.
 */
export function DemoVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [missing, setMissing] = useState(false);

  if (!siteConfig.demo.videoSrc || missing) return <DemoPlayer />;

  return (
    <div className="overflow-hidden rounded-xl border border-border-base bg-surface-sunk shadow-pop">
      <div className="relative aspect-video w-full">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          ref={videoRef}
          src={siteConfig.demo.videoSrc}
          preload="metadata"
          playsInline
          controls={playing}
          onError={() => setMissing(true)}
          onEnded={() => setPlaying(false)}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {!playing && (
          <button
            type="button"
            onClick={() => {
              videoRef.current?.play();
              setPlaying(true);
            }}
            aria-label="Play the demo video"
            className="group absolute inset-0 flex items-center justify-center bg-[oklch(0.26_0.02_250_/_0.18)] transition-colors hover:bg-[oklch(0.26_0.02_250_/_0.26)]"
          >
            <span className="flex items-center gap-2.5 rounded-full bg-bg py-2.5 pl-3 pr-5 shadow-pop transition-transform duration-300 ease-[var(--ease-out)] group-hover:scale-[1.04]">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-on-primary">
                <Play className="ml-0.5 h-4 w-4" fill="currentColor" strokeWidth={0} />
              </span>
              <span className="text-[14px] font-bold text-ink">
                Play the demo
                <span className="ml-2 font-mono text-[12px] font-normal text-ink-muted">
                  {siteConfig.demo.durationLabel}
                </span>
              </span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

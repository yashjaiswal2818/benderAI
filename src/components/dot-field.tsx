"use client";

import { useEffect, useRef, memo } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/* Copied from the main Bender app (components/landing/shared/dot-field.tsx)
   so the waitlist background is pixel-identical. Only the reduced-motion
   import path differs. */

const TWO_PI = Math.PI * 2;

interface Dot {
  ax: number;
  ay: number;
  sx: number;
  sy: number;
  x: number;
  y: number;
}

interface DotFieldProps {
  dotRadius?: number;
  dotSpacing?: number;
  cursorRadius?: number;
  bulgeStrength?: number;
  glowRadius?: number;
  gradientFrom?: string;
  gradientTo?: string;
  glowColor?: string;
  className?: string;
}

/**
 * Continuous interactive dot grid. Sizes to its parent (use an absolute,
 * full-height wrapper so it scrolls with the page as one surface — never
 * fixed-to-viewport, which reads as a separate layer). Graphite dots on
 * paper, a warm clay glow + bulge under the cursor. Repaints only near the
 * cursor; honors reduced motion with a single static grid.
 */
const DotField = memo(function DotField({
  dotRadius = 2.6,
  dotSpacing = 16,
  cursorRadius = 420,
  bulgeStrength = 64,
  glowRadius = 170,
  gradientFrom = "rgba(51, 59, 76, 0.62)",
  gradientTo = "rgba(78, 86, 103, 0.42)",
  glowColor = "rgba(200, 116, 58, 0.24)",
  className,
}: DotFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<SVGCircleElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999, prevX: -9999, prevY: -9999, speed: 0 });
  const rafRef = useRef<number | null>(null);
  const sizeRef = useRef({ w: 0, h: 0, offsetX: 0, offsetY: 0 });
  const glowOpacity = useRef(0);
  const engagement = useRef(0);
  const propsRef = useRef<Record<string, unknown>>({});
  propsRef.current = { dotRadius, dotSpacing, cursorRadius, bulgeStrength, gradientFrom, gradientTo };
  const glowId = "dot-field-glow";

  useEffect(() => {
    const canvas = canvasRef.current;
    const glowEl = glowRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    const reduced = prefersReducedMotion();
    let dpr = 1;
    let resizeTimer: ReturnType<typeof setTimeout>;
    let lastActive = -99999;
    let idleDrawn = false;

    function buildDots(w: number, h: number) {
      const p = propsRef.current;
      const step = (p.dotRadius as number) + (p.dotSpacing as number);
      const cols = Math.floor(w / step);
      const rows = Math.floor(h / step);
      const padX = (w % step) / 2;
      const padY = (h % step) / 2;
      const dots: Dot[] = new Array(rows * cols);
      let idx = 0;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const ax = padX + col * step + step / 2;
          const ay = padY + row * step + step / 2;
          dots[idx++] = { ax, ay, sx: ax, sy: ay, x: ax, y: ay };
        }
      }
      dotsRef.current = dots;
    }

    function drawAll(withBulge: boolean) {
      const { w, h } = sizeRef.current;
      const p = propsRef.current;
      const dots = dotsRef.current;
      const m = mouseRef.current;
      const rad = (p.dotRadius as number) / 2;
      ctx!.clearRect(0, 0, w, h);
      const grad = ctx!.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, p.gradientFrom as string);
      grad.addColorStop(1, p.gradientTo as string);
      ctx!.fillStyle = grad;
      const cr = p.cursorRadius as number;
      const crSq = cr * cr;
      const eng = engagement.current;
      ctx!.beginPath();
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        if (withBulge) {
          const dx = m.x - d.ax;
          const dy = m.y - d.ay;
          const distSq = dx * dx + dy * dy;
          if (distSq < crSq && eng > 0.01) {
            const dist = Math.sqrt(distSq) || 1;
            const t = 1 - dist / cr;
            const push = t * t * (p.bulgeStrength as number) * eng;
            const angle = Math.atan2(dy, dx);
            d.sx += (d.ax - Math.cos(angle) * push - d.sx) * 0.15;
            d.sy += (d.ay - Math.sin(angle) * push - d.sy) * 0.15;
          } else {
            d.sx += (d.ax - d.sx) * 0.1;
            d.sy += (d.ay - d.sy) * 0.1;
          }
          ctx!.moveTo(d.sx + rad, d.sy);
          ctx!.arc(d.sx, d.sy, rad, 0, TWO_PI);
        } else {
          ctx!.moveTo(d.ax + rad, d.ay);
          ctx!.arc(d.ax, d.ay, rad, 0, TWO_PI);
        }
      }
      ctx!.fill();
    }

    let sizeRetries = 0;
    function doResize() {
      const rect = parent!.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      if (w < 1 || h < 1) {
        // Parent not laid out yet — retry on the next frame (bounded).
        if (sizeRetries++ < 120) requestAnimationFrame(doResize);
        return;
      }
      sizeRetries = 0;
      // Cap resolution on tall full-page canvases to bound memory.
      dpr = Math.min(window.devicePixelRatio || 1, h > 2400 ? 1 : 2);
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { w, h, offsetX: rect.left + window.scrollX, offsetY: rect.top + window.scrollY };
      buildDots(w, h);
      drawAll(false);
      idleDrawn = true;
    }

    function resize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(doResize, 120);
    }

    function onMouseMove(e: MouseEvent) {
      const s = sizeRef.current;
      mouseRef.current.x = e.pageX - s.offsetX;
      mouseRef.current.y = e.pageY - s.offsetY;
    }

    function updateMouseSpeed() {
      const m = mouseRef.current;
      const dx = m.prevX - m.x;
      const dy = m.prevY - m.y;
      m.speed += (Math.sqrt(dx * dx + dy * dy) - m.speed) * 0.5;
      if (m.speed < 0.001) m.speed = 0;
      m.prevX = m.x;
      m.prevY = m.y;
    }

    const ro = new ResizeObserver(() => doResize());
    ro.observe(parent);

    doResize();
    window.addEventListener("resize", resize);

    if (reduced) {
      return () => {
        ro.disconnect();
        clearTimeout(resizeTimer);
        window.removeEventListener("resize", resize);
      };
    }

    const speedInterval = setInterval(updateMouseSpeed, 20);
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const tick = (now: number) => {
      const target = Math.min(mouseRef.current.speed / 5, 1);
      engagement.current += (target - engagement.current) * 0.06;
      if (engagement.current < 0.001) engagement.current = 0;
      glowOpacity.current += (engagement.current - glowOpacity.current) * 0.08;
      if (glowEl) {
        glowEl.setAttribute("cx", String(mouseRef.current.x));
        glowEl.setAttribute("cy", String(mouseRef.current.y));
        glowEl.style.opacity = String(glowOpacity.current);
      }

      const active = engagement.current > 0.001;
      if (active) lastActive = now;
      const settling = now - lastActive < 1400;

      if (active || settling) {
        drawAll(true);
        idleDrawn = false;
      } else if (!idleDrawn) {
        drawAll(false); // one clean resting frame, then idle
        idleDrawn = true;
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearInterval(speedInterval);
      clearTimeout(resizeTimer);
      ro.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={className} style={{ position: "absolute", inset: 0 }} aria-hidden>
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
        <defs>
          <radialGradient id={glowId}>
            <stop offset="0%" stopColor={glowColor} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle ref={glowRef} cx="-9999" cy="-9999" r={glowRadius} fill={`url(#${glowId})`} style={{ opacity: 0, willChange: "opacity" }} />
      </svg>
    </div>
  );
});

export default DotField;

import { StatusBar } from "../phone-frame";
import type { ShowcaseApp } from "../types";

/* Forge — strength coach. Graphite black, hairline panels, one volt accent,
   heavy mono numerals. Whoop-grade severity. */

const BASE = "absolute inset-0 flex flex-col bg-[#0a0a0b] text-white";
const VOLT = "#d9f24f";
const panel = "rounded-xl border border-white/[0.07] bg-[#141417]";

function Goal() {
  const goals = [
    { t: "Build muscle", d: "Hypertrophy focus, 4-day split", on: true },
    { t: "Get lean", d: "Deficit + conditioning", on: false },
    { t: "Endurance", d: "Zone 2 base, intervals", on: false },
  ];
  return (
    <div className={BASE}>
      <StatusBar />
      <div className="flex-1 px-4 pt-3">
        <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/35">
          Setup · 01 / 03
        </p>
        <h2 className="mt-2 font-display text-[19px] font-semibold leading-[1.1]">
          What&rsquo;s the
          <br />
          mission?
        </h2>
        <div className="mt-4 grid gap-2">
          {goals.map((g) => (
            <div
              key={g.t}
              className={`${panel} px-3.5 py-3 ${g.on ? "border-[#d9f24f]/70" : ""}`}
            >
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-semibold">{g.t}</p>
                <span
                  className="h-[8px] w-[8px] rounded-full"
                  style={{ background: g.on ? VOLT : "rgba(255,255,255,0.12)" }}
                />
              </div>
              <p className="mt-0.5 text-[9px] text-white/45">{g.d}</p>
            </div>
          ))}
        </div>
        <div className="absolute inset-x-4 bottom-5">
          <div
            className="flex h-[42px] items-center justify-center rounded-xl text-[12.5px] font-bold text-[#0a0a0b]"
            style={{ background: VOLT }}
          >
            LOCK IT IN
          </div>
        </div>
      </div>
    </div>
  );
}

function Metrics() {
  return (
    <div className={BASE}>
      <StatusBar />
      <div className="flex-1 px-4 pt-3">
        <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/35">
          Setup · 02 / 03
        </p>
        <h2 className="mt-2 font-display text-[19px] font-semibold">Dial it in</h2>

        <div className={`${panel} mt-4 px-3.5 py-3`}>
          <div className="flex justify-between font-mono text-[8px] uppercase tracking-wider text-white/40">
            <span>Bodyweight</span>
            <span style={{ color: VOLT }}>76 kg</span>
          </div>
          <div className="mt-2 h-[3px] rounded-full bg-white/10">
            <div className="relative h-full w-[58%] rounded-full" style={{ background: VOLT }}>
              <span
                className="absolute -right-[5px] -top-[3.5px] h-[10px] w-[10px] rounded-full border-2 border-[#0a0a0b]"
                style={{ background: VOLT }}
              />
            </div>
          </div>
        </div>

        <div className={`${panel} mt-2 px-3.5 py-3`}>
          <div className="flex justify-between font-mono text-[8px] uppercase tracking-wider text-white/40">
            <span>Height</span>
            <span style={{ color: VOLT }}>181 cm</span>
          </div>
          <div className="mt-2 h-[3px] rounded-full bg-white/10">
            <div className="relative h-full w-[72%] rounded-full" style={{ background: VOLT }}>
              <span
                className="absolute -right-[5px] -top-[3.5px] h-[10px] w-[10px] rounded-full border-2 border-[#0a0a0b]"
                style={{ background: VOLT }}
              />
            </div>
          </div>
        </div>

        <p className="mt-4 font-mono text-[8px] uppercase tracking-wider text-white/40">
          Training days / week
        </p>
        <div className="mt-2 grid grid-cols-4 gap-1.5">
          {["3", "4", "5", "6"].map((d) => (
            <div
              key={d}
              className={`flex h-[38px] items-center justify-center rounded-lg border font-mono text-[13px] ${
                d === "5"
                  ? "border-transparent font-bold text-[#0a0a0b]"
                  : "border-white/[0.08] bg-[#141417] text-white/70"
              }`}
              style={d === "5" ? { background: VOLT } : undefined}
            >
              {d}
            </div>
          ))}
        </div>
        <p className="mt-3 text-[9px] leading-[1.5] text-white/40">
          Forge builds your split around recovery, not the calendar.
        </p>
      </div>
    </div>
  );
}

function Today() {
  const rings = [
    { label: "Strain", value: "14.2", pct: 0.78, color: VOLT },
    { label: "Recovery", value: "67%", pct: 0.67, color: "#7dd3fc" },
    { label: "Sleep", value: "7:10", pct: 0.84, color: "#c4b5fd" },
  ];
  return (
    <div className={BASE}>
      <StatusBar />
      <div className="flex-1 px-4 pt-3">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-[17px] font-semibold">Tuesday</h2>
          <p className="font-mono text-[8px] uppercase tracking-wider text-white/35">
            Week 3 · Push
          </p>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2">
          {rings.map((r) => {
            const C = 2 * Math.PI * 18;
            return (
              <div key={r.label} className={`${panel} flex flex-col items-center py-2.5`}>
                <div className="relative h-[44px] w-[44px]">
                  <svg viewBox="0 0 44 44" className="h-full w-full -rotate-90">
                    <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
                    <circle
                      cx="22" cy="22" r="18" fill="none" stroke={r.color} strokeWidth="4"
                      strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - r.pct)}
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center font-mono text-[8.5px] font-medium">
                    {r.value}
                  </span>
                </div>
                <p className="mt-1 font-mono text-[7px] uppercase tracking-wider text-white/40">
                  {r.label}
                </p>
              </div>
            );
          })}
        </div>

        <div className={`${panel} mt-2.5 p-3.5`} style={{ borderColor: "rgba(217,242,79,0.35)" }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-[7.5px] uppercase tracking-[0.18em]" style={{ color: VOLT }}>
                Up next
              </p>
              <p className="mt-0.5 text-[13px] font-semibold">Push day · chest + delts</p>
              <p className="mt-0.5 text-[8.5px] text-white/45">6 lifts · ~52 min · RPE 8 cap</p>
            </div>
            <div
              className="flex h-[34px] w-[34px] items-center justify-center rounded-full"
              style={{ background: VOLT }}
            >
              <svg viewBox="0 0 12 12" className="ml-[1px] h-3 w-3 text-[#0a0a0b]">
                <path d="M3 2.2v7.6L9.4 6 3 2.2Z" fill="currentColor" />
              </svg>
            </div>
          </div>
        </div>

        <div className="mt-2.5 grid gap-1.5">
          {[
            { l: "Bench press", v: "80 kg × 8 · PR" },
            { l: "Overhead press", v: "52.5 kg × 6" },
          ].map((r) => (
            <div key={r.l} className={`${panel} flex items-center justify-between px-3.5 py-2`}>
              <span className="text-[10px] text-white/75">{r.l}</span>
              <span className="font-mono text-[9px]" style={{ color: r.v.includes("PR") ? VOLT : "rgba(255,255,255,0.5)" }}>
                {r.v}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Live() {
  return (
    <div className={BASE}>
      <StatusBar />
      <div className="flex flex-1 flex-col px-4 pt-3">
        <div className="flex items-center justify-between font-mono text-[8px] uppercase tracking-wider text-white/40">
          <span>Push day</span>
          <span style={{ color: VOLT }}>● rec 00:42</span>
        </div>

        <div className="mt-4 text-center">
          <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/40">
            Set 3 of 4
          </p>
          <h2 className="mt-1 font-display text-[20px] font-semibold">Bench press</h2>
          <p className="mt-4 font-mono text-[44px] font-bold leading-none" style={{ color: VOLT }}>
            80<span className="text-[16px] text-white/40"> kg</span>
          </p>
          <p className="mt-2 font-mono text-[11px] text-white/60">8 reps · RPE 8</p>
        </div>

        <div className={`${panel} mt-5 px-3.5 py-3`}>
          <div className="flex justify-between font-mono text-[8px] uppercase tracking-wider text-white/40">
            <span>Rest</span>
            <span>1:24 / 2:00</span>
          </div>
          <div className="mt-2 h-[3px] rounded-full bg-white/10">
            <div className="h-full w-[70%] rounded-full" style={{ background: VOLT }} />
          </div>
        </div>

        <div className="mt-auto pb-5">
          <p className="font-mono text-[7.5px] uppercase tracking-wider text-white/35">
            Next up
          </p>
          <div className="mt-1.5 grid gap-1.5">
            {["Incline DB press · 4×10", "Cable fly · 3×12"].map((n) => (
              <div key={n} className={`${panel} px-3.5 py-2 text-[10px] text-white/65`}>
                {n}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Progress() {
  const pts = [22, 30, 26, 38, 35, 46, 44, 58, 58, 66, 62, 74];
  const d = pts
    .map((y, i) => `${i === 0 ? "M" : "L"} ${8 + i * 13.5} ${84 - y * 0.9}`)
    .join(" ");
  return (
    <div className={BASE}>
      <StatusBar />
      <div className="flex-1 px-4 pt-3">
        <h2 className="font-display text-[17px] font-semibold">12-week trend</h2>
        <p className="mt-0.5 text-[9px] text-white/45">Total volume, kg per week</p>

        <div className={`${panel} mt-3 p-3`}>
          <svg viewBox="0 0 170 92" className="h-[88px] w-full">
            {[28, 56, 84].map((y) => (
              <line key={y} x1="4" y1={y} x2="166" y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            ))}
            <path d={d} fill="none" stroke={VOLT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx={8 + 11 * 13.5} cy={84 - 74 * 0.9} r="3" fill={VOLT} />
          </svg>
          <div className="mt-1 flex justify-between font-mono text-[7px] uppercase text-white/35">
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
          </div>
        </div>

        <div className="mt-2.5 grid grid-cols-3 gap-1.5">
          {[
            { v: "18", l: "day streak" },
            { v: "+12%", l: "volume" },
            { v: "4", l: "new PRs" },
          ].map((s) => (
            <div key={s.l} className={`${panel} px-2 py-2.5 text-center`}>
              <p className="font-mono text-[14px] font-bold" style={{ color: VOLT }}>
                {s.v}
              </p>
              <p className="mt-0.5 font-mono text-[6.5px] uppercase tracking-wider text-white/40">
                {s.l}
              </p>
            </div>
          ))}
        </div>

        <div className={`${panel} mt-2.5 flex items-center justify-between px-3.5 py-2.5`}>
          <div>
            <p className="text-[10.5px] font-semibold">Deload week suggested</p>
            <p className="text-[8.5px] text-white/45">Recovery trending down 3 days straight</p>
          </div>
          <span className="font-mono text-[9px]" style={{ color: VOLT }}>
            VIEW
          </span>
        </div>
      </div>
    </div>
  );
}

export const forge: ShowcaseApp = {
  id: "forge",
  name: "Forge",
  niche: "Strength training",
  themeLabel: "dark + volt",
  prompt: "a serious lifting coach app, black with one electric accent",
  screens: [
    { id: "goal", label: "Pick the goal", Screen: Goal },
    { id: "metrics", label: "Dial it in", Screen: Metrics },
    { id: "today", label: "Today", Screen: Today },
    { id: "live", label: "Live workout", Screen: Live },
    { id: "progress", label: "Progress", Screen: Progress },
  ],
};

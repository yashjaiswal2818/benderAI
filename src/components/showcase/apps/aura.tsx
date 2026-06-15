import { StatusBar } from "../phone-frame";
import type { ShowcaseApp } from "../types";

/* Aura — sleep & meditation. Full glassmorphism: deep night sky, frosted
   panels, soft glow. */

const NIGHT =
  "absolute inset-0 flex flex-col text-white bg-[linear-gradient(168deg,#0b1026_0%,#1a1240_46%,#311b62_100%)]";

function Stars() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-70"
      style={{
        backgroundImage:
          "radial-gradient(1px 1px at 18% 12%, rgba(255,255,255,0.8) 50%, transparent 51%)," +
          "radial-gradient(1px 1px at 64% 8%, rgba(255,255,255,0.55) 50%, transparent 51%)," +
          "radial-gradient(1.5px 1.5px at 82% 22%, rgba(255,255,255,0.7) 50%, transparent 51%)," +
          "radial-gradient(1px 1px at 38% 28%, rgba(255,255,255,0.45) 50%, transparent 51%)," +
          "radial-gradient(1px 1px at 90% 46%, rgba(255,255,255,0.5) 50%, transparent 51%)," +
          "radial-gradient(1.5px 1.5px at 10% 52%, rgba(255,255,255,0.4) 50%, transparent 51%)," +
          "radial-gradient(1px 1px at 52% 64%, rgba(255,255,255,0.35) 50%, transparent 51%)",
      }}
    />
  );
}

const glass =
  "rounded-2xl border border-white/15 bg-white/[0.09] backdrop-blur-md";

function Welcome() {
  return (
    <div className={NIGHT}>
      <Stars />
      <StatusBar />
      <div className="relative flex flex-1 flex-col items-center px-5 pt-10">
        <div className="relative h-[88px] w-[88px]">
          <div className="absolute inset-0 rounded-full bg-[#fcd34d]/20 blur-xl" />
          <div className="absolute inset-[6px] rounded-full bg-[linear-gradient(140deg,#fde68a,#f59e0b)]" />
          <div className="absolute left-[10px] top-[14px] h-[14px] w-[14px] rounded-full bg-[#0b1026]/10" />
          <div className="absolute left-[34px] top-[34px] h-[9px] w-[9px] rounded-full bg-[#0b1026]/10" />
        </div>
        <h2 className="mt-6 font-display text-[24px] font-semibold tracking-[-0.02em]">
          Aura
        </h2>
        <p className="mt-1.5 max-w-[19ch] text-center text-[11px] leading-[1.5] text-white/65">
          Sleep deeper. Wake lighter. Ten minutes a night.
        </p>
        <div className="mt-auto w-full pb-6">
          <div className={`${glass} flex h-[42px] items-center justify-center`}>
            <span className="text-[12.5px] font-semibold">Begin tonight</span>
          </div>
          <div className="mt-3 flex items-center justify-center gap-1.5">
            <span className="h-1 w-4 rounded-full bg-white/80" />
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span className="h-1 w-1 rounded-full bg-white/30" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Quiz() {
  const options = [
    { label: "Racing thoughts", on: true },
    { label: "Screens too late", on: false },
    { label: "Noise around me", on: false },
    { label: "Stress from work", on: true },
  ];
  return (
    <div className={NIGHT}>
      <Stars />
      <StatusBar />
      <div className="relative flex-1 px-4 pt-3">
        <div className="flex items-center justify-between font-mono text-[8px] text-white/45">
          <span>QUESTION 2 / 4</span>
          <span>skip</span>
        </div>
        <div className="mt-1.5 h-[3px] w-full rounded-full bg-white/10">
          <div className="h-full w-1/2 rounded-full bg-[#c4b5fd]" />
        </div>
        <h2 className="mt-4 font-display text-[17px] font-semibold leading-[1.2]">
          What keeps you up
          <br />
          at night?
        </h2>
        <p className="mt-1 text-[9.5px] text-white/50">Pick all that apply.</p>
        <div className="mt-4 grid gap-2">
          {options.map((o) => (
            <div
              key={o.label}
              className={`${glass} flex items-center justify-between px-3.5 py-2.5 ${
                o.on ? "border-[#c4b5fd]/60 bg-[#c4b5fd]/15" : ""
              }`}
            >
              <span className="text-[11px]">{o.label}</span>
              <span
                className={`flex h-[14px] w-[14px] items-center justify-center rounded-full border ${
                  o.on ? "border-[#c4b5fd] bg-[#c4b5fd]" : "border-white/30"
                }`}
              >
                {o.on && (
                  <svg viewBox="0 0 10 10" className="h-2 w-2 text-[#1a1240]">
                    <path
                      d="M2 5.2 4.2 7.4 8 3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </span>
            </div>
          ))}
        </div>
        <div className="absolute inset-x-4 bottom-5">
          <div className="flex h-[40px] items-center justify-center rounded-2xl bg-[#c4b5fd] text-[12px] font-semibold text-[#1a1240]">
            Continue
          </div>
        </div>
      </div>
    </div>
  );
}

function Tonight() {
  return (
    <div className={NIGHT}>
      <Stars />
      <StatusBar />
      <div className="relative flex-1 px-4 pt-3">
        <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/40">
          Thursday night
        </p>
        <h2 className="mt-0.5 font-display text-[17px] font-semibold">
          Good evening, Noor
        </h2>

        <div className={`${glass} mt-3 p-3.5`}>
          <div className="flex items-center gap-3">
            <div className="relative h-[58px] w-[58px] shrink-0">
              <svg viewBox="0 0 60 60" className="h-full w-full -rotate-90">
                <circle cx="30" cy="30" r="26" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="5" />
                <circle
                  cx="30" cy="30" r="26" fill="none" stroke="#c4b5fd" strokeWidth="5"
                  strokeLinecap="round" strokeDasharray="163" strokeDashoffset="26"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center font-display text-[15px] font-semibold">
                84
              </span>
            </div>
            <div>
              <p className="text-[11px] font-medium">Sleep score</p>
              <p className="mt-0.5 text-[8.5px] leading-[1.45] text-white/55">
                Up 6 from last week. Your wind-down streak is working.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-2.5 flex gap-2">
          <div className={`${glass} flex-1 px-3 py-2`}>
            <p className="font-mono text-[7.5px] uppercase tracking-wider text-white/45">Wind-down</p>
            <p className="mt-0.5 text-[12px] font-medium">10:30 pm</p>
          </div>
          <div className={`${glass} flex-1 px-3 py-2`}>
            <p className="font-mono text-[7.5px] uppercase tracking-wider text-white/45">Alarm</p>
            <p className="mt-0.5 text-[12px] font-medium">6:40 am</p>
          </div>
        </div>

        <div className={`${glass} mt-2.5 flex items-center justify-between px-3.5 py-3`}>
          <div>
            <p className="text-[11px] font-medium">Rain on leaves</p>
            <p className="text-[8.5px] text-white/50">Tonight&rsquo;s soundscape</p>
          </div>
          <div className="flex items-end gap-[2px]">
            {[6, 11, 8, 14, 9, 12, 7].map((h, i) => (
              <span key={i} className="w-[2.5px] rounded-full bg-[#c4b5fd]/80" style={{ height: h }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Player() {
  return (
    <div className={NIGHT}>
      <Stars />
      <StatusBar />
      <div className="relative flex flex-1 flex-col items-center px-5 pt-4">
        <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/45">
          Now playing
        </p>
        <div className="relative mt-5 h-[120px] w-[120px]">
          <div className="absolute inset-0 rounded-full border border-white/10" />
          <div className="absolute inset-[14px] rounded-full border border-white/15" />
          <div className="absolute inset-[28px] rounded-full bg-white/[0.08] backdrop-blur-md" />
          <div className="absolute inset-[44px] rounded-full bg-[#c4b5fd]/80 blur-[1px]" />
        </div>
        <h2 className="mt-5 font-display text-[16px] font-semibold">Ocean drift</h2>
        <p className="mt-0.5 text-[9px] text-white/50">Deep sleep · low waves</p>

        <div className="mt-5 w-full">
          <div className="h-[3px] w-full rounded-full bg-white/12">
            <div className="h-full w-[35%] rounded-full bg-white/85" />
          </div>
          <div className="mt-1 flex justify-between font-mono text-[8px] text-white/40">
            <span>12:46</span>
            <span>36:00</span>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-5">
          <span className="text-[9px] text-white/55">15s</span>
          <div className={`${glass} flex h-[46px] w-[46px] items-center justify-center rounded-full`}>
            <span className="ml-[1px] flex gap-[3px]">
              <span className="h-3 w-[3px] rounded-sm bg-white" />
              <span className="h-3 w-[3px] rounded-sm bg-white" />
            </span>
          </div>
          <span className="text-[9px] text-white/55">15s</span>
        </div>
      </div>
    </div>
  );
}

function Stats() {
  const bars = [52, 68, 45, 74, 80, 64, 88];
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  return (
    <div className={NIGHT}>
      <Stars />
      <StatusBar />
      <div className="relative flex-1 px-4 pt-3">
        <h2 className="font-display text-[17px] font-semibold">Your week</h2>
        <p className="mt-0.5 text-[9px] text-white/50">Average 7h 42m asleep</p>

        <div className={`${glass} mt-3.5 p-3.5`}>
          <div className="flex h-[88px] items-end justify-between">
            {bars.map((h, i) => (
              <div key={i} className="flex w-[16px] flex-col items-center gap-1">
                <span
                  className={`w-[9px] rounded-full ${i === 6 ? "bg-[#fcd34d]" : "bg-[#c4b5fd]/70"}`}
                  style={{ height: `${h}%` }}
                />
                <span className="font-mono text-[7px] text-white/40">{days[i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`${glass} mt-2.5 px-3.5 py-3`}>
          <p className="font-mono text-[7.5px] uppercase tracking-wider text-[#fcd34d]/90">
            Insight
          </p>
          <p className="mt-1 text-[10px] leading-[1.5] text-white/80">
            You fall asleep 18 minutes faster on nights you run the 4-7-8
            breathwork.
          </p>
        </div>

        <div className="mt-2.5 flex gap-2">
          <div className={`${glass} flex-1 px-3 py-2 text-center`}>
            <p className="font-display text-[14px] font-semibold">23</p>
            <p className="font-mono text-[7px] uppercase tracking-wider text-white/45">night streak</p>
          </div>
          <div className={`${glass} flex-1 px-3 py-2 text-center`}>
            <p className="font-display text-[14px] font-semibold">9:12</p>
            <p className="font-mono text-[7px] uppercase tracking-wider text-white/45">avg wind-down</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export const aura: ShowcaseApp = {
  id: "aura",
  name: "Aura",
  niche: "Sleep & meditation",
  themeLabel: "glassmorphism",
  prompt: "a sleep app with a dreamy night-sky feel, frosted glass cards",
  screens: [
    { id: "welcome", label: "Onboarding", Screen: Welcome },
    { id: "quiz", label: "Sleep quiz", Screen: Quiz },
    { id: "tonight", label: "Tonight", Screen: Tonight },
    { id: "player", label: "Session player", Screen: Player },
    { id: "stats", label: "Weekly stats", Screen: Stats },
  ],
};

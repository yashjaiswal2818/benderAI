import { StatusBar } from "../phone-frame";
import type { ShowcaseApp } from "../types";

/* Wander — travel journal. Skeuomorphic: leather passport, paper pages,
   boarding-pass perforations, rubber entry stamps, taped polaroids. */

const PAPER = "absolute inset-0 flex flex-col bg-[#f3ead8] text-[#473425]";
const paperCard =
  "rounded-lg border border-[#473425]/15 bg-[#fbf5e6] shadow-[0_1px_3px_rgba(71,52,37,0.18)]";

function Tape({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`absolute h-[14px] w-[44px] rotate-[-4deg] bg-[#e8d9a8]/80 shadow-[0_1px_2px_rgba(71,52,37,0.2)] ${className}`}
      style={{ clipPath: "polygon(2% 0, 98% 4%, 100% 96%, 0 100%)" }}
    />
  );
}

function Stamp({
  text,
  color,
  rotate,
  className = "",
}: {
  text: string;
  color: string;
  rotate: number;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full border-2 border-dashed px-2.5 py-2 font-mono text-[7px] font-bold uppercase tracking-[0.1em] ${className}`}
      style={{ borderColor: color, color, transform: `rotate(${rotate}deg)`, opacity: 0.85 }}
    >
      {text}
    </span>
  );
}

function Cover() {
  return (
    <div className="absolute inset-0 flex flex-col bg-[#5d4030] text-[#e9d9b8]">
      <StatusBar />
      {/* leather grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(rgba(0,0,0,0.25) 1px, transparent 1.4px), radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1.4px)",
          backgroundSize: "7px 7px, 11px 11px",
        }}
      />
      <div className="relative m-4 flex flex-1 flex-col items-center rounded-[14px] border-2 border-[#e9d9b8]/35 pt-12">
        <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-[#e9d9b8]/60">
          Travel journal
        </p>
        {/* embossed globe */}
        <div className="mt-6 flex h-[84px] w-[84px] items-center justify-center rounded-full border-2 border-[#e9d9b8]/50 shadow-[inset_0_2px_6px_rgba(0,0,0,0.4),0_1px_0_rgba(255,255,255,0.12)]">
          <svg viewBox="0 0 48 48" className="h-[52px] w-[52px] text-[#e9d9b8]/75">
            <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="2" />
            <ellipse cx="24" cy="24" rx="9" ry="20" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M5 18h38M5 30h38" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
        </div>
        <h2 className="mt-5 font-display text-[26px] font-semibold tracking-[0.14em]">
          WANDER
        </h2>
        <p className="mt-1 font-mono text-[7.5px] uppercase tracking-[0.26em] text-[#e9d9b8]/55">
          Est. wherever you are
        </p>
        <div className="mt-auto w-full px-5 pb-7">
          <div className="flex h-[44px] items-center justify-center rounded-md border border-[#2e2014] bg-[linear-gradient(180deg,#d8b36a,#b9924d)] text-[12px] font-bold tracking-wide text-[#33241a] shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_2px_4px_rgba(0,0,0,0.35)]">
            Open the journal
          </div>
        </div>
      </div>
    </div>
  );
}

function TripQuiz() {
  const opts = [
    { l: "Slow beaches", stamp: "PICKED", on: true, c: "#1f6e8c" },
    { l: "Old cities", stamp: "PICKED", on: true, c: "#a23b2e" },
    { l: "High mountains", on: false, c: "#5b7553" },
    { l: "Food first", on: false, c: "#8c5e1f" },
  ];
  return (
    <div className={PAPER}>
      <StatusBar />
      {/* ruled lines */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: "linear-gradient(transparent 23px, rgba(71,52,37,0.08) 24px)",
          backgroundSize: "100% 24px",
        }}
      />
      <div className="relative flex-1 px-4 pt-3">
        <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#473425]/45">
          New trip · page 1
        </p>
        <h2 className="mt-1.5 font-display text-[19px] font-semibold italic">
          What calls to you?
        </h2>
        <div className="mt-4 grid gap-2.5">
          {opts.map((o) => (
            <div key={o.l} className={`${paperCard} relative flex items-center justify-between px-3.5 py-3`}>
              <div className="flex items-center gap-2.5">
                <span
                  className="flex h-[16px] w-[16px] items-center justify-center rounded-[3px] border-2"
                  style={{ borderColor: "#47342570" }}
                >
                  {o.on && (
                    <svg viewBox="0 0 12 12" className="h-[11px] w-[11px]" style={{ color: o.c }}>
                      <path d="M1.5 6.5 4.5 9.5 10.5 2" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                    </svg>
                  )}
                </span>
                <span className="text-[11.5px] font-medium">{o.l}</span>
              </div>
              {o.on && <Stamp text={o.stamp!} color={o.c} rotate={-8} />}
            </div>
          ))}
        </div>
        <div className="absolute inset-x-4 bottom-5">
          <div className="flex h-[42px] items-center justify-center rounded-md bg-[#5d4030] text-[12px] font-bold text-[#e9d9b8] shadow-[0_2px_4px_rgba(71,52,37,0.4)]">
            Plan my week →
          </div>
        </div>
      </div>
    </div>
  );
}

function Itinerary() {
  return (
    <div className={PAPER}>
      <StatusBar />
      <div className="relative flex-1 px-4 pt-3">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-[18px] font-semibold italic">Kyoto, day 2</h2>
          <p className="font-mono text-[8px] text-[#473425]/45">Oct 14</p>
        </div>

        <div className="relative mt-3 border-l-2 border-dashed border-[#473425]/25 pl-4">
          {[
            { t: "08:30", title: "Nishiki market breakfast", note: "tamagoyaki stand, go early" },
            { t: "11:00", title: "Philosopher's Path", note: "2.4 km walk, maples turning" },
            { t: "15:30", title: "Tea at Ippodo", note: "reserved · 2 seats" },
          ].map((s) => (
            <div key={s.t} className="relative pb-3.5">
              <span className="absolute -left-[23px] top-[3px] h-[10px] w-[10px] rounded-full border-2 border-[#473425]/50 bg-[#f3ead8]" />
              <p className="font-mono text-[8px] text-[#a23b2e]">{s.t}</p>
              <p className="text-[11.5px] font-semibold leading-tight">{s.title}</p>
              <p className="text-[8.5px] italic text-[#473425]/55">{s.note}</p>
            </div>
          ))}
        </div>

        <div className={`${paperCard} relative mt-1 rotate-[-1.5deg] p-2 pb-5`}>
          <Tape className="-top-[7px] left-[28px]" />
          <div className="h-[58px] rounded-[3px] bg-[linear-gradient(150deg,#b85e44_0%,#d9a06a_55%,#8c2f1f_100%)]" />
          <p className="absolute bottom-1.5 left-3 font-mono text-[7.5px] text-[#473425]/60">
            torii gates, 7:12 am
          </p>
        </div>
      </div>
    </div>
  );
}

function BoardingPass() {
  return (
    <div className={PAPER}>
      <StatusBar />
      <div className="relative flex-1 px-4 pt-4">
        <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#473425]/45">
          Next leg
        </p>

        <div className="relative mt-2.5 overflow-hidden rounded-xl border border-[#473425]/20 bg-[#fbf5e6] shadow-[0_3px_8px_rgba(71,52,37,0.22)]">
          <div className="bg-[#1f6e8c] px-4 py-2.5 text-[#f3ead8]">
            <div className="flex justify-between font-mono text-[8px] uppercase tracking-wider">
              <span>Wander Air</span>
              <span>Boarding pass</span>
            </div>
          </div>

          <div className="px-4 py-3.5">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-display text-[24px] font-bold leading-none">KIX</p>
                <p className="mt-0.5 font-mono text-[7.5px] text-[#473425]/55">Osaka</p>
              </div>
              <svg viewBox="0 0 40 12" className="h-[12px] w-[40px] text-[#473425]/45">
                <path d="M0 6h14m12 0h14" stroke="currentColor" strokeWidth="1.4" strokeDasharray="3 2.4" />
                <path d="M17 2c4 1.2 5.5 2.8 6.5 4-1 1.2-2.5 2.8-6.5 4l2-4-2-4Z" fill="currentColor" />
              </svg>
              <div className="text-right">
                <p className="font-display text-[24px] font-bold leading-none">HND</p>
                <p className="mt-0.5 font-mono text-[7.5px] text-[#473425]/55">Tokyo</p>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2 font-mono">
              {[
                { l: "Date", v: "OCT 16" },
                { l: "Gate", v: "24B" },
                { l: "Seat", v: "11A" },
              ].map((f) => (
                <div key={f.l}>
                  <p className="text-[6.5px] uppercase tracking-wider text-[#473425]/45">{f.l}</p>
                  <p className="text-[11px] font-bold">{f.v}</p>
                </div>
              ))}
            </div>
          </div>

          {/* perforation */}
          <div className="relative flex items-center px-1">
            <span className="absolute -left-[8px] h-[16px] w-[16px] rounded-full bg-[#f3ead8] shadow-[inset_-1px_0_2px_rgba(71,52,37,0.15)]" />
            <span className="h-px flex-1 border-t-2 border-dashed border-[#473425]/25" />
            <span className="absolute -right-[8px] h-[16px] w-[16px] rounded-full bg-[#f3ead8] shadow-[inset_1px_0_2px_rgba(71,52,37,0.15)]" />
          </div>

          {/* barcode */}
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex h-[26px] items-end gap-[2px]" aria-hidden>
              {[3, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 2, 1, 3, 1, 2, 1, 1, 3, 2, 1].map((w, i) => (
                <span key={i} className="h-full bg-[#473425]" style={{ width: w }} />
              ))}
            </div>
            <p className="font-mono text-[8px] text-[#473425]/55">WDR-0394</p>
          </div>
        </div>

        <p className="mt-3 text-center font-mono text-[8px] text-[#473425]/45">
          Saved to the journal · gate alerts on
        </p>
      </div>
    </div>
  );
}

function Stamps() {
  return (
    <div className={PAPER}>
      <StatusBar />
      <div className="relative flex-1 px-4 pt-3">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-[18px] font-semibold italic">Stamps</h2>
          <p className="font-mono text-[8px] text-[#473425]/45">12 countries</p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-5 px-1">
          <Stamp text="JAPAN · OCT 24" color="#a23b2e" rotate={-7} className="justify-self-start" />
          <Stamp text="PORTUGAL · JUN 24" color="#1f6e8c" rotate={5} className="justify-self-end" />
          <Stamp text="MEXICO · FEB 24" color="#5b7553" rotate={3} className="justify-self-center" />
          <Stamp text="ITALY · SEP 23" color="#8c5e1f" rotate={-5} className="justify-self-start" />
          <Stamp text="KENYA · MAY 23" color="#7a3b8c" rotate={8} className="justify-self-end" />
          <Stamp text="NORWAY · JAN 23" color="#2f5d8c" rotate={-3} className="justify-self-center" />
        </div>

        <div className={`${paperCard} relative mt-5 rotate-[1.2deg] p-2 pb-4`}>
          <Tape className="-top-[7px] right-[24px]" />
          <div className="flex gap-2">
            <div className="h-[44px] flex-1 rounded-[3px] bg-[linear-gradient(140deg,#1f6e8c,#7fb6c9)]" />
            <div className="h-[44px] flex-1 rounded-[3px] bg-[linear-gradient(140deg,#d9a06a,#a23b2e)]" />
            <div className="h-[44px] flex-1 rounded-[3px] bg-[linear-gradient(140deg,#5b7553,#cfd9a8)]" />
          </div>
          <p className="absolute bottom-1 left-3 font-mono text-[7.5px] text-[#473425]/60">
            this year, so far
          </p>
        </div>

        <p className="mt-4 text-center font-mono text-[8.5px] text-[#473425]/50">
          Next stamp: Tokyo, in 2 days ✈
        </p>
      </div>
    </div>
  );
}

export const wander: ShowcaseApp = {
  id: "wander",
  name: "Wander",
  niche: "Travel journal",
  themeLabel: "skeuomorphism",
  prompt: "a travel journal that feels like a real passport and paper tickets",
  screens: [
    { id: "cover", label: "The cover", Screen: Cover },
    { id: "quiz", label: "Trip quiz", Screen: TripQuiz },
    { id: "itinerary", label: "Itinerary", Screen: Itinerary },
    { id: "pass", label: "Boarding pass", Screen: BoardingPass },
    { id: "stamps", label: "Stamps", Screen: Stamps },
  ],
};

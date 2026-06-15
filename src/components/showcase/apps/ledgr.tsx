import { StatusBar } from "../phone-frame";
import type { ShowcaseApp } from "../types";

/* Ledgr — calm personal finance. True neumorphism: one porcelain surface,
   everything extruded or pressed into it, almost no hue. */

const BASE = "absolute inset-0 flex flex-col bg-[#e8ecf2] text-[#3a4254]";
const INDIGO = "#5b6cf0";
const out =
  "rounded-2xl bg-[#e8ecf2] shadow-[6px_6px_14px_#c8cdd8,-6px_-6px_14px_#ffffff]";
const inset =
  "rounded-2xl bg-[#e8ecf2] shadow-[inset_4px_4px_10px_#c8cdd8,inset_-4px_-4px_10px_#ffffff]";

function Welcome() {
  return (
    <div className={BASE}>
      <StatusBar />
      <div className="flex flex-1 flex-col items-center px-6 pt-10 text-center">
        <div className={`${out} flex h-[84px] w-[84px] items-center justify-center rounded-full`}>
          <div className={`${inset} flex h-[58px] w-[58px] items-center justify-center rounded-full`}>
            <span className="font-display text-[24px] font-bold" style={{ color: INDIGO }}>
              L
            </span>
          </div>
        </div>
        <h2 className="mt-6 font-display text-[22px] font-semibold">Money, calmly.</h2>
        <p className="mt-2 max-w-[24ch] text-[10.5px] leading-[1.55] text-[#3a4254]/55">
          Every account in one quiet place. No red arrows screaming at you.
        </p>
        <div className="mt-auto w-full pb-7">
          <div
            className="flex h-[46px] items-center justify-center rounded-2xl text-[13px] font-semibold text-white shadow-[6px_6px_14px_#c8cdd8,-6px_-6px_14px_#ffffff]"
            style={{ background: INDIGO }}
          >
            Get started
          </div>
          <div className={`${inset} mt-3 flex h-[40px] items-center justify-center text-[11px] font-medium text-[#3a4254]/60`}>
            I already use Ledgr
          </div>
        </div>
      </div>
    </div>
  );
}

function Connect() {
  const banks = [
    { n: "Monzo", on: true },
    { n: "Revolut", on: true },
    { n: "Chase", on: false },
    { n: "Amex", on: false },
  ];
  return (
    <div className={BASE}>
      <StatusBar />
      <div className="flex-1 px-5 pt-3">
        <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#3a4254]/40">
          Setup · 2 of 3
        </p>
        <h2 className="mt-1.5 font-display text-[18px] font-semibold leading-[1.2]">
          Connect your banks
        </h2>
        <p className="mt-1 text-[9.5px] text-[#3a4254]/50">
          Read-only. Ledgr can look, never touch.
        </p>
        <div className="mt-4 grid gap-2.5">
          {banks.map((b) => (
            <div key={b.n} className={`${out} flex items-center justify-between px-4 py-3`}>
              <div className="flex items-center gap-2.5">
                <span className={`${inset} flex h-[28px] w-[28px] items-center justify-center rounded-xl text-[11px] font-bold text-[#3a4254]/70`}>
                  {b.n[0]}
                </span>
                <span className="text-[11.5px] font-semibold">{b.n}</span>
              </div>
              <div
                className={`${inset} relative h-[22px] w-[40px] rounded-full`}
                role="presentation"
              >
                <span
                  className="absolute top-[3px] h-[16px] w-[16px] rounded-full shadow-[2px_2px_5px_#c8cdd8]"
                  style={{
                    left: b.on ? 20 : 4,
                    background: b.on ? INDIGO : "#ffffff",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-[9px] text-[#3a4254]/40">
          2 connected · bank-grade encryption
        </p>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className={BASE}>
      <StatusBar />
      <div className="flex-1 px-5 pt-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-medium text-[#3a4254]/50">Good morning, Priya</p>
          <div className={`${out} flex h-[26px] w-[26px] items-center justify-center rounded-full text-[9px] font-bold`}>
            P
          </div>
        </div>

        <div className={`${out} mt-3 px-4 py-4 text-center`}>
          <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#3a4254]/40">
            Total balance
          </p>
          <p className="mt-1 font-display text-[26px] font-bold tracking-[-0.01em]">
            $12,084<span className="text-[14px] text-[#3a4254]/45">.20</span>
          </p>
          <p className="mt-0.5 text-[9px] font-medium" style={{ color: "#4d9b6e" }}>
            +$340 this month
          </p>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className={`${inset} px-3.5 py-3`}>
            <p className="font-mono text-[7.5px] uppercase tracking-wider text-[#3a4254]/40">In</p>
            <p className="mt-0.5 text-[13px] font-bold">$4,200</p>
          </div>
          <div className={`${inset} px-3.5 py-3`}>
            <p className="font-mono text-[7.5px] uppercase tracking-wider text-[#3a4254]/40">Out</p>
            <p className="mt-0.5 text-[13px] font-bold">$2,610</p>
          </div>
        </div>

        <div className={`${out} mt-3 px-4 py-3`}>
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-semibold">Spending</p>
            <p className="font-mono text-[8px] text-[#3a4254]/40">May</p>
          </div>
          <div className="mt-2.5 grid gap-2">
            {[
              { l: "Rent & home", pct: 62, v: "$1,400" },
              { l: "Food", pct: 34, v: "$480" },
              { l: "Transport", pct: 18, v: "$130" },
            ].map((r) => (
              <div key={r.l}>
                <div className="flex justify-between text-[8.5px] font-medium text-[#3a4254]/60">
                  <span>{r.l}</span>
                  <span>{r.v}</span>
                </div>
                <div className={`${inset} mt-1 h-[8px] rounded-full`}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${r.pct}%`, background: INDIGO, opacity: 0.85 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CardDetail() {
  return (
    <div className={BASE}>
      <StatusBar />
      <div className="flex-1 px-5 pt-3">
        <p className="text-[10px] font-medium text-[#3a4254]/50">Monzo · current</p>
        <div
          className="mt-2 rounded-2xl px-4 py-4 text-white shadow-[8px_8px_18px_#c0c6d2,-4px_-4px_12px_#ffffff]"
          style={{ background: "linear-gradient(135deg,#5b6cf0,#4253c8)" }}
        >
          <div className="flex justify-between font-mono text-[8px] uppercase tracking-wider text-white/70">
            <span>Ledgr card</span>
            <span>05/29</span>
          </div>
          <p className="mt-4 font-mono text-[13px] tracking-[0.18em]">
            ···· ···· ···· 4072
          </p>
          <div className="mt-3 flex items-end justify-between">
            <p className="text-[9px] text-white/75">Priya Sharma</p>
            <p className="font-display text-[16px] font-bold">$3,410</p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-[10px] font-semibold">Today</p>
          <div className={`${inset} rounded-full px-2.5 py-1 font-mono text-[8px] text-[#3a4254]/50`}>
            all · food · bills
          </div>
        </div>

        <div className="mt-2 grid gap-2">
          {[
            { n: "Blue Bottle", t: "8:14 am", v: "-$6.20" },
            { n: "Whole Foods", t: "12:40 pm", v: "-$32.84" },
            { n: "Salary · Acme", t: "9:00 am", v: "+$2,100", plus: true },
          ].map((r) => (
            <div key={r.n} className={`${out} flex items-center justify-between px-3.5 py-2.5`}>
              <div className="flex items-center gap-2.5">
                <span className={`${inset} flex h-[26px] w-[26px] items-center justify-center rounded-lg text-[10px] font-bold text-[#3a4254]/60`}>
                  {r.n[0]}
                </span>
                <div>
                  <p className="text-[10.5px] font-semibold leading-tight">{r.n}</p>
                  <p className="text-[8px] text-[#3a4254]/40">{r.t}</p>
                </div>
              </div>
              <span
                className="font-mono text-[10px] font-medium"
                style={{ color: r.plus ? "#4d9b6e" : "#3a4254" }}
              >
                {r.v}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Goals() {
  const goals = [
    { n: "Japan trip", v: "$2,560 / $4,000", pct: 0.64 },
    { n: "Emergency fund", v: "$5,800 / $6,000", pct: 0.97 },
  ];
  return (
    <div className={BASE}>
      <StatusBar />
      <div className="flex-1 px-5 pt-3">
        <h2 className="font-display text-[18px] font-semibold">Goals</h2>
        <p className="mt-0.5 text-[9.5px] text-[#3a4254]/50">
          Auto-saving $120 every Friday.
        </p>

        <div className="mt-4 grid gap-3">
          {goals.map((g) => {
            const C = 2 * Math.PI * 24;
            return (
              <div key={g.n} className={`${out} flex items-center gap-3.5 px-4 py-3.5`}>
                <div className={`${inset} flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-full`}>
                  <svg viewBox="0 0 60 60" className="h-[52px] w-[52px] -rotate-90">
                    <circle cx="30" cy="30" r="24" fill="none" stroke="#d4dae4" strokeWidth="6" />
                    <circle
                      cx="30" cy="30" r="24" fill="none" stroke={INDIGO} strokeWidth="6"
                      strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - g.pct)}
                    />
                  </svg>
                  <span className="absolute font-mono text-[9px] font-bold">
                    {Math.round(g.pct * 100)}%
                  </span>
                </div>
                <div>
                  <p className="text-[11.5px] font-semibold">{g.n}</p>
                  <p className="mt-0.5 font-mono text-[8.5px] text-[#3a4254]/50">{g.v}</p>
                  {g.pct > 0.9 && (
                    <p className="mt-1 text-[8px] font-semibold" style={{ color: "#4d9b6e" }}>
                      Nearly there!
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className={`${inset} mt-3 flex h-[44px] items-center justify-center gap-1.5 text-[11px] font-semibold text-[#3a4254]/60`}>
          <span className="text-[13px] leading-none" style={{ color: INDIGO }}>+</span>
          New goal
        </div>
      </div>
    </div>
  );
}

export const ledgr: ShowcaseApp = {
  id: "ledgr",
  name: "Ledgr",
  niche: "Personal finance",
  themeLabel: "neumorphism",
  prompt: "a calm budgeting app, soft 3D surfaces, zero clutter",
  screens: [
    { id: "welcome", label: "Onboarding", Screen: Welcome },
    { id: "connect", label: "Link banks", Screen: Connect },
    { id: "dashboard", label: "Overview", Screen: Dashboard },
    { id: "card", label: "Card detail", Screen: CardDetail },
    { id: "goals", label: "Goals", Screen: Goals },
  ],
};

import { StatusBar } from "../phone-frame";
import type { ShowcaseApp } from "../types";

/* Crumb — cooking for beginners. Warm cream, tomato red, chunky rounded
   shapes, and a dough-blob chef mascot that carries the whole app. */

const BASE = "absolute inset-0 flex flex-col bg-[#fff6ec] text-[#3d2c23]";
const TOMATO = "#e8503a";
const card = "rounded-[18px] border border-[#3d2c23]/[0.08] bg-white shadow-[0_2px_0_#3d2c230f]";

/** The mascot: a dough blob in a chef hat. */
function Crumb({
  size = 72,
  mood = "happy",
}: {
  size?: number;
  mood?: "happy" | "cheer" | "wink";
}) {
  return (
    <svg viewBox="0 0 80 84" width={size} height={size * 1.05} aria-hidden>
      {/* hat */}
      <ellipse cx="40" cy="22" rx="17" ry="10" fill="#fff" stroke="#3d2c23" strokeWidth="2" />
      <circle cx="27" cy="18" r="8" fill="#fff" stroke="#3d2c23" strokeWidth="2" />
      <circle cx="40" cy="14" r="9" fill="#fff" stroke="#3d2c23" strokeWidth="2" />
      <circle cx="53" cy="18" r="8" fill="#fff" stroke="#3d2c23" strokeWidth="2" />
      <rect x="26" y="24" width="28" height="7" rx="3.5" fill="#fff" stroke="#3d2c23" strokeWidth="2" />
      {/* body */}
      <path
        d="M14 58c0-16 11-27 26-27s26 11 26 27c0 12-11 20-26 20S14 70 14 58Z"
        fill="#fbe8cf"
        stroke="#3d2c23"
        strokeWidth="2"
      />
      {/* cheeks */}
      <circle cx="26" cy="60" r="3.5" fill="#f6b8a4" />
      <circle cx="54" cy="60" r="3.5" fill="#f6b8a4" />
      {/* eyes */}
      {mood === "wink" ? (
        <>
          <circle cx="32" cy="54" r="2.6" fill="#3d2c23" />
          <path d="M45 53.5c2 1.6 4.5 1.6 6.5 0" fill="none" stroke="#3d2c23" strokeWidth="2" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="32" cy="54" r="2.6" fill="#3d2c23" />
          <circle cx="48" cy="54" r="2.6" fill="#3d2c23" />
        </>
      )}
      {/* mouth */}
      {mood === "cheer" ? (
        <path d="M35 61c2.6 3.6 7.4 3.6 10 0v0c-1.4 4.4-8.6 4.4-10 0Z" fill="#3d2c23" />
      ) : (
        <path d="M36 61c2 2.4 6 2.4 8 0" fill="none" stroke="#3d2c23" strokeWidth="2" strokeLinecap="round" />
      )}
      {/* little arms */}
      <path d="M14 56c-4 1-6 4-5.5 7" fill="none" stroke="#3d2c23" strokeWidth="2" strokeLinecap="round" />
      <path d="M66 56c4 1 6 4 5.5 7" fill="none" stroke="#3d2c23" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function Welcome() {
  return (
    <div className={BASE}>
      <StatusBar />
      <div className="flex flex-1 flex-col items-center px-5 pt-8 text-center">
        <Crumb size={92} mood="cheer" />
        <div className={`${card} relative mt-4 px-4 py-2.5`}>
          <span className="absolute -top-[6px] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-[#3d2c23]/[0.08] bg-white" />
          <p className="text-[12px] font-semibold">Hi, I&rsquo;m Crumb!</p>
          <p className="mt-0.5 text-[9.5px] text-[#3d2c23]/60">
            I&rsquo;ll teach you to cook. No burnt pans, promise.
          </p>
        </div>
        <div className="mt-auto w-full pb-6">
          <div
            className="flex h-[44px] items-center justify-center rounded-full text-[13px] font-bold text-white shadow-[0_3px_0_#a93423]"
            style={{ background: TOMATO }}
          >
            Let&rsquo;s cook!
          </div>
          <p className="mt-2.5 text-[9px] font-medium text-[#3d2c23]/45">
            I already have an account
          </p>
        </div>
      </div>
    </div>
  );
}

function Quiz() {
  const chips = [
    { l: "Pasta", on: true },
    { l: "Spicy", on: true },
    { l: "Vegan", on: false },
    { l: "15-min meals", on: true },
    { l: "Baking", on: false },
    { l: "High protein", on: false },
  ];
  return (
    <div className={BASE}>
      <StatusBar />
      <div className="relative flex-1 px-4 pt-3">
        <div className="flex gap-1">
          {[1, 2, 3].map((s) => (
            <span
              key={s}
              className="h-[5px] flex-1 rounded-full"
              style={{ background: s <= 2 ? TOMATO : "#3d2c2315" }}
            />
          ))}
        </div>
        <h2 className="mt-4 font-display text-[18px] font-bold leading-[1.15]">
          What does yummy
          <br />
          look like?
        </h2>
        <p className="mt-1 text-[9.5px] text-[#3d2c23]/55">
          Pick at least 3. Crumb takes notes.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {chips.map((c) => (
            <span
              key={c.l}
              className={`rounded-full border-2 px-3 py-1.5 text-[10.5px] font-bold ${
                c.on
                  ? "border-transparent text-white shadow-[0_2px_0_#a93423]"
                  : "border-[#3d2c23]/12 bg-white text-[#3d2c23]/70"
              }`}
              style={c.on ? { background: TOMATO } : undefined}
            >
              {c.l}
            </span>
          ))}
        </div>
        <div className="absolute bottom-4 right-3">
          <Crumb size={54} mood="wink" />
        </div>
        <div className="absolute bottom-5 left-4 right-[72px]">
          <div
            className="flex h-[40px] items-center justify-center rounded-full text-[12px] font-bold text-white shadow-[0_3px_0_#a93423]"
            style={{ background: TOMATO }}
          >
            Keep going
          </div>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const meals = [
    { name: "One-pan lemon orzo", time: "18 min", level: "Easy", bg: "#ffd9a8" },
    { name: "Crispy gochujang tofu", time: "22 min", level: "Easy+", bg: "#c9e8b5" },
  ];
  return (
    <div className={BASE}>
      <StatusBar />
      <div className="flex-1 px-4 pt-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[9px] font-semibold text-[#3d2c23]/45">Tuesday dinner</p>
            <h2 className="font-display text-[17px] font-bold">Tonight&rsquo;s picks</h2>
          </div>
          <div
            className="flex h-[30px] items-center gap-1 rounded-full px-2.5 text-[10px] font-bold text-white shadow-[0_2px_0_#a93423]"
            style={{ background: TOMATO }}
          >
            🔥 5
          </div>
        </div>

        <div className="mt-3 grid gap-2.5">
          {meals.map((m) => (
            <div key={m.name} className={`${card} overflow-hidden`}>
              <div className="relative h-[64px]" style={{ background: m.bg }}>
                <span className="absolute bottom-2 left-3 rounded-full bg-white/85 px-2 py-0.5 text-[8.5px] font-bold">
                  {m.time} · {m.level}
                </span>
              </div>
              <div className="flex items-center justify-between px-3 py-2.5">
                <p className="text-[11.5px] font-bold">{m.name}</p>
                <span className="text-[14px] leading-none" style={{ color: TOMATO }}>
                  →
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className={`${card} mt-2.5 flex items-center gap-2.5 px-3 py-2`}>
          <Crumb size={34} />
          <p className="text-[9.5px] leading-[1.45] text-[#3d2c23]/70">
            <span className="font-bold text-[#3d2c23]">Crumb&rsquo;s tip:</span> salt the
            pasta water like the sea. Trust me.
          </p>
        </div>
      </div>
    </div>
  );
}

function CookMode() {
  return (
    <div className={BASE}>
      <StatusBar />
      <div className="flex flex-1 flex-col px-4 pt-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold text-[#3d2c23]/50">Lemon orzo</p>
          <span className="rounded-full bg-[#3d2c23]/[0.06] px-2 py-0.5 text-[9px] font-bold">
            step 3 / 7
          </span>
        </div>
        <div className="mt-1.5 flex gap-1">
          {[...Array(7)].map((_, i) => (
            <span
              key={i}
              className="h-[4px] flex-1 rounded-full"
              style={{ background: i < 3 ? TOMATO : "#3d2c2315" }}
            />
          ))}
        </div>

        <h2 className="mt-6 font-display text-[20px] font-bold leading-[1.25]">
          Toast the orzo until it smells like popcorn.
        </h2>
        <p className="mt-2 text-[10.5px] leading-[1.5] text-[#3d2c23]/55">
          About 2 minutes, stirring. It should turn light gold, not brown.
        </p>

        <div
          className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full border-2 px-3 py-1.5 text-[11px] font-bold"
          style={{ borderColor: TOMATO, color: TOMATO }}
        >
          ⏱ 2:00 — start timer
        </div>

        <div className="mt-auto flex items-end justify-between pb-4">
          <Crumb size={56} mood="cheer" />
          <div
            className="flex h-[44px] flex-1 items-center justify-center rounded-full text-[12.5px] font-bold text-white shadow-[0_3px_0_#a93423] ml-3"
            style={{ background: TOMATO }}
          >
            Done, next →
          </div>
        </div>
      </div>
    </div>
  );
}

function Streak() {
  const days = ["M", "T", "W", "T", "F"];
  return (
    <div className={BASE}>
      <StatusBar />
      <div className="flex flex-1 flex-col items-center px-4 pt-6 text-center">
        <Crumb size={84} mood="cheer" />
        <h2 className="mt-3 font-display text-[20px] font-bold">5-day streak!</h2>
        <p className="mt-1 max-w-[22ch] text-[10px] leading-[1.5] text-[#3d2c23]/55">
          Five home-cooked dinners in a row. Restaurant Crumb is shaking.
        </p>

        <div className="mt-4 flex gap-2">
          {days.map((d, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span
                className="flex h-[30px] w-[30px] items-center justify-center rounded-full text-[12px] font-bold text-white shadow-[0_2px_0_#a93423]"
                style={{ background: TOMATO }}
              >
                ✓
              </span>
              <span className="text-[8px] font-bold text-[#3d2c23]/40">{d}</span>
            </div>
          ))}
        </div>

        <div className={`${card} mt-5 w-full px-4 py-3`}>
          <div className="flex items-center justify-between">
            <div className="text-left">
              <p className="text-[8.5px] font-bold uppercase tracking-wide" style={{ color: TOMATO }}>
                Reward unlocked
              </p>
              <p className="mt-0.5 text-[11.5px] font-bold">Knife skills mini-course</p>
            </div>
            <span className="text-[18px]">🎁</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export const crumb: ShowcaseApp = {
  id: "crumb",
  name: "Crumb",
  niche: "Cooking coach",
  themeLabel: "mascot-led",
  prompt: "a friendly cooking app for beginners with a cute mascot",
  screens: [
    { id: "welcome", label: "Meet Crumb", Screen: Welcome },
    { id: "quiz", label: "Taste quiz", Screen: Quiz },
    { id: "home", label: "Tonight's picks", Screen: Home },
    { id: "cook", label: "Cook mode", Screen: CookMode },
    { id: "streak", label: "Streak", Screen: Streak },
  ],
};

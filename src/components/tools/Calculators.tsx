"use client";

import { useMemo, useState } from "react";
import { motion, LayoutGroup } from "motion/react";
import { cn, fmtMoney } from "@/lib/format";

type Mode = "lump" | "monthly" | "goal";

function Slider({ label, value, min, max, step, onChange, format }: { label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; format: (v: number) => string }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <label className="block">
      <span className="flex items-baseline justify-between">
        <span className="eyebrow text-ink/60">{label}</span>
        <span className="font-serif text-xl tracking-tight tnum">{format(value)}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 h-1 w-full cursor-pointer appearance-none bg-ink/10 accent-[#041f3f]"
        style={{ background: `linear-gradient(to right, #041f3f ${pct}%, rgba(4,31,63,0.12) ${pct}%)` }}
      />
    </label>
  );
}

export function Calculators() {
  const [mode, setMode] = useState<Mode>("monthly");
  const [initial, setInitial] = useState(500_000);
  const [monthly, setMonthly] = useState(25_000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(9);
  const [target, setTarget] = useState(10_000_000);

  const result = useMemo(() => {
    const r = rate / 100 / 12;
    const n = years * 12;
    const growth = Math.pow(1 + r, n);
    const fvLump = initial * growth;
    const fvMonthly = r === 0 ? monthly * n : monthly * ((growth - 1) / r) * (1 + r);
    const neededMonthly = r === 0 ? target / n : target / (((growth - 1) / r) * (1 + r));
    const yearly = Array.from({ length: years + 1 }, (_, y) => {
      const g = Math.pow(1 + r, y * 12);
      const contrib = mode === "lump" ? initial : mode === "monthly" ? monthly * y * 12 : neededMonthly * y * 12;
      const value = mode === "lump" ? initial * g : r === 0 ? contrib : (mode === "monthly" ? monthly : neededMonthly) * ((g - 1) / r) * (1 + r);
      return { y, contrib, value };
    });
    return { fvLump, fvMonthly, neededMonthly, yearly };
  }, [initial, monthly, years, rate, target, mode]);

  const finalValue = mode === "lump" ? result.fvLump : mode === "monthly" ? result.fvMonthly : target;
  const invested = mode === "lump" ? initial : mode === "monthly" ? monthly * years * 12 : result.neededMonthly * years * 12;
  const maxV = Math.max(...result.yearly.map((d) => d.value), 1);

  const modes: { id: Mode; label: string }[] = [
    { id: "monthly", label: "Monthly savings plan" },
    { id: "lump", label: "One-time investment" },
    { id: "goal", label: "Goal planner" },
  ];

  return (
    <div className="grid gap-px bg-line lg:grid-cols-12">
      <div className="bg-snow p-7 md:p-10 lg:col-span-5">
        <LayoutGroup id="calc">
          <div className="flex flex-wrap gap-1" role="tablist">
            {modes.map((m) => (
              <button
                key={m.id}
                role="tab"
                aria-selected={mode === m.id}
                onClick={() => setMode(m.id)}
                className={cn("relative px-4 py-2.5 text-[10.5px] uppercase tracking-[0.12em]", mode === m.id ? "text-snow" : "text-ink/65")}
              >
                {mode === m.id && <motion.span layoutId="calc-tab" className="absolute inset-0 bg-ink" />}
                <span className="relative">{m.label}</span>
              </button>
            ))}
          </div>
        </LayoutGroup>

        <div className="mt-10 space-y-9">
          {mode === "lump" && <Slider label="Investment amount" value={initial} min={10_000} max={20_000_000} step={10_000} onChange={setInitial} format={(v) => fmtMoney(v)} />}
          {mode === "monthly" && <Slider label="Monthly investment" value={monthly} min={1_000} max={500_000} step={1_000} onChange={setMonthly} format={(v) => fmtMoney(v)} />}
          {mode === "goal" && <Slider label="Target amount" value={target} min={500_000} max={100_000_000} step={100_000} onChange={setTarget} format={(v) => fmtMoney(v)} />}
          <Slider label="Investment period" value={years} min={1} max={30} step={1} onChange={setYears} format={(v) => `${v} ${v === 1 ? "year" : "years"}`} />
          <Slider label="Expected annual return" value={rate} min={0} max={20} step={0.5} onChange={setRate} format={(v) => `${v.toFixed(1)}%`} />
        </div>
        <p className="mt-10 text-xs leading-relaxed text-ink/50">
          Projections assume a constant return compounded monthly and are for illustration only. Actual returns will vary and are not
          guaranteed. Fees and taxes are not included.
        </p>
      </div>

      <div className="on-dark bg-ink p-7 text-snow md:p-10 lg:col-span-7">
        <p className="eyebrow text-white/55">{mode === "goal" ? "You would need to invest" : "Estimated value after " + years + " years"}</p>
        <motion.p key={mode + Math.round(mode === "goal" ? result.neededMonthly : finalValue)} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} className="mt-3 font-serif text-[44px] leading-none tracking-tight tnum md:text-[64px]">
          {mode === "goal" ? fmtMoney(result.neededMonthly) : fmtMoney(finalValue)}
          {mode === "goal" && <span className="ml-3 font-sans text-base tracking-normal text-white/60">per month</span>}
        </motion.p>
        <div className="mt-8 grid grid-cols-2 gap-6 border-t border-line-light pt-6 text-sm">
          <div>
            <p className="eyebrow text-white/50">Total invested</p>
            <p className="mt-2 font-serif text-2xl tnum">{fmtMoney(invested)}</p>
          </div>
          <div>
            <p className="eyebrow text-white/50">Estimated growth</p>
            <p className="mt-2 font-serif text-2xl text-cyan tnum">{fmtMoney(Math.max(0, finalValue - invested))}</p>
          </div>
        </div>

        <div className="mt-10 flex h-56 items-end gap-[3px]" aria-hidden>
          {result.yearly.map((d) => (
            <div key={d.y} className="relative flex h-full flex-1 flex-col justify-end">
              <motion.div className="w-full bg-cyan/80" initial={false} animate={{ height: `${(d.value / maxV) * 100}%` }} transition={{ duration: 0.5, ease: [0.22, 0.8, 0.22, 1] }}>
                <motion.div className="absolute bottom-0 w-full bg-white/25" initial={false} animate={{ height: `${(Math.min(d.contrib, d.value) / maxV) * 100}%` }} transition={{ duration: 0.5 }} />
              </motion.div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex justify-between text-[11px] text-white/45"><span>Today</span><span>Year {years}</span></div>
        <div className="mt-5 flex gap-6 text-xs text-white/60">
          <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 bg-white/40" />Amount invested</span>
          <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 bg-cyan" />Projected value</span>
        </div>
      </div>
    </div>
  );
}

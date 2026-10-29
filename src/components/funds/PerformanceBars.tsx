"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { funds } from "@/data/funds";
import { cn } from "@/lib/format";

const PERIODS = [
  { id: "ytd", label: "YTD" },
  { id: "oneYear", label: "1 Year" },
  { id: "threeYear", label: "3 Years" },
  { id: "sinceInception", label: "Since inception p.a." },
] as const;

type P = (typeof PERIODS)[number]["id"];

export function PerformanceBars() {
  const [p, setP] = useState<P>("oneYear");
  const sorted = [...funds].sort((a, b) => b[p] - a[p]);
  const max = Math.max(...funds.map((f) => Math.abs(f[p])));

  return (
    <div>
      <div className="flex flex-wrap gap-1 border-b border-line pb-4">
        {PERIODS.map((x) => (
          <button key={x.id} onClick={() => setP(x.id)} aria-pressed={p === x.id} className={cn("px-4 py-2.5 text-[10.5px] uppercase tracking-[0.12em] transition-colors", p === x.id ? "bg-ink text-snow" : "text-ink/65 hover:bg-paper-2")}>
            {x.label}
          </button>
        ))}
      </div>
      <ul className="mt-6 space-y-4">
        {sorted.map((f) => (
          <motion.li key={f.slug} layout transition={{ duration: 0.5, ease: [0.22, 0.8, 0.22, 1] }} className="grid grid-cols-12 items-center gap-4">
            <span className="col-span-12 text-sm md:col-span-3">{f.name}</span>
            <div className="col-span-10 h-7 bg-paper-2 md:col-span-8">
              <motion.div className={cn("h-full", f[p] >= 0 ? "bg-ink" : "bg-down")} initial={false} animate={{ width: `${(Math.abs(f[p]) / max) * 100}%` }} transition={{ duration: 0.7, ease: [0.22, 0.8, 0.22, 1] }} />
            </div>
            <span className={cn("col-span-2 text-right font-serif text-lg tnum md:col-span-1", f[p] >= 0 ? "text-up" : "text-down")}>
              {f[p] > 0 ? "+" : ""}{f[p].toFixed(1)}%
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

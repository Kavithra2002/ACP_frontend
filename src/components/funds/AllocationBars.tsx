"use client";

import { motion } from "motion/react";

const SHADES = ["#041f3f", "#004a8f", "#6f9cc3", "#00aeef", "#86754d", "#052b56", "#b9cde0"];

export function AllocationBars({ data }: { data: { label: string; value: number }[] }) {
  return (
    <div>
      <div className="flex h-3 w-full overflow-hidden">
        {data.map((d, i) => (
          <motion.span
            key={d.label}
            style={{ background: SHADES[i % SHADES.length] }}
            initial={{ width: 0 }}
            whileInView={{ width: `${d.value}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: i * 0.08, ease: [0.22, 0.8, 0.22, 1] }}
          />
        ))}
      </div>
      <ul className="mt-6 divide-y divide-line border-y border-line">
        {data.map((d, i) => (
          <li key={d.label} className="flex items-center justify-between py-3 text-sm">
            <span className="flex items-center gap-3">
              <span className="h-2.5 w-2.5" style={{ background: SHADES[i % SHADES.length] }} />
              {d.label}
            </span>
            <span className="tnum text-ink/70">{d.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import type { NavPoint } from "@/data/funds";
import { cn, fmtDate, fmtPrice } from "@/lib/format";

const RANGES = [
  { id: "6M", months: 6 },
  { id: "1Y", months: 12 },
  { id: "3Y", months: 36 },
] as const;

/** Lightweight SVG line chart with hover crosshair — no chart library needed. */
export function NavChart({ data, currency }: { data: NavPoint[]; currency: string }) {
  const [range, setRange] = useState<(typeof RANGES)[number]["id"]>("1Y");
  const [hover, setHover] = useState<number | null>(null);

  const series = useMemo(() => {
    const months = RANGES.find((r) => r.id === range)!.months;
    return data.slice(-(months + 1));
  }, [data, range]);

  const W = 800;
  const H = 300;
  const P = { t: 20, r: 16, b: 32, l: 56 };
  const vals = series.map((d) => d.value);
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const pad = (max - min) * 0.12 || max * 0.01;
  const lo = min - pad;
  const hi = max + pad;
  const x = (i: number) => P.l + (i / (series.length - 1)) * (W - P.l - P.r);
  const y = (v: number) => P.t + (1 - (v - lo) / (hi - lo)) * (H - P.t - P.b);
  const path = series.map((d, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(d.value).toFixed(1)}`).join(" ");
  const area = `${path} L${x(series.length - 1)},${H - P.b} L${P.l},${H - P.b} Z`;
  const ticks = Array.from({ length: 4 }, (_, i) => lo + ((hi - lo) * i) / 3);
  const change = ((series.at(-1)!.value - series[0].value) / series[0].value) * 100;
  const active = hover !== null ? series[hover] : series.at(-1)!;

  const onMove = (e: React.MouseEvent<SVGSVGElement> | React.TouchEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const px = ((clientX - rect.left) / rect.width) * W;
    const i = Math.round(((px - P.l) / (W - P.l - P.r)) * (series.length - 1));
    setHover(Math.max(0, Math.min(series.length - 1, i)));
  };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-ink/55">{hover !== null ? fmtDate(active.date) : "Latest unit price"}</p>
          <p className="mt-2 font-serif text-4xl tracking-tight tnum">
            <span className="mr-2 align-middle font-sans text-sm tracking-normal text-ink/50">{currency}</span>
            {fmtPrice(active.value)}
          </p>
          <p className={cn("mt-1 text-sm tnum", change >= 0 ? "text-up" : "text-down")}>
            {change >= 0 ? "+" : ""}
            {change.toFixed(2)}% over {range}
          </p>
        </div>
        <div className="flex border border-line" role="group" aria-label="Chart range">
          {RANGES.map((r) => (
            <button
              key={r.id}
              onClick={() => setRange(r.id)}
              className={cn("px-4 py-2 text-[11px] tracking-[0.1em] transition-colors", range === r.id ? "bg-ink text-snow" : "text-ink/65 hover:bg-paper-2")}
              aria-pressed={range === r.id}
            >
              {r.id}
            </button>
          ))}
        </div>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mt-6 w-full touch-none select-none"
        onMouseMove={onMove}
        onTouchMove={onMove}
        onMouseLeave={() => setHover(null)}
        onTouchEnd={() => setHover(null)}
        role="img"
        aria-label={`Unit price over ${range}`}
      >
        <defs>
          <linearGradient id="navFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#004a8f" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#004a8f" stopOpacity="0" />
          </linearGradient>
        </defs>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={P.l} x2={W - P.r} y1={y(t)} y2={y(t)} stroke="rgba(4,31,63,0.1)" />
            <text x={P.l - 10} y={y(t) + 4} textAnchor="end" fontSize="11" fill="rgba(4,31,63,0.5)" fontFamily="Arial">
              {t.toFixed(t > 100 ? 1 : 2)}
            </text>
          </g>
        ))}
        {[0, Math.floor((series.length - 1) / 2), series.length - 1].map((i) => (
          <text key={i} x={x(i)} y={H - 8} textAnchor={i === 0 ? "start" : i === series.length - 1 ? "end" : "middle"} fontSize="11" fill="rgba(4,31,63,0.5)" fontFamily="Arial">
            {fmtDate(series[i].date, { month: "short", year: "numeric" })}
          </text>
        ))}
        <motion.path key={range + "a"} d={area} fill="url(#navFill)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} />
        <motion.path
          key={range}
          d={path}
          fill="none"
          stroke="#041f3f"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 0.8, 0.22, 1] }}
        />
        {hover !== null && (
          <g>
            <line x1={x(hover)} x2={x(hover)} y1={P.t} y2={H - P.b} stroke="#00aeef" strokeDasharray="3 3" />
            <circle cx={x(hover)} cy={y(series[hover].value)} r="5" fill="#fbfcfd" stroke="#004a8f" strokeWidth="2" />
          </g>
        )}
      </svg>
    </div>
  );
}

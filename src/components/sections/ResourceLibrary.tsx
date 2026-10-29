"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/format";

type Doc = { title: string; cat: string; date: string; size: string };

const DOCS: Doc[] = [
  { title: "Individual account opening form", cat: "Application forms", date: "2026-06-01", size: "420 KB" },
  { title: "Joint account opening form", cat: "Application forms", date: "2026-06-01", size: "460 KB" },
  { title: "Corporate account opening form", cat: "Application forms", date: "2026-06-01", size: "510 KB" },
  { title: "Know Your Customer (KYC) form", cat: "Application forms", date: "2026-06-01", size: "300 KB" },
  { title: "Subscription form", cat: "Transaction forms", date: "2026-03-15", size: "210 KB" },
  { title: "Redemption form", cat: "Transaction forms", date: "2026-03-15", size: "205 KB" },
  { title: "Switch request form", cat: "Transaction forms", date: "2026-03-15", size: "190 KB" },
  { title: "Standing order mandate", cat: "Transaction forms", date: "2026-03-15", size: "180 KB" },
  { title: "Change of details form", cat: "Transaction forms", date: "2026-03-15", size: "175 KB" },
  { title: "Monthly factsheets — October 2026", cat: "Factsheets", date: "2026-10-05", size: "2.1 MB" },
  { title: "Monthly factsheets — September 2026", cat: "Factsheets", date: "2026-09-05", size: "2.0 MB" },
  { title: "Explanatory memorandum — all funds", cat: "Fund documents", date: "2026-01-10", size: "3.8 MB" },
  { title: "Key investor information documents", cat: "Fund documents", date: "2026-01-10", size: "1.2 MB" },
  { title: "Trust deeds", cat: "Fund documents", date: "2025-11-20", size: "4.4 MB" },
  { title: "Annual report 2025/26", cat: "Reports", date: "2026-07-31", size: "6.5 MB" },
  { title: "Interim report — September 2026", cat: "Reports", date: "2026-10-20", size: "3.1 MB" },
];

const CATS = ["All", ...Array.from(new Set(DOCS.map((d) => d.cat)))];

export function ResourceLibrary() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const list = useMemo(() => DOCS.filter((d) => (cat === "All" || d.cat === cat) && d.title.toLowerCase().includes(q.toLowerCase())), [cat, q]);

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-3">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search documents" className="field" aria-label="Search documents" />
        <ul className="mt-6 border-t border-line">
          {CATS.map((c) => (
            <li key={c}>
              <button onClick={() => setCat(c)} className={cn("flex w-full items-center justify-between border-b border-line py-3 text-left text-sm transition-colors", cat === c ? "text-forest" : "text-ink/70 hover:text-ink")}>
                {c}
                <span className="tnum text-xs text-ink/40">{c === "All" ? DOCS.length : DOCS.filter((d) => d.cat === c).length}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="lg:col-span-9">
        <ul className="border-t border-ink">
          <AnimatePresence initial={false}>
            {list.map((d) => (
              <motion.li key={d.title} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="border-b border-line">
                <a href="#" className="group flex items-center justify-between gap-6 py-5">
                  <span>
                    <span className="block font-serif text-xl tracking-tight group-hover:text-forest">{d.title}</span>
                    <span className="mt-1 block text-xs text-ink/50">{d.cat} · PDF · {d.size}</span>
                  </span>
                  <span className="shrink-0 border border-line px-4 py-2 text-[10px] uppercase tracking-[0.12em] transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-snow">Download ↓</span>
                </a>
              </motion.li>
            ))}
          </AnimatePresence>
          {list.length === 0 && <li className="py-10 text-sm text-ink/55">No documents match your search.</li>}
        </ul>
      </div>
    </div>
  );
}

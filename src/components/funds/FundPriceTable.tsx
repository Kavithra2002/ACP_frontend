"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, LayoutGroup } from "motion/react";
import { CATEGORY_LABEL, PRICE_DATE, funds, type FundCategory } from "@/data/funds";
import { cn, fmtDate, fmtPrice } from "@/lib/format";
import { Pct } from "@/components/ui/primitives";

type Tab = "all" | FundCategory;

const tabs: { id: Tab; label: string }[] = [
  { id: "all", label: "All funds" },
  { id: "money-market", label: CATEGORY_LABEL["money-market"] },
  { id: "fixed-income", label: CATEGORY_LABEL["fixed-income"] },
  { id: "equity", label: CATEGORY_LABEL.equity },
  { id: "balanced", label: CATEGORY_LABEL.balanced },
  { id: "shariah", label: CATEGORY_LABEL.shariah },
];

export function FundPriceTable({ compact = false }: { compact?: boolean }) {
  const [tab, setTab] = useState<Tab>("all");
  const rows = funds.filter((f) => tab === "all" || f.category === tab);

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <LayoutGroup id="fund-tabs">
          <div className="-mx-1 flex gap-1 overflow-x-auto pb-1" role="tablist" aria-label="Fund category">
            {tabs.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  "relative whitespace-nowrap px-4 py-2.5 text-[10.5px] uppercase tracking-[0.12em] transition-colors",
                  tab === t.id ? "text-snow" : "text-ink/65 hover:text-ink",
                )}
              >
                {tab === t.id && <motion.span layoutId="tab-bg" className="absolute inset-0 bg-ink" transition={{ duration: 0.35, ease: [0.22, 0.8, 0.22, 1] }} />}
                <span className="relative">{t.label}</span>
              </button>
            ))}
          </div>
        </LayoutGroup>
        <p className="eyebrow text-ink/55">Prices as at {fmtDate(PRICE_DATE)}</p>
      </div>

      <div className="mt-6 relative overflow-x-auto border-t border-ink">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="eyebrow border-b border-line text-ink/55">
              <th className="py-4 pr-4 font-normal">Fund</th>
              <th className="py-4 pr-4 font-normal">Category</th>
              <th className="py-4 pr-4 text-right font-normal">Buy</th>
              <th className="py-4 pr-4 text-right font-normal">Sell</th>
              <th className="py-4 pr-4 text-right font-normal">YTD</th>
              {!compact && <th className="py-4 pr-4 text-right font-normal">1 Year</th>}
              <th className="py-4 text-right font-normal"><span className="sr-only">Details</span></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((f, i) => (
              <motion.tr
                key={f.slug}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="group border-b border-line transition-colors hover:bg-paper-2"
              >
                <td className="py-5 pr-4">
                  <Link href={`/funds/${f.slug}`} className="font-serif text-lg tracking-tight group-hover:text-forest">{f.name}</Link>
                  <span className="ml-2 text-[10px] uppercase tracking-wider text-ink/45">{f.currency}</span>
                </td>
                <td className="py-5 pr-4 text-ink/65">{CATEGORY_LABEL[f.category]}</td>
                <td className="tnum py-5 pr-4 text-right">{fmtPrice(f.buy)}</td>
                <td className="tnum py-5 pr-4 text-right">{fmtPrice(f.sell)}</td>
                <td className="py-5 pr-4 text-right"><Pct value={f.ytd} /></td>
                {!compact && <td className="py-5 pr-4 text-right"><Pct value={f.oneYear} /></td>}
                <td className="py-5 text-right">
                  <Link href={`/funds/${f.slug}`} className="text-[10.5px] uppercase tracking-[0.12em] text-forest" aria-label={`View ${f.name}`}>
                    View ↗
                  </Link>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs text-ink/50">YTD returns are non-annualised. Illustrative figures for design purposes only.</p>
    </div>
  );
}

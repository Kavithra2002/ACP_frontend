"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { funds, navHistory } from "@/data/funds";
import { NavChart } from "@/components/funds/NavChart";
import { cn, fmtDate, fmtMoney } from "@/lib/format";

/** Sample investor holdings — replace with authenticated API data. */
const HOLDINGS = [
  { slug: "money-plus-fund", units: 28476.12, cost: 1_200_000 },
  { slug: "income-fund", units: 22491.6, cost: 780_000 },
  { slug: "equity-fund", units: 22524.15, cost: 420_000 },
  { slug: "usd-bond-fund", units: 1520.4, cost: 17_000, fx: 298 },
];

const TXNS = [
  { d: "2026-10-05", t: "Subscription", f: "ACP Money Plus Fund", a: 25000, s: "Completed" },
  { d: "2026-09-22", t: "Switch in", f: "ACP Equity Fund", a: 100000, s: "Completed" },
  { d: "2026-09-22", t: "Switch out", f: "ACP Income Fund", a: -100000, s: "Completed" },
  { d: "2026-09-05", t: "Subscription", f: "ACP Money Plus Fund", a: 25000, s: "Completed" },
  { d: "2026-08-14", t: "Redemption", f: "ACP Money Plus Fund", a: -150000, s: "Completed" },
];

const TABS = ["Overview", "Transactions", "Statements"] as const;

export function PortalDashboard() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Overview");
  const [action, setAction] = useState<null | "Invest" | "Redeem" | "Switch">(null);

  const rows = HOLDINGS.map((h) => {
    const f = funds.find((x) => x.slug === h.slug)!;
    const valueLkr = h.units * f.sell * (h.fx ?? 1);
    const costLkr = h.cost * (h.fx ?? 1);
    return { ...h, f, valueLkr, costLkr, gain: valueLkr - costLkr };
  });
  const total = rows.reduce((a, r) => a + r.valueLkr, 0);
  const cost = rows.reduce((a, r) => a + r.costLkr, 0);
  const gain = total - cost;

  return (
    <section className="min-h-screen bg-paper pt-[112px] lg:pt-[148px]">
      <div className="wrap pb-24">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-ink/55">Investor ID · ACP-204118 · Sample account</p>
            <h1 className="mt-4 text-[40px] md:text-[56px]">Good afternoon, <em>Nimal.</em></h1>
          </div>
          <div className="flex flex-wrap gap-2">
            {(["Invest", "Redeem", "Switch"] as const).map((a) => (
              <button key={a} onClick={() => setAction(a)} className={cn("px-6 py-3.5 text-[11px] uppercase tracking-[0.12em] transition-colors", a === "Invest" ? "bg-ink text-snow hover:bg-forest" : "border border-ink hover:bg-ink hover:text-snow")}>
                {a}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-px bg-line md:grid-cols-4">
          <div className="on-dark bg-ink p-7 text-snow md:col-span-2">
            <p className="eyebrow text-white/55">Total portfolio value</p>
            <p className="mt-3 font-serif text-5xl tracking-tight tnum">{fmtMoney(total)}</p>
            <p className={cn("mt-2 text-sm tnum", gain >= 0 ? "text-cyan" : "text-red-300")}>{gain >= 0 ? "+" : ""}{fmtMoney(gain)} ({((gain / cost) * 100).toFixed(2)}%) unrealised</p>
          </div>
          <div className="bg-snow p-7"><p className="eyebrow text-ink/55">Amount invested</p><p className="mt-3 font-serif text-3xl tnum">{fmtMoney(cost)}</p></div>
          <div className="bg-snow p-7"><p className="eyebrow text-ink/55">Monthly plan</p><p className="mt-3 font-serif text-3xl tnum">LKR 25,000</p><p className="mt-1 text-xs text-ink/55">Next debit 05 Nov 2026</p></div>
        </div>

        <div className="mt-10 flex gap-6 border-b border-line">
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={cn("relative pb-4 text-[11px] uppercase tracking-[0.12em]", tab === t ? "text-ink" : "text-ink/50")}>
              {t}
              {tab === t && <motion.span layoutId="portal-tab" className="absolute inset-x-0 -bottom-px h-0.5 bg-ink" />}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="mt-10">
            {tab === "Overview" && (
              <div className="grid gap-10 lg:grid-cols-12">
                <div className="min-w-0 lg:col-span-7">
                  <div className="relative overflow-x-auto border-t border-ink">
                    <table className="w-full min-w-[560px] text-sm">
                      <thead>
                        <tr className="eyebrow border-b border-line text-left text-ink/55">
                          <th className="py-4 font-normal">Fund</th>
                          <th className="py-4 text-right font-normal">Units</th>
                          <th className="py-4 text-right font-normal">Value (LKR)</th>
                          <th className="py-4 text-right font-normal">Gain</th>
                          <th className="py-4 text-right font-normal">Weight</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((r) => (
                          <tr key={r.slug} className="border-b border-line">
                            <td className="py-4"><Link href={`/funds/${r.slug}`} className="font-serif text-lg tracking-tight hover:text-forest">{r.f.shortName}</Link> <span className="text-[10px] text-ink/45">{r.f.currency}</span></td>
                            <td className="py-4 text-right tnum">{r.units.toLocaleString("en-US", { maximumFractionDigits: 2 })}</td>
                            <td className="py-4 text-right tnum">{Math.round(r.valueLkr).toLocaleString("en-US")}</td>
                            <td className={cn("py-4 text-right tnum", r.gain >= 0 ? "text-up" : "text-down")}>{((r.gain / r.costLkr) * 100).toFixed(1)}%</td>
                            <td className="py-4 text-right tnum">{((r.valueLkr / total) * 100).toFixed(0)}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-6 flex h-3 overflow-hidden">
                    {rows.map((r, i) => (
                      <motion.span key={r.slug} initial={{ width: 0 }} animate={{ width: `${(r.valueLkr / total) * 100}%` }} transition={{ duration: 1, delay: i * 0.1 }} style={{ background: ["#041f3f", "#004a8f", "#6f9cc3", "#00aeef"][i] }} />
                    ))}
                  </div>
                </div>
                <div className="min-w-0 bg-snow p-6 lg:col-span-5">
                  <NavChart data={navHistory(funds.find((f) => f.slug === "money-plus-fund")!)} currency="LKR" />
                  <p className="mt-2 text-xs text-ink/50">Money Plus Fund unit price</p>
                </div>
              </div>
            )}

            {tab === "Transactions" && (
              <div className="relative overflow-x-auto border-t border-ink">
                <table className="w-full min-w-[640px] text-sm">
                  <thead><tr className="eyebrow border-b border-line text-left text-ink/55"><th className="py-4 font-normal">Date</th><th className="py-4 font-normal">Type</th><th className="py-4 font-normal">Fund</th><th className="py-4 text-right font-normal">Amount (LKR)</th><th className="py-4 text-right font-normal">Status</th></tr></thead>
                  <tbody>
                    {TXNS.map((t, i) => (
                      <tr key={i} className="border-b border-line">
                        <td className="py-4 text-ink/65">{fmtDate(t.d)}</td>
                        <td className="py-4">{t.t}</td>
                        <td className="py-4">{t.f}</td>
                        <td className={cn("py-4 text-right tnum", t.a < 0 ? "text-down" : "text-up")}>{t.a.toLocaleString("en-US")}</td>
                        <td className="py-4 text-right"><span className="bg-paper-2 px-3 py-1 text-xs">{t.s}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {tab === "Statements" && (
              <ul className="border-t border-ink">
                {["October 2026", "September 2026", "August 2026", "Annual tax certificate 2025/26", "Annual statement 2025/26"].map((s) => (
                  <li key={s} className="flex items-center justify-between border-b border-line py-5">
                    <span className="font-serif text-xl">{s}</span>
                    <a href="#" className="border border-line px-4 py-2 text-[10px] uppercase tracking-[0.12em] hover:border-ink hover:bg-ink hover:text-snow">PDF ↓</a>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </AnimatePresence>

        <p className="mt-12 text-xs text-ink/45">Sample dashboard with illustrative data. No real account information is shown.</p>
      </div>

      <AnimatePresence>
        {action && (
          <motion.div className="fixed inset-0 z-[90] flex items-center justify-center bg-abyss/60 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setAction(null)}>
            <motion.form
              onClick={(e) => e.stopPropagation()}
              onSubmit={(e) => { e.preventDefault(); setAction(null); }}
              initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }}
              className="w-full max-w-lg bg-snow p-8"
              role="dialog" aria-modal="true" aria-label={`${action} request`}
            >
              <p className="eyebrow text-forest">New request</p>
              <h2 className="mt-3 text-4xl">{action}</h2>
              <div className="mt-8 space-y-5">
                {action === "Switch" && (
                  <label className="block"><span className="eyebrow text-ink/60">From fund</span>
                    <select className="field mt-2">{rows.map((r) => <option key={r.slug}>{r.f.name}</option>)}</select>
                  </label>
                )}
                <label className="block"><span className="eyebrow text-ink/60">{action === "Switch" ? "To fund" : "Fund"}</span>
                  <select className="field mt-2">{(action === "Redeem" ? rows.map((r) => r.f) : funds).map((f) => <option key={f.slug}>{f.name}</option>)}</select>
                </label>
                <label className="block"><span className="eyebrow text-ink/60">Amount (LKR)</span><input required type="number" min={1000} className="field mt-2" /></label>
              </div>
              <div className="mt-8 flex justify-between">
                <button type="button" onClick={() => setAction(null)} className="text-[11px] uppercase tracking-[0.12em] text-ink/60">Cancel</button>
                <button className="bg-ink px-7 py-3.5 text-[11px] uppercase tracking-[0.12em] text-snow hover:bg-forest">Submit request ↗</button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

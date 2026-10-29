import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Btn, Disclaimer, Pct, RiskMeter, SectionLabel } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { NavChart } from "@/components/funds/NavChart";
import { AllocationBars } from "@/components/funds/AllocationBars";
import { FundCard } from "@/components/funds/FundCard";
import { CATEGORY_LABEL, PRICE_DATE, funds, getFund, navHistory } from "@/data/funds";
import { fmtDate, fmtMoney, fmtPrice } from "@/lib/format";

export function generateStaticParams() {
  return funds.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const f = getFund(slug);
  return f ? { title: f.name, description: f.objective } : {};
}

export default async function FundPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const f = getFund(slug);
  if (!f) notFound();
  const history = navHistory(f);
  const related = funds.filter((x) => x.slug !== f.slug && (x.category === f.category || Math.abs(x.risk - f.risk) <= 1)).slice(0, 3);

  const keyFacts: [string, string][] = [
    ["Category", CATEGORY_LABEL[f.category]],
    ["Currency", f.currency],
    ["Launch date", fmtDate(f.launch)],
    ["Fund size", `${f.currency} ${(f.aumMn / 1000).toFixed(2)} Bn`],
    ["Minimum initial", fmtMoney(f.minInitial, f.currency)],
    ["Minimum additional", fmtMoney(f.minAdditional, f.currency)],
    ["Management fee", `${f.managementFee.toFixed(2)}% p.a.`],
    ["Entry charge", f.entryFee ? `${f.entryFee.toFixed(1)}%` : "Nil"],
    ["Exit charge", f.exitFee],
    ["Redemption payment", f.redemption],
    ["Trustee & custodian", "Independent trustee (TBC)"],
    ["Dealing", "Daily, cut-off 3.00 pm"],
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-paper">
        <div className="wrap pb-14 pt-36 md:pt-44">
          <Reveal>
            <nav className="eyebrow flex gap-3 text-ink/55" aria-label="Breadcrumb">
              <Link href="/funds" className="hover:text-ink">Funds</Link><span>/</span><span className="text-forest">{CATEGORY_LABEL[f.category]}</span>
            </nav>
          </Reveal>
          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Reveal delay={0.05}><h1 className="text-[44px] md:text-[72px]">{f.name.replace("ACP ", "")}</h1></Reveal>
              <Reveal delay={0.1}><p className="mt-6 max-w-xl text-lg text-ink/70">{f.tagline}</p></Reveal>
              <Reveal delay={0.15}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Btn href="/invest-online" variant="solid">Invest in this fund</Btn>
                  <Btn href="/resources">Factsheet & documents</Btn>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.2} className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-px bg-line">
                {[
                  ["Buy price", fmtPrice(f.buy)],
                  ["Sell price", fmtPrice(f.sell)],
                ].map(([k, v]) => (
                  <div key={k} className="bg-snow p-6">
                    <p className="eyebrow text-ink/55">{k} · {f.currency}</p>
                    <p className="mt-2 font-serif text-3xl tracking-tight tnum">{v}</p>
                  </div>
                ))}
                <div className="bg-snow p-6"><p className="eyebrow text-ink/55">YTD return</p><p className="mt-2 font-serif text-3xl"><Pct value={f.ytd} /></p></div>
                <div className="bg-snow p-6"><p className="eyebrow text-ink/55">Risk level</p><div className="mt-4"><RiskMeter level={f.risk} /></div></div>
              </div>
              <p className="mt-3 text-xs text-ink/50">Prices as at {fmtDate(PRICE_DATE)}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-snow py-20 md:py-24">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal><SectionLabel index="01">Unit Price History</SectionLabel></Reveal>
            <Reveal delay={0.1} className="mt-8"><NavChart data={history} currency={f.currency} /></Reveal>

            <div className="mt-16">
              <Reveal><SectionLabel index="02">Performance</SectionLabel></Reveal>
              <Reveal delay={0.1}>
                <div className="mt-8 grid grid-cols-2 gap-px bg-line md:grid-cols-4">
                  {[["Year to date", f.ytd], ["1 year", f.oneYear], ["3 years (cumulative)", f.threeYear], ["Since inception (p.a.)", f.sinceInception]].map(([k, v]) => (
                    <div key={k as string} className="bg-paper p-6">
                      <p className="eyebrow text-ink/55">{k}</p>
                      <p className="mt-3 font-serif text-3xl"><Pct value={v as number} /></p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="mt-16 grid gap-12 md:grid-cols-2">
              <Reveal>
                <SectionLabel index="03">Objective</SectionLabel>
                <p className="mt-6 leading-relaxed text-ink/75">{f.objective}</p>
                <p className="eyebrow mt-8 text-ink/55">Suitable for</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {f.suitableFor.map((s) => <li key={s} className="flex items-center gap-3"><span className="h-px w-4 bg-forest" />{s}</li>)}
                </ul>
              </Reveal>
              <Reveal delay={0.1}>
                <SectionLabel index="04">Asset Allocation</SectionLabel>
                <div className="mt-6"><AllocationBars data={f.allocation} /></div>
              </Reveal>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <div className="border-t border-ink">
                  <p className="eyebrow py-5 text-ink/55">Key facts</p>
                  <dl className="divide-y divide-line border-t border-line text-sm">
                    {keyFacts.map(([k, v]) => (
                      <div key={k} className="flex justify-between gap-4 py-3"><dt className="text-ink/55">{k}</dt><dd className="text-right">{v}</dd></div>
                    ))}
                  </dl>
                </div>
                <div className="mt-8 space-y-px">
                  {["Fund factsheet", "Explanatory memorandum", "Key investor information", "Latest annual report"].map((d) => (
                    <a key={d} href="#" className="flex items-center justify-between bg-paper-2 px-5 py-4 text-sm transition-colors hover:bg-ink hover:text-snow">
                      {d}<span className="text-[10px] uppercase tracking-[0.12em]">PDF ↓</span>
                    </a>
                  ))}
                </div>
              </Reveal>
            </div>
          </aside>
        </div>
        <div className="wrap"><Disclaimer className="mt-12 max-w-3xl" /></div>
      </section>

      {related.length > 0 && (
        <section className="bg-paper-2 py-20 md:py-24">
          <div className="wrap">
            <Reveal><SectionLabel index="05">You may also consider</SectionLabel></Reveal>
            <div className="mt-10 grid gap-px bg-line md:grid-cols-3">
              {related.map((r) => <FundCard key={r.slug} fund={r} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

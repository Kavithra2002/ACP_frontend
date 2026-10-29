import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Disclaimer, Pct, RiskMeter, SectionLabel } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { PerformanceBars } from "@/components/funds/PerformanceBars";
import { CATEGORY_LABEL, PRICE_DATE, funds } from "@/data/funds";
import { fmtDate } from "@/lib/format";

export const metadata: Metadata = { title: "Fund Performance", description: "Compare returns across all ACP funds." };

export default function PerformancePage() {
  return (
    <>
      <PageHero label="Fund Performance" title={<>Returns, <em>reported transparently.</em></>} intro={`Performance across every ACP fund, net of fees, as at ${fmtDate(PRICE_DATE)}.`} />

      <section className="bg-snow py-20 md:py-28">
        <div className="wrap">
          <Reveal><SectionLabel index="01">Compare Returns</SectionLabel></Reveal>
          <Reveal delay={0.1} className="mt-10"><PerformanceBars /></Reveal>
        </div>
      </section>

      <section className="bg-paper py-20 md:py-28">
        <div className="wrap">
          <Reveal><SectionLabel index="02">Performance Table</SectionLabel></Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 relative overflow-x-auto border-t border-ink">
              <table className="w-full min-w-[860px] text-left text-sm">
                <thead>
                  <tr className="eyebrow border-b border-line text-ink/55">
                    <th className="py-4 pr-4 font-normal">Fund</th>
                    <th className="py-4 pr-4 font-normal">Category</th>
                    <th className="py-4 pr-4 font-normal">Risk</th>
                    <th className="py-4 pr-4 text-right font-normal">YTD</th>
                    <th className="py-4 pr-4 text-right font-normal">1 Yr</th>
                    <th className="py-4 pr-4 text-right font-normal">3 Yr cum.</th>
                    <th className="py-4 text-right font-normal">Since inception p.a.</th>
                  </tr>
                </thead>
                <tbody>
                  {funds.map((f) => (
                    <tr key={f.slug} className="border-b border-line hover:bg-paper-2">
                      <td className="py-5 pr-4"><Link href={`/funds/${f.slug}`} className="font-serif text-lg tracking-tight hover:text-forest">{f.name}</Link></td>
                      <td className="py-5 pr-4 text-ink/65">{CATEGORY_LABEL[f.category]} · {f.currency}</td>
                      <td className="py-5 pr-4"><RiskMeter level={f.risk} /></td>
                      <td className="py-5 pr-4 text-right"><Pct value={f.ytd} /></td>
                      <td className="py-5 pr-4 text-right"><Pct value={f.oneYear} /></td>
                      <td className="py-5 pr-4 text-right"><Pct value={f.threeYear} /></td>
                      <td className="py-5 text-right"><Pct value={f.sinceInception} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <Disclaimer className="mt-6 max-w-3xl" />
        </div>
      </section>
    </>
  );
}

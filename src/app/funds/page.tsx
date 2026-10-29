import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Btn, Disclaimer, SectionLabel } from "@/components/ui/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { FundPriceTable } from "@/components/funds/FundPriceTable";
import { FundCard } from "@/components/funds/FundCard";
import { funds, offshoreProducts } from "@/data/funds";

export const metadata: Metadata = { title: "Our Funds", description: "Compare ACP unit trusts — money market, fixed income, equity, balanced and Shariah-compliant funds." };

export default function FundsPage() {
  return (
    <>
      <PageHero
        label="Our Funds"
        title={<>Regulated funds <em>for every horizon.</em></>}
        intro="Eight locally managed unit trusts spanning daily liquidity to long-term growth, plus offshore routes for professional investors."
      >
        <div className="flex flex-wrap gap-3">
          <Btn href="/invest-online" variant="solid">Invest now</Btn>
          <Btn href="/performance">View performance</Btn>
        </div>
      </PageHero>

      <section className="bg-snow py-20 md:py-28">
        <div className="wrap">
          <Reveal><SectionLabel index="01">Unit Prices</SectionLabel></Reveal>
          <Reveal delay={0.1} className="mt-10"><FundPriceTable /></Reveal>
        </div>
      </section>

      <section className="bg-paper-2 py-20 md:py-28">
        <div className="wrap">
          <Reveal><SectionLabel index="02">Fund Range</SectionLabel></Reveal>
          <Reveal delay={0.1}><h2 className="mt-8 max-w-3xl text-[38px] md:text-[52px]">Choose by objective, <em>risk and currency.</em></h2></Reveal>
          <RevealGroup className="mt-14 grid gap-px bg-line md:grid-cols-2 lg:grid-cols-4">
            {funds.map((f) => (
              <RevealItem key={f.slug} className="h-full"><FundCard fund={f} /></RevealItem>
            ))}
          </RevealGroup>
          <Disclaimer className="mt-6" />
        </div>
      </section>

      <section className="on-dark bg-ink py-20 text-snow md:py-28">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal><SectionLabel index="03" light>Offshore & Professional</SectionLabel></Reveal>
            <Reveal delay={0.1}><h2 className="mt-8 text-[38px] md:text-[52px]">International routes <em>to Sri Lanka.</em></h2></Reveal>
            <Reveal delay={0.2}><p className="mt-6 max-w-md text-white/70">Available to professional and institutional investors only, subject to jurisdiction. Product details are provided on each platform's own website.</p></Reveal>
          </div>
          <div className="lg:col-span-7">
            <ul className="border-t border-white/40">
              {offshoreProducts.map((p) => (
                <li key={p.name}>
                  <a href={p.href} target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-6 border-b border-line-light py-7">
                    <span>
                      <span className="block font-serif text-2xl tracking-tight md:text-3xl">{p.name}</span>
                      <span className="mt-1 block text-sm text-white/60">{p.note}</span>
                    </span>
                    <span className="text-cyan transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

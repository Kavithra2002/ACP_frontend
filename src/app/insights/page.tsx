import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { SectionLabel } from "@/components/ui/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { insights } from "@/data/insights";
import { fmtDate } from "@/lib/format";

export const metadata: Metadata = { title: "Insights", description: "Market perspectives, investor education and firm news from ACP." };

export default function Page() {
  const [lead, ...rest] = insights;
  return (
    <>
      <PageHero label="Insights & Media" title={<>Perspective for investors, <em>in plain language.</em></>} intro="Market views, planning guides and firm news from the ACP investment team." />

      <section className="bg-snow py-20 md:py-28">
        <div className="wrap">
          <Reveal><SectionLabel index="01">Featured</SectionLabel></Reveal>
          <Reveal delay={0.1}>
            <Link href={`/insights/${lead.slug}`} className="on-dark group mt-10 grid overflow-hidden bg-ink text-snow md:grid-cols-2">
              <div className="relative min-h-[260px] overflow-hidden bg-ink-2">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(0,174,239,0.35),transparent_60%)] transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full border border-white/15" />
                <p className="absolute left-8 top-8 eyebrow text-white/60">{lead.category}</p>
              </div>
              <div className="flex flex-col justify-between p-8 md:p-12">
                <div>
                  <p className="eyebrow text-cyan">{fmtDate(lead.date)} · {lead.readMins} min read</p>
                  <h2 className="mt-6 text-[34px] md:text-[44px]">{lead.title}</h2>
                  <p className="mt-4 text-white/65">{lead.excerpt}</p>
                </div>
                <p className="mt-10 text-[11px] uppercase tracking-[0.12em] text-cyan">Read article ↗</p>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper py-20 md:py-28">
        <div className="wrap">
          <Reveal><SectionLabel index="02">All Insights</SectionLabel></Reveal>
          <RevealGroup className="mt-10 border-t border-ink">
            {rest.map((a) => (
              <RevealItem key={a.slug}>
                <Link href={`/insights/${a.slug}`} className="group grid gap-4 border-b border-line py-8 md:grid-cols-12 md:items-center">
                  <span className="eyebrow text-ink/55 md:col-span-2">{fmtDate(a.date)}</span>
                  <span className="eyebrow text-forest md:col-span-2">{a.category}</span>
                  <span className="font-serif text-2xl tracking-tight group-hover:text-forest md:col-span-7">{a.title}</span>
                  <span className="text-right text-forest transition-transform group-hover:translate-x-1 md:col-span-1">↗</span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}

import { PageHero } from "@/components/ui/PageHero";
import { Btn, SectionLabel } from "@/components/ui/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { FundCard } from "@/components/funds/FundCard";
import { ContactForm } from "@/components/forms/ContactForm";
import { funds } from "@/data/funds";

export type SegmentConfig = {
  label: string;
  title: React.ReactNode;
  intro: string;
  primaryCta: { label: string; href: string };
  overviewTitle: React.ReactNode;
  overviewText: string;
  features: { title: string; text: string }[];
  servicesTitle: React.ReactNode;
  services?: { title: string; text: string; points: string[] }[];
  fundSlugs?: string[];
  processTitle: React.ReactNode;
  process: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
  contactTopic: string;
};

export function SegmentPage({ c }: { c: SegmentConfig }) {
  const featured = c.fundSlugs ? funds.filter((f) => c.fundSlugs!.includes(f.slug)) : [];
  return (
    <>
      <PageHero label={c.label} title={c.title} intro={c.intro}>
        <div className="flex flex-wrap gap-3">
          <Btn href={c.primaryCta.href} variant="solid">{c.primaryCta.label}</Btn>
          <Btn href="#talk">Speak to an adviser</Btn>
        </div>
      </PageHero>

      <section className="bg-snow py-24 md:py-32">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal><SectionLabel index="01">Overview</SectionLabel></Reveal>
            <Reveal delay={0.1}><h2 className="mt-8 text-[38px] md:text-[52px]">{c.overviewTitle}</h2></Reveal>
            <Reveal delay={0.2}><p className="mt-6 max-w-md leading-relaxed text-ink/70">{c.overviewText}</p></Reveal>
          </div>
          <RevealGroup className="grid gap-px bg-line sm:grid-cols-2 lg:col-span-7">
            {c.features.map((f, i) => (
              <RevealItem key={f.title} className="bg-paper p-8">
                <span className="eyebrow text-forest">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 text-2xl">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/65">{f.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-paper-2 py-24 md:py-32">
        <div className="wrap">
          <Reveal><SectionLabel index="02">{featured.length ? "Recommended Funds" : "Services"}</SectionLabel></Reveal>
          <Reveal delay={0.1}><h2 className="mt-8 max-w-3xl text-[38px] md:text-[52px]">{c.servicesTitle}</h2></Reveal>
          {featured.length > 0 && (
            <RevealGroup className="mt-14 grid gap-px bg-line md:grid-cols-3">
              {featured.map((f) => (
                <RevealItem key={f.slug} className="h-full"><FundCard fund={f} /></RevealItem>
              ))}
            </RevealGroup>
          )}
          {c.services && (
            <RevealGroup className="mt-14 grid gap-px bg-line md:grid-cols-2 lg:grid-cols-3">
              {c.services.map((s) => (
                <RevealItem key={s.title} className="h-full bg-snow p-8 md:p-10">
                  <h3 className="text-[28px]">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/65">{s.text}</p>
                  <ul className="mt-6 space-y-2 border-t border-line pt-5 text-sm">
                    {s.points.map((p) => <li key={p} className="flex items-center gap-3"><span className="h-px w-4 bg-forest" />{p}</li>)}
                  </ul>
                </RevealItem>
              ))}
            </RevealGroup>
          )}
          {featured.length > 0 && <div className="mt-10"><Btn href="/funds">View all funds</Btn></div>}
        </div>
      </section>

      <section className="on-dark bg-ink py-24 text-snow md:py-32">
        <div className="wrap">
          <Reveal><SectionLabel index="03" light>How It Works</SectionLabel></Reveal>
          <Reveal delay={0.1}><h2 className="mt-8 max-w-3xl text-[38px] md:text-[52px]">{c.processTitle}</h2></Reveal>
          <RevealGroup className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {c.process.map((p, i) => (
              <RevealItem key={p.title} className="border-t border-white/40 pt-6">
                <span className="font-serif text-5xl text-cyan/70">0{i + 1}</span>
                <h3 className="mt-6 text-2xl">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{p.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-paper py-24 md:py-32">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal><SectionLabel index="04">Questions</SectionLabel></Reveal>
            <Reveal delay={0.1}><h2 className="mt-8 text-[38px] md:text-[48px]">Frequently <em>asked.</em></h2></Reveal>
            <Reveal delay={0.2}><div className="mt-8"><Btn href="/faqs" variant="ghost">All FAQs</Btn></div></Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-8"><Accordion items={c.faqs} /></Reveal>
        </div>
      </section>

      <section id="talk" className="scroll-mt-24 bg-snow py-24 md:py-32">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal><SectionLabel index="05">Get in Touch</SectionLabel></Reveal>
            <Reveal delay={0.1}><h2 className="mt-8 text-[38px] md:text-[48px]">Speak with a <em>relationship manager.</em></h2></Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-8"><ContactForm defaultTopic={c.contactTopic} /></Reveal>
        </div>
      </section>
    </>
  );
}

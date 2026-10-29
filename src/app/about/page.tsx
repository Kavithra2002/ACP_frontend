import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Btn, SectionLabel } from "@/components/ui/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Timeline } from "@/components/sections/Timeline";
import { leadership, site, values } from "@/data/site";

export const metadata: Metadata = { title: "About ACP", description: "Rooted in local insight, built for global investors — the people and principles behind ACP." };

export default function Page() {
  return (
    <>
      <PageHero
        label="About Our Firm"
        title={<>Rooted in local insight. <em>Built for global investors.</em></>}
        intro="Founded in 2010, ACP connects regulated asset management, public markets and private capital with opportunities across Sri Lanka and frontier markets — and invests alongside its clients."
      />

      <section className="bg-snow py-24 md:py-32">
        <div className="wrap">
          <Reveal><SectionLabel index="01">Our People</SectionLabel></Reveal>
          <Reveal delay={0.1}><h2 className="mt-8 max-w-3xl text-[40px] md:text-[56px]">The people <em>behind the platform.</em></h2></Reveal>
          <RevealGroup className="mt-14 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
            {leadership.map((p) => (
              <RevealItem key={p.name} className="group bg-paper p-8">
                <div className="flex aspect-[4/3] items-end bg-paper-2 p-5 transition-colors duration-500 group-hover:bg-ink">
                  <span className="font-serif text-6xl text-ink/15 transition-colors group-hover:text-cyan/60">
                    {p.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <h3 className="mt-6 text-2xl">{p.name}</h3>
                <p className="mt-2 text-sm text-ink/60">{p.role}</p>
              </RevealItem>
            ))}
          </RevealGroup>
          <p className="mt-4 text-xs text-ink/45">Replace monogram tiles with approved portrait photography.</p>
        </div>
      </section>

      <section className="on-dark bg-ink py-24 text-snow md:py-32">
        <div className="wrap">
          <Reveal><SectionLabel index="02" light>Our Story</SectionLabel></Reveal>
          <Reveal delay={0.1}><h2 className="mt-8 max-w-3xl text-[40px] md:text-[56px]">Sixteen years of <em>building access.</em></h2></Reveal>
          <div className="mt-16"><Timeline /></div>
        </div>
      </section>

      <section className="bg-paper py-24 md:py-32">
        <div className="wrap">
          <Reveal><SectionLabel index="03">Principles</SectionLabel></Reveal>
          <Reveal delay={0.1}><h2 className="mt-8 max-w-3xl text-[40px] md:text-[56px]">The values that sit <em>behind our capital.</em></h2></Reveal>
          <RevealGroup className="mt-14 grid gap-px bg-line md:grid-cols-4">
            {values.map((v, i) => (
              <RevealItem key={v.title} className="bg-snow p-8">
                <span className="eyebrow text-forest">0{i + 1}</span>
                <h3 className="mt-10 text-[28px]">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/65">{v.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-paper-2 py-24 md:py-32">
        <div className="wrap">
          <Reveal><SectionLabel index="04">Global Footprint</SectionLabel></Reveal>
          <Reveal delay={0.1}><h2 className="mt-8 max-w-3xl text-[40px] md:text-[56px]">Local intelligence. <em>International infrastructure.</em></h2></Reveal>
          <RevealGroup className="mt-14 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Sri Lanka", "Colombo", "Research, public markets, private capital and wealth management."],
              ["Australia", "Brisbane", "Regulated asset management and international investment capability."],
              ["Switzerland", "Zurich", "Private wealth connectivity and European institutional access."],
              ["Singapore", "Singapore", "Regional investment connectivity across Asia."],
            ].map(([country, city, text]) => (
              <RevealItem key={city} className="group relative overflow-hidden bg-snow p-8">
                <div aria-hidden className="absolute -right-16 -top-16 h-44 w-44 rounded-full border border-ink/10 transition-transform duration-700 group-hover:scale-125" />
                <p className="eyebrow text-forest">{country}</p>
                <h3 className="mt-14 text-[32px]">{city}</h3>
                <p className="mt-3 text-sm text-ink/65">{text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-8">
            <p className="font-serif text-2xl">Capital is institutional. <em className="text-forest">Relationships remain human.</em></p>
            <Btn href="/contact">Contact {site.short}</Btn>
          </div>
        </div>
      </section>
    </>
  );
}

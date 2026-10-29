import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Btn, SectionLabel } from "@/components/ui/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";

export const metadata: Metadata = { title: "Unit Trust Taxation", description: "How returns from unit trusts are treated for tax purposes." };

/*
  CONTENT NOTE: tax rules change. Every rate, threshold and rule on this page is a
  placeholder and must be confirmed by ACP's tax advisers before publishing.
*/
export default function Page() {
  return (
    <>
      <PageHero
        label="Unit Trust Taxation"
        title={<>Understanding tax <em>on your returns.</em></>}
        intro="A plain-language guide to how unit trust income and gains are treated. This page is general information, not tax advice."
      />

      <section className="bg-snow py-20 md:py-28">
        <div className="wrap">
          <Reveal><SectionLabel index="01">At a glance</SectionLabel></Reveal>
          <RevealGroup className="mt-10 grid gap-px bg-line md:grid-cols-3">
            {[
              { t: "Fund-level tax", d: "How income earned inside the fund is taxed before it is reflected in the unit price.", v: "[Rate TBC]" },
              { t: "Distributions", d: "Treatment of dividends or income distributions paid out to unit holders.", v: "[Rate TBC]" },
              { t: "Redemption gains", d: "Treatment of gains realised when you redeem units.", v: "[Rule TBC]" },
            ].map((x) => (
              <RevealItem key={x.t} className="bg-paper p-8">
                <p className="eyebrow text-forest">{x.t}</p>
                <p className="mt-6 font-serif text-4xl">{x.v}</p>
                <p className="mt-3 text-sm text-ink/65">{x.d}</p>
              </RevealItem>
            ))}
          </RevealGroup>
          <p className="mt-6 max-w-3xl border-l-2 border-cyan pl-5 text-sm text-ink/65">
            Placeholder content. Confirm current rates and rules under the Inland Revenue Act with ACP's tax advisers before launch.
          </p>
        </div>
      </section>

      <section className="bg-paper py-20 md:py-28">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal><SectionLabel index="02">Common Questions</SectionLabel></Reveal>
            <Reveal delay={0.1}><h2 className="mt-8 text-[38px] md:text-[48px]">Tax questions, <em>answered.</em></h2></Reveal>
            <Reveal delay={0.2}><div className="mt-8"><Btn href="/resources">Tax certificates</Btn></div></Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-8">
            <Accordion
              items={[
                { q: "Will I receive a tax certificate?", a: "Yes. Annual tax certificates are available from the investor portal and on request, typically after the end of the tax year." },
                { q: "Does tax differ between funds?", a: "It can. Treatment may vary by the fund's structure and underlying assets. Refer to each fund's explanatory memorandum." },
                { q: "I'm a non-resident. How am I taxed?", a: "Non-resident treatment depends on your country of residence and any applicable double tax agreement. Please seek independent advice." },
                { q: "Are corporate investors treated differently?", a: "Corporate and institutional investors may be subject to different rules. Contact our institutional team for details." },
              ]}
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}

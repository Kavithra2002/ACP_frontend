import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { SectionLabel } from "@/components/ui/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "Contact & Appointments", description: "Book an appointment or send an enquiry to ACP Wealth Management." };

const routes = [
  { t: "Personal investors", d: "Account opening, fund selection and existing account support.", c: "Client Services" },
  { t: "Private wealth & family offices", d: "Discretionary portfolios and bespoke solutions.", c: "Private Wealth Team" },
  { t: "Institutions & distributors", d: "Mandates, treasury, platform onboarding and due diligence.", c: "Investor Relations" },
  { t: "Media & partnerships", d: "Press enquiries, statements and strategic partnerships.", c: "Corporate Relations" },
];

export default function Page() {
  return (
    <>
      <PageHero label="Contact" title={<>Let's start <em>a conversation.</em></>} intro="Book an appointment with a relationship manager, visit our Colombo office, or send us an enquiry." />

      <section className="bg-snow py-20 md:py-28">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal><SectionLabel index="01">Reach Us</SectionLabel></Reveal>
            <Reveal delay={0.1}>
              <dl className="mt-10 space-y-8">
                <div><dt className="eyebrow text-ink/50">Head office</dt><dd className="mt-2 font-serif text-2xl leading-snug">{site.address[0]}<br />{site.address[1]}</dd></div>
                <div><dt className="eyebrow text-ink/50">Telephone</dt><dd className="mt-2 font-serif text-2xl"><a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a></dd></div>
                <div><dt className="eyebrow text-ink/50">Email</dt><dd className="mt-2 font-serif text-2xl"><a href={`mailto:${site.email}`}>{site.email}</a></dd></div>
                <div><dt className="eyebrow text-ink/50">Opening hours</dt><dd className="mt-2 text-sm">{site.hours}</dd></div>
              </dl>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-8">
            <SectionLabel index="02">Make an appointment or enquiry</SectionLabel>
            <div className="mt-10"><ContactForm defaultTopic="Book an appointment" /></div>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper-2 py-20 md:py-28">
        <div className="wrap">
          <Reveal><SectionLabel index="03">Who to Contact</SectionLabel></Reveal>
          <RevealGroup className="mt-10 grid gap-px bg-line md:grid-cols-2 lg:grid-cols-4">
            {routes.map((r) => (
              <RevealItem key={r.t} className="bg-snow p-8">
                <p className="eyebrow text-forest">{r.c}</p>
                <h3 className="mt-6 text-2xl">{r.t}</h3>
                <p className="mt-3 text-sm text-ink/65">{r.d}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-snow">
        <div className="relative h-[420px] w-full bg-paper-2">
          <iframe
            title="ACP office location map"
            className="h-full w-full grayscale"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=100%2F1+Elvitigala+Mawatha+Colombo+08&output=embed"
          />
        </div>
      </section>
    </>
  );
}

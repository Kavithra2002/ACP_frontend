import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Btn, SectionLabel } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";

export const metadata: Metadata = { title: "FAQs", description: "Answers to common questions about investing with ACP." };

const groups = [
  {
    title: "Getting started",
    items: [
      { q: "What is a unit trust?", a: "A unit trust pools money from many investors into a professionally managed portfolio. Each investor owns units representing a share of the fund." },
      { q: "Who can invest?", a: "Sri Lankan residents aged 18 and above, joint holders, parents on behalf of minors, corporates, and eligible non-residents." },
      { q: "What documents do I need?", a: "A copy of your NIC or passport, proof of address dated within the last three months, and bank details for redemptions." },
    ],
  },
  {
    title: "Investing & redeeming",
    items: [
      { q: "How is my unit price calculated?", a: "The fund's net asset value is divided by the units in issue and published every business day." },
      { q: "What is the dealing cut-off?", a: "Instructions received by 3.00 pm on a business day are processed at that day's price." },
      { q: "How long do redemptions take?", a: "Money market funds typically pay T+1. Income and equity funds pay within two to three business days." },
      { q: "Are there any charges?", a: "Each fund has an annual management fee. Equity and balanced funds may have an entry charge. See each fund page for details." },
    ],
  },
  {
    title: "Safety & regulation",
    items: [
      { q: "Is my money safe?", a: "Fund assets are held by an independent trustee and custodian, separate from ACP. However, investment values can fall and returns are not guaranteed." },
      { q: "Who regulates ACP's funds?", a: "Regulatory details to be confirmed by ACP compliance before launch." },
    ],
  },
];

export default function Page() {
  return (
    <>
      <PageHero label="Help Centre" title={<>Frequently <em>asked questions.</em></>} intro="Can't find what you're looking for? Our client team is available Monday to Friday." >
        <Btn href="/contact" variant="solid">Contact us</Btn>
      </PageHero>
      <section className="bg-snow py-20 md:py-28">
        <div className="wrap space-y-20">
          {groups.map((g, i) => (
            <div key={g.title} className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <Reveal><SectionLabel index={String(i + 1).padStart(2, "0")}>{g.title}</SectionLabel></Reveal>
              </div>
              <Reveal className="lg:col-span-8"><Accordion items={g.items} /></Reveal>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

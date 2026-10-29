import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";

const PAGES: Record<string, { title: string; sections: { h: string; p: string }[] }> = {
  terms: {
    title: "Terms of Use",
    sections: [
      { h: "Acceptance", p: "By accessing this website you agree to these terms. If you do not agree, please do not use the website." },
      { h: "Information only", p: "Content is provided for reference and does not constitute an offer, solicitation or investment recommendation." },
      { h: "Intellectual property", p: "All content, trademarks and materials belong to ACP Asset Management or its licensors and may not be reproduced without permission." },
      { h: "Limitation of liability", p: "ACP accepts no liability for losses arising from reliance on information on this website, to the extent permitted by law." },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    sections: [
      { h: "What we collect", p: "Contact details, identification and financial information you provide when enquiring or opening an account." },
      { h: "How we use it", p: "To respond to enquiries, meet KYC and regulatory obligations, process transactions and provide statements." },
      { h: "Sharing", p: "With trustees, custodians, registrars and regulators as required. We do not sell personal data." },
      { h: "Your rights", p: "You may request access to, correction of or deletion of your data, subject to legal retention requirements." },
    ],
  },
  disclaimer: {
    title: "Disclaimer",
    sections: [
      { h: "Investment risk", p: "The value of units and income from them may fall as well as rise. Past performance is not indicative of future results." },
      { h: "No advice", p: "Nothing on this website constitutes investment, legal, tax or financial advice. Seek independent advice where appropriate." },
      { h: "Accuracy", p: "While we take care to keep information current, ACP does not warrant its completeness or accuracy." },
    ],
  },
  complaints: {
    title: "Complaints",
    sections: [
      { h: "How to raise a complaint", p: "Write to our Compliance Officer at the head office address or email info@acp-am.com with your investor ID and details." },
      { h: "Our commitment", p: "We acknowledge complaints within two business days and aim to resolve them within fourteen business days." },
      { h: "Escalation", p: "If you are not satisfied, you may refer the matter to the relevant regulator. Details to be confirmed by compliance." },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return PAGES[slug] ? { title: PAGES[slug].title } : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = PAGES[slug];
  if (!page) notFound();
  return (
    <>
      <PageHero label="Legal" title={page.title} intro="Placeholder legal copy — to be replaced with text approved by ACP's legal and compliance teams." />
      <section className="bg-snow py-20">
        <div className="wrap max-w-3xl space-y-10">
          {page.sections.map((s, i) => (
            <div key={s.h} className="border-t border-line pt-6">
              <p className="eyebrow text-forest">{String(i + 1).padStart(2, "0")}</p>
              <h2 className="mt-3 text-[28px]">{s.h}</h2>
              <p className="mt-3 leading-relaxed text-ink/70">{s.p}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { SectionLabel } from "@/components/ui/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ResourceLibrary } from "@/components/sections/ResourceLibrary";

export const metadata: Metadata = { title: "Forms & Downloads", description: "Application forms, factsheets, reports and investor documents." };

export default function Page() {
  return (
    <>
      <PageHero label="Investor Resources" title={<>Forms, factsheets <em>and reports.</em></>} intro="Everything you need to open an account, transact and review your investments, in one place." />

      <section className="bg-snow py-20 md:py-28">
        <div className="wrap">
          <Reveal><SectionLabel index="01">Document Library</SectionLabel></Reveal>
          <Reveal delay={0.1} className="mt-10"><ResourceLibrary /></Reveal>
        </div>
      </section>

      <section className="bg-paper-2 py-20 md:py-28">
        <div className="wrap">
          <Reveal><SectionLabel index="02">How to Transact</SectionLabel></Reveal>
          <Reveal delay={0.1}><h2 className="mt-8 max-w-3xl text-[38px] md:text-[52px]">Subscriptions, redemptions <em>and payments.</em></h2></Reveal>
          <RevealGroup className="mt-14 grid gap-px bg-line md:grid-cols-3">
            {[
              { t: "Invest", d: "Transfer funds to the fund's collection account with your investor ID as reference, then submit the subscription form or invest via the portal." },
              { t: "Redeem", d: "Submit a redemption request online or by signed form before the 3.00 pm cut-off. Proceeds are paid to your registered bank account." },
              { t: "Switch", d: "Move between ACP funds with a single instruction. Switches are processed at the next available prices." },
            ].map((x) => (
              <RevealItem key={x.t} className="bg-snow p-8">
                <h3 className="text-[28px]">{x.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/65">{x.d}</p>
              </RevealItem>
            ))}
          </RevealGroup>
          <div className="mt-10 grid gap-px bg-line md:grid-cols-2">
            <div className="bg-snow p-8">
              <p className="eyebrow text-ink/55">Collection account (sample)</p>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-ink/55">Account name</dt><dd>ACP [Fund name] — Collection</dd></div>
                <div className="flex justify-between"><dt className="text-ink/55">Bank</dt><dd>To be confirmed</dd></div>
                <div className="flex justify-between"><dt className="text-ink/55">Reference</dt><dd>Your investor ID</dd></div>
              </dl>
            </div>
            <div className="bg-snow p-8">
              <p className="eyebrow text-ink/55">Dealing cut-off</p>
              <p className="mt-4 font-serif text-4xl">3.00 pm</p>
              <p className="mt-2 text-sm text-ink/60">Instructions received after cut-off are processed on the next business day.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

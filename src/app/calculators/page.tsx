import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Btn, SectionLabel } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Calculators } from "@/components/tools/Calculators";

export const metadata: Metadata = { title: "Investment Calculators", description: "Project the growth of a lump sum or monthly plan, or work out what you need to save for a goal." };

export default function Page() {
  return (
    <>
      <PageHero label="Investment Calculators" title={<>See what your money <em>could become.</em></>} intro="Model a one-time investment, a monthly savings plan, or the amount you need to reach a specific goal." />
      <section className="bg-paper-2 py-16 md:py-24">
        <div className="wrap">
          <Reveal><Calculators /></Reveal>
        </div>
      </section>
      <section className="bg-snow py-20">
        <div className="wrap flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <SectionLabel index="→">Next step</SectionLabel>
            <h2 className="mt-6 text-[34px] md:text-[44px]">Turn the plan <em>into an investment.</em></h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Btn href="/invest-online" variant="solid">Open an account</Btn>
            <Btn href="/contact">Talk to an adviser</Btn>
          </div>
        </div>
      </section>
    </>
  );
}

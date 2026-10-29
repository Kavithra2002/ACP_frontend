import { Reveal } from "./Reveal";
import { SectionLabel } from "./primitives";

type Props = {
  label: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  children?: React.ReactNode;
  dark?: boolean;
};

/** Inner-page hero in ACP's editorial style: label, big serif headline, short intro. */
export function PageHero({ label, title, intro, children, dark }: Props) {
  return (
    <section className={dark ? "on-dark relative overflow-hidden bg-ink text-snow" : "relative overflow-hidden bg-paper"}>
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className={dark ? "absolute -right-40 -top-40 h-[620px] w-[620px] rounded-full border border-white/10" : "absolute -right-40 -top-40 h-[620px] w-[620px] rounded-full border border-ink/10"}
        />
        <div
          className={dark ? "absolute -right-10 top-20 h-[380px] w-[380px] rounded-full border border-white/10" : "absolute -right-10 top-20 h-[380px] w-[380px] rounded-full border border-ink/[0.07]"}
        />
      </div>
      <div className="wrap relative pb-16 pt-36 md:pb-24 md:pt-44">
        <Reveal>
          <SectionLabel light={dark}>{label}</SectionLabel>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-8 max-w-5xl text-[44px] md:text-[76px]">{title}</h1>
        </Reveal>
        {intro && (
          <Reveal delay={0.16}>
            <div className={dark ? "mt-8 max-w-2xl text-lg leading-relaxed text-white/75" : "mt-8 max-w-2xl text-lg leading-relaxed text-ink/75"}>{intro}</div>
          </Reveal>
        )}
        {children && (
          <Reveal delay={0.24}>
            <div className="mt-10">{children}</div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

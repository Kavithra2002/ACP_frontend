import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Btn, SectionLabel } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { getInsight, insights } from "@/data/insights";
import { fmtDate } from "@/lib/format";

export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getInsight(slug);
  return a ? { title: a.title, description: a.excerpt } : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getInsight(slug);
  if (!a) notFound();
  const more = insights.filter((x) => x.slug !== a.slug).slice(0, 3);

  return (
    <>
      <article>
        <header className="bg-paper">
          <div className="wrap max-w-4xl pb-14 pt-36 md:pt-44">
            <Reveal>
              <nav className="eyebrow flex gap-3 text-ink/55"><Link href="/insights" className="hover:text-ink">Insights</Link><span>/</span><span className="text-forest">{a.category}</span></nav>
            </Reveal>
            <Reveal delay={0.05}><h1 className="mt-8 text-[40px] md:text-[64px]">{a.title}</h1></Reveal>
            <Reveal delay={0.1}><p className="mt-6 text-lg text-ink/70">{a.excerpt}</p></Reveal>
            <Reveal delay={0.15}><p className="eyebrow mt-8 text-ink/55">{fmtDate(a.date)} · {a.readMins} min read · ACP Investment Team</p></Reveal>
          </div>
        </header>
        <div className="bg-snow py-16 md:py-24">
          <div className="wrap max-w-3xl space-y-8 text-[17px] leading-[1.8] text-ink/80">
            {a.body.map((b, i) => (
              <Reveal key={i}>
                {b.heading && <h2 className="mb-3 text-[28px] text-ink">{b.heading}</h2>}
                <p className={i === 0 ? "font-serif text-[21px] leading-relaxed text-ink" : ""}>{b.text}</p>
              </Reveal>
            ))}
            <p className="border-t border-line pt-6 text-xs text-ink/50">This article is for general information only and does not constitute investment advice.</p>
          </div>
        </div>
      </article>

      <section className="bg-paper-2 py-20">
        <div className="wrap">
          <div className="flex items-end justify-between gap-6">
            <SectionLabel index="→">More insights</SectionLabel>
            <Btn href="/insights" variant="ghost">View all</Btn>
          </div>
          <div className="mt-10 grid gap-px bg-line md:grid-cols-3">
            {more.map((m) => (
              <Link key={m.slug} href={`/insights/${m.slug}`} className="group bg-snow p-8 transition-colors hover:bg-ink hover:text-snow">
                <p className="eyebrow text-forest group-hover:text-cyan">{m.category}</p>
                <h3 className="mt-5 text-2xl">{m.title}</h3>
                <p className="mt-6 text-xs opacity-60">{fmtDate(m.date)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

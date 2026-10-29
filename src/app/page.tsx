import Link from "next/link";
import { Btn, SectionLabel } from "@/components/ui/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { FundCard } from "@/components/funds/FundCard";
import { FundPriceTable } from "@/components/funds/FundPriceTable";
import { HeroArt } from "@/components/home/HeroArt";
import { ContactForm } from "@/components/forms/ContactForm";
import { funds, PRICE_DATE } from "@/data/funds";
import { insights } from "@/data/insights";
import { site } from "@/data/site";
import { fmtDate, fmtPrice } from "@/lib/format";

const segments = [
  {
    n: "01",
    title: "Personal Investors",
    href: "/personal",
    text: "Unit trusts for everyday saving and long-term goals, starting from LKR 1,000 with no lock-in on money market funds.",
    points: ["Money market & income funds", "Monthly savings plans", "Online account in minutes"],
  },
  {
    n: "02",
    title: "Private Wealth",
    href: "/private-wealth",
    text: "Discretionary and advisory portfolios for high net worth individuals and families, with a dedicated relationship manager.",
    points: ["Bespoke portfolio construction", "Global market access", "Family office services"],
  },
  {
    n: "03",
    title: "Institutional",
    href: "/institutional",
    text: "Treasury management, segregated mandates and custody solutions for corporates, provident funds and NGOs.",
    points: ["Segregated mandates", "Corporate treasury", "Fund platform onboarding"],
  },
];

const benefits = [
  { title: "Withdraw any business day", text: "No penalties on money market funds — access your money when you need it." },
  { title: "Returns accrue daily", text: "Your investment earns for every day it's invested, reflected in the published unit price." },
  { title: "Advice from people who know you", text: "A relationship manager helps match each fund to your goals and risk appetite." },
  { title: "Independent trustee oversight", text: "Fund assets are held by an independent trustee and custodian, separate from ACP." },
];

const goals = [
  { title: "Retirement", text: "Build income for the years after work." },
  { title: "Children's education", text: "Plan ahead for local or overseas study." },
  { title: "A new home", text: "Save toward a deposit with discipline." },
  { title: "Growing wealth", text: "Compound capital over the long term." },
];

const steps = [
  { title: "Choose a fund", text: "Compare objectives, risk levels and minimum investments." },
  { title: "Open an account", text: "Apply online with your NIC, proof of address and bank details." },
  { title: "Make your investment", text: "Transfer funds by bank transfer, CEFTS or standing order." },
  { title: "Track & manage", text: "Monitor performance, invest more or redeem from the investor portal." },
];

export default function HomePage() {
  const featured = funds.filter((f) => ["money-plus-fund", "income-fund", "equity-fund"].includes(f.slug));

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-paper pt-[112px] lg:pt-[148px]">
        <div className="wrap grid items-stretch gap-10 pb-0 lg:grid-cols-12">
          <div className="flex flex-col justify-center py-10 lg:col-span-6 lg:py-20">
            <Reveal>
              <SectionLabel>ACP Wealth Management</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-8 text-[50px] leading-[0.98] md:text-[86px]">
                Where wealth <em>meets opportunity.</em>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink/75">
                Regulated unit trusts, private wealth portfolios and institutional mandates — built on <strong className="font-normal text-ink">fifteen years of local research</strong> and
                connected to global capital through Colombo, Brisbane, Zurich and Singapore.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-wrap gap-3">
                <Btn href="/invest-online" variant="solid">Start investing</Btn>
                <Btn href="/funds">Explore our funds</Btn>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="relative lg:col-span-6">
            <div className="on-dark relative h-full min-h-[460px] overflow-hidden bg-ink text-snow">
              <div className="absolute inset-0 p-6 opacity-90">
                <HeroArt />
              </div>
              <div className="absolute bottom-0 left-0 right-0 m-5 bg-snow/95 p-5 text-ink backdrop-blur md:left-auto md:w-[330px]">
                <div className="flex items-center justify-between">
                  <p className="eyebrow text-ink/55">Unit prices · LKR</p>
                  <p className="text-[10px] text-ink/45">{fmtDate(PRICE_DATE)}</p>
                </div>
                <ul className="mt-3 divide-y divide-line text-sm">
                  {funds.slice(0, 4).map((f) => (
                    <li key={f.slug} className="flex justify-between py-2">
                      <Link href={`/funds/${f.slug}`} className="hover:text-forest">{f.shortName}</Link>
                      <span className="tnum">{fmtPrice(f.sell)}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/funds" className="mt-3 inline-block text-[10.5px] uppercase tracking-[0.12em] text-forest">All prices ↗</Link>
              </div>
            </div>
          </Reveal>
        </div>

        {/* stats band — navy, like ACP .stats */}
        <div className="wrap">
          <div className="on-dark grid grid-cols-2 gap-px bg-line-light text-snow md:grid-cols-4">
            {[
              { k: "Years of investing", v: <CountUp to={15} suffix="+" /> },
              { k: "Assets under management", v: <><span className="mr-1 text-base">USD</span><CountUp to={200} />MN</> },
              { k: "Investors served", v: <CountUp to={12000} suffix="+" /> },
              { k: "Investment hubs", v: <><CountUp to={4} /><span className="ml-2 text-base">Global</span></> },
            ].map((s) => (
              <div key={s.k} className="bg-ink px-6 py-8 md:px-8 md:py-10">
                <p className="eyebrow text-white/55">{s.k}</p>
                <p className="mt-3 font-serif text-4xl tracking-tight md:text-5xl">{s.v}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[11px] text-ink/45">Figures illustrative — confirm before publishing.</p>
        </div>
      </section>

      {/* 01 WHY ACP */}
      <section className="bg-paper py-24 md:py-32">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal><SectionLabel index="01">Why ACP</SectionLabel></Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-8 text-[40px] md:text-[56px]">Capital built around <em>conviction, structure</em> and long-term value.</h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-md leading-relaxed text-ink/70">
                We invest alongside our clients. Our approach combines local market depth with institutional governance and disciplined
                portfolio construction.
              </p>
              <div className="mt-8"><Btn href="/about" variant="ghost">Our story</Btn></div>
            </Reveal>
          </div>
          <RevealGroup className="grid gap-px bg-line sm:grid-cols-2 lg:col-span-7">
            {benefits.map((b, i) => (
              <RevealItem key={b.title} className="bg-snow p-8">
                <span className="eyebrow text-forest">0{i + 1}</span>
                <h3 className="mt-6 text-2xl">{b.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/65">{b.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 02 SOLUTIONS */}
      <section className="bg-paper-2 py-24 md:py-32">
        <div className="wrap">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <Reveal><SectionLabel index="02">Wealth Solutions</SectionLabel></Reveal>
              <Reveal delay={0.1}><h2 className="mt-8 max-w-3xl text-[40px] md:text-[56px]">A platform for <em>every kind of investor.</em></h2></Reveal>
            </div>
            <Reveal delay={0.2}><Btn href="/contact">Speak to an adviser</Btn></Reveal>
          </div>
          <RevealGroup className="mt-14 grid gap-px bg-line md:grid-cols-3">
            {segments.map((s) => (
              <RevealItem key={s.title} className="h-full">
                <Link href={s.href} className="group flex h-full flex-col bg-snow p-8 transition-colors duration-500 hover:bg-ink hover:text-snow md:p-10">
                  <div className="flex items-center justify-between">
                    <span className="eyebrow text-forest group-hover:text-cyan">{s.n}</span>
                    <span className="text-forest transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cyan">↗</span>
                  </div>
                  <h3 className="mt-16 text-[34px]">{s.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-ink/65 group-hover:text-white/70">{s.text}</p>
                  <ul className="mt-8 space-y-2 border-t border-line pt-6 text-sm group-hover:border-line-light">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-3"><span className="h-px w-4 bg-forest group-hover:bg-cyan" />{p}</li>
                    ))}
                  </ul>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 03 FUND PRICES */}
      <section className="bg-snow py-24 md:py-32">
        <div className="wrap">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Reveal><SectionLabel index="03">Fund Prices</SectionLabel></Reveal>
              <Reveal delay={0.1}><h2 className="mt-8 text-[40px] md:text-[56px]">Today's unit prices, <em>published daily.</em></h2></Reveal>
            </div>
            <Reveal delay={0.2} className="lg:col-span-5 lg:text-right">
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <Btn href="/performance" variant="ghost">Performance</Btn>
                <Btn href="/funds">Compare funds</Btn>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="mt-12"><FundPriceTable compact /></Reveal>
        </div>
      </section>

      {/* 04 NEW TO INVESTING */}
      <section className="on-dark relative overflow-hidden bg-ink py-24 text-snow md:py-32">
        <div aria-hidden className="absolute -left-40 bottom-[-300px] h-[700px] w-[700px] rounded-full border border-white/10" />
        <div className="wrap relative grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal><SectionLabel index="04" light>New to Investing?</SectionLabel></Reveal>
            <Reveal delay={0.1}><h2 className="mt-8 text-[40px] md:text-[56px]">Start with the goal, <em>not the product.</em></h2></Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-md leading-relaxed text-white/70">
                Tell us what you're working toward and how long you have. Our calculators and advisers help you build a plan you can stick to.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Btn href="/calculators" variant="light">Try the calculators</Btn>
                <Btn href="/contact" variant="outline-light">Book an appointment</Btn>
              </div>
            </Reveal>
          </div>
          <RevealGroup className="grid gap-px bg-line-light sm:grid-cols-2 lg:col-span-7">
            {goals.map((g, i) => (
              <RevealItem key={g.title} className="bg-ink-2 p-8">
                <span className="font-serif text-5xl text-cyan/70">0{i + 1}</span>
                <h3 className="mt-8 text-2xl">{g.title}</h3>
                <p className="mt-2 text-sm text-white/65">{g.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 05 FEATURED FUNDS */}
      <section className="bg-paper py-24 md:py-32">
        <div className="wrap">
          <Reveal><SectionLabel index="05">Featured Funds</SectionLabel></Reveal>
          <Reveal delay={0.1}><h2 className="mt-8 max-w-3xl text-[40px] md:text-[56px]">From daily liquidity <em>to long-term growth.</em></h2></Reveal>
          <RevealGroup className="mt-14 grid gap-px bg-line md:grid-cols-3">
            {featured.map((f) => (
              <RevealItem key={f.slug} className="h-full">
                <FundCardLite slug={f.slug} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 06 DIGITAL PLATFORM */}
      <section className="bg-paper-2 py-24 md:py-32">
        <div className="wrap grid items-center gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <PortalPreview />
          </Reveal>
          <div className="lg:col-span-6">
            <Reveal><SectionLabel index="06">Digital Investing</SectionLabel></Reveal>
            <Reveal delay={0.1}><h2 className="mt-8 text-[40px] md:text-[56px]">Your portfolio, <em>wherever you are.</em></h2></Reveal>
            <Reveal delay={0.2}>
              <ul className="mt-8 divide-y divide-line border-y border-line">
                {["Open an account online — no branch visit", "Invest, switch and redeem 24/7", "Set up a monthly investment plan", "Download statements and tax certificates"].map((x) => (
                  <li key={x} className="flex items-center gap-4 py-4"><span className="text-forest">↗</span>{x}</li>
                ))}
              </ul>
              <div className="mt-10 flex flex-wrap gap-3">
                <Btn href="/invest-online" variant="solid">Open an account</Btn>
                <Btn href="/login">Investor login</Btn>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 07 HOW TO INVEST */}
      <section className="bg-snow py-24 md:py-32">
        <div className="wrap">
          <Reveal><SectionLabel index="07">How to Invest</SectionLabel></Reveal>
          <Reveal delay={0.1}><h2 className="mt-8 max-w-3xl text-[40px] md:text-[56px]">Four steps to <em>your first investment.</em></h2></Reveal>
          <RevealGroup className="mt-14 grid gap-10 md:grid-cols-4">
            {steps.map((s, i) => (
              <RevealItem key={s.title} className="border-t border-ink pt-6">
                <span className="eyebrow text-forest">Step {String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-5 text-2xl">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/65">{s.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 08 INSIGHTS — navy, like ACP */}
      <section className="on-dark bg-ink py-24 text-snow md:py-32">
        <div className="wrap">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <Reveal><SectionLabel index="08" light>Insights</SectionLabel></Reveal>
              <Reveal delay={0.1}><h2 className="mt-8 max-w-3xl text-[40px] md:text-[56px]">Perspectives on markets, <em>money and planning.</em></h2></Reveal>
            </div>
            <Reveal delay={0.2}><Btn href="/insights" variant="outline-light">All insights</Btn></Reveal>
          </div>
          <RevealGroup className="mt-14 grid gap-px bg-line-light md:grid-cols-3">
            {insights.slice(0, 3).map((a, i) => (
              <RevealItem key={a.slug} className="h-full">
                <Link href={`/insights/${a.slug}`} className="group flex h-full flex-col justify-between bg-ink p-8 transition-colors hover:bg-ink-2">
                  <div>
                    <p className="eyebrow text-cyan">{i === 0 ? "Featured · " : ""}{a.category}</p>
                    <h3 className="mt-6 text-[26px] leading-snug">{a.title}</h3>
                    <p className="mt-4 text-sm text-white/60">{a.excerpt}</p>
                  </div>
                  <p className="mt-10 flex justify-between text-xs text-white/50">
                    <span>{fmtDate(a.date)} · {a.readMins} min read</span>
                    <span className="text-cyan transition-transform group-hover:translate-x-1">Read ↗</span>
                  </p>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 09 CONTACT */}
      <section id="appointment" className="bg-paper py-24 md:py-32">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal><SectionLabel index="09">Make an Appointment</SectionLabel></Reveal>
            <Reveal delay={0.1}><h2 className="mt-8 text-[40px] md:text-[52px]">Let's talk about <em>your goals.</em></h2></Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 space-y-6 text-sm">
                <div><p className="eyebrow text-ink/50">Visit</p><p className="mt-2">{site.address.join(", ")}</p></div>
                <div><p className="eyebrow text-ink/50">Call</p><p className="mt-2">{site.phone}</p></div>
                <div><p className="eyebrow text-ink/50">Email</p><p className="mt-2">{site.email}</p></div>
                <div><p className="eyebrow text-ink/50">Hours</p><p className="mt-2">{site.hours}</p></div>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-8"><ContactForm /></Reveal>
        </div>
      </section>
    </>
  );
}

/* ---------- local presentational helpers ---------- */

function FundCardLite({ slug }: { slug: string }) {
  const f = funds.find((x) => x.slug === slug)!;
  return <FundCard fund={f} />;
}

function PortalPreview() {
  const rows = [
    { n: "Money Plus Fund", v: "1,284,550.20", c: "+0.62%" },
    { n: "Income Fund", v: "842,113.75", c: "+0.81%" },
    { n: "Equity Fund", v: "516,904.10", c: "+2.14%" },
  ];
  return (
    <div className="relative">
      <div className="on-dark bg-ink p-6 text-snow md:p-8">
        <div className="flex items-center justify-between">
          <span className="eyebrow text-white/55">Portfolio value</span>
          <span className="eyebrow text-cyan">Live demo</span>
        </div>
        <p className="mt-3 font-serif text-5xl tracking-tight tnum"><span className="mr-2 font-sans text-base text-white/50">LKR</span>2,643,568</p>
        <p className="mt-1 text-sm text-cyan">+LKR 84,212 this year</p>
        <svg viewBox="0 0 400 110" className="mt-6 w-full" aria-hidden>
          <path d="M0 95 C40 90 60 80 90 82 S150 60 190 62 S260 40 300 35 S370 20 400 12" fill="none" stroke="#00aeef" strokeWidth="2" />
          <path d="M0 95 C40 90 60 80 90 82 S150 60 190 62 S260 40 300 35 S370 20 400 12 L400 110 L0 110Z" fill="rgba(0,174,239,0.12)" />
        </svg>
        <ul className="mt-6 divide-y divide-line-light border-t border-line-light text-sm">
          {rows.map((r) => (
            <li key={r.n} className="flex justify-between py-3"><span className="text-white/75">{r.n}</span><span className="tnum">{r.v} <span className="ml-2 text-cyan">{r.c}</span></span></li>
          ))}
        </ul>
      </div>
      <div className="absolute -bottom-6 -right-2 hidden w-56 border border-line bg-snow p-4 shadow-[0_20px_60px_-20px_rgba(4,31,63,0.35)] md:block">
        <p className="eyebrow text-ink/50">Monthly plan</p>
        <p className="mt-2 font-serif text-2xl">LKR 25,000</p>
        <p className="text-xs text-ink/55">Next debit · 05 Nov</p>
      </div>
    </div>
  );
}

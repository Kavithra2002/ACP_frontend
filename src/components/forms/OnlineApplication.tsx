"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { funds } from "@/data/funds";
import { cn, fmtMoney } from "@/lib/format";

const STEPS = ["Account type", "Personal details", "Investment", "Risk profile", "Documents", "Review"];

type Data = {
  accountType: string;
  title: string;
  fullName: string;
  nic: string;
  dob: string;
  email: string;
  phone: string;
  address: string;
  occupation: string;
  fund: string;
  amount: number;
  plan: string;
  answers: Record<string, number>;
  bank: string;
};

const RISK_QS = [
  { id: "horizon", q: "How long do you plan to stay invested?", opts: ["Under 1 year", "1–3 years", "3–5 years", "Over 5 years"] },
  { id: "reaction", q: "If your investment fell 15% in a year, you would…", opts: ["Sell everything", "Sell some", "Hold", "Invest more"] },
  { id: "goal", q: "Your main objective is…", opts: ["Protect capital", "Regular income", "Balanced growth", "Maximum growth"] },
];

const initial: Data = {
  accountType: "Individual",
  title: "Mr",
  fullName: "",
  nic: "",
  dob: "",
  email: "",
  phone: "",
  address: "",
  occupation: "",
  fund: funds[1].slug,
  amount: 100_000,
  plan: "One-time",
  answers: {},
  bank: "",
};

/** Six-step account opening wizard (UI only — no data leaves the browser). */
export function OnlineApplication() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [data, setData] = useState<Data>(initial);
  const [done, setDone] = useState(false);
  const [ref, setRef] = useState("");
  const set = <K extends keyof Data>(k: K, v: Data[K]) => setData((d) => ({ ...d, [k]: v }));

  const score = Object.values(data.answers).reduce((a, b) => a + b, 0);
  const profile = Object.keys(data.answers).length < RISK_QS.length ? null : score <= 3 ? "Conservative" : score <= 6 ? "Moderate" : "Growth";

  const go = (n: number) => {
    setDir(n > step ? 1 : -1);
    setStep(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const next = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < STEPS.length - 1) go(step + 1);
    else {
      setRef(`ACP-${Math.floor(100000 + Math.random() * 900000)}`);
      setDone(true);
    }
  };

  if (done) {
    return (
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="border border-line bg-snow p-10 md:p-16">
        <p className="eyebrow text-forest">Application submitted</p>
        <h2 className="mt-4 text-4xl md:text-5xl">Welcome to ACP, <em>{data.fullName.split(" ")[0] || "investor"}.</em></h2>
        <p className="mt-5 max-w-xl text-ink/70">
          Your reference is <span className="font-serif text-ink">{ref}</span>. Our client team will verify your documents and email
          your investor ID and payment instructions within two business days.
        </p>
        <button onClick={() => { setDone(false); setStep(0); setData(initial); }} className="mt-8 text-[11px] uppercase tracking-[0.12em] text-forest">Start a new application ↗</button>
      </motion.div>
    );
  }

  const fund = funds.find((f) => f.slug === data.fund)!;

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      {/* progress */}
      <ol className="lg:col-span-3">
        {STEPS.map((s, i) => (
          <li key={s}>
            <button
              type="button"
              onClick={() => i < step && go(i)}
              className={cn("flex w-full items-center gap-4 border-l-2 py-3 pl-5 text-left text-sm transition-colors", i === step ? "border-ink text-ink" : i < step ? "border-forest/40 text-forest" : "border-line text-ink/40")}
              disabled={i > step}
            >
              <span className="eyebrow tnum">{String(i + 1).padStart(2, "0")}</span>
              {s}
              {i < step && <span className="ml-auto pr-2">✓</span>}
            </button>
          </li>
        ))}
      </ol>

      <form onSubmit={next} className="border border-line bg-snow p-7 md:p-10 lg:col-span-9">
        <div className="h-1 w-full bg-ink/10">
          <motion.div className="h-1 bg-cyan" animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }} transition={{ duration: 0.5 }} />
        </div>
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            initial={{ opacity: 0, x: 30 * dir }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 * dir }}
            transition={{ duration: 0.35, ease: [0.22, 0.8, 0.22, 1] }}
            className="pt-10"
          >
            <p className="eyebrow text-forest">Step {step + 1} of {STEPS.length}</p>
            <h2 className="mt-3 text-3xl md:text-4xl">{STEPS[step]}</h2>

            {step === 0 && (
              <div className="mt-8 grid gap-px bg-line sm:grid-cols-2">
                {[
                  ["Individual", "A personal account in your name."],
                  ["Joint", "Shared between two or more holders."],
                  ["Minor (in trust)", "Invest on behalf of a child."],
                  ["Corporate", "For companies, trusts and societies."],
                ].map(([t, d]) => (
                  <label key={t} className="cursor-pointer bg-snow">
                    <input type="radio" name="acct" className="peer sr-only" checked={data.accountType === t} onChange={() => set("accountType", t)} />
                    <span className="block h-full p-6 transition-colors peer-checked:bg-ink peer-checked:text-snow">
                      <span className="font-serif text-xl">{t}</span>
                      <span className="mt-2 block text-sm opacity-70">{d}</span>
                    </span>
                  </label>
                ))}
              </div>
            )}

            {step === 1 && (
              <div className="mt-8 grid gap-5 md:grid-cols-6">
                <label className="md:col-span-1"><span className="eyebrow text-ink/60">Title</span>
                  <select className="field mt-2" value={data.title} onChange={(e) => set("title", e.target.value)}>{["Mr", "Mrs", "Ms", "Dr", "Rev"].map((t) => <option key={t}>{t}</option>)}</select>
                </label>
                <label className="md:col-span-5"><span className="eyebrow text-ink/60">Full name (as per NIC)</span>
                  <input required className="field mt-2" value={data.fullName} onChange={(e) => set("fullName", e.target.value)} autoComplete="name" />
                </label>
                <label className="md:col-span-3"><span className="eyebrow text-ink/60">NIC / Passport no.</span>
                  <input required className="field mt-2" value={data.nic} onChange={(e) => set("nic", e.target.value)} />
                </label>
                <label className="md:col-span-3"><span className="eyebrow text-ink/60">Date of birth</span>
                  <input required type="date" className="field mt-2" value={data.dob} onChange={(e) => set("dob", e.target.value)} />
                </label>
                <label className="md:col-span-3"><span className="eyebrow text-ink/60">Email</span>
                  <input required type="email" className="field mt-2" value={data.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" />
                </label>
                <label className="md:col-span-3"><span className="eyebrow text-ink/60">Mobile</span>
                  <input required type="tel" className="field mt-2" value={data.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+94" autoComplete="tel" />
                </label>
                <label className="md:col-span-4"><span className="eyebrow text-ink/60">Residential address</span>
                  <input required className="field mt-2" value={data.address} onChange={(e) => set("address", e.target.value)} autoComplete="street-address" />
                </label>
                <label className="md:col-span-2"><span className="eyebrow text-ink/60">Occupation</span>
                  <input className="field mt-2" value={data.occupation} onChange={(e) => set("occupation", e.target.value)} />
                </label>
              </div>
            )}

            {step === 2 && (
              <div className="mt-8 space-y-7">
                <label className="block"><span className="eyebrow text-ink/60">Select fund</span>
                  <select className="field mt-2" value={data.fund} onChange={(e) => set("fund", e.target.value)}>
                    {funds.map((f) => <option key={f.slug} value={f.slug}>{f.name} ({f.currency})</option>)}
                  </select>
                </label>
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="block"><span className="eyebrow text-ink/60">Amount ({fund.currency})</span>
                    <input required type="number" min={fund.minInitial} step={100} className="field mt-2 tnum" value={data.amount} onChange={(e) => set("amount", Number(e.target.value))} />
                    <span className="mt-2 block text-xs text-ink/50">Minimum initial investment {fmtMoney(fund.minInitial, fund.currency)}</span>
                  </label>
                  <div><span className="eyebrow text-ink/60">Investment plan</span>
                    <div className="mt-2 grid grid-cols-2 gap-px bg-line">
                      {["One-time", "Monthly plan"].map((p) => (
                        <label key={p} className="cursor-pointer bg-snow">
                          <input type="radio" className="peer sr-only" checked={data.plan === p} onChange={() => set("plan", p)} />
                          <span className="block px-4 py-[13px] text-center text-sm transition-colors peer-checked:bg-ink peer-checked:text-snow">{p}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="bg-paper-2 p-5 text-sm text-ink/70">
                  <span className="font-serif text-lg text-ink">{fund.name}</span> — {fund.tagline} Redemption {fund.redemption.toLowerCase()}; management fee {fund.managementFee}% p.a.
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="mt-8 space-y-8">
                {RISK_QS.map((q) => (
                  <fieldset key={q.id}>
                    <legend className="font-serif text-xl tracking-tight">{q.q}</legend>
                    <div className="mt-3 grid gap-px bg-line sm:grid-cols-4">
                      {q.opts.map((o, i) => (
                        <label key={o} className="cursor-pointer bg-snow">
                          <input required type="radio" name={q.id} className="peer sr-only" checked={data.answers[q.id] === i} onChange={() => set("answers", { ...data.answers, [q.id]: i })} />
                          <span className="block h-full px-4 py-3 text-sm transition-colors peer-checked:bg-ink peer-checked:text-snow">{o}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                ))}
                {profile && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-l-2 border-cyan pl-5 text-sm text-ink/70">
                    Indicative risk profile: <span className="font-serif text-lg text-ink">{profile}</span>. A relationship manager will confirm suitability before your first investment.
                  </motion.p>
                )}
              </div>
            )}

            {step === 4 && (
              <div className="mt-8 space-y-5">
                {["Copy of NIC / Passport (front & back)", "Proof of address (utility bill, last 3 months)", "Bank statement header or passbook copy"].map((d) => (
                  <label key={d} className="flex cursor-pointer flex-col gap-3 border border-dashed border-ink/25 p-5 transition-colors hover:border-ink sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-sm">{d}</span>
                    <span className="text-[11px] uppercase tracking-[0.12em] text-forest">Choose file ↗</span>
                    <input type="file" className="sr-only" accept="image/*,application/pdf" />
                  </label>
                ))}
                <label className="block"><span className="eyebrow text-ink/60">Bank for redemptions</span>
                  <select required className="field mt-2" value={data.bank} onChange={(e) => set("bank", e.target.value)}>
                    <option value="" disabled>Select bank</option>
                    {["Bank of Ceylon", "Commercial Bank", "DFCC Bank", "Hatton National Bank", "NDB Bank", "People's Bank", "Sampath Bank", "Seylan Bank", "Other"].map((b) => <option key={b}>{b}</option>)}
                  </select>
                </label>
              </div>
            )}

            {step === 5 && (
              <div className="mt-8">
                <dl className="divide-y divide-line border-y border-line text-sm">
                  {[
                    ["Account type", data.accountType],
                    ["Name", `${data.title}. ${data.fullName}`],
                    ["NIC / Passport", data.nic],
                    ["Email / Mobile", `${data.email} · ${data.phone}`],
                    ["Fund", fund.name],
                    ["Amount", `${fmtMoney(data.amount, fund.currency)} · ${data.plan}`],
                    ["Risk profile", profile ?? "—"],
                    ["Bank", data.bank],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-6 py-3">
                      <dt className="text-ink/55">{k}</dt>
                      <dd className="text-right">{v || "—"}</dd>
                    </div>
                  ))}
                </dl>
                <label className="mt-6 flex items-start gap-3 text-sm text-ink/70">
                  <input required type="checkbox" className="mt-1 accent-[#041f3f]" />
                  I confirm the information is accurate and I have read the explanatory memorandum, key investor information and terms & conditions.
                </label>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex items-center justify-between border-t border-line pt-6">
          <button type="button" onClick={() => go(step - 1)} disabled={step === 0} className="text-[11px] uppercase tracking-[0.12em] text-ink/70 disabled:opacity-30">
            ← Back
          </button>
          <button className="bg-ink px-8 py-4 text-[11px] uppercase tracking-[0.12em] text-snow transition-colors hover:bg-forest">
            {step === STEPS.length - 1 ? "Submit application ↗" : "Continue →"}
          </button>
        </div>
      </form>
    </div>
  );
}

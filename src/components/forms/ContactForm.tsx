"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const TOPICS = ["Book an appointment", "Personal investing", "Private wealth", "Institutional mandate", "Existing account support", "Media enquiry"];

/** Frontend-only enquiry form. Wire `onSubmit` to your API when the backend is ready. */
export function ContactForm({ defaultTopic }: { defaultTopic?: string }) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // TODO: POST to /api/enquiries
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 900);
  };

  return (
    <AnimatePresence mode="wait">
      {sent ? (
        <motion.div key="ok" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="border border-line bg-snow p-10">
          <p className="eyebrow text-forest">Received</p>
          <h3 className="mt-4 text-3xl">Thank you. <em>We'll be in touch.</em></h3>
          <p className="mt-4 text-sm text-ink/65">A member of our client team will respond within one business day.</p>
          <button onClick={() => setSent(false)} className="mt-8 text-[11px] uppercase tracking-[0.12em] text-forest">Send another enquiry ↗</button>
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={onSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-5 md:grid-cols-2">
          <label className="block">
            <span className="eyebrow text-ink/60">Full name</span>
            <input required name="name" className="field mt-2" autoComplete="name" />
          </label>
          <label className="block">
            <span className="eyebrow text-ink/60">Email</span>
            <input required type="email" name="email" className="field mt-2" autoComplete="email" />
          </label>
          <label className="block">
            <span className="eyebrow text-ink/60">Phone</span>
            <input required type="tel" name="phone" className="field mt-2" autoComplete="tel" placeholder="+94" />
          </label>
          <label className="block">
            <span className="eyebrow text-ink/60">I'm interested in</span>
            <select name="topic" defaultValue={defaultTopic ?? TOPICS[0]} className="field mt-2">
              {TOPICS.map((t) => <option key={t}>{t}</option>)}
            </select>
          </label>
          <label className="block md:col-span-2">
            <span className="eyebrow text-ink/60">Preferred contact time</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {["Morning", "Afternoon", "Evening"].map((t, i) => (
                <label key={t} className="cursor-pointer">
                  <input type="radio" name="time" value={t} defaultChecked={i === 0} className="peer sr-only" />
                  <span className="block border border-line px-5 py-2.5 text-sm transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-snow">{t}</span>
                </label>
              ))}
            </div>
          </label>
          <label className="block md:col-span-2">
            <span className="eyebrow text-ink/60">Message</span>
            <textarea name="message" rows={5} className="field mt-2 resize-y" />
          </label>
          <label className="flex items-start gap-3 text-sm text-ink/65 md:col-span-2">
            <input required type="checkbox" className="mt-1 accent-[#041f3f]" />
            I agree to ACP processing my details to respond to this enquiry, in line with the Privacy Policy.
          </label>
          <div className="md:col-span-2">
            <button disabled={loading} className="bg-ink px-8 py-4 text-[11px] uppercase tracking-[0.12em] text-snow transition-colors hover:bg-forest disabled:opacity-60">
              {loading ? "Sending…" : "Send enquiry ↗"}
            </button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const KEY = "acp_wm_notice_accepted_v1";

/**
 * Important-notice gate modelled on acp-am.com's access notice.
 * Remembered per browser via localStorage (wrapped in try/catch).
 */
export function AccessGate() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const accept = () => {
    try {
      localStorage.setItem(KEY, new Date().toISOString());
    } catch {
      /* storage unavailable — accept for this visit only */
    }
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-abyss/70 p-0 backdrop-blur-sm md:items-center md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="gate-title"
        >
          <motion.div
            className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden bg-snow"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 0.8, 0.22, 1] }}
          >
            <div className="on-dark relative overflow-hidden bg-ink px-7 py-9 text-snow md:px-10">
              <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10" />
              <p className="eyebrow text-white/60">ACP Wealth Management</p>
              <p className="eyebrow mt-6 text-cyan">01</p>
              <h2 id="gate-title" className="mt-2 text-4xl md:text-5xl">Important notice.</h2>
              <p className="mt-4 max-w-md text-sm text-white/75">Please review the following before continuing to the website.</p>
              <span className="mt-6 block h-px w-14 bg-cyan" />
            </div>
            <div className="overflow-y-auto px-7 py-8 text-sm leading-relaxed text-ink/75 md:px-10">
              <h3 className="text-2xl text-ink">Before you continue</h3>
              <p className="mt-3">
                Information on this website is provided for general reference only and does not constitute an offer, solicitation or
                recommendation to buy or sell any unit trust, security or financial product.
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5">
                <li>Investments carry risk. Unit prices and income may fall as well as rise, and you may get back less than you invest.</li>
                <li>Past performance is not indicative of future results. Returns are not guaranteed.</li>
                <li>Please read the explanatory memorandum and key investor information before investing.</li>
                <li>Seek independent financial, legal or tax advice where appropriate.</li>
              </ul>
            </div>
            <div className="flex flex-col gap-4 border-t border-line px-7 py-6 md:flex-row md:items-center md:justify-between md:px-10">
              <p className="text-xs text-ink/55">Your acknowledgement will be remembered on this browser.</p>
              <button
                onClick={accept}
                className="bg-ink px-7 py-4 text-[11px] uppercase tracking-[0.12em] text-snow transition-colors hover:bg-forest"
              >
                I Agree &amp; Enter Website ↗
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

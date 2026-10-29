"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/format";

export function Accordion({ items }: { items: { q: string; a: React.ReactNode }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="border-t border-ink">
      {items.map((it, i) => (
        <div key={it.q} className="border-b border-line">
          <button
            className="flex w-full items-center justify-between gap-6 py-6 text-left"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span className="font-serif text-xl tracking-tight md:text-2xl">{it.q}</span>
            <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center border border-line text-lg transition-transform duration-300", open === i && "rotate-45 border-ink")}>+</span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 0.8, 0.22, 1] }}
                className="overflow-hidden"
              >
                <div className="max-w-3xl pb-7 text-[15px] leading-relaxed text-ink/70">{it.a}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

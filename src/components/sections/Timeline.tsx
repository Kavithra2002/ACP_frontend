"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { timeline } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

/** Horizontal timeline whose progress line is scrubbed by scroll (GSAP). */
export function Timeline() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-progress]", { scaleX: 0 }, { scaleX: 1, ease: "none", transformOrigin: "left", scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 40%", scrub: true } });
      gsap.from("[data-item]", { opacity: 0, y: 30, stagger: 0.12, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 75%" } });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="relative">
      <div className="absolute left-0 right-0 top-[7px] hidden h-px bg-white/15 md:block" />
      <div data-progress className="absolute left-0 right-0 top-[7px] hidden h-px bg-cyan md:block" />
      <ol className="grid gap-10 md:grid-cols-6 md:gap-6">
        {timeline.map((t) => (
          <li key={t.year} data-item className="relative border-l border-white/20 pl-6 md:border-0 md:pl-0">
            <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 bg-cyan md:static md:block md:h-4 md:w-4 md:border-4 md:border-ink md:bg-cyan" />
            <p className="font-serif text-4xl text-cyan md:mt-8">{t.year}</p>
            <h3 className="mt-3 text-xl">{t.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/60">{t.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * GSAP scrub parallax for a decorative panel. Children render inside a layer
 * that drifts as the panel crosses the viewport.
 */
export function Parallax({ children, className, amount = 60 }: { children: React.ReactNode; className?: string; amount?: number }) {
  const wrap = useRef<HTMLDivElement>(null);
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrap.current || !layer.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        layer.current,
        { y: -amount },
        { y: amount, ease: "none", scrollTrigger: { trigger: wrap.current, start: "top bottom", end: "bottom top", scrub: true } },
      );
    });
    return () => ctx.revert();
  }, [amount]);

  return (
    <div ref={wrap} className={className} style={{ overflow: "hidden", position: "relative" }}>
      <div ref={layer} className="absolute -inset-y-[80px] inset-x-0">
        {children}
      </div>
    </div>
  );
}

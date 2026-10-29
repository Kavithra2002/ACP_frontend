"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Abstract hero illustration — concentric "capital flow" arcs and a rising line,
 * drawn in with a GSAP timeline. Replace with photography if preferred.
 */
export function HeroArt() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const strokes = svg.querySelectorAll<SVGGeometryElement>("[data-draw]");
      strokes.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(strokes, { strokeDashoffset: 0, duration: 2.2, stagger: 0.12 })
        .from(svg.querySelectorAll("[data-pop]"), { scale: 0, transformOrigin: "center", opacity: 0, duration: 0.6, stagger: 0.1 }, "-=1.2")
        .from(svg.querySelectorAll("[data-fade]"), { opacity: 0, y: 10, duration: 0.8, stagger: 0.1 }, "-=0.8");
      gsap.to(svg.querySelector("[data-orbit]"), { rotate: 360, transformOrigin: "300px 300px", duration: 90, repeat: -1, ease: "none" });
    }, svg);
    return () => ctx.revert();
  }, []);

  return (
    <svg ref={ref} viewBox="0 0 600 600" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="heroLine" x1="0" x2="1">
          <stop offset="0" stopColor="#6f9cc3" />
          <stop offset="1" stopColor="#00aeef" />
        </linearGradient>
        <radialGradient id="heroGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#00aeef" stopOpacity="0.25" />
          <stop offset="1" stopColor="#00aeef" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="300" cy="300" r="290" fill="url(#heroGlow)" />
      <g data-orbit>
        {[260, 210, 160, 110].map((r, i) => (
          <circle key={r} data-draw cx="300" cy="300" r={r} fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1" strokeDasharray={i % 2 ? "2 6" : undefined} />
        ))}
        <circle data-pop cx="300" cy="40" r="5" fill="#00aeef" />
        <circle data-pop cx="560" cy="300" r="4" fill="#6f9cc3" />
        <circle data-pop cx="90" cy="410" r="4" fill="#fbfcfd" />
      </g>
      {/* grid */}
      {Array.from({ length: 7 }, (_, i) => (
        <line key={i} x1={90 + i * 70} x2={90 + i * 70} y1="150" y2="450" stroke="rgba(255,255,255,0.06)" />
      ))}
      <path data-draw d="M80 430 C150 420 170 380 220 372 S300 340 330 300 S410 250 450 210 S510 170 530 150" fill="none" stroke="url(#heroLine)" strokeWidth="2.5" />
      <path data-draw d="M80 450 C170 440 220 420 280 405 S400 360 530 320" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" strokeDasharray="4 6" />
      <circle data-pop cx="530" cy="150" r="7" fill="#00aeef" />
      <circle data-pop cx="530" cy="150" r="16" fill="none" stroke="#00aeef" strokeOpacity="0.5" />
      <g data-fade fontFamily="Arial" fontSize="11" letterSpacing="1.5" fill="rgba(255,255,255,0.6)">
        <text x="80" y="480">COLOMBO</text>
        <text x="225" y="480">SINGAPORE</text>
        <text x="370" y="480">ZURICH</text>
        <text x="480" y="480">BRISBANE</text>
      </g>
    </svg>
  );
}

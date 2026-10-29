import Link from "next/link";
import { cn } from "@/lib/format";

/** "01   Who We Are" numbered section label, as used across acp-am.com */
export function SectionLabel({ index, children, light }: { index?: string; children: React.ReactNode; light?: boolean }) {
  return (
    <p className={cn("eyebrow flex items-center gap-4", light ? "text-white/70" : "text-ink/70")}>
      {index && <span className={light ? "text-cyan" : "text-forest"}>{index}</span>}
      <span className={cn("h-px w-10", light ? "bg-white/30" : "bg-ink/25")} />
      <span>{children}</span>
    </p>
  );
}

type BtnProps = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline" | "ghost" | "light" | "outline-light";
  className?: string;
  arrow?: boolean;
  external?: boolean;
};

/** Square-cornered, uppercase, tracked CTA with the ACP "↗" glyph. */
export function Btn({ href, children, variant = "outline", className, arrow = true, external }: BtnProps) {
  const styles = {
    solid: "bg-ink text-snow border-ink hover:bg-forest hover:border-forest",
    outline: "border-ink text-ink hover:bg-ink hover:text-snow",
    ghost: "border-transparent text-ink px-0 hover:text-forest",
    light: "bg-snow text-ink border-snow hover:bg-cyan hover:border-cyan",
    "outline-light": "border-white/60 text-snow hover:bg-snow hover:text-ink",
  }[variant];
  const cls = cn(
    "group inline-flex items-center gap-3 border px-6 py-3.5 text-[11px] uppercase tracking-[0.12em] transition-colors duration-300",
    styles,
    className,
  );
  const inner = (
    <>
      <span>{children}</span>
      {arrow && <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>}
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

export function RiskMeter({ level, light }: { level: number; light?: boolean }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Risk level ${level} of 7`}>
      {Array.from({ length: 7 }, (_, i) => (
        <span
          key={i}
          className={cn(
            "h-2.5 w-4",
            i < level ? (light ? "bg-cyan" : "bg-forest") : light ? "bg-white/15" : "bg-ink/10",
          )}
        />
      ))}
      <span className={cn("ml-2 text-xs tnum", light ? "text-white/70" : "text-ink/60")}>{level}/7</span>
    </div>
  );
}

export function Pct({ value, className }: { value: number; className?: string }) {
  return <span className={cn("tnum", value >= 0 ? "text-up" : "text-down", className)}>{value > 0 ? "+" : ""}{value.toFixed(1)}%</span>;
}

export function Disclaimer({ className, light }: { className?: string; light?: boolean }) {
  return (
    <p className={cn("text-xs leading-relaxed", light ? "text-white/55" : "text-ink/55", className)}>
      Illustrative data for design purposes only. Unit prices and returns shown are not actual figures. Past performance is not
      indicative of future results. The value of units and the income from them may fall as well as rise.
    </p>
  );
}

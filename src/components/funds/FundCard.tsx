import Link from "next/link";
import { CATEGORY_LABEL, type Fund } from "@/data/funds";
import { fmtPrice } from "@/lib/format";
import { Pct, RiskMeter } from "@/components/ui/primitives";

export function FundCard({ fund }: { fund: Fund }) {
  return (
    <Link
      href={`/funds/${fund.slug}`}
      className="group flex h-full flex-col justify-between bg-snow p-7 transition-colors duration-500 hover:bg-ink hover:text-snow"
    >
      <div>
        <div className="flex items-start justify-between gap-4">
          <p className="eyebrow text-forest transition-colors group-hover:text-cyan">{CATEGORY_LABEL[fund.category]} · {fund.currency}</p>
          <span className="text-forest transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan">↗</span>
        </div>
        <h3 className="mt-6 text-[28px]">{fund.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink/65 transition-colors group-hover:text-white/70">{fund.tagline}</p>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-6 transition-colors group-hover:border-line-light">
        <div>
          <p className="eyebrow text-ink/50 group-hover:text-white/50">Unit price</p>
          <p className="mt-2 font-serif text-2xl tnum">{fmtPrice(fund.sell)}</p>
        </div>
        <div>
          <p className="eyebrow text-ink/50 group-hover:text-white/50">1 Year</p>
          <p className="mt-2 font-serif text-2xl"><Pct value={fund.oneYear} className="group-hover:text-cyan" /></p>
        </div>
        <div className="col-span-2">
          <RiskMeter level={fund.risk} />
        </div>
      </div>
    </Link>
  );
}

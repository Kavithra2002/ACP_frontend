import Link from "next/link";
import { footerNav, legalNav, site } from "@/data/site";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="on-dark bg-abyss text-white/70">
      {/* closing banner — mirrors ACP's "Built with local insight" band */}
      <div className="border-b border-line-light">
        <div className="wrap grid gap-10 py-20 md:grid-cols-12 md:items-end md:py-28">
          <div className="md:col-span-8">
            <p className="eyebrow text-white/50">{site.hubs.join(" · ")}</p>
            <h2 className="mt-6 text-[40px] text-snow md:text-[64px]">
              Built with local insight. <em>Connected to global capital.</em>
            </h2>
          </div>
          <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
            <Link href="/contact" className="border border-white/60 px-6 py-3.5 text-[11px] uppercase tracking-[0.12em] text-snow transition-colors hover:bg-snow hover:text-ink">
              Speak to an adviser ↗
            </Link>
            <Link href="/invest-online" className="bg-cyan px-6 py-3.5 text-[11px] uppercase tracking-[0.12em] text-ink transition-colors hover:bg-snow">
              Invest online ↗
            </Link>
          </div>
        </div>
      </div>

      <div className="wrap grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo light />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/60">
            Regulated unit trusts, private wealth and institutional mandates — investing across Sri Lanka and frontier markets since 2010.
          </p>
          <div className="mt-8 flex gap-3">
            {["in", "f", "ig", "yt"].map((s) => (
              <a key={s} href="#" aria-label={`Social: ${s}`} className="flex h-9 w-9 items-center justify-center border border-line-light text-[11px] uppercase text-white/70 transition-colors hover:border-cyan hover:text-cyan">
                {s}
              </a>
            ))}
          </div>
        </div>
        {footerNav.map((col) => (
          <div key={col.title} className="md:col-span-2">
            <h4 className="eyebrow font-sans text-white/45">{col.title}</h4>
            <ul className="mt-5 space-y-3 text-sm">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-cyan">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="md:col-span-2">
          <h4 className="eyebrow font-sans text-white/45">Contact</h4>
          <address className="mt-5 space-y-3 text-sm not-italic">
            <p>{site.address[0]}<br />{site.address[1]}</p>
            <p><a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-cyan">{site.phone}</a></p>
            <p><a href={`mailto:${site.email}`} className="hover:text-cyan">{site.email}</a></p>
            <p className="text-white/45">{site.hours}</p>
          </address>
        </div>
      </div>

      <div className="border-t border-line-light">
        <div className="wrap flex flex-col gap-4 py-8 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
          <p>Copyright © {new Date().getFullYear()} ACP Asset Management. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNav.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-cyan">{l.label}</Link>
            ))}
          </div>
        </div>
        <div className="wrap pb-10">
          <p className="max-w-4xl text-[11px] leading-relaxed text-white/35">
            {site.regulatory} Investments in unit trusts are subject to market risk. Please read the explanatory memorandum and key investor
            information carefully before investing. Unit prices may go down as well as up and past performance is not a guide to the future.
          </p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { mainNav, site } from "@/data/site";
import { cn } from "@/lib/format";
import { Logo } from "./Logo";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(null);
    setMobile(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
  }, [mobile]);

  const isActive = (href: string, items?: { href: string }[]) =>
    pathname === href || (items?.some((i) => pathname.startsWith(i.href)) ?? false) || (href !== "/" && pathname.startsWith(href));

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background,box-shadow,border-color] duration-500",
        scrolled || open ? "border-b border-line bg-paper/95 backdrop-blur-md" : "border-b border-transparent bg-paper/0",
      )}
      onMouseLeave={() => setOpen(null)}
    >
      {/* utility bar */}
      <div className={cn("hidden border-b border-line transition-all duration-500 lg:block", scrolled ? "h-0 overflow-hidden border-transparent opacity-0" : "h-9 opacity-100")}>
        <div className="wrap flex h-9 items-center justify-between text-[10px] uppercase tracking-[0.14em] text-ink/60">
          <span>{site.hubs.join("  ·  ")}</span>
          <div className="flex items-center gap-6">
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-ink">{site.phone}</a>
            <Link href="/contact" className="hover:text-ink">Make an appointment</Link>
            <Link href="/faqs" className="hover:text-ink">Help</Link>
          </div>
        </div>
      </div>

      <div className="wrap flex h-[76px] items-center justify-between gap-6">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {mainNav.map((g) => (
            <div key={g.label} className="relative" onMouseEnter={() => setOpen(g.items ? g.label : null)}>
              <Link
                href={g.href}
                className={cn(
                  "relative flex items-center gap-1.5 py-7 text-[10.5px] uppercase tracking-[0.12em] text-ink transition-colors hover:text-forest",
                  isActive(g.href, g.items) && "text-forest",
                )}
                aria-expanded={g.items ? open === g.label : undefined}
                onFocus={() => setOpen(g.items ? g.label : null)}
              >
                {g.label}
                {g.items && <span className={cn("text-[8px] transition-transform", open === g.label && "rotate-180")}>▾</span>}
                {isActive(g.href, g.items) && <span className="absolute bottom-5 left-0 h-px w-full bg-forest" />}
              </Link>
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/login" className="px-3 py-3 text-[10.5px] uppercase tracking-[0.12em] text-ink hover:text-forest">
            Investor Login
          </Link>
          <Link
            href="/invest-online"
            className="border border-ink px-5 py-3 text-[10.5px] uppercase tracking-[0.12em] text-ink transition-colors hover:bg-ink hover:text-snow"
          >
            Invest Now ↗
          </Link>
        </div>

        <button
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
          onClick={() => setMobile((v) => !v)}
          aria-label={mobile ? "Close menu" : "Open menu"}
          aria-expanded={mobile}
        >
          <span className={cn("h-px w-6 bg-ink transition-transform", mobile && "translate-y-[3.5px] rotate-45")} />
          <span className={cn("h-px w-6 bg-ink transition-transform", mobile && "-translate-y-[3.5px] -rotate-45")} />
        </button>
      </div>

      {/* desktop mega dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            key={open}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 0.8, 0.22, 1] }}
            className="absolute inset-x-0 top-full hidden border-b border-line bg-paper lg:block"
          >
            <div className="wrap grid grid-cols-12 gap-8 py-10">
              <div className="col-span-4">
                <p className="eyebrow text-forest">{open}</p>
                <p className="mt-4 max-w-xs font-serif text-3xl leading-tight tracking-tight">
                  {open === "Wealth Solutions" && <>Solutions shaped around <em className="text-forest">who you are.</em></>}
                  {open === "Funds" && <>Regulated funds for <em className="text-forest">every horizon.</em></>}
                  {open === "Investor Centre" && <>Everything you need to <em className="text-forest">invest with ease.</em></>}
                </p>
              </div>
              <div className="col-span-8 grid grid-cols-2 gap-px bg-line">
                {mainNav
                  .find((g) => g.label === open)
                  ?.items?.map((i) => (
                    <Link key={i.href + i.label} href={i.href} className="group bg-paper p-6 transition-colors hover:bg-paper-2">
                      <span className="flex items-center justify-between font-serif text-xl tracking-tight">
                        {i.label}
                        <span className="text-sm text-forest opacity-0 transition-opacity group-hover:opacity-100">↗</span>
                      </span>
                      <span className="mt-2 block text-sm text-ink/60">{i.description}</span>
                    </Link>
                  ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* mobile drawer */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-x-0 bottom-0 top-[76px] overflow-y-auto bg-paper lg:hidden"
          >
            <div className="wrap pb-16 pt-6">
              {mainNav.map((g) => (
                <div key={g.label} className="border-b border-line py-5">
                  <Link href={g.href} className="font-serif text-3xl tracking-tight">{g.label}</Link>
                  {g.items && (
                    <div className="mt-3 flex flex-col gap-2">
                      {g.items.map((i) => (
                        <Link key={i.label} href={i.href} className="text-sm text-ink/70">{i.label}</Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-8 flex flex-col gap-3">
                <Link href="/invest-online" className="bg-ink px-6 py-4 text-center text-[11px] uppercase tracking-[0.12em] text-snow">Invest Now ↗</Link>
                <Link href="/login" className="border border-ink px-6 py-4 text-center text-[11px] uppercase tracking-[0.12em]">Investor Login</Link>
                <Link href="/contact" className="px-6 py-4 text-center text-[11px] uppercase tracking-[0.12em] text-ink/70">Contact Us</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

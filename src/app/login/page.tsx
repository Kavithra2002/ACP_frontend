import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/forms/LoginForm";
import { HeroArt } from "@/components/home/HeroArt";

export const metadata: Metadata = { title: "Investor Login", description: "Sign in to the ACP investor portal." };

export default function Page() {
  return (
    <section className="bg-paper pt-[112px] lg:pt-[148px]">
      <div className="wrap grid gap-px pb-20 lg:grid-cols-2">
        <div className="bg-snow p-8 md:p-14">
          <p className="eyebrow text-forest">Investor Portal</p>
          <h1 className="mt-6 text-[44px] md:text-[56px]">Welcome <em>back.</em></h1>
          <p className="mt-4 text-ink/65">Sign in to view your holdings, transact and download statements.</p>
          <div className="mt-10"><LoginForm /></div>
          <p className="mt-10 border-t border-line pt-6 text-sm text-ink/65">
            New to ACP? <Link href="/invest-online" className="text-forest">Open an account ↗</Link>
          </p>
        </div>
        <div className="on-dark relative hidden min-h-[560px] overflow-hidden bg-ink text-snow lg:block">
          <div className="absolute inset-0 p-10 opacity-80"><HeroArt /></div>
          <div className="absolute bottom-10 left-10 right-10">
            <p className="font-serif text-3xl leading-snug">Your portfolio, <em>wherever you are.</em></p>
            <p className="mt-3 text-sm text-white/60">Never share your password or one-time code. ACP will never ask for it by phone or email.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

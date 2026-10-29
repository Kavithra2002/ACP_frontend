"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

/** UI-only login. Replace the redirect with your auth call (e.g. NextAuth / custom API). */
export function LoginForm() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        // TODO: authenticate against the backend
        setTimeout(() => router.push("/portal"), 700);
      }}
    >
      <label className="block">
        <span className="eyebrow text-ink/60">Investor ID or email</span>
        <input required className="field mt-2" autoComplete="username" />
      </label>
      <label className="block">
        <span className="flex justify-between">
          <span className="eyebrow text-ink/60">Password</span>
          <button type="button" onClick={() => setShow((s) => !s)} className="eyebrow text-forest">{show ? "Hide" : "Show"}</button>
        </span>
        <input required type={show ? "text" : "password"} className="field mt-2" autoComplete="current-password" />
      </label>
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-ink/65"><input type="checkbox" className="accent-[#041f3f]" /> Remember me</label>
        <a href="#" className="text-forest">Forgot password?</a>
      </div>
      <button disabled={loading} className="w-full bg-ink px-8 py-4 text-[11px] uppercase tracking-[0.12em] text-snow transition-colors hover:bg-forest disabled:opacity-60">
        {loading ? "Signing in…" : "Sign in ↗"}
      </button>
      <p className="text-xs text-ink/50">Demo: any details will open the sample dashboard.</p>
    </form>
  );
}

export const fmtPrice = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 4, maximumFractionDigits: 4 });

export const fmtPct = (n: number, sign = true) => `${sign && n > 0 ? "+" : ""}${n.toFixed(1)}%`;

export const fmtMoney = (n: number, currency = "LKR", digits = 0) =>
  `${currency} ${n.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits })}`;

export const fmtCompact = (n: number) =>
  n >= 1_000_000_000 ? `${(n / 1_000_000_000).toFixed(1)}B` : n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` : n.toLocaleString("en-US");

export const fmtDate = (iso: string, opts: Intl.DateTimeFormatOptions = { day: "2-digit", month: "short", year: "numeric" }) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-GB", opts);

export const cn = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

/**
 * ILLUSTRATIVE SAMPLE DATA — not real prices or performance.
 * Replace with API data when the backend is connected.
 */

export type FundCategory = "money-market" | "fixed-income" | "equity" | "balanced" | "shariah";

export type Fund = {
  slug: string;
  name: string;
  shortName: string;
  category: FundCategory;
  currency: "LKR" | "USD";
  risk: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  tagline: string;
  objective: string;
  suitableFor: string[];
  buy: number;
  sell: number;
  ytd: number;
  oneYear: number;
  threeYear: number;
  sinceInception: number;
  aumMn: number;
  launch: string;
  minInitial: number;
  minAdditional: number;
  managementFee: number;
  entryFee: number;
  exitFee: string;
  redemption: string;
  allocation: { label: string; value: number }[];
  /** annualised drift + volatility used to draw the illustrative NAV line */
  drift: number;
  vol: number;
};

export const CATEGORY_LABEL: Record<FundCategory, string> = {
  "money-market": "Money Market",
  "fixed-income": "Fixed Income",
  equity: "Equity",
  balanced: "Balanced",
  shariah: "Shariah Compliant",
};

export const PRICE_DATE = "2026-10-28";

export const funds: Fund[] = [
  {
    slug: "money-market-fund",
    name: "ACP Money Market Fund",
    shortName: "Money Market",
    category: "money-market",
    currency: "LKR",
    risk: 1,
    tagline: "Daily liquidity with returns that accrue every day.",
    objective:
      "To provide investors with a high level of liquidity and a reasonable return by investing in short-term money market instruments with maturities under one year.",
    suitableFor: ["Emergency and short-term savings", "Corporate treasury surplus", "Investors parking funds between opportunities"],
    buy: 41.2876,
    sell: 41.2876,
    ytd: 6.8,
    oneYear: 8.1,
    threeYear: 11.4,
    sinceInception: 9.2,
    aumMn: 48250,
    launch: "2012-03-01",
    minInitial: 1000,
    minAdditional: 1000,
    managementFee: 0.6,
    entryFee: 0,
    exitFee: "Nil",
    redemption: "T+1 business day",
    allocation: [
      { label: "Commercial paper", value: 34 },
      { label: "Fixed deposits", value: 28 },
      { label: "Treasury bills (repo)", value: 26 },
      { label: "Cash & equivalents", value: 12 },
    ],
    drift: 0.081,
    vol: 0.004,
  },
  {
    slug: "money-plus-fund",
    name: "ACP Money Plus Fund",
    shortName: "Money Plus",
    category: "money-market",
    currency: "LKR",
    risk: 2,
    tagline: "Enhanced short-term returns, penalty-free withdrawals.",
    objective:
      "To deliver returns above traditional savings while preserving capital, through a diversified portfolio of short-dated deposits, commercial paper and government securities.",
    suitableFor: ["Goal-based savers", "Investors with 3–12 month horizons", "SMEs managing working capital"],
    buy: 45.1093,
    sell: 45.1093,
    ytd: 7.1,
    oneYear: 8.6,
    threeYear: 12.0,
    sinceInception: 9.8,
    aumMn: 36700,
    launch: "2014-08-15",
    minInitial: 1000,
    minAdditional: 1000,
    managementFee: 0.75,
    entryFee: 0,
    exitFee: "Nil",
    redemption: "T+1 business day",
    allocation: [
      { label: "Fixed deposits", value: 38 },
      { label: "Commercial paper", value: 30 },
      { label: "Government securities", value: 22 },
      { label: "Cash & equivalents", value: 10 },
    ],
    drift: 0.086,
    vol: 0.005,
  },
  {
    slug: "gilt-edged-fund",
    name: "ACP Gilt Edged Fund",
    shortName: "Gilt Edged",
    category: "fixed-income",
    currency: "LKR",
    risk: 2,
    tagline: "Invested only in Sri Lanka government securities.",
    objective:
      "To provide regular income with a high degree of capital security by investing exclusively in treasury bills, treasury bonds and repurchase agreements backed by government securities.",
    suitableFor: ["Conservative investors", "Retirees seeking regular income", "Institutions with a government-only mandate"],
    buy: 43.5521,
    sell: 43.5521,
    ytd: 2.6,
    oneYear: 6.9,
    threeYear: 14.1,
    sinceInception: 8.7,
    aumMn: 12900,
    launch: "2011-11-01",
    minInitial: 5000,
    minAdditional: 1000,
    managementFee: 0.5,
    entryFee: 0,
    exitFee: "Nil",
    redemption: "T+2 business days",
    allocation: [
      { label: "Treasury bonds", value: 52 },
      { label: "Treasury bills", value: 31 },
      { label: "Repo (govt. backed)", value: 15 },
      { label: "Cash", value: 2 },
    ],
    drift: 0.069,
    vol: 0.018,
  },
  {
    slug: "income-fund",
    name: "ACP Income Fund",
    shortName: "Income",
    category: "fixed-income",
    currency: "LKR",
    risk: 3,
    tagline: "Medium-term income from a diversified fixed income book.",
    objective:
      "To generate a stable income stream and moderate capital appreciation over the medium term through government securities, listed debentures and high-grade corporate debt.",
    suitableFor: ["1–3 year investment horizon", "Income-oriented investors", "Diversifying away from bank deposits"],
    buy: 37.4410,
    sell: 37.4410,
    ytd: 6.9,
    oneYear: 9.4,
    threeYear: 21.8,
    sinceInception: 10.3,
    aumMn: 18450,
    launch: "2010-10-01",
    minInitial: 5000,
    minAdditional: 1000,
    managementFee: 0.8,
    entryFee: 0,
    exitFee: "1% if redeemed within 90 days",
    redemption: "T+2 business days",
    allocation: [
      { label: "Government securities", value: 41 },
      { label: "Listed debentures", value: 27 },
      { label: "Corporate debt (A and above)", value: 22 },
      { label: "Deposits & cash", value: 10 },
    ],
    drift: 0.094,
    vol: 0.022,
  },
  {
    slug: "usd-bond-fund",
    name: "ACP USD Bond Fund",
    shortName: "USD Bond",
    category: "fixed-income",
    currency: "USD",
    risk: 3,
    tagline: "Dollar-denominated income for currency-aware investors.",
    objective:
      "To earn income in US dollars by investing in USD-denominated deposits and sovereign and quasi-sovereign bonds, helping investors hedge against currency depreciation.",
    suitableFor: ["Investors with USD needs (education, travel)", "Non-resident Sri Lankans", "Currency diversification"],
    buy: 11.8204,
    sell: 11.8204,
    ytd: 4.2,
    oneYear: 5.6,
    threeYear: 16.9,
    sinceInception: 5.1,
    aumMn: 4320,
    launch: "2019-06-01",
    minInitial: 1000,
    minAdditional: 100,
    managementFee: 0.9,
    entryFee: 0,
    exitFee: "Nil",
    redemption: "T+3 business days",
    allocation: [
      { label: "Sovereign USD bonds", value: 46 },
      { label: "USD deposits", value: 32 },
      { label: "Quasi-sovereign bonds", value: 17 },
      { label: "Cash", value: 5 },
    ],
    drift: 0.056,
    vol: 0.035,
  },
  {
    slug: "equity-fund",
    name: "ACP Equity Fund",
    shortName: "Equity",
    category: "equity",
    currency: "LKR",
    risk: 6,
    tagline: "Long-term growth from Sri Lanka's listed leaders.",
    objective:
      "To achieve long-term capital growth by investing in a concentrated portfolio of fundamentally strong companies listed on the Colombo Stock Exchange, using ACP's local research.",
    suitableFor: ["5+ year investment horizon", "Investors comfortable with volatility", "Building long-term wealth"],
    buy: 22.4100,
    sell: 22.9500,
    ytd: 14.6,
    oneYear: 21.3,
    threeYear: 58.2,
    sinceInception: 12.7,
    aumMn: 9870,
    launch: "2010-10-01",
    minInitial: 10000,
    minAdditional: 5000,
    managementFee: 1.5,
    entryFee: 1.5,
    exitFee: "Nil",
    redemption: "T+3 business days",
    allocation: [
      { label: "Banks & financials", value: 31 },
      { label: "Diversified holdings", value: 18 },
      { label: "Consumer & FMCG", value: 16 },
      { label: "Capital goods & industrials", value: 14 },
      { label: "Leisure & hospitality", value: 9 },
      { label: "Telecom & technology", value: 7 },
      { label: "Cash", value: 5 },
    ],
    drift: 0.18,
    vol: 0.2,
  },
  {
    slug: "balanced-fund",
    name: "ACP Balanced Fund",
    shortName: "Balanced",
    category: "balanced",
    currency: "LKR",
    risk: 4,
    tagline: "Growth and income in one diversified portfolio.",
    objective:
      "To provide a balance of capital growth and income by allocating between listed equities and fixed income, adjusted actively through the market cycle.",
    suitableFor: ["3–5 year investment horizon", "First-time equity investors", "One-fund diversified solution"],
    buy: 118.2200,
    sell: 120.6100,
    ytd: 9.4,
    oneYear: 14.8,
    threeYear: 36.5,
    sinceInception: 11.1,
    aumMn: 7340,
    launch: "2013-04-01",
    minInitial: 10000,
    minAdditional: 5000,
    managementFee: 1.25,
    entryFee: 1.0,
    exitFee: "Nil",
    redemption: "T+3 business days",
    allocation: [
      { label: "Listed equities", value: 48 },
      { label: "Government securities", value: 30 },
      { label: "Corporate debt", value: 14 },
      { label: "Cash & deposits", value: 8 },
    ],
    drift: 0.13,
    vol: 0.11,
  },
  {
    slug: "shariah-income-fund",
    name: "ACP Shariah Income Fund",
    shortName: "Shariah Income",
    category: "shariah",
    currency: "LKR",
    risk: 2,
    tagline: "Shariah-compliant income, screened by an independent board.",
    objective:
      "To provide Shariah-compliant returns and liquidity through Mudharabah, Wakala and Sukuk instruments, supervised by an independent Shariah Supervisory Board.",
    suitableFor: ["Investors requiring Shariah compliance", "Short to medium-term savings", "Ethical investment mandates"],
    buy: 28.1022,
    sell: 28.1022,
    ytd: 5.9,
    oneYear: 7.4,
    threeYear: 10.9,
    sinceInception: 8.3,
    aumMn: 3980,
    launch: "2016-02-01",
    minInitial: 1000,
    minAdditional: 1000,
    managementFee: 0.75,
    entryFee: 0,
    exitFee: "Nil",
    redemption: "T+2 business days",
    allocation: [
      { label: "Mudharabah deposits", value: 44 },
      { label: "Wakala placements", value: 31 },
      { label: "Sukuk", value: 18 },
      { label: "Cash", value: 7 },
    ],
    drift: 0.074,
    vol: 0.006,
  },
];

export function getFund(slug: string) {
  return funds.find((f) => f.slug === slug);
}

/** Deterministic pseudo-random generator so server and client render the same chart. */
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type NavPoint = { date: string; value: number };

/** Illustrative monthly NAV series ending at the fund's current price. */
export function navHistory(fund: Fund, months = 36): NavPoint[] {
  const seed = [...fund.slug].reduce((a, c) => a + c.charCodeAt(0), 0);
  const rand = mulberry32(seed);
  const monthlyDrift = fund.drift / 12;
  const monthlyVol = fund.vol / Math.sqrt(12);
  const steps: number[] = [];
  for (let i = 0; i < months; i++) {
    const shock = (rand() + rand() + rand() - 1.5) * 2; // ~normal
    steps.push(monthlyDrift + monthlyVol * shock);
  }
  // walk backwards from today's price
  const values: number[] = [fund.sell];
  for (let i = months - 1; i >= 0; i--) {
    values.unshift(values[0] / (1 + steps[i]));
  }
  const end = new Date(PRICE_DATE);
  return values.map((value, i) => {
    const d = new Date(end);
    d.setMonth(end.getMonth() - (months - i));
    return { date: d.toISOString().slice(0, 10), value: Number(value.toFixed(4)) };
  });
}

export const offshoreProducts = [
  {
    name: "Sri Lanka Opportunity Fund",
    note: "UCITS vehicle for professional and institutional investors",
    href: "https://www.srilanka-fund.com/",
  },
  {
    name: "Sri Lanka Investment Certificate",
    note: "European structured access for professional investors",
    href: "https://www.srilanka-fund.com/",
  },
  {
    name: "ACP Corum",
    note: "Australian regulated asset management",
    href: "https://acp-corum.com.au/home/",
  },
];

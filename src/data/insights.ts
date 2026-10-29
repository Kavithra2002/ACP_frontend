/** Sample editorial content — replace with CMS data. */
export type Insight = {
  slug: string;
  title: string;
  category: "Investor Education" | "Market Perspective" | "Firm News" | "Planning";
  date: string;
  readMins: number;
  excerpt: string;
  body: { heading?: string; text: string }[];
};

export const insights: Insight[] = [
  {
    slug: "what-is-a-unit-trust",
    title: "What is a unit trust, and how does it actually work?",
    category: "Investor Education",
    date: "2026-10-14",
    readMins: 5,
    excerpt: "Pooled investing explained: units, NAV, buy and sell prices, and why diversification matters.",
    body: [
      { text: "A unit trust pools money from many investors and places it with a professional fund manager, who invests it according to a published objective. Each investor owns units, and every unit represents an equal share of the fund's assets." },
      { heading: "Net asset value", text: "The fund's net asset value (NAV) is the market value of everything it holds, less its liabilities. Dividing the NAV by the number of units in issue gives the unit price, which is calculated and published every business day." },
      { heading: "Buy and sell prices", text: "When you invest, you buy units at the buying price. When you redeem, you sell them back at the selling price. For many money market and fixed income funds these are the same; equity and balanced funds may include a small entry charge." },
      { heading: "Why pool your money?", text: "Pooling gives individual investors access to instruments, diversification and research that would be difficult to achieve alone, along with daily liquidity and independent trustee oversight." },
    ],
  },
  {
    slug: "money-market-vs-fixed-deposit",
    title: "Money market funds versus fixed deposits",
    category: "Investor Education",
    date: "2026-09-30",
    readMins: 4,
    excerpt: "Liquidity, daily accrual and flexibility — how the two compare for short-term savings.",
    body: [
      { text: "Both are popular homes for short-term cash, but they behave differently. A fixed deposit locks money away for a set term, while a money market fund lets you redeem on any business day without a penalty." },
      { heading: "Returns that accrue daily", text: "Money market fund returns accrue every day and are reflected in the unit price, so you earn for every day you are invested — even if you withdraw before a month end." },
      { heading: "Diversification", text: "A money market fund spreads its holdings across many issuers and instruments rather than concentrating exposure with a single institution." },
      { heading: "Things to consider", text: "Returns from a fund are not guaranteed and will move with interest rates. Review the fund's factsheet and risk profile before investing." },
    ],
  },
  {
    slug: "rupee-cost-averaging",
    title: "Rupee-cost averaging: investing a little, regularly",
    category: "Planning",
    date: "2026-09-12",
    readMins: 3,
    excerpt: "Why a monthly investment plan can smooth out market timing and build discipline.",
    body: [
      { text: "Rupee-cost averaging means investing a fixed amount at regular intervals regardless of market levels. When prices are lower, the same amount buys more units; when they are higher, it buys fewer." },
      { heading: "Removing the timing question", text: "Few investors can consistently pick market lows. A regular plan removes that decision and keeps you invested through the cycle." },
      { heading: "Getting started", text: "Use our monthly savings calculator to see how a standing instruction could grow over your chosen horizon." },
    ],
  },
  {
    slug: "frontier-markets-perspective",
    title: "Why local insight matters in frontier markets",
    category: "Market Perspective",
    date: "2026-08-21",
    readMins: 6,
    excerpt: "Information gaps create opportunity — and risk. How on-the-ground research shapes our portfolios.",
    body: [
      { text: "Frontier markets are often under-researched by global institutions. That can leave quality businesses mispriced, but it also means investors need deep local knowledge to separate opportunity from risk." },
      { heading: "Research on the ground", text: "Our Colombo-based team meets management, reviews operations and builds independent models rather than relying on consensus estimates." },
      { heading: "Governance first", text: "We place heavy weight on governance, disclosure and alignment with minority shareholders before considering valuation." },
    ],
  },
  {
    slug: "planning-for-education",
    title: "Planning for your child's education",
    category: "Planning",
    date: "2026-07-30",
    readMins: 4,
    excerpt: "A step-by-step approach to estimating future costs and building a dedicated investment pot.",
    body: [
      { text: "Education costs tend to rise faster than general inflation, especially for overseas study. Starting early gives compounding more time to work." },
      { heading: "Estimate the target", text: "Begin with today's cost, apply an education inflation assumption and work out the future value at the year you'll need it." },
      { heading: "Match the horizon", text: "Longer horizons can tolerate more growth assets; as the date approaches, shifting toward income and money market funds reduces risk." },
    ],
  },
  {
    slug: "acp-wealth-digital-platform",
    title: "Introducing the ACP Wealth digital investor platform",
    category: "Firm News",
    date: "2026-07-02",
    readMins: 2,
    excerpt: "Open an account, invest, redeem and download statements — online, at any time.",
    body: [
      { text: "Our new investor platform brings account opening, transactions and reporting together in one secure place." },
      { heading: "What you can do", text: "Track holdings and performance, place subscriptions and redemptions, set up regular investment plans and download statements and tax certificates." },
    ],
  },
];

export function getInsight(slug: string) {
  return insights.find((i) => i.slug === slug);
}

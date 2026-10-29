import type { Metadata } from "next";
import { SegmentPage } from "@/components/sections/SegmentPage";

export const metadata: Metadata = { title: "Private Wealth", description: "Discretionary portfolio management and family office services for high net worth clients." };

export default function Page() {
  return (
    <SegmentPage
      c={{
        label: "Private Wealth",
        title: <>Wealth managed <em>with conviction.</em></>,
        intro: "Bespoke discretionary and advisory portfolios for individuals, families and family offices — combining local insight with access to international markets.",
        primaryCta: { label: "Request a consultation", href: "/contact" },
        overviewTitle: <>A dedicated team, <em>a portfolio built for you.</em></>,
        overviewText: "Your relationship manager works with our investment team to design, manage and report on a portfolio aligned with your objectives, liquidity needs and legacy plans.",
        features: [
          { title: "Discretionary management", text: "We manage your portfolio day-to-day within an agreed investment mandate." },
          { title: "Advisory service", text: "Retain final say on every decision, informed by our research and recommendations." },
          { title: "Global access", text: "Execution across 50+ markets, international custody and global fund platforms." },
          { title: "Consolidated reporting", text: "Clear monthly statements and quarterly reviews across all your holdings." },
        ],
        servicesTitle: <>Services for <em>families and principals.</em></>,
        services: [
          { title: "Portfolio Management", text: "Multi-asset portfolios across listed equity, fixed income and alternatives.", points: ["Segregated accounts", "LKR and USD strategies", "Risk-based asset allocation"] },
          { title: "Family Office", text: "Support for multi-generational wealth, governance and private investments.", points: ["Co-investment opportunities", "Private & strategic capital", "Succession planning support"] },
          { title: "Offshore Solutions", text: "Regulated international routes for diversification and currency protection.", points: ["UCITS fund access", "Structured certificates", "Global wealth partners"] },
        ],
        processTitle: <>A disciplined process, <em>reviewed together.</em></>,
        process: [
          { title: "Discover", text: "Understand your goals, constraints, tax position and risk tolerance." },
          { title: "Design", text: "Agree an investment policy statement and target allocation." },
          { title: "Implement", text: "Build the portfolio with careful attention to cost and liquidity." },
          { title: "Review", text: "Quarterly reviews and rebalancing as markets and life evolve." },
        ],
        faqs: [
          { q: "What is the minimum for private wealth services?", a: "Private wealth portfolios typically start from LKR 25 million or USD equivalent. Please speak to our team about your situation." },
          { q: "Can I hold assets in USD?", a: "Yes. We offer USD-denominated strategies and access to international custody for currency diversification." },
          { q: "How are fees structured?", a: "Fees are agreed per mandate, usually as a percentage of assets under management. Performance fees may apply to selected strategies." },
          { q: "Who holds my assets?", a: "Assets are held by an independent custodian in your name, separate from ACP's own balance sheet." },
        ],
        contactTopic: "Private wealth",
      }}
    />
  );
}

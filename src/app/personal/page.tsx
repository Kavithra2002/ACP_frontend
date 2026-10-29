import type { Metadata } from "next";
import { SegmentPage } from "@/components/sections/SegmentPage";

export const metadata: Metadata = { title: "Personal Investors", description: "Unit trusts, savings plans and goal-based investing for individuals and families." };

export default function Page() {
  return (
    <SegmentPage
      c={{
        label: "Personal Investors",
        title: <>Grow your savings <em>with purpose.</em></>,
        intro: "Professionally managed unit trusts for every stage of life — from building an emergency fund to planning retirement. Start from LKR 1,000.",
        primaryCta: { label: "Open an account", href: "/invest-online" },
        overviewTitle: <>Investing made <em>simple and flexible.</em></>,
        overviewText: "Whether you're saving for a goal or putting idle cash to work, our funds give you diversification, daily pricing and professional management without the complexity.",
        features: [
          { title: "Low minimums", text: "Begin with as little as LKR 1,000 and add to your investment at any time." },
          { title: "No lock-in", text: "Redeem money market and income funds on any business day without penalty." },
          { title: "Monthly plans", text: "Automate saving with a standing order and benefit from rupee-cost averaging." },
          { title: "Invest for a child", text: "Open an account in trust for a minor to build an education fund." },
        ],
        servicesTitle: <>Popular choices for <em>personal investors.</em></>,
        fundSlugs: ["money-plus-fund", "income-fund", "balanced-fund"],
        processTitle: <>From first conversation <em>to first investment.</em></>,
        process: [
          { title: "Define your goal", text: "Use our calculators or speak with an adviser to set a target and horizon." },
          { title: "Choose a fund", text: "Match a fund to your goal and comfort with risk." },
          { title: "Apply online", text: "Upload your NIC and proof of address — no branch visit needed." },
          { title: "Track progress", text: "Monitor returns and top up from the investor portal." },
        ],
        faqs: [
          { q: "How much do I need to start?", a: "Most of our funds accept an initial investment from LKR 1,000. Equity and balanced funds start from LKR 10,000." },
          { q: "How quickly can I access my money?", a: "Money market fund redemptions are typically paid the next business day. Other funds settle within two to three business days." },
          { q: "Are returns guaranteed?", a: "No. Unit trust returns depend on the performance of the underlying investments and can go up or down." },
          { q: "Can I invest every month?", a: "Yes. You can set up a monthly investment plan through a bank standing order or direct debit." },
        ],
        contactTopic: "Personal investing",
      }}
    />
  );
}

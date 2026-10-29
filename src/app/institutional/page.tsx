import type { Metadata } from "next";
import { SegmentPage } from "@/components/sections/SegmentPage";

export const metadata: Metadata = { title: "Institutional", description: "Treasury management, segregated mandates and fund access for corporates and institutions." };

export default function Page() {
  return (
    <SegmentPage
      c={{
        label: "Institutional",
        title: <>Institutional capital, <em>managed with discipline.</em></>,
        intro: "Treasury solutions, segregated mandates and regulated fund access for corporates, provident and pension funds, insurers, NGOs and distribution partners.",
        primaryCta: { label: "Institutional enquiries", href: "/contact" },
        overviewTitle: <>Governance and transparency <em>at every step.</em></>,
        overviewText: "We work with boards, investment committees and treasury teams to meet return objectives within clearly defined risk, liquidity and regulatory constraints.",
        features: [
          { title: "Corporate treasury", text: "Earn on operating cash with next-day liquidity through money market funds." },
          { title: "Segregated mandates", text: "Tailored fixed income or equity portfolios managed to your guidelines." },
          { title: "Due diligence ready", text: "Factsheets, governance documentation and regulatory information on request." },
          { title: "Dedicated coverage", text: "A named investor relations contact and regular investment committee reporting." },
        ],
        servicesTitle: <>Solutions for <em>institutional investors.</em></>,
        services: [
          { title: "Liquidity Management", text: "Short-term instruments to optimise working capital returns.", points: ["Money market funds", "Treasury bill portfolios", "Same-day dealing cut-offs"] },
          { title: "Investment Mandates", text: "Customised portfolios against agreed benchmarks.", points: ["Fixed income mandates", "Listed equity mandates", "Shariah-compliant options"] },
          { title: "Investment Solutions", text: "Partner infrastructure for institutions and family offices.", points: ["Custody & clearing", "Multi-asset execution", "Structured financing partners"] },
        ],
        processTitle: <>Onboarding <em>built for institutions.</em></>,
        process: [
          { title: "Mandate scoping", text: "Agree objectives, benchmarks, constraints and reporting needs." },
          { title: "Due diligence", text: "We provide governance, compliance and operational documentation." },
          { title: "Onboarding", text: "KYC, board resolutions and account set-up with the custodian." },
          { title: "Reporting", text: "Monthly performance and compliance reporting with quarterly reviews." },
        ],
        faqs: [
          { q: "Which institutions do you work with?", a: "Corporates, provident and gratuity funds, insurers, NGOs, foundations and distribution partners such as private banks and platforms." },
          { q: "What documents are needed to onboard?", a: "Typically the certificate of incorporation, board resolution, authorised signatory list and KYC documents for directors and beneficial owners." },
          { q: "Can you report to our investment committee?", a: "Yes. We provide tailored reporting packs and can attend committee meetings on request." },
        ],
        contactTopic: "Institutional mandate",
      }}
    />
  );
}

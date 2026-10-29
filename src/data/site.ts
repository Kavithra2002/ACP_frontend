export const site = {
  name: "ACP Wealth Management",
  short: "ACP Wealth",
  tagline: "Where opportunity meets capital.",
  phone: "+94 11 717 3938",
  email: "info@acp-am.com",
  address: ["Level 3, 100/1 Elvitigala Mawatha", "Colombo 08, Sri Lanka"],
  hours: "Monday – Friday, 8.30 am – 5.00 pm",
  hubs: ["Colombo", "Brisbane", "Zurich", "Singapore"],
  regulatory:
    "Regulatory disclosure placeholder — licensing statement and licence numbers to be confirmed by ACP compliance before launch.",
};

export type NavItem = { label: string; href: string; description?: string };
export type NavGroup = { label: string; href: string; items?: NavItem[] };

export const mainNav: NavGroup[] = [
  {
    label: "Wealth Solutions",
    href: "/personal",
    items: [
      { label: "Personal Investors", href: "/personal", description: "Unit trusts and savings for individuals and families" },
      { label: "Private Wealth", href: "/private-wealth", description: "Discretionary portfolios for high net worth clients" },
      { label: "Institutional", href: "/institutional", description: "Treasury, mandates and custody for organisations" },
    ],
  },
  {
    label: "Funds",
    href: "/funds",
    items: [
      { label: "All Funds", href: "/funds", description: "Compare every ACP fund and its latest unit prices" },
      { label: "Fund Performance", href: "/performance", description: "Returns across periods and fund categories" },
      { label: "Investment Calculators", href: "/calculators", description: "Project growth, plan goals and monthly saving" },
    ],
  },
  {
    label: "Investor Centre",
    href: "/resources",
    items: [
      { label: "Invest Online", href: "/invest-online", description: "Open an account in a few guided steps" },
      { label: "Forms & Downloads", href: "/resources", description: "Applications, factsheets and reports" },
      { label: "Unit Trust Taxation", href: "/taxation", description: "How your investment returns are taxed" },
      { label: "FAQs", href: "/faqs", description: "Answers to common investor questions" },
    ],
  },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
];

export const footerNav = [
  {
    title: "Wealth Solutions",
    links: [
      { label: "Personal Investors", href: "/personal" },
      { label: "Private Wealth", href: "/private-wealth" },
      { label: "Institutional", href: "/institutional" },
      { label: "Invest Online", href: "/invest-online" },
    ],
  },
  {
    title: "Funds",
    links: [
      { label: "All Funds", href: "/funds" },
      { label: "Performance", href: "/performance" },
      { label: "Calculators", href: "/calculators" },
      { label: "Unit Trust Taxation", href: "/taxation" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About ACP", href: "/about" },
      { label: "Insights", href: "/insights" },
      { label: "Forms & Downloads", href: "/resources" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const legalNav = [
  { label: "Terms of Use", href: "/legal/terms" },
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Disclaimer", href: "/legal/disclaimer" },
  { label: "Complaints", href: "/legal/complaints" },
];

export const leadership = [
  { name: "Sharad Sri", role: "Co-Founder & Chief Executive Officer" },
  { name: "Asanth Sebastian", role: "Co-Founder & Chief Investment Officer" },
  { name: "Charles Blake", role: "Executive Director, ACP Corum" },
  { name: "Arun Mitra", role: "Managing Director, Technology Investments" },
  { name: "Savanth Sebastian", role: "Director, Family Office" },
  { name: "Stefan Bucher", role: "Chairman & Managing Partner, CORUM Vermögensverwaltung AG" },
];

export const timeline = [
  { year: "2010", title: "Founded", text: "Established with a frontier and emerging Asia focus. Sri Lankan operations begin, with offices in Colombo and Sydney." },
  { year: "2015", title: "First Singapore fund", text: "First fund launched in Singapore, extending regional investment connectivity." },
  { year: "2018", title: "ACP Corum", text: "Partnership with Corum AG, Zurich, building an AFSL-licensed Australian asset management platform." },
  { year: "2021", title: "Sri Lanka AMC", text: "Actively managed certificate launched for offshore investors seeking Sri Lankan exposure." },
  { year: "2024", title: "Strategic capital", text: "Long-term strategic investment in Ambeon Capital PLC as part of a consortium." },
  { year: "2026", title: "Sri Lanka Opportunity Fund", text: "Launch of a regulated European UCITS vehicle dedicated to Sri Lanka." },
];

export const values = [
  { title: "Integrity", text: "We act in our clients' interests first and invest alongside them." },
  { title: "Transparency", text: "Clear pricing, published unit prices and plain-language reporting." },
  { title: "Responsibility", text: "Disciplined risk management and strong governance across every fund." },
  { title: "Long Term Development", text: "Patient capital that builds wealth through the cycle." },
];

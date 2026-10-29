import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AccessGate } from "@/components/layout/AccessGate";

export const metadata: Metadata = {
  metadataBase: new URL("https://wealth.acp-am.com"),
  title: {
    default: "ACP Wealth Management | Where Wealth Meets Opportunity",
    template: "%s | ACP Wealth Management",
  },
  description:
    "Regulated unit trusts, private wealth and institutional investment solutions from ACP Asset Management — investing across Sri Lanka and frontier markets since 2010.",
  applicationName: "ACP Wealth Management",
  openGraph: { type: "website", siteName: "ACP Wealth Management", locale: "en_US" },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: "#041f3f",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-ink focus:px-4 focus:py-2 focus:text-snow">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <AccessGate />
      </body>
    </html>
  );
}

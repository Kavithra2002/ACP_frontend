import type { Metadata } from "next";
import { PortalDashboard } from "@/components/portal/PortalDashboard";

export const metadata: Metadata = { title: "My Portfolio", robots: { index: false } };

export default function Page() {
  return <PortalDashboard />;
}

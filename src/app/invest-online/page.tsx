import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { OnlineApplication } from "@/components/forms/OnlineApplication";

export const metadata: Metadata = { title: "Invest Online", description: "Open an ACP investment account online in six guided steps." };

export default function Page() {
  return (
    <>
      <PageHero
        label="Online Application"
        title={<>Open your account <em>in minutes.</em></>}
        intro="Have your NIC or passport, a recent proof of address and your bank details ready. It takes about ten minutes."
      />
      <section className="bg-paper-2 py-16 md:py-24">
        <div className="wrap">
          <OnlineApplication />
        </div>
      </section>
    </>
  );
}

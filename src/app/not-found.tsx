import { Btn, SectionLabel } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <section className="bg-paper">
      <div className="wrap flex min-h-[80vh] flex-col justify-center pt-32">
        <SectionLabel index="404">Page not found</SectionLabel>
        <h1 className="mt-8 max-w-3xl text-[48px] md:text-[80px]">This page has <em>moved on.</em></h1>
        <p className="mt-6 max-w-lg text-ink/70">The page you're looking for doesn't exist or may have been relocated.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Btn href="/" variant="solid">Back to home</Btn>
          <Btn href="/funds">View funds</Btn>
        </div>
      </div>
    </section>
  );
}

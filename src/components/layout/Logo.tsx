import Image from "next/image";
import Link from "next/link";
import logo from "@/images/logo.png";

/**
 * Official lockup — lion mark plus ACP Wealth Management wordmark.
 * Header uses the full-colour mark on the light bar, matching the
 * reference site. Footer sits on navy, so the same artwork is lifted
 * slightly so the darker blues stay readable.
 */
export function Logo({ light }: { light?: boolean }) {
  return (
    <Link href="/" className="inline-flex shrink-0 items-center" aria-label="ACP Wealth Management — Home">
      <Image
        src={logo}
        alt=""
        priority={!light}
        sizes="200px"
        className={
          light
            ? "h-12 w-auto brightness-125 md:h-14"
            : "h-11 w-auto md:h-[52px]"
        }
      />
    </Link>
  );
}

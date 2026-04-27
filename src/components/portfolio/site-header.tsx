import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background">
      <div className="mx-auto flex w-full max-w-[61rem] items-center justify-between py-7 text-[0.78rem] font-semibold uppercase leading-none tracking-[-0.02em]">
        <Link
          href="/"
          className="transition-opacity hover:opacity-50"
        >
          Mathias Boutin
        </Link>
        <Link
          href={`mailto:${siteConfig.contactEmail}`}
          className="transition-opacity hover:opacity-50"
        >
          Contact
        </Link>
      </div>
    </header>
  );
}

import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="py-8">
      <div className="flex w-full flex-col justify-between gap-4 text-[0.78rem] font-semibold uppercase text-muted-foreground md:flex-row">
        <p>Based in Canada</p>
        <Link
          href={`mailto:${siteConfig.contactEmail}`}
          className="text-foreground transition-opacity hover:opacity-50"
        >
          {siteConfig.contactEmail}
        </Link>
      </div>
    </footer>
  );
}

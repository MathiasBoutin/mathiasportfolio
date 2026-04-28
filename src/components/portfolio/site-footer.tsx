import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { getActivePresentationTheme } from "@/lib/presentation-themes";

export function SiteFooter() {
  const theme = getActivePresentationTheme();

  return (
    <footer className={theme.slots.shell.footer}>
      <div className={theme.slots.shell.footerInner}>
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

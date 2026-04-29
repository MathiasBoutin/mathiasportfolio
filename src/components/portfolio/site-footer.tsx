import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { getActivePresentationTheme } from "@/lib/presentation-themes";

export function SiteFooter() {
  const theme = getActivePresentationTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={theme.slots.shell.footer}>
      <div className={`${theme.slots.shell.footerInner} gap-2 text-[0.74rem] font-medium normal-case tracking-[0.01em]`}>
        <p className="text-muted-foreground/78">Based in Montreal, Canada.</p>
        <div className="flex items-center gap-2 text-muted-foreground/78">
          <span aria-hidden>·</span>
          <Link href={`mailto:${siteConfig.contactEmail}`} className="transition-colors hover:text-foreground">
            {siteConfig.contactEmail}
          </Link>
          <span aria-hidden>·</span>
          <span>{currentYear}</span>
        </div>
      </div>
    </footer>
  );
}

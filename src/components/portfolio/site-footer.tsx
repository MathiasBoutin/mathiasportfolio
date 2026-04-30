import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { getActivePresentationTheme } from "@/lib/presentation-themes";
import { defaultMessages } from "@/lib/i18n/messages";

export function SiteFooter() {
  const theme = getActivePresentationTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer data-print-hide className={theme.slots.shell.footer}>
      <div
        className={`${theme.slots.shell.footerInner} gap-2 text-[0.74rem] font-medium tracking-[0.01em] normal-case`}
      >
        <p className="text-muted-foreground/78">{defaultMessages.shell.footerLocation}</p>
        <div className="text-muted-foreground/78 flex items-center gap-2">
          <span aria-hidden>·</span>
          <Link
            href={`mailto:${siteConfig.contactEmail}`}
            className="hover:text-foreground transition-colors"
          >
            {siteConfig.contactEmail}
          </Link>
          <span aria-hidden>·</span>
          <span>{currentYear}</span>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { getActivePresentationTheme } from "@/lib/presentation-themes";

export function SiteHeader() {
  const theme = getActivePresentationTheme();

  return (
    <header className={theme.slots.shell.header}>
      <div className={theme.slots.shell.headerInner}>
        <Link
          href="/"
          className="text-muted-foreground/85 transition-colors hover:text-foreground/70"
        >
          Mathias Boutin
        </Link>
        <Link
          href={`mailto:${siteConfig.contactEmail}`}
          className="text-muted-foreground/85 transition-colors hover:text-foreground/70"
        >
          Contact
        </Link>
      </div>
    </header>
  );
}

import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { getActivePresentationTheme } from "@/lib/presentation-themes";

export function SiteHeader() {
  const theme = getActivePresentationTheme();
  const primaryNav = siteConfig.nav.filter((item) => item.href === "/cv");

  return (
    <header className={theme.slots.shell.header}>
      <div className={`${theme.slots.shell.headerInner} gap-6`}>
        <Link
          href="/"
          className="text-[0.8rem] font-semibold tracking-[-0.01em] text-foreground/88 transition-colors hover:text-foreground"
        >
          Mathias Boutin
        </Link>
        <nav aria-label="Primary" className="ml-auto">
          <ul className="flex items-center gap-3 text-[0.74rem] font-medium tracking-[0.01em] text-muted-foreground/80 md:gap-5">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

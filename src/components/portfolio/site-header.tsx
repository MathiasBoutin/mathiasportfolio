import Link from "next/link";
import { getSiteCopy } from "@/lib/site-config";
import { getActivePresentationTheme } from "@/lib/presentation-themes";

export function SiteHeader() {
  const theme = getActivePresentationTheme();
  const siteCopy = getSiteCopy();
  const primaryNav = siteCopy.nav.filter((item) => item.href === "/cv");

  return (
    <header data-print-hide className={theme.slots.shell.header}>
      <div className={`${theme.slots.shell.headerInner} gap-6`}>
        <Link
          href="/"
          className="text-foreground/88 hover:text-foreground text-[0.8rem] font-semibold tracking-[-0.01em] transition-colors"
        >
          Mathias Boutin
        </Link>
        <nav aria-label="Primary" className="ml-auto">
          <ul className="text-muted-foreground/80 flex items-center gap-3 text-[0.74rem] font-medium tracking-[0.01em] md:gap-5">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="hover:text-foreground transition-colors"
                >
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

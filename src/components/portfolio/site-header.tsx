import Link from "next/link";
import { getSiteCopy } from "@/lib/site-config";
import { getActivePresentationTheme } from "@/lib/presentation-themes";
import { type as typeStyle } from "@/lib/typography";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const theme = getActivePresentationTheme();
  const siteCopy = getSiteCopy();
  const primaryNav = siteCopy.nav.filter((item) => item.href === "/cv");

  return (
    <header data-print-hide className={theme.slots.shell.header}>
      <div className={`${theme.slots.shell.headerInner} gap-6`}>
        <Link
          href="/"
          className={cn(
            "text-foreground/88 hover:text-foreground transition-colors",
            typeStyle("navBrand"),
          )}
        >
          Mathias Boutin
        </Link>
        <nav aria-label="Primary" className="ml-auto">
          <ul
            className={cn(
              "text-muted-foreground/80 flex items-center gap-3 md:gap-5",
              typeStyle("navLink"),
            )}
          >
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

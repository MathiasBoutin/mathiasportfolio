"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import { getMessages } from "@/lib/i18n/messages";
import {
  getLocaleFromPathname,
  isCaseStudyPathname,
  localizePath,
} from "@/lib/i18n/routing";
import { type as typeStyle } from "@/lib/typography";
import { cn } from "@/lib/utils";

export function SiteHeaderBrand() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const messages = getMessages(locale);
  const homeHref = localizePath("/", locale);

  if (isCaseStudyPathname(pathname)) {
    return (
      <Link
        href={homeHref}
        className={cn(
          "group inline-flex items-center gap-2 text-muted-foreground/80 transition-colors hover:text-foreground",
          typeStyle("navLink"),
        )}
      >
        <ArrowLeft
          size={14}
          aria-hidden
          className="shrink-0 text-muted-foreground/55 transition-transform group-hover:-translate-x-0.5"
        />
        {messages.shell.backLabel}
      </Link>
    );
  }

  return (
    <Link
      href={homeHref}
      className={cn(
        "text-foreground/88 transition-colors hover:text-foreground",
        typeStyle("navBrand"),
      )}
    >
      Mathias Boutin
    </Link>
  );
}

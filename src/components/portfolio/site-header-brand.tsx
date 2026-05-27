"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import { getMessages } from "@/lib/i18n/messages";
import {
  getLocaleFromPathname,
  isCaseStudyPathname,
  localizePath,
} from "@/lib/i18n/routing";
import { getActivePresentationTheme } from "@/lib/presentation-themes";
import { type as typeStyle } from "@/lib/typography";
import { cn } from "@/lib/utils";

export function SiteHeaderBrand() {
  const theme = getActivePresentationTheme();
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const messages = getMessages(locale);
  const homeHref = localizePath("/", locale);

  if (isCaseStudyPathname(pathname)) {
    return (
      <Link
        href={homeHref}
        className={cn(
          "group inline-flex items-center gap-2 transition-colors hover:text-foreground",
          theme.slots.shell.navText,
          typeStyle("navLink"),
        )}
      >
        <ArrowLeft
          size={14}
          aria-hidden
          className="shrink-0 opacity-55 transition-transform group-hover:-translate-x-0.5"
        />
        {messages.shell.backLabel}
      </Link>
    );
  }

  return (
    <Link href={homeHref} className="opacity-100 transition-opacity hover:opacity-70">
      <Image
        src="/images/work/Logo.png"
        alt="Mathias Boutin"
        height={36}
        width={216}
        className="h-9 w-auto"
        priority
      />
    </Link>
  );
}

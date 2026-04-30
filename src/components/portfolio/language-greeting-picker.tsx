"use client";

import { useRouter, usePathname } from "next/navigation";
import { type Locale } from "@/lib/i18n/config";
import { localizePathnameForLocale } from "@/lib/i18n/routing";
import { cn } from "@/lib/utils";

type LanguageGreetingPickerProps = {
  locale: Locale;
  englishGreeting: string;
  frenchGreeting: string;
  ariaLabel: string;
  className?: string;
};

export function LanguageGreetingPicker({
  locale,
  englishGreeting,
  frenchGreeting,
  ariaLabel,
  className,
}: LanguageGreetingPickerProps) {
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(nextLocale: Locale) {
    if (nextLocale === locale) {
      return;
    }

    const nextPathname = localizePathnameForLocale(pathname, nextLocale);
    router.push(nextPathname);
  }

  return (
    <div className={cn("flex items-center gap-3", className)} role="group" aria-label={ariaLabel}>
      <button
        type="button"
        onClick={() => switchLocale("fr")}
        aria-pressed={locale === "fr"}
        className={cn(
          "transition-[opacity,color] duration-300 ease-out",
          locale === "fr"
            ? "cursor-default text-foreground opacity-100"
            : "cursor-pointer text-[#8f7a6a] opacity-40 hover:text-foreground hover:opacity-100 focus-visible:text-foreground focus-visible:opacity-100",
        )}
      >
        {frenchGreeting}
      </button>
      <span aria-hidden className="text-[#8f7a6a] opacity-40">/</span>
      <button
        type="button"
        onClick={() => switchLocale("en")}
        aria-pressed={locale === "en"}
        className={cn(
          "transition-[opacity,color] duration-300 ease-out",
          locale === "en"
            ? "cursor-default text-foreground opacity-100"
            : "cursor-pointer text-[#8f7a6a] opacity-40 hover:text-foreground hover:opacity-100 focus-visible:text-foreground focus-visible:opacity-100",
        )}
      >
        {englishGreeting}
      </button>
    </div>
  );
}

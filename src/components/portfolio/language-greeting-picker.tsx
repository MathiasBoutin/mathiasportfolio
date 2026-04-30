"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
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

type LanguageOption = {
  locale: Locale;
  greeting: string;
};

function LanguageFlag({ locale }: { locale: Locale }) {
  return (
    <span
      aria-hidden
      className="block h-[24px] w-[36px] shrink-0 rounded-[2px] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url("${
          locale === "fr"
            ? "https://upload.wikimedia.org/wikipedia/commons/5/5f/Flag_of_Quebec.svg"
            : "https://upload.wikimedia.org/wikipedia/commons/3/31/Flag_of_Canada_%283-2%29.svg"
        }")`,
        boxShadow: "inset 0 0 1px rgb(0 0 0 / 0.2)",
      }}
    />
  );
}

export function LanguageGreetingPicker({
  locale,
  englishGreeting,
  frenchGreeting,
  ariaLabel,
  className,
}: LanguageGreetingPickerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [hoveredLocale, setHoveredLocale] = React.useState<Locale | null>(null);
  const [focusedLocale, setFocusedLocale] = React.useState<Locale | null>(null);
  const activeFlagLocale = focusedLocale ?? hoveredLocale;
  const languageOptions: LanguageOption[] = [
    {
      locale: "fr",
      greeting: frenchGreeting,
    },
    {
      locale: "en",
      greeting: englishGreeting,
    },
  ];

  function switchLocale(nextLocale: Locale) {
    if (nextLocale === locale) {
      return;
    }

    const nextPathname = localizePathnameForLocale(pathname, nextLocale);
    router.push(nextPathname);
  }

  return (
    <div
      className={cn("flex items-center gap-3 overflow-visible", className)}
      role="group"
      aria-label={ariaLabel}
    >
      {languageOptions.map((option, index) => (
        <React.Fragment key={option.locale}>
          <span className="relative inline-flex items-center align-middle overflow-visible">
            <AnimatePresence initial={false}>
              {activeFlagLocale === option.locale && locale !== option.locale ? (
                <motion.span
                  key={`${option.locale}-flag-popover`}
                  aria-hidden
                  initial={{
                    opacity: 0,
                    scale: 0.94,
                    x: option.locale === "fr" ? 10 : -10,
                  }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{
                    opacity: 0,
                    scale: 0.97,
                    x: option.locale === "fr" ? 8 : -8,
                  }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    "pointer-events-none absolute top-1/2 z-30 block -translate-y-1/2",
                    option.locale === "fr" ? "right-full mr-[0.18em]" : "left-full ml-[0.18em]",
                  )}
                >
                  <LanguageFlag locale={option.locale} />
                </motion.span>
              ) : null}
            </AnimatePresence>
            <button
              type="button"
              onClick={() => switchLocale(option.locale)}
              onMouseEnter={() => {
                if (locale !== option.locale) {
                  setHoveredLocale(option.locale);
                }
              }}
              onMouseLeave={() =>
                setHoveredLocale((currentLocale) =>
                  currentLocale === option.locale ? null : currentLocale,
                )
              }
              onFocus={() => {
                if (locale !== option.locale) {
                  setFocusedLocale(option.locale);
                }
              }}
              onBlur={() =>
                setFocusedLocale((currentLocale) =>
                  currentLocale === option.locale ? null : currentLocale,
                )
              }
              aria-pressed={locale === option.locale}
              className={cn(
                "transition-[opacity,color] duration-300 ease-out",
                locale === option.locale
                  ? "cursor-default text-foreground opacity-100"
                  : "cursor-pointer text-[#8f7a6a] opacity-40 hover:text-foreground hover:opacity-100 focus-visible:text-foreground focus-visible:opacity-100",
              )}
            >
              {option.greeting}
            </button>
          </span>
          {index === 0 ? (
            <span aria-hidden className="text-[#8f7a6a] opacity-40">
              /
            </span>
          ) : null}
        </React.Fragment>
      ))}
    </div>
  );
}

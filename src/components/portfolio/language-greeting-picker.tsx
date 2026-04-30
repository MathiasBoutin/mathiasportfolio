"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
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
  flagSrc: string;
  flagWidth: number;
  bubblePlacement: "left" | "right";
};

type LanguageFlagBubbleProps = {
  option: LanguageOption;
  prefersReducedMotion: boolean | null;
};

function LanguageFlagBubble({ option, prefersReducedMotion }: LanguageFlagBubbleProps) {
  const shadowFilterId = React.useId().replace(/:/g, "");
  const horizontalOffset = option.bubblePlacement === "left" ? -18 : 18;
  const motionProps = prefersReducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: { opacity: 0, x: horizontalOffset, y: 14, scale: 0.9 },
        animate: { opacity: 1, x: 0, y: 0, scale: 1 },
        exit: { opacity: 0, x: horizontalOffset * 0.85, y: 10, scale: 0.95 },
      };

  return (
    <motion.div
      {...motionProps}
      aria-hidden
      transition={
        prefersReducedMotion
          ? { duration: 0.14, ease: [0, 0, 1, 1] }
          : { duration: 0.24, ease: [0.22, 1, 0.36, 1] }
      }
      className={cn(
        "pointer-events-none absolute bottom-full z-20 mb-[-6px] flex h-[66px] w-[86px] items-center justify-center",
        option.bubblePlacement === "left"
          ? "left-0 -translate-x-[102%]"
          : "right-0 translate-x-[102%]",
      )}
    >
      <svg
        aria-hidden
        viewBox="0 0 108 82"
        className={cn(
          "absolute inset-0 h-full w-full overflow-visible",
          option.bubblePlacement === "left" && "-scale-x-100",
        )}
        fill="none"
      >
        <defs>
          <filter
            id={`bubble-shadow-${shadowFilterId}`}
            x="-20%"
            y="-20%"
            width="150%"
            height="170%"
            colorInterpolationFilters="sRGB"
          >
            <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="rgb(0 0 0 / 0.1)" />
          </filter>
        </defs>
        <g filter={`url(#bubble-shadow-${shadowFilterId})`}>
          <path
            d="M74.1 4.9C85.4 10.1 97.4 24.4 99.3 39.3C101.1 54.2 92.9 69.8 80.5 76.1C68.1 82.5 51.5 79.6 36.9 73.7C22.3 67.7 9.7 58.7 5.4 46.5C1.2 34.3 5.3 18.9 15.9 10.2C26.5 1.5 43.6 -0.5 55.7 0.8C63.2 1.6 68.9 2.5 74.1 4.9Z"
            fill="var(--background)"
            stroke="#8f7a6a"
            strokeWidth="2.5"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M31.6 67.6C28.4 75.1 23.3 79.4 16.6 80.7C20.7 75.8 22.4 70.5 21.7 64.9"
            fill="var(--background)"
            stroke="#8f7a6a"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            vectorEffect="non-scaling-stroke"
          />
        </g>
      </svg>
      <Image
        src={option.flagSrc}
        alt=""
        width={option.flagWidth}
        height={18}
        className="relative z-10 rounded-[2px] border border-[#8f7a6a]"
        style={{ height: "18px", width: "auto" }}
      />
    </motion.div>
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
  const prefersReducedMotion = useReducedMotion();
  const [hoveredLocale, setHoveredLocale] = React.useState<Locale | null>(null);
  const [focusedLocale, setFocusedLocale] = React.useState<Locale | null>(null);
  const activeBubbleLocale = focusedLocale ?? hoveredLocale;
  const languageOptions: LanguageOption[] = [
    {
      locale: "fr",
      greeting: frenchGreeting,
      flagSrc: "/images/language/quebec-flag.png",
      flagWidth: 27,
      bubblePlacement: "left",
    },
    {
      locale: "en",
      greeting: englishGreeting,
      flagSrc: "/images/language/canada-flag.png",
      flagWidth: 31,
      bubblePlacement: "right",
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
    <div className={cn("flex items-center gap-3", className)} role="group" aria-label={ariaLabel}>
      {languageOptions.map((option, index) => (
        <React.Fragment key={option.locale}>
          <span className="relative inline-flex">
            <AnimatePresence initial={false}>
              {activeBubbleLocale === option.locale && locale !== option.locale ? (
                <LanguageFlagBubble
                  key={`${option.locale}-bubble`}
                  option={option}
                  prefersReducedMotion={prefersReducedMotion}
                />
              ) : null}
            </AnimatePresence>
            <motion.button
              type="button"
              onClick={() => switchLocale(option.locale)}
              onHoverStart={() => {
                if (locale !== option.locale) {
                  setHoveredLocale(option.locale);
                }
              }}
              onHoverEnd={() =>
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
            </motion.button>
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

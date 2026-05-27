"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { isCaseStudyPathname } from "@/lib/i18n/routing";
import { cn } from "@/lib/utils";

const TOP_REVEAL_OFFSET = 96;
const SCROLL_DELTA_THRESHOLD = 8;

type SiteHeaderScrollFrameProps = {
  children: ReactNode;
  className?: string;
};

export function SiteHeaderScrollFrame({
  children,
  className,
}: SiteHeaderScrollFrameProps) {
  const pathname = usePathname();
  const isCaseStudyPage = isCaseStudyPathname(pathname);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    if (!isCaseStudyPage) {
      setIsHidden(false);
      return;
    }

    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      if (ticking.current) return;

      ticking.current = true;
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const scrollDelta = currentScrollY - lastScrollY.current;

        if (
          currentScrollY < TOP_REVEAL_OFFSET ||
          scrollDelta < -SCROLL_DELTA_THRESHOLD
        ) {
          setIsHidden(false);
        } else if (scrollDelta > SCROLL_DELTA_THRESHOLD) {
          setIsHidden(true);
        }

        lastScrollY.current = currentScrollY;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      ticking.current = false;
    };
  }, [isCaseStudyPage]);

  return (
    <header
      data-print-hide
      className={cn(
        className,
        "transform-gpu transition-transform duration-300 ease-out will-change-transform motion-reduce:transition-none",
        isCaseStudyPage && isHidden
          ? "pointer-events-none -translate-y-full"
          : "translate-y-0",
      )}
      onFocusCapture={() => setIsHidden(false)}
    >
      {children}
    </header>
  );
}

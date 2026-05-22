"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mediaQuery.matches) {
      return;
    }

    const lenis = new Lenis({
      autoRaf: true,
      duration: 0.28,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      syncTouch: false,
    });

    const handleReducedMotionChange = () => {
      if (mediaQuery.matches) {
        lenis.destroy();
      }
    };

    mediaQuery.addEventListener("change", handleReducedMotionChange);

    return () => {
      mediaQuery.removeEventListener("change", handleReducedMotionChange);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

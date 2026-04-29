"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  DEFAULT_PRESENTATION_THEME,
  PRESENTATION_THEME_COOKIE,
  type PresentationThemeId,
} from "@/lib/presentation-themes";

type ThemeToggleProps = {
  currentTheme: PresentationThemeId;
};

export function ThemeToggle({ currentTheme }: ThemeToggleProps) {
  const router = useRouter();
  const [theme, setTheme] = useState<PresentationThemeId>(currentTheme);
  const isDark = theme === "dark";

  function toggleTheme() {
    const nextTheme = isDark ? DEFAULT_PRESENTATION_THEME : "dark";

    document.cookie = `${PRESENTATION_THEME_COOKIE}=${nextTheme}; path=/; max-age=31536000; samesite=lax`;
    document.documentElement.dataset.presentationTheme = nextTheme;
    setTheme(nextTheme);
    router.refresh();
  }

  return (
    <button
      data-print-hide
      type="button"
      aria-pressed={isDark}
      aria-label={`Switch to ${isDark ? "default" : "dark"} theme`}
      onClick={toggleTheme}
      className="border-border bg-background/90 text-foreground shadow-foreground/10 hover:bg-foreground hover:text-background focus-visible:outline-ring fixed right-5 bottom-5 z-50 rounded-full border px-4 py-3 text-[0.72rem] font-semibold tracking-[0.08em] uppercase shadow-lg backdrop-blur transition focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      {isDark ? "Default" : "Dark"}
    </button>
  );
}

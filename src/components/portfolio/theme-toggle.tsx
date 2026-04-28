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
      type="button"
      aria-pressed={isDark}
      aria-label={`Switch to ${isDark ? "default" : "dark"} theme`}
      onClick={toggleTheme}
      className="fixed bottom-5 right-5 z-50 rounded-full border border-border bg-background/90 px-4 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-foreground shadow-lg shadow-foreground/10 backdrop-blur transition hover:bg-foreground hover:text-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      {isDark ? "Default" : "Dark"}
    </button>
  );
}

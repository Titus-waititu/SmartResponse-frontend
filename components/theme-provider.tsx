/**
 * Theme Provider
 * Initializes and manages theme application
 */

"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/lib/stores/theme.store";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeStore();

  useEffect(() => {
    // Sync theme with DOM (in case it changed via store)
    const root = document.documentElement;
    const currentTheme = root.classList.contains("dark") ? "dark" : "light";

    if (currentTheme !== theme) {
      root.classList.remove("light", "dark");
      root.classList.add(theme);
    }
  }, [theme]);

  return <>{children}</>;
}

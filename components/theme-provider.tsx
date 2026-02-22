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
    // Apply theme on mount
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  return <>{children}</>;
}

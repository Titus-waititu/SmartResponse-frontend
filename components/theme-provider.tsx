/**
 * Theme Provider
 * Initializes and manages theme application
 */

"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/lib/stores/theme.store";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    // On mount, ensure theme is applied
    const root = document.documentElement;
    
    // Check if there's a theme in localStorage that might not be in sync
    const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    
    if (storedTheme && storedTheme !== theme) {
      setTheme(storedTheme);
    } else {
      // Ensure the current theme is applied
      root.classList.remove("light", "dark");
      root.classList.add(theme);
    }
  }, []);

  useEffect(() => {
    // Apply theme whenever it changes
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  return <>{children}</>;
}

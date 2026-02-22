/**
 * Theme Store
 * Global state management for theme (light/dark mode)
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "light",

      setTheme: (theme) => {
        set({ theme });
        // Apply theme to document
        if (typeof document !== "undefined") {
          document.documentElement.classList.remove("light", "dark");
          document.documentElement.classList.add(theme);
        }
      },

      toggleTheme: () => {
        set((state) => {
          const newTheme = state.theme === "light" ? "dark" : "light";
          // Apply theme to document
          if (typeof document !== "undefined") {
            document.documentElement.classList.remove("light", "dark");
            document.documentElement.classList.add(newTheme);
          }
          return { theme: newTheme };
        });
      },
    }),
    {
      name: "theme-storage",
    },
  ),
);

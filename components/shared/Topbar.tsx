"use client";
import { useState, useEffect } from "react";
import { Bell, Search, Sun, Moon, Monitor } from "lucide-react";
import { useAuthStore } from "@/lib/stores/authStore";
import { useTheme } from "next-themes";

export function Topbar() {
  const user = useAuthStore((s) => s.user);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-compiler/react-compiler
    setMounted(true);
  }, []);

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 sticky top-0 z-40">
      {/* Search / Placeholder */}
      <div className="flex-1 flex items-center">
        {/* <div className="relative w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-slate-100 dark:bg-slate-800 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red dark:text-white"
          />
        </div> */}
      </div>

      <div className="flex items-center gap-6">
        {mounted && (
          <button
            onClick={() =>
              setTheme(
                theme === "dark"
                  ? "light"
                  : theme === "light"
                    ? "system"
                    : "dark",
              )
            }
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
            title={`Current theme: ${theme}. Click to switch.`}
          >
            {theme === "dark" ? (
              <Moon className="w-5 h-5" />
            ) : theme === "light" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Monitor className="w-5 h-5" />
            )}
          </button>
        )}
        <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-brand-red rounded-full border border-white dark:border-slate-900"></span>
        </button>

        <div className="flex items-center gap-3 border-l border-slate-200 dark:border-slate-700 pl-6 cursor-pointer">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-semibold text-slate-900 dark:text-white">
              {user?.name || "User"}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {user?.role}
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-slate-600 dark:text-slate-300">
            {user?.name?.charAt(0) || "U"}
          </div>
        </div>
      </div>
    </header>
  );
}

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";
import { useAuthStore } from "@/lib/stores/authStore";
import { useAuth } from "@/lib/hooks/useAuth";
import { useToastStore } from "@/lib/stores/toastStore";
import {
  LayoutDashboard,
  FileWarning,
  Bell,
  Settings,
  LogOut,
  MapPin,
  ClipboardList,
  BarChart3,
  Users,
  Ambulance,
  Zap,
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const { logout } = useAuth();
  const { addToast } = useToastStore();

  if (!user) return null;

  // Ensure role is lowercase to match the new type definitions
  // in case the user has an old uppercase role in their local storage
  const role = user.role?.toLowerCase() || "user";

  // Define navigation links based on role
  let links: Array<{ name: string; href: string; icon: React.ElementType }> =
    [];
  if (role === "user") {
    links = [
      { name: "Dashboard", href: "/dashboard/user", icon: LayoutDashboard },
      { name: "Report Accident", href: "/reports/create", icon: FileWarning },
      {
        name: "NearBy Accidents",
        href: "/dashboard/user/nearby",
        icon: MapPin,
      },
      {
        name: "Notifications",
        href: "/dashboard/user/notifications",
        icon: Bell,
      },
      { name: "Settings", href: "/dashboard/user/settings", icon: Settings },
    ];
  } else if (role === "officer" || role === "emergency_responder") {
    links = [
      {
        name: "Assigned Incidents",
        href: `/dashboard/${role.toLowerCase()}`,
        icon: ClipboardList,
      },
      {
        name: "Map Panel",
        href: `/dashboard/${role.toLowerCase()}/map`,
        icon: MapPin,
      },
      {
        name: "Reports",
        href: `/dashboard/${role.toLowerCase()}/reports`,
        icon: FileWarning,
      },
      {
        name: "Status",
        href: `/dashboard/${role.toLowerCase()}/status`,
        icon: BarChart3,
      },
      {
        name: "Profile",
        href: `/dashboard/${role.toLowerCase()}/profile`,
        icon: Settings,
      },
    ];
  } else if (role === "admin") {
    links = [
      { name: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
      {
        name: "Reports",
        href: "/dashboard/admin/reports",
        icon: ClipboardList,
      },
      {
        name: "AI Analytics",
        href: "/dashboard/admin/analytics",
        icon: BarChart3,
      },
      {
        name: "Dispatch Logs",
        href: "/dashboard/admin/dispatch",
        icon: MapPin,
      },
      { name: "Users", href: "/dashboard/admin/users", icon: Users },
      {
        name: "Emergency Services",
        href: "/dashboard/admin/services",
        icon: Ambulance,
      },
      { name: "Settings", href: "/dashboard/admin/settings", icon: Settings },
    ];
  }

  return (
    <aside className="w-64 bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 flex flex-col h-screen fixed top-0 left-0 overflow-y-auto z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-linear-to-tr from-brand-red to-orange-400 flex items-center justify-center">
          <Zap className="text-white w-5 h-5" />
        </div>
        <span className="font-bold text-slate-900 dark:text-white tracking-tight">
          Smart Accident Reporting
        </span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {links.map((link) => {
          const isActive =
            pathname === link.href ||
            (pathname.startsWith(link.href) &&
              link.href !== "#" &&
              link.href !== `/dashboard/${role.toLowerCase()}`);
          const Icon = link.icon;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                isActive
                  ? "bg-slate-200 dark:bg-slate-800 text-brand-red dark:text-white font-semibold"
                  : "hover:bg-slate-200 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white text-slate-500 dark:text-slate-400"
              }`}
            >
              <Icon
                className={`w-5 h-5 ${isActive ? "text-brand-red dark:text-brand-red" : "text-slate-500 dark:text-slate-400"}`}
              />
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={() => logout()}
          className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl transition-colors hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white text-slate-500 dark:text-slate-400"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}

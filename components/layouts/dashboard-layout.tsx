/**
 * Dashboard Layout Component
 * Layout for authenticated pages with sidebar navigation
 */

"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/auth.store";
import {
  LayoutDashboard,
  AlertCircle,
  Ambulance,
  Car,
  User,
  LogOut,
  Menu,
  X,
  Bell,
} from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user, clearAuth } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    clearAuth();
    router.push("/auth/signin");
  };

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Report Accident", href: "/accidents/report", icon: AlertCircle },
    { name: "Accidents", href: "/accidents/list", icon: AlertCircle },
    {
      name: "Emergency Services",
      href: "/emergency-services",
      icon: Ambulance,
    },
    { name: "My Vehicles", href: "/vehicles", icon: Car },
    { name: "Profile", href: "/profile", icon: User },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-white shadow-lg transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b">
          {isSidebarOpen && (
            <h1 className="text-xl font-bold text-red-600">SmartResponse</h1>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <item.icon size={20} className="text-gray-600" />
              {isSidebarOpen && (
                <span className="text-gray-700 font-medium">{item.name}</span>
              )}
            </Link>
          ))}
        </nav>

        {/* User section */}
        <div className="border-t px-4 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold">
              {user?.firstName?.[0]}
              {user?.lastName?.[0]}
            </div>
            {isSidebarOpen && (
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            )}
          </div>
          {isSidebarOpen && (
            <button
              onClick={handleLogout}
              className="mt-4 w-full flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            Welcome back, {user?.firstName}!
          </h2>
          <button className="relative p-2 rounded-lg hover:bg-gray-100">
            <Bell size={24} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </header>

        {/* Page Content */}
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}

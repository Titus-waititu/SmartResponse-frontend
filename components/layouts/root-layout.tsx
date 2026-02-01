/**
 * Root Layout Component
 * Main layout wrapper for the application
 */

"use client";

import { Outlet } from "@tanstack/react-router";
import { Toaster } from "react-hot-toast";

export function RootLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#10b981",
              secondary: "#fff",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />
      <Outlet />
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/authStore";
import { useCurrentUser } from "@/lib/queries/auth.queries";
import { useWsQuerySync } from "@/lib/hooks/useWsQuerySync";
import { Sidebar } from "@/components/shared/Sidebar";
import { Topbar } from "@/components/shared/Topbar";

/**
 * Guards all routes under (protected)/.
 * - Redirects to /login when the store hydrates without an authenticated user.
 * - Silently re-fetches GET /auth/me in the background to keep the user
 *   profile fresh and detect server-side session invalidation.
 */
export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const isHydrated = useAuthStore((s) => s.isHydrated);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  // Background refresh of the user profile — only runs when authenticated
  useCurrentUser();

  // Open WebSocket and sync events → query invalidation + toasts
  useWsQuerySync();

  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isHydrated, isAuthenticated, router]);

  if (!isHydrated) return null;
  if (!isAuthenticated) return null;

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}

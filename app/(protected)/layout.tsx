"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/authStore";
import { useCurrentUser } from "@/lib/queries/auth.queries";
import { useWsQuerySync } from "@/lib/hooks/useWsQuerySync";

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
    <>
      {/* Navigation / sidebar shell goes here */}
      <main>{children}</main>
    </>
  );
}

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/authStore";
import { UserRole } from "@/lib/types/auth";
import {
  getDashboardPath,
  DASHBOARD_ALLOWED_ROLES,
} from "@/lib/constants/roles";

interface RoleDashboardGuardProps {
  /** The base path this component is rendered under, e.g. "/dashboard/officer" */
  dashboardPath: string;
  children: React.ReactNode;
}

/**
 * Client-side role guard for individual dashboard segments.
 * Provides a second layer of protection on top of the middleware.
 * Redirects the user to their own dashboard if their role doesn't match.
 */
export function RoleDashboardGuard({
  dashboardPath,
  children,
}: RoleDashboardGuardProps) {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const isHydrated = useAuthStore((s) => s.isHydrated);

  useEffect(() => {
    if (!isHydrated) return;
    if (!user) {
      router.replace("/login");
      return;
    }

    const allowed: UserRole[] = DASHBOARD_ALLOWED_ROLES[dashboardPath] ?? [];
    if (!allowed.includes(user.role)) {
      router.replace(getDashboardPath(user.role));
    }
  }, [isHydrated, user, dashboardPath, router]);

  if (!isHydrated || !user) return null;

  const allowed: UserRole[] = DASHBOARD_ALLOWED_ROLES[dashboardPath] ?? [];
  if (!allowed.includes(user.role)) return null;

  return <>{children}</>;
}

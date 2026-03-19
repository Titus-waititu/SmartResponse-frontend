"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/authStore";
import { getDashboardPath } from "@/lib/constants/roles";

import { UserRole } from "@/lib/types/auth";

/**
 * /dashboard – immediately redirects to the role-specific sub-route.
 * The middleware handles this for most cases; this is a client-side fallback.
 */
export default function DashboardIndexPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const isHydrated = useAuthStore((s) => s.isHydrated);

  useEffect(() => {
    if (!isHydrated) return;
    if (user) {
      const role = user.role?.toLowerCase() as UserRole;
      router.replace(getDashboardPath(role) || "/dashboard/user");
    }
  }, [isHydrated, user, router]);

  return null;
}

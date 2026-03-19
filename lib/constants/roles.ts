import { UserRole } from "@/lib/types/auth";

/** Ordered list of all roles */
export const ALL_ROLES: UserRole[] = ["user", "officer", "emergency_responder", "admin"];

/** Maps a role to its dashboard path segment */
export const ROLE_DASHBOARD: Record<UserRole, string> = {
  user: "/dashboard/user",
  officer: "/dashboard/officer",
  emergency_responder: "/dashboard/responder",
  admin: "/dashboard/admin",
};

/**
 * Maps a dashboard path prefix to the roles that are allowed to access it.
 * admin can access every dashboard.
 */
export const DASHBOARD_ALLOWED_ROLES: Record<string, UserRole[]> = {
  "/dashboard/user": ["user", "admin"],
  "/dashboard/officer": ["officer", "admin"],
  "/dashboard/responder": ["emergency_responder", "admin"],
  "/dashboard/admin": ["admin"],
};

export function getDashboardPath(role: UserRole): string {
  return ROLE_DASHBOARD[role];
}

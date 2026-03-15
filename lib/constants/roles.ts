import { UserRole } from "@/lib/types/auth";

/** Ordered list of all roles */
export const ALL_ROLES: UserRole[] = ["USER", "OFFICER", "RESPONDER", "ADMIN"];

/** Maps a role to its dashboard path segment */
export const ROLE_DASHBOARD: Record<UserRole, string> = {
  USER: "/dashboard/user",
  OFFICER: "/dashboard/officer",
  RESPONDER: "/dashboard/responder",
  ADMIN: "/dashboard/admin",
};

/**
 * Maps a dashboard path prefix to the roles that are allowed to access it.
 * ADMIN can access every dashboard.
 */
export const DASHBOARD_ALLOWED_ROLES: Record<string, UserRole[]> = {
  "/dashboard/user": ["USER", "ADMIN"],
  "/dashboard/officer": ["OFFICER", "ADMIN"],
  "/dashboard/responder": ["RESPONDER", "ADMIN"],
  "/dashboard/admin": ["ADMIN"],
};

/** Redirect to this path after a successful login / registration */
export function getDashboardPath(role: UserRole): string {
  return ROLE_DASHBOARD[role];
}

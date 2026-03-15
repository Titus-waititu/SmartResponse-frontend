import { NextRequest, NextResponse } from "next/server";
import { UserRole } from "@/lib/types/auth";
import {
  DASHBOARD_ALLOWED_ROLES,
  getDashboardPath,
} from "@/lib/constants/roles";

// ---------------------------------------------------------------------------
// Route buckets
// ---------------------------------------------------------------------------
const PUBLIC_PATHS = ["/login", "/register"];

/**
 * Returns true if the pathname starts with a known dashboard segment.
 */
function isDashboardPath(pathname: string): boolean {
  return pathname.startsWith("/dashboard/");
}

/**
 * Extracts the base dashboard segment, e.g. "/dashboard/officer/reports" → "/dashboard/officer"
 */
function getDashboardBase(pathname: string): string | null {
  const match = pathname.match(/^(\/dashboard\/[^/]+)/);
  return match ? match[1] : null;
}

// ---------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("sars_token")?.value;
  const rawRole = request.cookies.get("sars_role")?.value;
  const role = rawRole as UserRole | undefined;

  const isAuthenticated = Boolean(token);

  // ── 1. Unauthenticated visitor on a public route → allow through ──────────
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    if (isAuthenticated && role) {
      // Already logged in → bounce to the correct dashboard
      return NextResponse.redirect(
        new URL(getDashboardPath(role), request.url),
      );
    }
    return NextResponse.next();
  }

  // ── 2. Root path → redirect appropriately ─────────────────────────────────
  if (pathname === "/") {
    if (isAuthenticated && role) {
      return NextResponse.redirect(
        new URL(getDashboardPath(role), request.url),
      );
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ── 3. Any protected path without a token → send to login ─────────────────
  if (!isAuthenticated || !role) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ── 4. Role-mismatch check on dashboard paths ─────────────────────────────
  if (isDashboardPath(pathname)) {
    const base = getDashboardBase(pathname);
    if (base) {
      const allowed = DASHBOARD_ALLOWED_ROLES[base];
      if (allowed && !allowed.includes(role)) {
        // Redirect to the user's own dashboard instead of a 403
        return NextResponse.redirect(
          new URL(getDashboardPath(role), request.url),
        );
      }
    }
  }

  return NextResponse.next();
}

// ---------------------------------------------------------------------------
// Matcher – run on every route except static files and Next.js internals
// ---------------------------------------------------------------------------
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff2?)$).*)",
  ],
};

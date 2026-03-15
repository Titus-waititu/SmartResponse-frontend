import { RoleDashboardGuard } from "@/components/auth/RoleDashboardGuard";
import { UserReportList } from "@/components/dashboard/user/UserReportList";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "User Dashboard" };

export default function UserDashboardPage() {
  return (
    <RoleDashboardGuard dashboardPath="/dashboard/user">
      <div>
        <h1>My Dashboard</h1>
        <Link href="/reports/create">+ New Report</Link>
        <UserReportList />
      </div>
    </RoleDashboardGuard>
  );
}

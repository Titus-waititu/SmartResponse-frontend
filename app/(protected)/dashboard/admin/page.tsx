import { RoleDashboardGuard } from "@/components/auth/RoleDashboardGuard";
import {
  AnalyticsSummaryPanel,
  AllReportsTable,
  DispatchLogsTable,
} from "@/components/dashboard/admin/AdminPanels";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin Dashboard" };

export default function AdminDashboardPage() {
  return (
    <RoleDashboardGuard dashboardPath="/dashboard/admin">
      <div>
        <h1>Admin Dashboard</h1>
        <AnalyticsSummaryPanel />
        <AllReportsTable />
        <DispatchLogsTable />
      </div>
    </RoleDashboardGuard>
  );
}

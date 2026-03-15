import { RoleDashboardGuard } from "@/components/auth/RoleDashboardGuard";
import { IncidentList } from "@/components/dashboard/officer/IncidentList";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Officer Dashboard" };

export default function OfficerDashboardPage() {
  return (
    <RoleDashboardGuard dashboardPath="/dashboard/officer">
      <div>
        <h1>Officer Dashboard</h1>
        <IncidentList />
      </div>
    </RoleDashboardGuard>
  );
}

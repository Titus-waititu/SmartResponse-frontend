import { RoleDashboardGuard } from "@/components/auth/RoleDashboardGuard";
import { EmergencyQueue } from "@/components/dashboard/responder/EmergencyQueue";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Responder Dashboard" };

export default function ResponderDashboardPage() {
  return (
    <RoleDashboardGuard dashboardPath="/dashboard/responder">
      <div>
        <h1>Responder Dashboard</h1>
        <EmergencyQueue />
      </div>
    </RoleDashboardGuard>
  );
}

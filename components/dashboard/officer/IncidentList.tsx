"use client";

import Link from "next/link";
import {
  useAssignedIncidents,
  useAcceptIncidentMutation,
  useRejectIncidentMutation,
  useOfficerDispatchMutation,
} from "@/lib/queries/dashboard.queries";
import {
  ReportStatusBadge,
  DispatchStatusBadge,
} from "@/components/shared/StatusBadge";
import { DispatchSelect } from "@/components/shared/DispatchSelect";
import type { DispatchStatus } from "@/lib/types/incident";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { dateStyle: "medium" });
}

export function IncidentList() {
  const { data: incidents, isPending, isError } = useAssignedIncidents();
  const acceptMutation = useAcceptIncidentMutation();
  const rejectMutation = useRejectIncidentMutation();
  const dispatchMutation = useOfficerDispatchMutation();

  const isActing =
    acceptMutation.isPending ||
    rejectMutation.isPending ||
    dispatchMutation.isPending;

  if (isPending) return <p>Loading assigned incidents…</p>;
  if (isError) return <p role="alert">Failed to load incidents.</p>;
  if (!incidents.length) return <p>No incidents assigned to you.</p>;

  return (
    <section>
      <h2>Assigned Incidents</h2>
      <table>
        <thead>
          <tr>
            <th>Report ID</th>
            <th>Description</th>
            <th>Report Status</th>
            <th>Dispatch Status</th>
            <th>Action</th>
            <th>Date</th>
            <th>Manage</th>
          </tr>
        </thead>
        <tbody>
          {incidents.map((incident) => (
            <tr key={incident.id}>
              <td>
                <Link href={`/reports/${incident.reportId}`}>
                  {incident.reportId}
                </Link>
              </td>
              <td>{incident.report.description.slice(0, 60)}…</td>
              <td>
                <ReportStatusBadge status={incident.report.status} />
              </td>
              <td>
                <DispatchStatusBadge status={incident.dispatchStatus} />
              </td>
              <td>{incident.action ?? "—"}</td>
              <td>{formatDate(incident.createdAt)}</td>
              <td>
                {/* Accept / Reject — only when action not yet taken */}
                {!incident.action && (
                  <>
                    <button
                      disabled={isActing}
                      onClick={() => acceptMutation.mutate(incident.id)}
                    >
                      Accept
                    </button>
                    <button
                      disabled={isActing}
                      onClick={() => rejectMutation.mutate(incident.id)}
                    >
                      Reject
                    </button>
                  </>
                )}

                {/* Dispatch status update — only for accepted incidents */}
                {incident.action === "ACCEPTED" && (
                  <DispatchSelect
                    incidentId={incident.id}
                    currentStatus={incident.dispatchStatus}
                    isPending={isActing}
                    onChange={(id, status: DispatchStatus) =>
                      dispatchMutation.mutate({ incidentId: id, status })
                    }
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

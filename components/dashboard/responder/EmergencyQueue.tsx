"use client";

import Link from "next/link";
import {
  useEmergencyQueue,
  useResponderDispatchMutation,
} from "@/lib/queries/dashboard.queries";
import { DispatchStatusBadge } from "@/components/shared/StatusBadge";
import { DispatchSelect } from "@/components/shared/DispatchSelect";
import type { DispatchStatus } from "@/lib/types/incident";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { dateStyle: "medium" });
}

export function EmergencyQueue() {
  const {
    data: queue,
    isPending,
    isError,
    dataUpdatedAt,
  } = useEmergencyQueue();
  const dispatchMutation = useResponderDispatchMutation();

  if (isPending) return <p>Loading emergency queue…</p>;
  if (isError) return <p role="alert">Failed to load emergency queue.</p>;

  return (
    <section>
      <h2>Emergency Queue</h2>
      <p aria-live="polite">
        {queue.length} active incident{queue.length !== 1 ? "s" : ""} — last
        updated {new Date(dataUpdatedAt).toLocaleTimeString()}
      </p>

      {queue.length === 0 ? (
        <p>No active incidents.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Incident</th>
              <th>Report</th>
              <th>Location</th>
              <th>Dispatch Status</th>
              <th>Received</th>
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {queue.map((incident) => (
              <tr key={incident.id}>
                <td>{incident.id}</td>
                <td>
                  <Link href={`/reports/${incident.reportId}`}>
                    {incident.reportId}
                  </Link>
                </td>
                <td>
                  {incident.report.latitude}, {incident.report.longitude}
                </td>
                <td>
                  <DispatchStatusBadge status={incident.dispatchStatus} />
                </td>
                <td>{formatDate(incident.createdAt)}</td>
                <td>
                  <DispatchSelect
                    incidentId={incident.id}
                    currentStatus={incident.dispatchStatus}
                    isPending={dispatchMutation.isPending}
                    onChange={(id, status: DispatchStatus) =>
                      dispatchMutation.mutate({ incidentId: id, status })
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

"use client";

import Link from "next/link";
import {
  useAdminReports,
  useAdminAnalytics,
  useAdminDispatchLogs,
} from "@/lib/queries/dashboard.queries";
import {
  ReportStatusBadge,
  DispatchStatusBadge,
} from "@/components/shared/StatusBadge";
import type { ReportStatus } from "@/lib/types/report";
import type { DispatchStatus } from "@/lib/types/incident";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: "short",
    timeStyle: "short",
  });
}

// ── Analytics ───────────────────────────────────────────────────────────────
export function AnalyticsSummaryPanel() {
  const { data, isPending, isError } = useAdminAnalytics();

  if (isPending) return <p>Loading analytics…</p>;
  if (isError) return <p role="alert">Failed to load analytics.</p>;

  const reportStatuses: ReportStatus[] = [
    "PENDING",
    "UNDER_REVIEW",
    "RESOLVED",
    "REJECTED",
  ];
  const dispatchStatuses: DispatchStatus[] = [
    "DISPATCHED",
    "EN_ROUTE",
    "ON_SCENE",
    "COMPLETED",
  ];

  return (
    <section>
      <h2>Analytics Summary</h2>
      <dl>
        <dt>Total Reports</dt>
        <dd>{data.totalReports}</dd>
        <dt>Reports Today</dt>
        <dd>{data.reportsToday}</dd>
        <dt>Resolved Today</dt>
        <dd>{data.resolvedToday}</dd>
        <dt>Total Incidents</dt>
        <dd>{data.totalIncidents}</dd>
      </dl>

      <h3>Reports by Status</h3>
      <dl>
        {reportStatuses.map((s) => (
          <div key={s}>
            <dt>
              <ReportStatusBadge status={s} />
            </dt>
            <dd>{data.reportsByStatus[s] ?? 0}</dd>
          </div>
        ))}
      </dl>

      <h3>Incidents by Dispatch Status</h3>
      <dl>
        {dispatchStatuses.map((s) => (
          <div key={s}>
            <dt>
              <DispatchStatusBadge status={s} />
            </dt>
            <dd>{data.incidentsByDispatchStatus[s] ?? 0}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

// ── All Reports ──────────────────────────────────────────────────────────────
export function AllReportsTable() {
  const { data: reports, isPending, isError } = useAdminReports();

  if (isPending) return <p>Loading reports…</p>;
  if (isError) return <p role="alert">Failed to load reports.</p>;
  if (!reports.length) return <p>No reports found.</p>;

  return (
    <section>
      <h2>All Reports</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Author</th>
            <th>Description</th>
            <th>Status</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id}>
              <td>{report.id}</td>
              <td>{report.author.name}</td>
              <td>{report.description.slice(0, 60)}…</td>
              <td>
                <ReportStatusBadge status={report.status} />
              </td>
              <td>{formatDate(report.createdAt)}</td>
              <td>
                <Link href={`/reports/${report.id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

// ── Dispatch Logs ────────────────────────────────────────────────────────────
export function DispatchLogsTable() {
  const { data: logs, isPending, isError } = useAdminDispatchLogs();

  if (isPending) return <p>Loading dispatch logs…</p>;
  if (isError) return <p role="alert">Failed to load dispatch logs.</p>;
  if (!logs.length) return <p>No dispatch logs found.</p>;

  return (
    <section>
      <h2>Dispatch Logs</h2>
      <table>
        <thead>
          <tr>
            <th>Log ID</th>
            <th>Incident</th>
            <th>Status</th>
            <th>Updated By</th>
            <th>Role</th>
            <th>At</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.id}</td>
              <td>{log.incidentId}</td>
              <td>
                <DispatchStatusBadge status={log.status} />
              </td>
              <td>{log.updatedBy.name}</td>
              <td>{log.updatedBy.role}</td>
              <td>{formatDate(log.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

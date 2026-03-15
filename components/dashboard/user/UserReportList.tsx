"use client";

import Link from "next/link";
import { useMyReports } from "@/lib/queries/dashboard.queries";
import { ReportStatusBadge } from "@/components/shared/StatusBadge";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { dateStyle: "medium" });
}

export function UserReportList() {
  const { data: reports, isPending, isError } = useMyReports();

  if (isPending) return <p>Loading your reports…</p>;
  if (isError) return <p role="alert">Failed to load reports.</p>;
  if (!reports.length)
    return (
      <p>
        No reports yet.{" "}
        <Link href="/reports/create">Create your first report →</Link>
      </p>
    );

  return (
    <section>
      <h2>Your Reports</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
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
              <td>{report.description.slice(0, 80)}…</td>
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

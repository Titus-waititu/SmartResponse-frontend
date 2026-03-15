"use client";

import { use } from "react";
import Link from "next/link";
import { useReportQuery } from "@/lib/queries/report.queries";
import type { ReportStatus } from "@/lib/types/report";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const STATUS_LABELS: Record<ReportStatus, string> = {
  PENDING: "Pending",
  UNDER_REVIEW: "Under Review",
  RESOLVED: "Resolved",
  REJECTED: "Rejected",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
interface PageProps {
  params: Promise<{ reportId: string }>;
}

export default function ReportDetailPage({ params }: PageProps) {
  const { reportId } = use(params);
  const {
    data: report,
    isPending,
    isError,
    error,
    dataUpdatedAt,
  } = useReportQuery(reportId);

  // ── Loading state ─────────────────────────────────────────────────────────
  if (isPending) {
    return (
      <div>
        <p>Loading report…</p>
      </div>
    );
  }

  // ── Error state ───────────────────────────────────────────────────────────
  if (isError) {
    const msg =
      (error as { response?: { data?: { message?: string } } })?.response?.data
        ?.message ?? "Failed to load report.";
    return (
      <div>
        <p role="alert">{msg}</p>
        <Link href="/dashboard">← Back to dashboard</Link>
      </div>
    );
  }

  // ── Data ──────────────────────────────────────────────────────────────────
  return (
    <div>
      <nav>
        <Link href="/dashboard">← Dashboard</Link>
      </nav>

      <h1>Report #{report.id}</h1>

      {/* Status */}
      <p>
        <strong>Status:</strong> {STATUS_LABELS[report.status]}
      </p>

      {/* Description */}
      <section>
        <h2>Description</h2>
        <p>{report.description}</p>
      </section>

      {/* Location */}
      <section>
        <h2>Location</h2>
        <dl>
          <dt>Latitude</dt>
          <dd>{report.latitude}</dd>
          <dt>Longitude</dt>
          <dd>{report.longitude}</dd>
        </dl>
      </section>

      {/* Image */}
      {report.imageUrl && (
        <section>
          <h2>Image</h2>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={report.imageUrl}
            alt="Accident scene"
            style={{ maxWidth: "100%" }}
          />
        </section>
      )}

      {/* Author */}
      <section>
        <h2>Submitted by</h2>
        <p>
          {report.author.name} ({report.author.email})
        </p>
      </section>

      {/* Timestamps */}
      <section>
        <h2>Timestamps</h2>
        <dl>
          <dt>Created</dt>
          <dd>{formatDate(report.createdAt)}</dd>
          <dt>Last updated</dt>
          <dd>{formatDate(report.updatedAt)}</dd>
        </dl>
      </section>

      {/* Auto-refresh indicator */}
      <p aria-live="polite">
        Last fetched: {formatDate(new Date(dataUpdatedAt).toISOString())}{" "}
        <span>(auto-refreshes every 10 s)</span>
      </p>
    </div>
  );
}

import type { ReportStatus } from "@/lib/types/report";
import type { DispatchStatus } from "@/lib/types/incident";

// ---------------------------------------------------------------------------
// Report status labels + colours
// ---------------------------------------------------------------------------
const REPORT_STATUS_META: Record<
  ReportStatus,
  { label: string; className: string }
> = {
  PENDING: { label: "Pending", className: "badge-pending" },
  UNDER_REVIEW: { label: "Under Review", className: "badge-review" },
  RESOLVED: { label: "Resolved", className: "badge-resolved" },
  REJECTED: { label: "Rejected", className: "badge-rejected" },
};

// ---------------------------------------------------------------------------
// Dispatch status labels + colours
// ---------------------------------------------------------------------------
const DISPATCH_STATUS_META: Record<
  DispatchStatus,
  { label: string; className: string }
> = {
  DISPATCHED: { label: "Dispatched", className: "badge-dispatched" },
  EN_ROUTE: { label: "En Route", className: "badge-enroute" },
  ON_SCENE: { label: "On Scene", className: "badge-onscene" },
  COMPLETED: { label: "Completed", className: "badge-completed" },
};

// ---------------------------------------------------------------------------
// Components
// ---------------------------------------------------------------------------
export function ReportStatusBadge({ status }: { status: ReportStatus }) {
  const { label, className } = REPORT_STATUS_META[status];
  return (
    <span className={className} aria-label={`Status: ${label}`}>
      {label}
    </span>
  );
}

export function DispatchStatusBadge({ status }: { status: DispatchStatus }) {
  const { label, className } = DISPATCH_STATUS_META[status];
  return (
    <span className={className} aria-label={`Dispatch status: ${label}`}>
      {label}
    </span>
  );
}

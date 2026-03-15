import type { ReportStatus } from "@/lib/types/report";
import type { DispatchStatus } from "@/lib/types/incident";

// ---------------------------------------------------------------------------
// Report status labels + colours
// ---------------------------------------------------------------------------
const REPORT_STATUS_META: Record<
  ReportStatus,
  { label: string; className: string }
> = {
  PENDING: { label: "Pending", className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800" },
  UNDER_REVIEW: { label: "Under Review", className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800" },
  RESOLVED: { label: "Resolved", className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800" },
  REJECTED: { label: "Rejected", className: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700" },
};

// ---------------------------------------------------------------------------  
// Dispatch status labels + colours
// ---------------------------------------------------------------------------  
const DISPATCH_STATUS_META: Record<
  DispatchStatus,
  { label: string; className: string }
> = {
  DISPATCHED: { label: "Dispatched", className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800" },
  EN_ROUTE: { label: "En Route", className: "bg-brand-red/10 text-brand-red dark:bg-brand-red/20 dark:text-red-400 border border-brand-red/20 dark:border-brand-red/30" },
  ON_SCENE: { label: "On Scene", className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800" },
  COMPLETED: { label: "Completed", className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800" },
};

// ---------------------------------------------------------------------------  
// Components
// ---------------------------------------------------------------------------  
export function ReportStatusBadge({ status }: { status: ReportStatus }) {       
  const { label, className } = REPORT_STATUS_META[status];
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${className}`} aria-label={`Status: ${label}`}>
      {label}
    </span>
  );
}

export function DispatchStatusBadge({ status }: { status: DispatchStatus }) {   
  const { label, className } = DISPATCH_STATUS_META[status];
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center whitespace-nowrap ${className}`} aria-label={`Dispatch status: ${label}`}>       

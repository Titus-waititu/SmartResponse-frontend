"use client";

import Link from "next/link";
import { useMyReports } from "@/lib/queries/dashboard.queries";
import { ReportStatusBadge } from "@/components/shared/StatusBadge";
import { ChevronRight, FileImage } from "lucide-react";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function UserReportList() {
  const { data: reports, isPending, isError } = useMyReports();

  if (isPending)
    return (
      <div className="flex justify-center items-center h-48">
        <div className="w-8 h-8 border-4 border-brand-red border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (isError)
    return (
      <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-800">
        Failed to load reports. Please try again.
      </div>
    );

  if (!reports?.length) {
    return (
      <div className="text-center py-12 px-4 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800">
        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileImage className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No Reports Yet</h3>
        <p className="text-slate-500 mb-6 max-w-sm mx-auto">
          You haven&apos;t submitted any accident reports yet. When you do, they
          will appear here.
        </p>
        <Link
          href="/reports/create"
          className="text-brand-red font-medium hover:underline inline-flex items-center gap-1"
        >
          Create your first report <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reports.map((report) => (
        <div
          key={report.id}
          className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-brand-red/50 dark:hover:border-brand-red/50 transition bg-slate-50 dark:bg-slate-800/50 group"
        >
          <div className="flex-1 mb-4 sm:mb-0 pr-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-bold bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded text-slate-600 dark:text-slate-300">
                #{report.id.substring(0, 8)}
              </span>
              <ReportStatusBadge status={report.status} />
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 font-medium mb-1 line-clamp-1">
              {report.description || "No description provided."}
            </p>
            <div suppressHydrationWarning className="text-xs text-slate-500">
              Submitted on {formatDate(report.createdAt)}
            </div>
          </div>

          <div className="sm:text-right">
            {/* Mock Severity Score inline */}
            <div className="hidden sm:flex items-center justify-end gap-2 mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Severity
              </span>
              <span
                className={`text-sm font-bold px-2 py-0.5 rounded ${report.severityScore && report.severityScore > 70 ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" : "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"}`}
              >
                {report.severityScore || "Pending"}
              </span>
            </div>
            <Link
              href={`/reports/${report.id}`}
              className="inline-flex items-center justify-center w-full sm:w-auto px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-sm font-semibold transition text-slate-700 dark:text-slate-300 shadow-sm"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

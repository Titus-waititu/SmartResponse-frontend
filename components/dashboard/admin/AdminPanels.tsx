"use client";

import Link from "next/link";
import { format } from "date-fns";
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
import { PieChart, TrendingUp, AlertTriangle, Users, MapPin, Activity, ShieldCheck, Map as MapIcon, RotateCw, ExternalLink } from "lucide-react";

function formatDateParams(iso: string) {
  try {
    return format(new Date(iso), "MMM dd, p");
  } catch {
    return iso;
  }
}

// ── Analytics ───────────────────────────────────────────────────────────────
export function AnalyticsSummaryPanel() {
  const { data: analytics, isPending, isError } = useAdminAnalytics();

  if (isPending) return <div className="animate-pulse h-32 md:h-64 bg-slate-800 rounded-xl mb-6"></div>;
  if (isError || !analytics) return <p role="alert" className="text-brand-red mb-6">Failed to load analytics.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-slate-800 dark:text-white shadow-xl flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-500/20 text-blue-400 flex items-center justify-center rounded-xl shrink-0">
           <TrendingUp className="w-6 h-6" />
        </div>
        <div>
           <p className="text-sm text-slate-400">Total Reports</p>
           <h3 className="text-3xl font-bold">{analytics.totalReports}</h3>
           <p className="text-xs text-brand-red font-medium mt-1">+{analytics.reportsToday} today</p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-slate-800 dark:text-white shadow-xl flex items-center gap-4">
        <div className="w-12 h-12 bg-emerald-500/20 text-emerald-500 flex items-center justify-center rounded-xl shrink-0">
           <AlertTriangle className="w-6 h-6" />
        </div>
        <div>
           <p className="text-sm text-slate-400">Total Incidents</p>
           <h3 className="text-3xl font-bold">{analytics.totalIncidents}</h3>
           <p className="text-xs text-emerald-500 font-medium mt-1">+{analytics.resolvedToday} resolved today</p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-slate-800 dark:text-white shadow-xl flex items-center gap-4">
        <div className="w-12 h-12 bg-amber-500/20 text-amber-500 flex items-center justify-center rounded-xl shrink-0">
           <Activity className="w-6 h-6" />
        </div>
        <div>
           <p className="text-sm text-slate-400">Avg Resolution</p>
           <h3 className="text-3xl font-bold">2.4h</h3>
        </div>
      </div>
      
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-slate-800 dark:text-white shadow-xl flex items-center gap-4">
        <div className="w-12 h-12 bg-brand-red/20 text-brand-red flex items-center justify-center rounded-xl shrink-0">
           <Users className="w-6 h-6" />
        </div>
        <div>
           <p className="text-sm text-slate-400">Active Responders</p>
           <h3 className="text-3xl font-bold">18</h3>
        </div>
      </div>
    </div>
  );
}

// ── All Reports ──────────────────────────────────────────────────────────────
export function AllReportsTable() {
  const { data: reports, isPending, isError } = useAdminReports();

  if (isPending) return <div className="animate-pulse h-96 bg-slate-800 rounded-xl my-6"></div>;
  if (isError || !reports) return <p role="alert" className="text-brand-red mb-6">Failed to load reports.</p>;

  // calculate summary data based on real reports for dummy chart
  const underReviewCnt = reports.filter(r => r.status === "UNDER_REVIEW").length;
  const pendingCnt = reports.filter(r => r.status === "PENDING").length;
  const resolvedCnt = reports.filter(r => r.status === "RESOLVED").length;
  const rejectedCnt = reports.filter(r => r.status === "REJECTED").length;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-slate-800 dark:text-white shadow-xl mb-6 flex flex-col xl:flex-row gap-8">
      
      <div className="xl:w-2/3">
          <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Recent Reports Overview</h2>
              <button className="text-slate-400 hover:text-white transition flex items-center gap-2 text-sm"><RotateCw className="w-4 h-4"/> Refresh</button>
          </div>
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-150">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="pb-3 px-2 font-medium">ID</th>
                  <th className="pb-3 px-2 font-medium">Author</th>
                  <th className="pb-3 px-2 font-medium">Description</th>
                  <th className="pb-3 px-2 font-medium">Status</th>
                  <th className="pb-3 px-2 font-medium">Created</th>
                  <th className="pb-3 px-2 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {reports.slice(0, 5).map((report) => (
                  <tr key={report.id} className="border-b border-slate-800/50 hover:bg-white/5 transition group">
                    <td className="py-3 px-2 font-mono text-slate-400 text-xs">#{report.id.substring(0,8)}</td>
                    <td className="py-3 px-2 font-medium text-slate-300">{report.author.name}</td>
                    <td className="py-3 px-2 text-slate-400 max-w-50 truncate">{report.description.slice(0, 60)}{report.description.length > 60 ? "..." : ""}</td>
                    <td className="py-3 px-2">
                        <ReportStatusBadge status={report.status} />
                    </td>
                    <td suppressHydrationWarning className="py-3 px-2 text-slate-400 text-xs">{formatDateParams(report.createdAt)}</td>
                    <td className="py-3 px-2 text-right">
                        <Link href={`/reports/${report.id}`} className="inline-flex items-center justify-center p-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition">
                            <ExternalLink className="w-4 h-4" />
                        </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </div>
      
      {/* Visualizations Column */}
      <div className="xl:w-1/3 flex flex-col gap-6">
          <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800/50 relative overflow-hidden">
               <h3 className="text-sm font-medium text-slate-400 mb-4 flex items-center gap-2"><PieChart className="w-4 h-4" /> Reports Distribution</h3>
               <div className="w-full h-32 flex justify-center items-center">
                   {/* CSS Trick Donut Chart */}
                   <div style={{
                       width: '120px', height: '120px', borderRadius: '50%',
                       background: 'conic-gradient(#3b82f6 0% 25%, #f59e0b 25% 45%, #10b981 45% 90%, #ef4444 90% 100%)',
                       display: 'flex', alignItems: 'center', justifyItems: 'center'
                   }}>
                       <div className="w-20 h-20 bg-slate-950 rounded-full flex flex-col justify-center items-center absolute" style={{marginLeft: "20px", marginTop: "20px"}}>
                            <span className="font-bold text-lg">{reports.length}</span>
                            <span className="text-[10px] text-slate-400">Total</span>
                       </div>
                   </div>
               </div>
               <div className="grid grid-cols-2 gap-2 mt-6 text-xs font-medium">
                   <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div>Pending ({pendingCnt})</div>
                   <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-amber-500"></div>Review ({underReviewCnt})</div>
                   <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div>Resolved ({resolvedCnt})</div>
                   <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-brand-red"></div>Rejected ({rejectedCnt})</div>
               </div>
          </div>
          
          <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800/50">
               <h3 className="text-sm font-medium text-slate-400 mb-4 flex items-center gap-2"><MapIcon className="w-4 h-4" /> Hotspot Map</h3>
               <div className="w-full h-36 bg-slate-800/50 rounded-lg flex items-center justify-center border border-slate-800 relative overflow-hidden">
                   <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(circle at 50% 50%, #3b82f6 10%, transparent 20%)', backgroundSize: '20px 20px'}}></div>
                   <MapPin className="text-slate-500 w-8 h-8 opacity-50 z-10" />
                   <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-brand-red/50 rounded-full animate-ping"></div>
                   <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-amber-500/50 rounded-full animate-ping" style={{animationDelay: "1s"}}></div>
               </div>
          </div>
      </div>
    </div>
  );
}

// ── Dispatch Logs ────────────────────────────────────────────────────────────
export function DispatchLogsTable() {
  const { data: logs, isPending, isError } = useAdminDispatchLogs();

  if (isPending) return <div className="animate-pulse h-32 bg-slate-800 rounded-xl"></div>;
  if (isError || !logs) return <p role="alert" className="text-brand-red">Failed to load dispatch logs.</p>;

  return (
    <div>
      <h2 className="text-lg font-bold mb-6 text-slate-100 flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-blue-500"/> Activity & Dispatch Logs</h2>
      <div className="overflow-x-auto pr-2 custom-scrollbar h-75 overflow-y-auto">
        <ul className="text-sm space-y-3">
          {logs.map((log) => (
            <li key={log.id} className="bg-slate-950/50 p-3 rounded-lg border border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-l-2 border-l-blue-500">
               <div className="flex flex-col gap-1">
                 <span className="text-slate-300 font-medium">
                  {log.updatedBy.name} <span className="text-slate-500 font-normal">({log.updatedBy.role})</span> updated incident
                  <span className="text-blue-400 font-mono text-xs ml-2 bg-blue-500/10 px-1 py-0.5 rounded">#{log.incidentId.substring(0,8)}</span>
                 </span>
                 <div className="flex items-center gap-2 mt-1">
                    <DispatchStatusBadge status={log.status} />
                 </div>
               </div>
               <span suppressHydrationWarning className="text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded w-fit shrink-0">
                {formatDateParams(log.createdAt)}
               </span>
            </li>
          ))}
          {logs.length === 0 && (
             <li className="text-slate-500 text-center py-4">No recent activity logs.</li>
          )}
        </ul>
      </div>
    </div>

  );
}


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
import { MapPin, Navigation, SignalHigh, Image as ImageIcon, CheckCircle, XCircle } from "lucide-react";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { dateStyle: "medium", timeStyle: "short" });  
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

  if (isPending) return (
    <div className="flex justify-center items-center h-48">
      <div className="w-8 h-8 border-4 border-brand-red border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
  if (isError) return <p role="alert" className="text-red-500">Failed to load incidents.</p>;
  if (!incidents?.length) return <div className="text-center py-12 text-slate-500">No incidents assigned to you.</div>;

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-12rem)] w-full gap-6">
      
      {/* Map Panel Container */}
      <section className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col overflow-hidden relative shadow-sm">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm absolute w-full top-0 left-0">
          <h2 className="text-lg font-bold">Map Panel</h2>
          <div className="flex items-center gap-4">
             <span className="text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">System Online</span>
          </div>
        </div>

        <div className="flex-1 w-full h-full relative mt-14 bg-slate-100 dark:bg-slate-800">
           {/* Mock Map Image MapPanel.png visually rebuilt */}
           <img src="https://assets.website-files.com/6206019ea912f205ab3ba486/62150a00df55b3ff75c1d3fe_map.webp" alt="Map" className="w-full h-full object-cover" />
           <div className="absolute inset-0 bg-blue-900/10 dark:bg-slate-900/40 mix-blend-multiply" />
           
           {/* Pins */}
           <div className="absolute top-[30%] left-[20%]"><MapPin className="w-8 h-8 text-brand-red drop-shadow-md" /></div>
           <div className="absolute top-[50%] left-[40%]"><MapPin className="w-8 h-8 text-amber-500 drop-shadow-md" /></div>
           <div className="absolute top-[70%] left-[60%]"><MapPin className="w-8 h-8 text-brand-red drop-shadow-md" /></div>
           <div className="absolute top-[20%] left-[70%]"><MapPin className="w-8 h-8 text-amber-500 drop-shadow-md" /></div>

           {/* Mock Map Popup */}
           <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 w-80">
              <h4 className="text-xs font-bold uppercase text-slate-500 mb-2">Uploaded Images</h4>
              <div className="grid grid-cols-2 gap-2">
                 <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded-lg overflow-hidden line-clamp-2 text-[10px] text-center"><img src="https://images.unsplash.com/photo-1543393470-bce4eb3e9db7?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover"/></div>
                 <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded-lg overflow-hidden line-clamp-2 text-[10px] text-center"><img src="https://images.unsplash.com/photo-1543393470-bce4eb3e9db7?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover"/></div>
              </div>
           </div>
        </div>
      </section>

      {/* Right Column: Assigned Cases & Details */}
      <div className="w-full lg:w-100 flex flex-col gap-6 overflow-hidden">
        
        {/* Assigned Cases List */}
        <section className="flex-1 flex flex-col min-h-0 bg-transparent">
          <h2 className="text-xl font-bold mb-4 px-1">Assigned Cases</h2>
          <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar pr-2">
            {incidents.map((incident) => (
              <div key={incident.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition">
                <div className="flex justify-between items-start mb-3">
                  <span className={`text-xs px-2 py-1 rounded font-bold uppercase tracking-wider ${
                      (incident.report.severityScore || 0) > 70 ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-500' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-500'
                  }`}>
                    Severity: {(incident.report.severityScore || 0) > 70 ? 'High' : 'Medium'}
                  </span>
                  <DispatchStatusBadge status={incident.dispatchStatus} />
                </div>
                
                <div className="space-y-1 mb-4 text-sm text-slate-600 dark:text-slate-300">
                  <p><span className="font-semibold text-slate-900 dark:text-slate-100">Location:</span> {incident.report.latitude?.toFixed(4)}, {incident.report.longitude?.toFixed(4)}</p>
                  <p suppressHydrationWarning><span className="font-semibold text-slate-900 dark:text-slate-100">Time:</span> {formatDate(incident.createdAt)}</p>
                </div>

                {!incident.action ? (
                  <div className="flex gap-2">
                    <button
                      disabled={isActing}
                      onClick={() => acceptMutation.mutate(incident.id)}
                      className="flex-1 flex justify-center items-center gap-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg font-bold text-sm transition disabled:opacity-50"
                    >
                      <CheckCircle className="w-4 h-4" /> Accept
                    </button>
                    <button
                      disabled={isActing}
                      onClick={() => rejectMutation.mutate(incident.id)}
                      className="flex-1 flex justify-center items-center gap-1 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white py-2 rounded-lg font-bold text-sm transition disabled:opacity-50"
                    >
                      <XCircle className="w-4 h-4" /> Reject
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center bg-brand-red text-white py-2 rounded-lg font-bold transition">
                      A
                    </button>
                  </div>
                ) : incident.action === "ACCEPTED" ? (
                  <div className="mt-2 border-t border-slate-100 dark:border-slate-800 pt-3">
                     <span className="block text-xs font-semibold text-slate-500 mb-2">Update Dispatch Status</span>
                     <DispatchSelect
                        incidentId={incident.id}
                        currentStatus={incident.dispatchStatus}
                        isPending={isActing}
                        onChange={(id, status: DispatchStatus) =>
                          dispatchMutation.mutate({ incidentId: id, status })       
                        }
                      />
                  </div>
                ) : (
                  <div className="text-sm font-medium text-slate-400 bg-slate-100 dark:bg-slate-800/50 p-2 rounded text-center">
                    Action: {incident.action}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Case Details View (Mock Selected view from UI) */}
        {incidents.length > 0 && incidents[0] && (
          <section className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm shrink-0">
             <h3 className="font-bold mb-4 text-lg">Case Details View</h3>
             
             <div className="space-y-4">
                <div>
                   <h4 className="text-sm font-bold mb-2">AI Severity Breakdown</h4>
                   <div className="flex items-center justify-between">
                     <div className="flex flex-col">
                        <span className="text-sm text-slate-500">Score:</span>
                        <span className="text-2xl font-black">{incidents[0].report.severityScore || 85}/100</span>
                     </div>
                     <div className="flex items-center gap-2 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-full">
                        <span className="text-sm font-semibold">{incidents[0].dispatchStatus}</span>
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                     </div>
                   </div>
                </div>

                <div className="pt-2">
                   <div className="text-xs text-slate-500 font-semibold mb-1">Injuries Detected</div>
                   <div className="text-sm font-medium">Severe Lacerations, Fractures</div>
                </div>

                <div className="pt-2 flex gap-3">
                   <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 rounded-lg text-sm transition">Mark as Resolved</button>
                   <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2.5 rounded-lg text-sm transition">Contact Reporter</button>
                </div>
             </div>
          </section>
        )}
      </div>

    </div>

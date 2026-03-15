"use client";

import Link from "next/link";
import {
  useEmergencyQueue,
  useResponderDispatchMutation,
} from "@/lib/queries/dashboard.queries";
import { DispatchStatusBadge } from "@/components/shared/StatusBadge";
import { DispatchSelect } from "@/components/shared/DispatchSelect";
import type { DispatchStatus } from "@/lib/types/incident";
import { MapPin, Navigation, SignalHigh, Image as ImageIcon } from "lucide-react";

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

  if (isPending) return (
    <div className="flex justify-center items-center h-48">
      <div className="w-8 h-8 border-4 border-brand-red border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
  if (isError) return <p role="alert">Failed to load emergency queue.</p>;      

  return (
    <div className="flex h-[calc(100vh-12rem)] w-full gap-6">
      {/* Left Panel: Emergency Queue */}
      <section className="w-1/3 min-w-87.5 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col overflow-hidden text-white shadow-xl shadow-black/20 relative">
        <div className="p-5 border-b border-white/10 flex justify-between items-center bg-slate-900/50 backdrop-blur-md z-10">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <SignalHigh className="w-5 h-5 text-brand-red animate-pulse" />
            Emergency Queue
          </h2>
          <span className="text-xs text-slate-400 font-medium">Auto-refresh On</span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {queue.length === 0 ? (
            <div className="text-center py-12 text-slate-500">No active incidents.</div>
          ) : (queue.map((incident, idx) => (
             <div key={incident.id} className={`p-4 border rounded-xl relative ${idx === 0 ? 'border-brand-red bg-brand-red/5' : 'border-white/10 bg-white/5 hover:border-white/20'} transition`}>
               {/* Priority Tag */}
               <div className="mb-3">
                 <span className={`text-[10px] uppercase font-black tracking-widest px-2 py-1 rounded inline-block ${
                   (incident.report.severityScore || 0) > 80 ? 'bg-brand-red text-white' : 
                   (incident.report.severityScore || 0) > 50 ? 'bg-amber-500 text-black' : 
                   'bg-blue-500 text-white'
                 }`}>
                   {(incident.report.severityScore || 0) > 80 ? 'Critical' : (incident.report.severityScore || 0) > 50 ? 'High' : 'Medium'}
                 </span>
               </div>
               
               <h3 className="font-bold text-lg mb-1 line-clamp-1">Incident #{incident.id.substring(0, 5)} - {incident.report.description.substring(0,15) || "Unknown"}...</h3>
               <p className="text-xs text-slate-400 mb-4 line-clamp-2">{incident.report.description || "Awaiting details..."}</p>
               
               <div className="flex items-end justify-between">
                 <div className="flex gap-2">
                   {/* Mini map placeholder */}
                   <div className="w-16 h-12 bg-slate-800 rounded border border-white/10 relative overflow-hidden flex items-center justify-center">
                     <ImageIcon className="w-4 h-4 text-slate-600" />
                     <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-brand-red" />
                   </div>
                 </div>
                 
                 <div className="text-right">
                   {idx === 0 ? (
                      <button className="px-6 py-2 rounded-full bg-brand-red hover:bg-red-600 text-white font-bold text-sm shadow-lg shadow-red-500/20 transition">
                        Respond Now
                      </button>
                   ) : (
                      <DispatchSelect
                        incidentId={incident.id}
                        currentStatus={incident.dispatchStatus}
                        isPending={dispatchMutation.isPending}
                        onChange={(id, status: DispatchStatus) =>
                          dispatchMutation.mutate({ incidentId: id, status })       
                        }
                      />
                   )}
                 </div>
               </div>
             </div>
          )))}
        </div>
      </section>


      {/* Right Panel: Case Detail & Map */}
      <section className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col overflow-hidden text-white shadow-xl shadow-black/20">
         <div className="p-5 border-b border-white/10 flex justify-between items-center">
           <h2 className="text-xl font-bold">Case Detail Panel</h2>
           <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input type="checkbox" className="sr-only" defaultChecked />
                <div className="block bg-slate-700 w-10 h-6 rounded-full"></div>
                <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform translate-x-4"></div>
              </div>
           </label>
         </div>

         {queue.length > 0 && queue[0] && (
           <div className="flex-1 flex flex-col p-6 overflow-y-auto">
             <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                     {/* Circle Progress */}
                     <div className="relative w-20 h-20 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                           <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                           <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="226" strokeDashoffset={226 - (226 * (queue[0].report.severityScore || 92)) / 100} className="text-brand-red" />
                        </svg>
                        <div className="absolute text-center flex flex-col mt-1">
                          <span className="text-xl font-black">{queue[0].report.severityScore || 92}<span className="text-xs">/100</span></span>
                        </div>
                     </div>
                     <div className="flex flex-col gap-2 ml-4">
                        <span className="bg-white/10 text-white text-xs px-2 py-1 rounded w-fit font-semibold uppercase tracking-wider">High Risk</span>
                        <span className="bg-brand-red/20 text-brand-red border border-brand-red/30 text-xs px-2 py-1 rounded w-fit font-bold uppercase tracking-wider">Critical</span>
                     </div>
                  </div>
                </div>
                <button className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center hover:bg-white/10 transition">
                  <SignalHigh className="w-4 h-4 text-slate-300" />
                </button>
             </div>

             <div className="space-y-2 mb-6">
                <p className="text-slate-300 text-sm"><span className="text-slate-400 font-medium">AI Injury Detection:</span> Severe Head Trauma, Internal Bleeding</p>
                <p className="text-slate-300 text-sm"><span className="text-slate-400 font-medium">Recommended Response:</span> Immediate Transport, Fire Suppression</p>
             </div>

             {/* Large Map Mock */}
             <div className="flex-1 bg-slate-800 rounded-xl relative overflow-hidden min-h-75 border border-white/10">
                <img src="https://assets.website-files.com/6206019ea912f205ab3ba486/62150a00df55b3ff75c1d3fe_map.webp" alt="Map" className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply" />
                
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <MapPin className="w-10 h-10 text-brand-red drop-shadow-md" />
                  <div className="w-8 h-8 bg-brand-red/20 rounded-full -mt-5 animate-ping" />
                </div>

                <div className="absolute bottom-4 right-4 bg-slate-900/90 backdrop-blur border border-white/20 text-white px-4 py-2 rounded-lg font-bold shadow-xl shadow-black">
                   ETA: 4 MIN
                </div>
             </div>

             {/* Actions */}
             <div className="flex gap-4 mt-6">
               <button className="flex-1 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-white transition">Confirm</button>
               <button className="flex-1 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 font-bold text-white transition">Arrived</button>
               <button className="flex-1 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 font-bold text-white transition">Case Closed</button>
             </div>
           </div>
         )}
      </section>
    </div>

  );
}

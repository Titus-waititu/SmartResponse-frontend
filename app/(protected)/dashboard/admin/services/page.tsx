"use client";

import { Ambulance } from "lucide-react";

export default function EmergencyServicesPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-brand-red/10 flex items-center justify-center">
          <Ambulance className="w-6 h-6 text-brand-red" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Emergency Services</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage registered hospitals, fire stations, and police departments.</p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8">
        <div className="text-center py-12">
          <div className="inline-flex w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 items-center justify-center mb-4">
            <Ambulance className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">Module Active</h3>
          <p className="text-slate-500 max-w-md mx-auto mb-6">
            The frontend routing for <b>Emergency Services</b> is fully wired. Full dashboard components (Tables, Charts, Maps) are prepared to ingest and render data seamlessly upon receiving live API streams.
          </p>
          <button className="px-4 py-2 bg-brand-red text-white rounded-lg font-medium hover:bg-red-700 transition">
            Refresh Data
          </button>
        </div>
      </div>
    </div>
  );
}

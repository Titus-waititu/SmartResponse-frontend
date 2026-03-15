import { RoleDashboardGuard } from "@/components/auth/RoleDashboardGuard";
import { UserReportList } from "@/components/dashboard/user/UserReportList";
import Link from "next/link";
import type { Metadata } from "next";
import { FileWarning, Clock, Activity, ShieldAlert } from "lucide-react";

export const metadata: Metadata = { title: "User Dashboard" };

export default function UserDashboardPage() {
  return (
    <RoleDashboardGuard dashboardPath="/dashboard/user">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 border-l-4 border-l-blue-500">
            <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Reports Submitted</div>
            <div className="text-3xl font-bold text-blue-600">12</div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 border-l-4 border-l-amber-500">
            <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Active Cases</div>
            <div className="text-3xl font-bold text-amber-500">3</div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 border-l-4 border-l-brand-red">
            <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">AI Severity Detected</div>
            <div className="text-3xl font-bold text-brand-red">7.8<span className="text-lg text-slate-400 font-normal">/10 Avg.</span></div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 border-l-4 border-l-green-500">
            <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Emergency Status</div>
            <div className="text-xl font-bold text-green-500 mt-2">Active</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           <div className="lg:col-span-2 space-y-6">
              {/* Add New Report Quick Action */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6">
                 <div className="flex items-center justify-between mb-6">
                   <h2 className="text-xl font-bold">Report Accident</h2>
                   <Link href="/reports/create" className="text-sm text-brand-red font-medium hover:underline flex items-center gap-1">
                      See all reports
                   </Link>
                 </div>
                 
                 <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <FileWarning className="w-12 h-12 text-slate-400 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Need to report an incident?</h3>
                    <p className="text-slate-500 text-sm text-center mb-6 max-w-sm">Use our AI-powered reporting tool to submit photos and automatically alert emergency services.</p>
                    <Link href="/reports/create" className="px-6 py-3 bg-brand-red hover:bg-red-600 text-white font-semibold rounded-xl transition shadow-lg shadow-red-500/20">
                      Report New Accident
                    </Link>
                 </div>
              </div>

              {/* History / List */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6">
                <h2 className="text-xl font-bold mb-6">Recent Reports</h2>
                <UserReportList />
              </div>
           </div>

           {/* AI Analysis Side Panel Wrapper */}
           <div className="space-y-6">
              <div className="bg-slate-900 rounded-2xl shadow-xl p-6 text-white border border-slate-800 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/20 blur-3xl rounded-full" />
                 
                 <h2 className="text-xl font-bold mb-6">AI Analysis</h2>
                 
                 {/* Gauge Mock */}
                 <div className="flex flex-col items-center justify-center py-6 border-b border-white/10 mb-6">
                    <div className="relative w-40 h-24 overflow-hidden mb-4">
                       <div className="absolute top-0 left-0 w-40 h-40 rounded-full border-12 border-slate-800"></div>
                       <div className="absolute top-0 left-0 w-40 h-40 rounded-full border-12 border-brand-red border-b-transparent border-r-transparent transform rotate-45"></div>
                    </div>
                    <div className="absolute text-center mt-12">
                      <div className="text-4xl font-black">85<span className="text-xl text-slate-400">%</span></div>
                    </div>
                    <div className="text-sm font-semibold tracking-wider uppercase text-slate-400">Severity Score: 85/100</div>
                 </div>

                 <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <div className="text-xs text-slate-400 font-semibold uppercase mb-1">Injury Detection:</div>
                      <div className="text-sm font-medium">Severe Lacerations, Possible Fractures</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-semibold uppercase mb-1">Vehicle Damage:</div>
                      <div className="text-sm font-medium">Fire Dept, Police</div>
                    </div>
                 </div>

                 <div className="bg-white/5 rounded-xl p-4 mb-6 border border-white/10">
                    <div className="text-xs text-slate-400 font-semibold uppercase mb-1">Recommended Services:</div>
                    <div className="flex items-center justify-between">
                       <div className="text-sm font-medium">Ambulance, Airbag Deployment</div>
                       <span className="px-3 py-1 bg-brand-red text-white text-xs font-bold rounded-lg shadow-lg shadow-red-500/20">Dispatched</span>
                    </div>
                 </div>

                 <h3 className="text-sm font-bold uppercase tracking-wider mb-4 border-b border-white/10 pb-2">Realtime Timeline</h3>
                 <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-slate-700 before:to-transparent">
                    {/* Timeline items mock */}
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-emerald-500 bg-slate-900 text-emerald-500 shadow shrink-0 z-10">
                          <Activity className="w-3 h-3" />
                        </div>
                        <div className="w-[calc(100%-3rem)] md:w-[calc(50%-1.5rem)] p-3 rounded-xl bg-white/5 border border-white/10">
                            <div className="flex items-center justify-between mb-1">
                                <h4 className="text-sm font-bold text-emerald-400">Report Received</h4>
                            </div>
                            <div className="text-xs text-slate-400">12:03 PM</div>
                        </div>
                    </div>
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                        <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-emerald-500 bg-slate-900 text-emerald-500 shadow shrink-0 z-10">
                          <Activity className="w-3 h-3" />
                        </div>
                        <div className="w-[calc(100%-3rem)] md:w-[calc(50%-1.5rem)] p-3 rounded-xl bg-white/5 border border-white/10">
                            <div className="flex items-center justify-between mb-1">
                                <h4 className="text-sm font-bold text-emerald-400">AI Analyzing</h4>
                            </div>
                            <div className="text-xs text-slate-400">12:03 PM</div>
                        </div>
                    </div>
                     <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                        <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-emerald-500 bg-slate-900 text-emerald-500 shadow shrink-0 z-10">
                          <Activity className="w-3 h-3" />
                        </div>
                        <div className="w-[calc(100%-3rem)] md:w-[calc(50%-1.5rem)] p-3 rounded-xl bg-white/5 border border-white/10">
                            <div className="flex items-center justify-between mb-1">
                                <h4 className="text-sm font-bold text-emerald-400">Services Dispatched</h4>
                            </div>
                            <div className="text-xs text-slate-400">12:03 PM</div>
                        </div>
                    </div>
                 </div>

                 <div className="mt-8">
                     <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-brand-red font-bold uppercase tracking-wider">En Route</span>
                        <Ambulance className="w-5 h-5 text-brand-red" />
                     </div>
                     <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-red w-3/4 rounded-full relative">
                           <div className="absolute top-0 right-0 w-2 h-full bg-white/50 blur-[1px]"></div>
                        </div>
                     </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </RoleDashboardGuard>
  );
}

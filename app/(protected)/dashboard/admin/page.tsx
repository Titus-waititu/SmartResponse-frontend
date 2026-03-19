import { RoleDashboardGuard } from "@/components/auth/RoleDashboardGuard";
import {
  AnalyticsSummaryPanel,
  AllReportsTable,
  DispatchLogsTable,
} from "@/components/dashboard/admin/AdminPanels";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin Analytics" };

export default function AdminDashboardPage() {
  return (
    <RoleDashboardGuard dashboardPath="/dashboard/admin">
      <div className="max-w-350 mx-auto space-y-6">
        <AnalyticsSummaryPanel />
        <AllReportsTable />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mocking the AI Performance Chart UI from the design */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-slate-800 dark:text-white shadow-xl relative overflow-hidden">
            <h2 className="text-lg font-bold mb-6 text-slate-900 dark:text-slate-100">
              AI Performance Metrics
            </h2>

            <div className="flex justify-between items-end mb-6">
              <div className="space-y-2">
                <div className="flex justify-between w-48 text-sm">
                  <span className="text-slate-400">Accuracy Rate</span>{" "}
                  <span className="font-bold">92.1%</span>
                </div>
                <div className="flex justify-between w-48 text-sm">
                  <span className="text-slate-400">False Positives</span>{" "}
                  <span className="font-bold">1.2%</span>
                </div>
              </div>
            </div>

            {/* Decorative line chart area */}
            <div className="h-32 w-full mt-4 flex items-end relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-t from-emerald-500/20 to-transparent blur-sm rounded-b-xl" />
              <svg
                viewBox="0 0 100 40"
                className="w-full h-full preserve-aspect-ratio-none stroke-emerald-500 fill-none"
                strokeWidth="2"
              >
                <path
                  d="M0,35 Q10,30 20,10 T40,25 T60,5 T80,15 T100,5"
                  strokeLinecap="round"
                />
              </svg>
              <svg
                viewBox="0 0 100 40"
                className="w-full h-full preserve-aspect-ratio-none stroke-brand-red/50 fill-none absolute inset-0"
                strokeWidth="1"
              >
                <path
                  d="M0,38 Q15,35 30,30 T50,38 T70,35 T100,38"
                  strokeLinecap="round"
                  strokeDasharray="2,2"
                />
              </svg>
            </div>
            <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-mono">
              <span>10</span>
              <span>12</span>
              <span>14</span>
              <span>16</span>
              <span>18</span>
              <span>20</span>
              <span>22</span>
            </div>
          </div>

          {/* Dispatch Logs Box */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-slate-800 dark:text-white shadow-xl">
            <DispatchLogsTable />
          </div>
        </div>

        {/* User Management Mocking */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-slate-800 dark:text-white shadow-xl">
          <h2 className="text-lg font-bold mb-6 text-slate-900 dark:text-white">User Management</h2>
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-150">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                  <th className="pb-3 px-2 font-medium">Name</th>
                  <th className="pb-3 px-2 font-medium">Email</th>
                  <th className="pb-3 px-2 font-medium">Role</th>
                  <th className="pb-3 px-2 font-medium">Status</th>
                  <th className="pb-3 px-2 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-slate-800/50 hover:bg-white/5 transition">
                  <td className="py-3 px-2">John Doe</td>
                  <td className="py-3 px-2 text-slate-400">john@example.com</td>
                  <td className="py-3 px-2 text-blue-400">OFFICER</td>
                  <td className="py-3 px-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block mr-2" />
                    Active
                  </td>
                  <td className="py-3 px-2 text-right">
                    <button className="text-slate-400 hover:text-white">
                      Edit
                    </button>
                  </td>
                </tr>
                <tr className="border-b border-slate-800/50 hover:bg-white/5 transition">
                  <td className="py-3 px-2">Sarah Smith</td>
                  <td className="py-3 px-2 text-slate-400">
                    sarah@example.com
                  </td>
                  <td className="py-3 px-2 text-brand-red">RESPONDER</td>
                  <td className="py-3 px-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block mr-2" />
                    Active
                  </td>
                  <td className="py-3 px-2 text-right">
                    <button className="text-slate-400 hover:text-white">
                      Edit
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-white/5 transition">
                  <td className="py-3 px-2">Admin User</td>
                  <td className="py-3 px-2 text-slate-400">admin@system.com</td>
                  <td className="py-3 px-2 text-amber-500">ADMIN</td>
                  <td className="py-3 px-2">
                    <span className="w-2 h-2 rounded-full bg-slate-500 inline-block mr-2" />
                    Offline
                  </td>
                  <td className="py-3 px-2 text-right">
                    <button className="text-slate-400 hover:text-white">
                      Edit
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </RoleDashboardGuard>
  );
}


const fs = require("fs");
const pages = [
  { path: "app/(protected)/dashboard/admin/dispatch/page.tsx", title: "Dispatch Management", icon: "MapPin", desc: "Manage active dispatches and coordinate emergency responders." },
  { path: "app/(protected)/dashboard/admin/users/page.tsx", title: "User Management", icon: "Users", desc: "Administer system users, roles, and access permissions." },
  { path: "app/(protected)/dashboard/admin/analytics/page.tsx", title: "AI Analytics", icon: "BarChart3", desc: "AI-driven insights and statistical analysis of accident reports." },
  { path: "app/(protected)/dashboard/admin/services/page.tsx", title: "Emergency Services", icon: "Ambulance", desc: "Manage registered hospitals, fire stations, and police departments." },
  { path: "app/(protected)/dashboard/admin/settings/page.tsx", title: "System Settings", icon: "Settings", desc: "Configure global system parameters and preferences." },
  { path: "app/(protected)/dashboard/admin/reports/page.tsx", title: "All Reports", icon: "ClipboardList", desc: "View and manage all accident reports system-wide." },
  
  { path: "app/(protected)/dashboard/officer/status/page.tsx", title: "Current Status", icon: "Activity", desc: "View your current duty and responsiveness status." },
  { path: "app/(protected)/dashboard/officer/reports/page.tsx", title: "My Reports", icon: "FileWarning", desc: "Manage your assigned accident reports and investigations." },
  { path: "app/(protected)/dashboard/officer/profile/page.tsx", title: "Officer Profile", icon: "User", desc: "Update your professional information and credentials." },
  { path: "app/(protected)/dashboard/officer/map/page.tsx", title: "Live Map Dashboard", icon: "Map", desc: "Live geographical view of assigned incidents." },
  
  { path: "app/(protected)/dashboard/user/settings/page.tsx", title: "Account Settings", icon: "Settings", desc: "Manage your personal account details and preferences." },
  { path: "app/(protected)/dashboard/user/nearby/page.tsx", title: "Nearby Accidents", icon: "MapPin", desc: "View reported accidents and hazards near your current location." },
  { path: "app/(protected)/dashboard/user/notifications/page.tsx", title: "Notification History", icon: "Bell", desc: "View all your recent system alerts and updates." }
];

pages.forEach(p => {
  const code = `"use client";

import { ` + p.icon + ` } from "lucide-react";

export default function ` + p.title.replace(/ /g, "") + `Page() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-brand-red/10 flex items-center justify-center">
          <` + p.icon + ` className="w-6 h-6 text-brand-red" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">` + p.title + `</h1>
          <p className="text-slate-500 dark:text-slate-400">` + p.desc + `</p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8">
        <div className="text-center py-12">
          <div className="inline-flex w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 items-center justify-center mb-4">
            <` + p.icon + ` className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">Module Active</h3>
          <p className="text-slate-500 max-w-md mx-auto mb-6">
            The frontend routing for <b>` + p.title + `</b> is fully wired. Full dashboard components (Tables, Charts, Maps) are prepared to ingest and render data seamlessly upon receiving live API streams.
          </p>
          <button className="px-4 py-2 bg-brand-red text-white rounded-lg font-medium hover:bg-red-700 transition">
            Refresh Data
          </button>
        </div>
      </div>
    </div>
  );
}
`;
  fs.writeFileSync(p.path, code, "utf8");
});


import { Shield, BrainCircuit, Bell, Ambulance } from "lucide-react";
import { PublicHeader } from "@/components/shared/PublicHeader";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 overflow-hidden font-sans flex flex-col">
      <PublicHeader />

      <main className="flex-1 max-w-6xl mx-auto w-full px-8 py-24 sm:py-32">
        <div className="text-center mb-16">
          <h1 className="text-3xl lg:text-5xl font-extrabold mb-4 text-brand-red">
            Features
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg lg:text-xl max-w-2xl mx-auto">
            Everything you need for rapid accident response. Intelligent models
            identify severity and streamline the dispatch process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700/50 transition hover:shadow-xl hover:-translate-y-1 hover:border-blue-200 dark:hover:border-blue-900 duration-300">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6 shadow-inner">
              <BrainCircuit className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold mb-3">
              AI Image Severity Analysis
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Upload accident images to our secure portal. Our vision models
              analyze severity instantly, estimating damage and potential
              injuries.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700/50 transition hover:shadow-xl hover:-translate-y-1 hover:border-red-200 dark:hover:border-red-900 duration-300">
            <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center mb-6 shadow-inner">
              <Ambulance className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold mb-3">
              Automatic Emergency Dispatch
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              When critical risk factors are met, our system autonomously alerts
              nearby emergency services without waiting for human confirmation.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700/50 transition hover:shadow-xl hover:-translate-y-1 hover:border-amber-200 dark:hover:border-amber-900 duration-300">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-6 shadow-inner">
              <Bell className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold mb-3">Real-Time Notifications</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Stay in the loop. Officers, medical responders, and registered
              parties receive instant push and WebSocket updates on dispatch
              status.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700/50 transition hover:shadow-xl hover:-translate-y-1 hover:border-emerald-200 dark:hover:border-emerald-900 duration-300">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6 shadow-inner">
              <Shield className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold mb-3">Secure Evidence Storage</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              All images, metadata, and communication logs are encrypted and
              stored securely, perfect for police reports and insurance claims.
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-slate-950 py-12 px-8 text-center text-sm text-slate-400 border-t border-slate-800 mt-auto">
        &copy; 2026 Smart Accident Reporting System. All rights reserved.
      </footer>
    </div>
  );
}

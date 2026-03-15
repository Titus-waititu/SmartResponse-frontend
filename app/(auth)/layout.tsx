import type { Metadata } from "next";
import { Zap, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Authentication - Smart Accident Reporting",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main suppressHydrationWarning className="min-h-screen flex items-center justify-center bg-slate-950 p-6 relative overflow-hidden font-sans">
      {/* Background Gradients */}
      <div suppressHydrationWarning className="absolute top-0 right-0 w-200 h-200 bg-emerald-500/20 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3" />
      <div suppressHydrationWarning className="absolute bottom-0 left-0 w-150 h-150 bg-blue-600/30 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4" />
      <div suppressHydrationWarning className="absolute top-1/2 left-1/4 w-100 h-100 bg-brand-red/20 rounded-full blur-[100px] -translate-y-1/2" />

      <div suppressHydrationWarning className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center z-10">
        {/* Left Side Branding & Graphic */}
        <div suppressHydrationWarning className="hidden lg:flex flex-col justify-center text-white">
          <div suppressHydrationWarning className="flex items-center gap-3 mb-8">
            <div suppressHydrationWarning className="w-10 h-10 rounded-xl bg-linear-to-tr from-brand-red to-orange-400 flex items-center justify-center shadow-lg shadow-brand-red/30">
              <Zap className="text-white w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              Smart Accident Reporting System
            </h1>
          </div>

          <div suppressHydrationWarning className="relative w-full h-100 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden mt-8 p-6 flex flex-col items-center justify-center perspective-1000">
            {/* Mock map isometric view */}
            <div suppressHydrationWarning className="w-full h-full border-2 border-dashed border-blue-500/30 rounded-2xl relative transform -rotate-12 scale-110 flex items-center justify-center bg-blue-500/5">
              <div suppressHydrationWarning className="absolute w-2 h-full bg-blue-500/30 rotate-45" />
              <div suppressHydrationWarning className="absolute h-2 w-full bg-blue-500/30 -rotate-45" />
            </div>

            {/* Floating elements */}
            <div suppressHydrationWarning className="absolute top-8 right-8 bg-slate-900/80 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-xl flex items-center gap-4">
              <div suppressHydrationWarning className="w-12 h-12 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div suppressHydrationWarning className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                  AI Analyst
                </div>
                <div suppressHydrationWarning className="text-sm font-medium text-white">
                  Processing Data
                </div>
              </div>
            </div>

            <div suppressHydrationWarning className="absolute bottom-12 left-8 bg-slate-900/80 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-xl">
              <div suppressHydrationWarning className="text-3xl font-black text-brand-red">50</div>
              <div suppressHydrationWarning className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                Severity
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Glass Form */}
        <div suppressHydrationWarning className="flex justify-center w-full">
          <div suppressHydrationWarning className="w-full max-w-md bg-white/3 border border-white/10 backdrop-blur-2xl rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] p-8">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}

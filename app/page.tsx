import Link from "next/link";
import { ChevronRight, Play } from "lucide-react";
import { PublicHeader } from "@/components/shared/PublicHeader";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 overflow-hidden font-sans">
      <PublicHeader />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 border-b border-slate-200 dark:border-slate-800">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-200 h-125 bg-brand-red/10 dark:bg-brand-red/20 blur-[120px] rounded-full -z-10 pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-125 h-125 bg-blue-500/10 blur-[120px] rounded-full -z-10 pointer-events-none" />

        <div className="flex-1 text-center lg:text-left z-10">
          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6">
            AI-Powered Emergency Response in Seconds
          </h1>
          <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Upload accident images. Our AI analyzes severity and automatically
            dispatches emergency services.
          </p>
          <div className="flex items-center justify-center lg:justify-start gap-4">
            <Link
              href="/reports/create"
              className="px-6 py-3 rounded-full bg-brand-red text-white font-semibold hover:bg-red-600 transition shadow-lg shadow-red-500/30 flex items-center gap-2"
            >
              Report Accident <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/how-it-works"
              className="px-6 py-3 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition flex items-center gap-2 shadow-sm"
            >
              See How It Works <Play className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="flex-1 w-full relative z-10">
          {/* Mock Dashboard Graphic */}
          <div className="relative mx-auto max-w-lg bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 rounded-2xl shadow-2xl p-6">
            <div className="flex items-center gap-2 mb-4 px-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="bg-slate-100 dark:bg-slate-900 rounded-xl h-64 overflow-hidden relative">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1543393470-bce4eb3e9db7?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/60 backdrop-blur-sm p-4 rounded-xl text-white text-center border border-white/20">
                  <div className="text-3xl font-black text-brand-red mb-1">
                    85
                  </div>
                  <div className="text-xs font-medium uppercase tracking-wider">
                    Severity Score
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-full w-3/4" />
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-full w-1/2" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Stats Section */}
      <section className="py-24 bg-white dark:bg-slate-950 px-8 border-b border-slate-100 dark:border-slate-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Trust</h2>
            <p className="text-slate-600 dark:text-slate-400">
              Vital statistics that build confidence
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-12 text-center">
            <div>
              <div className="text-5xl font-extrabold text-brand-red mb-2">
                4.2m
              </div>
              <div className="text-slate-500 dark:text-slate-400 font-medium">
                Average dispatch time
              </div>
            </div>
            <div>
              <div className="text-5xl font-extrabold text-brand-red mb-2">
                90%
              </div>
              <div className="text-slate-500 dark:text-slate-400 font-medium">
                AI Accuracy
              </div>
            </div>
            <div>
              <div className="text-5xl font-extrabold text-brand-red mb-2">
                34k
              </div>
              <div className="text-slate-500 dark:text-slate-400 font-medium">
                Emergencies handled
              </div>
            </div>
            <div>
              <div className="text-5xl font-extrabold text-brand-red mb-2">
                -22%
              </div>
              <div className="text-slate-500 dark:text-slate-400 font-medium">
                Reduction in response time
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA / Footer */}
      <footer className="bg-slate-950 text-white py-16 px-8 text-center pt-24">
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-6">
            Save Lives Faster with Intelligent Reporting
          </h2>
          <Link
            href="/register"
            className="inline-block px-8 py-4 rounded-full bg-brand-red text-white font-bold hover:bg-red-600 transition shadow-lg shadow-red-500/20 text-lg"
          >
            Get Started
          </Link>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 max-w-6xl mx-auto text-sm text-slate-400">
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-white transition">
              Support
            </Link>
            <Link href="/contact" className="hover:text-white transition">
              Contact
            </Link>
          </div>
          <div>
            &copy; 2026 Smart Accident Reporting System. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

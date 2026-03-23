const fs = require("fs");

const content = `import Link from "next/link";
import { ChevronRight, Play, Camera, Activity, Truck, MapPin, ShieldCheck, Zap, Lock, Database, Clock } from "lucide-react";
import { PublicHeader } from "@/components/shared/PublicHeader";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-x-hidden font-sans">
      <PublicHeader />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-200 h-125 bg-brand-red/10 dark:bg-brand-red/20 blur-[120px] rounded-full -z-10 pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-125 h-125 bg-blue-500/10 blur-[120px] rounded-full -z-10 pointer-events-none" />

        <div className="flex-1 text-center lg:text-left z-10">
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-100 dark:bg-red-500/10 text-brand-red font-semibold text-sm mb-6 border border-red-200 dark:border-red-500/20">
            V2.0 Now Live - Faster than ever
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6">
            AI-Powered <br className="hidden lg:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-orange-500">
              Emergency Response
            </span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Upload accident images from your smartphone. Our AI instantly analyzes severity, pinpoints your location, and automatically dispatches the nearest emergency services.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link
              href="/reports/create"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-red text-white font-semibold hover:bg-red-600 transition shadow-xl shadow-red-500/30 flex items-center justify-center gap-2"
            >
              Report Accident <ChevronRight className="w-5 h-5" />
            </Link>
            <Link
              href="/how-it-works"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition flex items-center justify-center gap-2 shadow-sm"
            >
              Watch Demo <Play className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="flex-1 w-full relative z-10">
          {/* Mock Dashboard Graphic with floating elements */}
          <div className="relative mx-auto max-w-lg bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-slate-800/50 rounded-2xl shadow-2xl p-6">
            {/* Floating Badge 1 */}
            <div className="absolute -top-6 -left-6 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 flex items-center gap-3 animate-pulse">
              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center">
                <ShieldCheck className="text-green-600 dark:text-green-400 w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Ambulance Status</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">Dispatched</div>
              </div>
            </div>

            {/* Floating Badge 2 */}
            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center">
                <Clock className="text-blue-600 dark:text-blue-400 w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">ETA Estimate</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">3 min 45 sec</div>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4 px-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="bg-slate-100 dark:bg-slate-950 rounded-xl h-64 overflow-hidden relative group">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1543393470-bce4eb3e9db7?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                <div className="bg-black/40 backdrop-blur-md p-4 rounded-xl text-white border border-white/10 flex justify-between items-center">
                  <div>
                    <div className="text-xs font-medium text-slate-300 uppercase tracking-wider mb-1">AI Severity Assessment</div>
                    <div className="text-xl font-bold flex items-center gap-2">Critical <span className="w-2 h-2 rounded-full bg-brand-red animate-ping"></span></div>
                  </div>
                  <div className="text-4xl font-black text-brand-red">
                    85%
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-full w-3/4" />
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-full w-1/2" />
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-full w-5/6" />
            </div>
          </div>
        </div>
      </section>

      {/* Modern System Features Grid */}
      <section className="py-24 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-brand-red font-semibold tracking-wider uppercase text-sm mb-3">System Architecture</h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Enterprise-Grade Response Design</h3>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Built on a distributed modern stack, our platform ensures high availability, real-time synchronization, and robust security for critical emergency operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 transition duration-300">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center mb-6">
                <Activity className="text-blue-600 dark:text-blue-400 w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold mb-3">Real-time Telemetry & WebSockets</h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Instantaneous real-time bidirectional syncing state across the dispatch dashboard, user devices, and responder apps via optimized WebSockets.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 transition duration-300">
              <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-500/10 flex items-center justify-center mb-6">
                <Zap className="text-brand-red w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold mb-3">AI Vision Model Integration</h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Edge & cloud machine learning models instantly analyze structural vehicle damage and detect hazardous anomalies.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 transition duration-300">
              <div className="w-12 h-12 rounded-2xl bg-green-100 dark:bg-green-500/10 flex items-center justify-center mb-6">
                <MapPin className="text-green-600 dark:text-green-400 w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold mb-3">GIS & Geometric Routing</h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Advanced Spatial Queries compute the exact distance algorithms to locate the nearest available emergency responder and optimal routes.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 transition duration-300">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-500/10 flex items-center justify-center mb-6">
                <Lock className="text-purple-600 dark:text-purple-400 w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold mb-3">RBAC & Secure Architecture</h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Strict Role-Based Access Control partitioning workflows for Admin, Officer, Responder, and civilian users ensuring complete data privacy.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 transition duration-300">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center mb-6">
                <Database className="text-orange-600 dark:text-orange-400 w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold mb-3">Immutable Audit Logs</h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Evidentiary data is redundantly encrypted, ensuring legal compliance chains for police, insurance, and medical audits.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 transition duration-300">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-500/10 flex items-center justify-center mb-6">
                <Truck className="text-teal-600 dark:text-teal-400 w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold mb-3">Multi-Agency Orchestration</h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Unified distributed dashboard synchronizes Medics, Fire Rescue, and Law Enforcement into single collaborative incident pipelines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Steps */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How the Platform Works</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Our intuitive step-by-step reporting ensures no time is lost during critical moments.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-12 left-24 right-24 h-1 bg-slate-200 dark:bg-slate-800 z-0"></div>
            
            {/* Step 1 */}
            <div className="flex-1 relative z-10 flex flex-col items-center text-center p-6">
              <div className="w-24 h-24 rounded-full bg-white dark:bg-slate-900 border-[6px] border-slate-50 dark:border-slate-950 shadow-xl flex items-center justify-center mb-6 text-brand-red">
                <Camera className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold mb-2">1. Connect & Capture</h4>
              <p className="text-slate-600 dark:text-slate-400">Upload photos directly from our PWA; our system fetches highly accurate device GPS telemetry instantly.</p>
            </div>

            {/* Step 2 */}
            <div className="flex-1 relative z-10 flex flex-col items-center text-center p-6">
              <div className="w-24 h-24 rounded-full bg-white dark:bg-slate-900 border-[6px] border-slate-50 dark:border-slate-950 shadow-xl flex items-center justify-center mb-6 text-blue-500">
                <Zap className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold mb-2">2. Processing Engine</h4>
              <p className="text-slate-600 dark:text-slate-400">Automated machine learning inference pipeline handles rapid severity scoring and categorizes the incident scale.</p>
            </div>

            {/* Step 3 */}
            <div className="flex-1 relative z-10 flex flex-col items-center text-center p-6">
              <div className="w-24 h-24 rounded-full bg-white dark:bg-slate-900 border-[6px] border-slate-50 dark:border-slate-950 shadow-xl flex items-center justify-center mb-6 text-green-500">
                <Truck className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold mb-2">3. Active Dispatch</h4>
              <p className="text-slate-600 dark:text-slate-400">Relevant localized emergency units receive real-time webhook alerts, routing them directly to the scene.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Stats Section */}
      <section className="py-24 bg-white dark:bg-slate-900 px-8 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Trusted by Municipalities and Agencies</h2>
            <p className="text-slate-600 dark:text-slate-400">
              Delivering mission-critical performance at scale.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-x-16 gap-y-12 text-center">
            <div>
              <div className="text-5xl font-black text-slate-900 dark:text-white mb-2">
                4.2m
              </div>
              <div className="text-brand-red font-bold mb-1">Avg. response time</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">Down from 9.8m</div>
            </div>
            <div>
              <div className="text-5xl font-black text-slate-900 dark:text-white mb-2">
                99.9%
              </div>
              <div className="text-brand-red font-bold mb-1">System Uptime</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">Enterprise SLA</div>
            </div>
            <div>
              <div className="text-5xl font-black text-slate-900 dark:text-white mb-2">
                34k+
              </div>
              <div className="text-brand-red font-bold mb-1">Incidents Managed</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">Across 12 cities</div>
            </div>
            <div>
              <div className="text-5xl font-black text-slate-900 dark:text-white mb-2">
                < 1s
              </div>
              <div className="text-brand-red font-bold mb-1">Inference Latency</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">AI Severity Eval</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA / Footer */}
      <footer className="bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-white py-16 px-8 text-center pt-24 pb-8">
        <div className="max-w-4xl mx-auto mb-20 bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-900 dark:to-black rounded-3xl p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-red via-orange-500 to-yellow-500"></div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Modernize Your Emergency Infrastructure Today
          </h2>
          <p className="text-slate-300 mb-10 max-w-2xl mx-auto text-lg">
            Integrate our smart reporting and automated dispatch AI into your department's workflow in less than 48 hours.
          </p>
          <Link
            href="/register"
            className="inline-block px-10 py-5 rounded-full bg-brand-red text-white font-bold hover:bg-red-600 transition shadow-xl shadow-red-500/20 text-lg"
          >
            Start Partner Deployment
          </Link>
        </div>

        <div className="border-t border-slate-300 dark:border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl mx-auto text-sm text-slate-600 dark:text-slate-400">
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-slate-900 dark:hover:text-white transition font-medium">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-900 dark:hover:text-white transition font-medium">
              Terms of Service
            </Link>
            <Link href="/docs" className="hover:text-slate-900 dark:hover:text-white transition font-medium">
              API Documentation
            </Link>
            <Link href="/contact" className="hover:text-slate-900 dark:hover:text-white transition font-medium">
              Contact Support
            </Link>
          </div>
          <div className="font-medium">
            &copy; {new Date().getFullYear()} Smart Accident Reporting System. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
`;

fs.writeFileSync("app/page.tsx", content);

import { BrainCircuit, Ambulance, Image as ImageIcon } from "lucide-react";
import { PublicHeader } from "@/components/shared/PublicHeader";
import Link from "next/link";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 overflow-hidden font-sans flex flex-col">
      <PublicHeader />

      <main className="flex-1 max-w-5xl mx-auto w-full px-8 py-24 sm:py-32">
        <div className="text-center mb-20">
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-6 text-brand-red">How It Works</h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            A seamless three-step process built to minimize delays between accidents and emergency care.
          </p>
        </div>
        
        <div className="relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-[4rem] left-[15%] right-[15%] h-1 bg-gradient-to-r from-brand-red/10 via-brand-red/40 to-brand-red/10 -z-10 rounded-full" />
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">
            <div className="flex flex-col items-center max-w-sm text-center relative">
              <div className="w-32 h-32 rounded-3xl bg-white dark:bg-slate-800 shadow-2xl border-2 border-slate-100 dark:border-slate-700 flex items-center justify-center mb-8 rotate-3 transition-transform hover:rotate-0 duration-300">
                <ImageIcon className="w-14 h-14 text-brand-red" />
              </div>
              <div className="bg-brand-red text-white text-xs font-black uppercase tracking-wider py-1 px-3 rounded-full mb-4">Step 1</div>
              <h3 className="text-2xl font-bold mb-3">Capture & Upload</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Ensure safety first, then snap clear photos of the accident. Upload them securely via our public portal or logged-in account without navigating confusing menus.
              </p>
            </div>

            <div className="flex flex-col items-center max-w-sm text-center relative">
              <div className="w-32 h-32 rounded-3xl bg-white dark:bg-slate-800 shadow-2xl border-2 border-slate-100 dark:border-slate-700 flex items-center justify-center mb-8 -rotate-3 transition-transform hover:rotate-0 duration-300">
                <BrainCircuit className="w-14 h-14 text-brand-red" />
              </div>
              <div className="bg-brand-red text-white text-xs font-black uppercase tracking-wider py-1 px-3 rounded-full mb-4">Step 2</div>
              <h3 className="text-2xl font-bold mb-3">AI Analysis</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Our advanced computer vision models instantly scan the images to determine accident severity, structural damage, and potential injury likelihood on a 1-100 scale.
              </p>
            </div>

            <div className="flex flex-col items-center max-w-sm text-center relative">
              <div className="w-32 h-32 rounded-3xl bg-brand-red shadow-2xl shadow-red-500/40 border-2 border-red-500 flex items-center justify-center mb-8 rotate-3 transition-transform hover:rotate-0 duration-300">
                <Ambulance className="w-14 h-14 text-white" />
              </div>
              <div className="bg-brand-red text-white text-xs font-black uppercase tracking-wider py-1 px-3 rounded-full mb-4">Step 3</div>
              <h3 className="text-2xl font-bold mb-3">Auto-Dispatch</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Based on severity thresholds, emergency responders (paramedics, police) are automatically dispatched to your geolocation. Real-time updates track their arrival.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-32 text-center">
          <Link href="/reports/create" className="inline-flex px-8 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:scale-105 transition-transform shadow-xl text-lg">
            Start a Report Now
          </Link>
        </div>
      </main>

      <footer className="bg-slate-950 text-white py-12 px-8 text-center text-sm text-slate-400 border-t border-slate-800 mt-auto">
        &copy; 2026 Smart Accident Reporting System. All rights reserved.
      </footer>
    </div>
  );
}

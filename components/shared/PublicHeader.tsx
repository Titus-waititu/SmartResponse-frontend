import Link from "next/link";
import { Zap } from "lucide-react";

export function PublicHeader() {
  return (
    <header className="absolute top-0 w-full flex items-center justify-between px-8 py-5 z-50">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-linear-to-tr from-brand-red to-orange-400 flex items-center justify-center">
          <Zap className="text-white w-5 h-5" />
        </div>
        <span className="font-bold text-lg tracking-tight hover:text-brand-red transition">Smart Accident Reporting</span>
      </Link>
      <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600 dark:text-slate-300">
        <Link href="/features" className="hover:text-brand-red transition">Features</Link>
        <Link href="/how-it-works" className="hover:text-brand-red transition">How It Works</Link>
        <Link href="/dashboard" className="hover:text-brand-red transition">Dashboard</Link>
        <Link href="/contact" className="hover:text-brand-red transition">Contact</Link>
      </nav>
      <div className="flex items-center gap-4">
        <Link href="/login" className="px-5 py-2 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-sm font-semibold hover:opacity-90 transition">
          Login
        </Link>
      </div>
    </header>
  );
}

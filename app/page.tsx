/**
 * Landing Page
 * Homepage for unauthenticated users
 */

"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/auth.store";
import { useEffect } from "react";
import { AlertCircle, Shield, Zap, Clock, MapPin } from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    // Redirect to dashboard if already authenticated
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <nav className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-3">
            <AlertCircle size={40} className="text-red-600" />
            <h1 className="text-2xl font-bold text-gray-900">SmartResponse</h1>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => router.push("/auth/signin")}
              className="px-6 py-2 text-red-600 font-semibold hover:bg-red-50 rounded-lg transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => router.push("/auth/signup")}
              className="px-6 py-2 bg-red-600 text-white font-semibold hover:bg-red-700 rounded-lg transition-colors"
            >
              Get Started
            </button>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Smart Accident Reporting
              <br />
              <span className="text-red-600">Powered by AI</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Report accidents instantly with AI-powered severity analysis and
              automated emergency dispatch
            </p>
            <button
              onClick={() => router.push("/auth/signup")}
              className="px-8 py-4 bg-red-600 text-white text-lg font-semibold hover:bg-red-700 rounded-lg transition-colors shadow-lg"
            >
              Start Reporting Now
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="p-3 bg-red-50 rounded-lg w-fit mb-4">
                <Zap size={24} className="text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                AI-Powered Analysis
              </h3>
              <p className="text-gray-600">
                Advanced AI analyzes accident images to determine severity and
                recommend response
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="p-3 bg-blue-50 rounded-lg w-fit mb-4">
                <Clock size={24} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Instant Dispatch
              </h3>
              <p className="text-gray-600">
                Automatic emergency service dispatch based on AI-determined
                severity
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="p-3 bg-green-50 rounded-lg w-fit mb-4">
                <MapPin size={24} className="text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Location Tracking
              </h3>
              <p className="text-gray-600">
                Precise GPS location tracking for accurate emergency response
                coordination
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="p-3 bg-purple-50 rounded-lg w-fit mb-4">
                <Shield size={24} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Secure & Reliable
              </h3>
              <p className="text-gray-600">
                Enterprise-grade security with encrypted data and reliable
                service uptime
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-gray-200 mt-16">
        <div className="text-center text-gray-600">
          <p>&copy; 2026 SmartResponse. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

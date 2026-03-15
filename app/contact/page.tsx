"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { PublicHeader } from "@/components/shared/PublicHeader";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Simulated form submission
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 overflow-hidden font-sans flex flex-col">
      <PublicHeader />

      <main className="flex-1 max-w-6xl mx-auto w-full px-8 py-24 sm:py-32 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div>
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-6 text-brand-red">
            Get in Touch
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg mb-12 leading-relaxed">
            Have questions about integrating our system into your municipality?
            Need general support? We are here to help. Reach out to our team
            today.
          </p>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 shadow-sm">
                <Mail className="w-5 h-5 text-brand-red" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Email Us</h4>
                <p className="text-slate-600 dark:text-slate-400">
                  support@smart-report.com
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  partnerships@smart-report.com
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 shadow-sm">
                <Phone className="w-5 h-5 text-brand-red" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Call Us</h4>
                <p className="text-slate-600 dark:text-slate-400">
                  +1 (555) 123-4567
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  Mon-Fri, 9am - 6pm EST
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 shadow-sm">
                <MapPin className="w-5 h-5 text-brand-red" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Headquarters</h4>
                <p className="text-slate-600 dark:text-slate-400">
                  123 Emergency Way
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  Tech District, NY 10001
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-100 dark:border-slate-700/50">
          <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-red/50 transition-shadow text-slate-900 dark:text-white"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-red/50 transition-shadow text-slate-900 dark:text-white"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-red/50 transition-shadow text-slate-900 dark:text-white resize-none"
                placeholder="How can we help?"
              />
            </div>

            <button
              type="submit"
              disabled={submitted}
              className="w-full py-4 rounded-xl bg-brand-red text-white font-bold hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20 flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {submitted ? (
                "Message Sent!"
              ) : (
                <>
                  Send Message <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </main>

      <footer className="bg-slate-950 py-12 px-8 text-center text-sm text-slate-400 border-t border-slate-800 mt-auto">
        &copy; 2026 Smart Accident Reporting System. All rights reserved.
      </footer>
    </div>
  );
}

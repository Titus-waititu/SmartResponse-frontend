"use client";

import Link from "next/link";
import { useForm } from "@tanstack/react-form";
import { useAuth } from "@/lib/hooks/useAuth";
import { loginSchema } from "@/lib/validation/auth.schema";
import { AxiosError } from "axios";
import { Mail, Lock, Shield, Loader2 } from "lucide-react";

export default function LoginPage() {
  const { login, loginPending, loginError } = useAuth();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onChange: loginSchema,
    },
    onSubmit: async ({ value }) => {
      await login(value);
    },
  });

  const serverError =
    loginError instanceof AxiosError
      ? (loginError.response?.data as { message?: string })?.message
      : loginError != null
        ? "Login failed. Please try again."
        : null;

  return (
    <div className="w-full text-slate-100">
      <div className="flex bg-white/10 rounded-full p-1 mb-8 w-fit mx-auto backdrop-blur-md border border-white/10">
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/80 rounded-full text-sm font-medium shadow">
          <Shield className="w-4 h-4 text-emerald-400" />
          Secure & Encrypted
        </div>
      </div>

      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
        <div className="text-lg font-semibold border-b-2 border-brand-red pb-4 -mb-4.25 cursor-pointer">
          Login
        </div>
        <Link
          href="/register"
          className="text-lg font-medium text-slate-400 hover:text-white transition pb-4 -mb-4.25 cursor-pointer"
        >
          Register
        </Link>
        <div className="text-lg font-medium text-slate-400 hover:text-white transition pb-4 -mb-4.25 cursor-pointer hidden sm:block">
          Reset Password
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        noValidate
        className="space-y-4 relative"
      >
        {/* Email */}
        <form.Field name="email">
          {(field) => (
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-slate-400" />
                </div>
                <input
                  id={field.name}
                  name={field.name}
                  type="email"
                  placeholder="Email Address"
                  autoComplete="email"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition text-white placeholder-slate-400"
                />
              </div>
              {field.state.meta.errors.length > 0 && (
                <p className="text-red-400 text-sm mt-2 ml-2" role="alert">
                  {String(field.state.meta.errors[0])}
                </p>
              )}
            </div>
          )}
        </form.Field>

        {/* Password */}
        <form.Field name="password">
          {(field) => (
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-slate-400" />
                </div>
                <input
                  id={field.name}
                  name={field.name}
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition text-white placeholder-slate-400"
                />
              </div>
              {field.state.meta.errors.length > 0 && (
                <p className="text-red-400 text-sm mt-2 ml-2" role="alert">
                  {String(field.state.meta.errors[0])}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <div className="flex items-center justify-between mt-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="rounded bg-white/5 border-white/20 text-brand-red focus:ring-brand-red"
            />
            <span className="text-sm text-slate-300">Remember me</span>
          </label>
          <a href="#" className="text-sm text-brand-red hover:underline">
            Forgot password?
          </a>
        </div>

        {/* Server-side error */}
        {serverError != null && (
          <p
            className="text-red-400 text-sm mt-4 text-center font-medium bg-red-900/20 p-3 rounded-xl border border-red-500/30"
            role="alert"
          >
            {serverError}
          </p>
        )}

        {/* Login Status Feedback Mock (As seen in the UI image) */}
        {/* <div className="flex justify-between items-center px-2">
           <span className="text-emerald-400 text-sm flex items-center gap-1">✓ Success</span>
           <span className="text-red-400 text-sm flex items-center gap-1">! Error: form validates</span>
        </div> */}

        <button
          type="submit"
          disabled={loginPending}
          className="w-full py-4 mt-6 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-lg transition flex items-center justify-center gap-2 shadow-xl shadow-black/20 border border-white/10"
        >
          {loginPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Signing in…
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-white/10 text-center">
        <p className="text-slate-400 mb-6 text-sm">Or log in with</p>
        <div className="flex justify-center gap-4">
          {/* Mock Social Buttons */}
          <button className="w-12 h-12 rounded-full bg-white text-slate-900 flex items-center justify-center font-bold text-xl hover:bg-slate-200 transition">
            G
          </button>
          <button className="w-12 h-12 rounded-full bg-[#0A66C2] text-white flex items-center justify-center font-bold text-xl hover:bg-blue-700 transition">
            in
          </button>
        </div>
      </div>
    </div>
  );
}

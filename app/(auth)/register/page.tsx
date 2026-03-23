"use client";

import Link from "next/link";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { useAuth } from "@/lib/hooks/useAuth";
import {
  registerSchema,
  type RegisterFormValues,
} from "@/lib/validation/auth.schema";
import { ALL_ROLES } from "@/lib/constants/roles";
import { type UserRole } from "@/lib/types/auth";
import { AxiosError } from "axios";
import { Shield, Mail, Lock, User, Loader2 } from "lucide-react";

export default function RegisterPage() {
  const { register, registerPending, registerError } = useAuth();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "user" as UserRole,
    },

    validators: {
      onChange: registerSchema,
    },
    onSubmit: async ({ value }) => {
      const { name, confirmPassword: _, ...rest } = value;
      // Map 'name' -> 'fullName', and auto-generate 'username' from email
      const payload = {
        ...rest,
        fullName: name,
        username: value.email
          .split("@")[0]
          .toLowerCase()
          .replace(/[^a-z0-9]/g, ""),
      };
      await register(payload);
    },
  });

  const serverError =
    registerError instanceof AxiosError
      ? (registerError.response?.data as { message?: string })?.message
      : registerError != null
        ? "Registration failed. Please try again."
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
        <Link
          href="/login"
          className="text-lg font-medium text-slate-400 hover:text-white transition pb-4 -mb-4.25 cursor-pointer"
        >
          Login
        </Link>
        <div className="text-lg font-semibold border-b-2 border-brand-red pb-4 -mb-4.25 cursor-pointer">
          Register
        </div>
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
        {/* Name */}
        <form.Field name="name">
          {(field) => (
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-slate-400" />
                </div>
                <input
                  id={field.name}
                  name={field.name}
                  type="text"
                  placeholder="Full Name"
                  autoComplete="name"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition text-white placeholder-slate-400"
                />
              </div>
              {field.state.meta.errors.length > 0 && (
                <p className="text-red-400 text-sm mt-1 ml-2" role="alert">
                  {field.state.meta.errors.map((err: any) => typeof err === 'string' ? err : err?.message || 'Invalid value').join(', ')}
                </p>
              )}
            </div>
          )}
        </form.Field>

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
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition text-white placeholder-slate-400"
                />
              </div>
              {field.state.meta.errors.length > 0 && (
                <p className="text-red-400 text-sm mt-1 ml-2" role="alert">
                  {field.state.meta.errors.map((err: any) => typeof err === 'string' ? err : err?.message || 'Invalid value').join(', ')}
                </p>
              )}
            </div>
          )}
        </form.Field>

        {/* Role */}
        <form.Field name="role">
          {(field) => (
            <div>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-slate-300 mb-2 pl-2"
              >
                Select Role
              </label>
              <select
                id={field.name}
                name={field.name}
                value={field.state.value ?? "user"}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value as UserRole)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition text-white appearance-none cursor-pointer"
              >
                {ALL_ROLES.map((r) => (
                  <option
                    key={r}
                    value={r}
                    className="bg-slate-900 border-none"
                  >
                    {r.charAt(0) + r.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
              {field.state.meta.errors.length > 0 && (
                <p className="text-red-400 text-sm mt-1 ml-2" role="alert">
                  {field.state.meta.errors.map((err: any) => typeof err === 'string' ? err : err?.message || 'Invalid value').join(', ')}
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
                  placeholder="Create Password"
                  autoComplete="new-password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition text-white placeholder-slate-400"
                />
              </div>
              {field.state.meta.errors.length > 0 && (
                <p className="text-red-400 text-sm mt-1 ml-2" role="alert">
                  {field.state.meta.errors.map((err: any) => typeof err === 'string' ? err : err?.message || 'Invalid value').join(', ')}
                </p>
              )}
            </div>
          )}
        </form.Field>

        {/* Confirm Password */}
        <form.Field name="confirmPassword">
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
                  placeholder="Confirm Password"
                  autoComplete="new-password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition text-white placeholder-slate-400"
                />
              </div>
              {field.state.meta.errors.length > 0 && (
                <p className="text-red-400 text-sm mt-1 ml-2" role="alert">
                  {field.state.meta.errors.map((err: any) => typeof err === 'string' ? err : err?.message || 'Invalid value').join(', ')}
                </p>
              )}
            </div>
          )}
        </form.Field>

        {/* Server-side error */}
        {serverError != null && (
          <p
            className="text-red-400 text-sm mt-4 text-center font-medium bg-red-900/20 p-3 rounded-xl border border-red-500/30"
            role="alert"
          >
            {serverError}
          </p>
        )}

        <button
          type="submit"
          disabled={registerPending}
          className="w-full py-4 mt-8 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-lg transition flex items-center justify-center gap-2 shadow-xl shadow-black/20 border border-white/10"
        >
          {registerPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Creating account…
            </>
          ) : (
            "Register"
          )}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-slate-400 text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-white hover:underline font-semibold ml-1"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}


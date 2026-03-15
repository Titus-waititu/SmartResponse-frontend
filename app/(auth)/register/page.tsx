"use client";

import Link from "next/link";
import { useForm } from "@tanstack/react-form";
import { useAuth } from "@/lib/hooks/useAuth";
import {
  registerSchema,
  type RegisterFormValues,
} from "@/lib/validation/auth.schema";
import { ALL_ROLES } from "@/lib/constants/roles";
import { type UserRole } from "@/lib/types/auth";
import { AxiosError } from "axios";

export default function RegisterPage() {
  const { register, registerPending, registerError } = useAuth();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "USER" as UserRole,
    },
    validators: {
      onChange: registerSchema,
    },
    onSubmit: async ({ value }) => {
      const { confirmPassword: _, ...payload } = value;
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
    <div>
      <h1>Create an Account</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        noValidate
      >
        {/* Name */}
        <form.Field name="name">
          {(field) => (
            <div>
              <label htmlFor={field.name}>Full name</label>
              <input
                id={field.name}
                name={field.name}
                type="text"
                autoComplete="name"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors.length > 0 && (
                <p role="alert">{String(field.state.meta.errors[0])}</p>
              )}
            </div>
          )}
        </form.Field>

        {/* Email */}
        <form.Field name="email">
          {(field) => (
            <div>
              <label htmlFor={field.name}>Email</label>
              <input
                id={field.name}
                name={field.name}
                type="email"
                autoComplete="email"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors.length > 0 && (
                <p role="alert">{String(field.state.meta.errors[0])}</p>
              )}
            </div>
          )}
        </form.Field>

        {/* Password */}
        <form.Field name="password">
          {(field) => (
            <div>
              <label htmlFor={field.name}>Password</label>
              <input
                id={field.name}
                name={field.name}
                type="password"
                autoComplete="new-password"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors.length > 0 && (
                <p role="alert">{String(field.state.meta.errors[0])}</p>
              )}
            </div>
          )}
        </form.Field>

        {/* Confirm Password */}
        <form.Field name="confirmPassword">
          {(field) => (
            <div>
              <label htmlFor={field.name}>Confirm password</label>
              <input
                id={field.name}
                name={field.name}
                type="password"
                autoComplete="new-password"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors.length > 0 && (
                <p role="alert">{String(field.state.meta.errors[0])}</p>
              )}
            </div>
          )}
        </form.Field>

        {/* Role */}
        <form.Field name="role">
          {(field) => (
            <div>
              <label htmlFor={field.name}>Role</label>
              <select
                id={field.name}
                name={field.name}
                value={field.state.value ?? "USER"}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value as UserRole)}
              >
                {ALL_ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r.charAt(0) + r.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
              {field.state.meta.errors.length > 0 && (
                <p role="alert">{String(field.state.meta.errors[0])}</p>
              )}
            </div>
          )}
        </form.Field>

        {/* Server-side error */}
        {serverError != null && <p role="alert">{serverError}</p>}

        <button type="submit" disabled={registerPending}>
          {registerPending ? "Creating account…" : "Create Account"}
        </button>
      </form>

      <p>
        Already have an account? <Link href="/login">Sign in</Link>
      </p>
    </div>
  );
}

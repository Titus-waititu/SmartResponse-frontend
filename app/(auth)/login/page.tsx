"use client";

import Link from "next/link";
import { useForm } from "@tanstack/react-form";
import { useAuth } from "@/lib/hooks/useAuth";
import { loginSchema } from "@/lib/validation/auth.schema";
import { AxiosError } from "axios";

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
    <div>
      <h1>Sign In</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        noValidate
      >
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
                autoComplete="current-password"
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

        {/* Server-side error */}
        {serverError != null && <p role="alert">{serverError}</p>}

        <button type="submit" disabled={loginPending}>
          {loginPending ? "Signing in…" : "Sign In"}
        </button>
      </form>

      <p>
        Don&apos;t have an account? <Link href="/register">Create one</Link>
      </p>
    </div>
  );
}

"use client";

import * as React from "react";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";

const schema = z.object({
  driverName: z.string().min(1, "Driver name is required"),
  vehiclePlate: z.string().min(1, "Plate is required"),
  notes: z.string().max(500, "Max 500 chars"),
});

type FormValues = z.infer<typeof schema>;

export function SpaFormRoute() {
  const [submitted, setSubmitted] = React.useState<FormValues | null>(null);

  const form = useForm({
    defaultValues: {
      driverName: "",
      vehiclePlate: "",
      notes: "",
    } satisfies FormValues,
    validatorAdapter: zodValidator(),
    validators: {
      onChange: schema,
    },
    onSubmit: async ({ value }) => {
      setSubmitted(value);
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">TanStack Form</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          A minimal Zod-validated form.
        </p>
      </div>

      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          void form.handleSubmit();
        }}
      >
        <form.Field name="driverName">
          {(field) => (
            <div className="space-y-1">
              <label className="text-sm font-medium">Driver name</label>
              <input
                className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="e.g. John Doe"
              />
              {field.state.meta.isTouched && field.state.meta.errors.length ? (
                <p className="text-sm text-red-600">
                  {field.state.meta.errors.join(", ")}
                </p>
              ) : null}
            </div>
          )}
        </form.Field>

        <form.Field name="vehiclePlate">
          {(field) => (
            <div className="space-y-1">
              <label className="text-sm font-medium">Vehicle plate</label>
              <input
                className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="e.g. ABC-1234"
              />
              {field.state.meta.isTouched && field.state.meta.errors.length ? (
                <p className="text-sm text-red-600">
                  {field.state.meta.errors.join(", ")}
                </p>
              ) : null}
            </div>
          )}
        </form.Field>

        <form.Field name="notes">
          {(field) => (
            <div className="space-y-1">
              <label className="text-sm font-medium">Notes</label>
              <textarea
                className="min-h-28 w-full resize-y rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950"
                value={field.state.value ?? ""}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="Optional details"
              />
              {field.state.meta.isTouched && field.state.meta.errors.length ? (
                <p className="text-sm text-red-600">
                  {field.state.meta.errors.join(", ")}
                </p>
              ) : null}
            </div>
          )}
        </form.Field>

        <div className="flex items-center gap-3">
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting] as const}
          >
            {([canSubmit, isSubmitting]) => (
              <button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-medium text-white disabled:opacity-50 dark:bg-white dark:text-black"
              >
                {isSubmitting ? "Submitting…" : "Submit"}
              </button>
            )}
          </form.Subscribe>

          <button
            type="button"
            className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium dark:border-zinc-800"
            onClick={() => {
              form.reset();
              setSubmitted(null);
            }}
          >
            Reset
          </button>
        </div>
      </form>

      {submitted ? (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold">Submitted value</h3>
          <pre className="overflow-auto rounded-xl bg-zinc-950 p-4 text-xs text-zinc-50">
            {JSON.stringify(submitted, null, 2)}
          </pre>
        </div>
      ) : null}
    </div>
  );
}

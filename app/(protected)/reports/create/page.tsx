"use client";

import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { AxiosError } from "axios";
import {
  createReportSchema,
  type CreateReportFormValues,
} from "@/lib/validation/report.schema";
import { useCreateReportMutation } from "@/lib/queries/report.queries";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function FieldError({ errors }: { errors: unknown[] }) {
  if (!errors.length) return null;
  return (
    <p role="alert" aria-live="polite">
      {errors.join(", ")}
    </p>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function CreateReportPage() {
  const router = useRouter();
  const mutation = useCreateReportMutation();

  const form = useForm({
    defaultValues: {
      description: "",
      latitude: 0 as number,
      longitude: 0 as number,
      image: undefined as File | undefined,
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: createReportSchema,
    },
    onSubmit: async ({ value }) => {
      const report = await mutation.mutateAsync({
        description: value.description,
        latitude: value.latitude,
        longitude: value.longitude,
        image: value.image,
      });
      router.push(`/reports/${report.id}`);
    },
  });

  const serverError =
    mutation.error instanceof AxiosError
      ? (mutation.error.response?.data as { message?: string })?.message
      : mutation.error != null
        ? "Failed to submit the report. Please try again."
        : null;

  return (
    <div>
      <h1>Create Accident Report</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        noValidate
        encType="multipart/form-data"
      >
        {/* Description ---------------------------------------------------- */}
        <form.Field name="description">
          {(field) => (
            <div>
              <label htmlFor={field.name}>Description</label>
              <textarea
                id={field.name}
                name={field.name}
                rows={5}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldError errors={field.state.meta.errors} />
            </div>
          )}
        </form.Field>

        {/* Latitude ------------------------------------------------------- */}
        <form.Field name="latitude">
          {(field) => (
            <div>
              <label htmlFor={field.name}>Latitude</label>
              <input
                id={field.name}
                name={field.name}
                type="number"
                step="any"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.valueAsNumber)}
              />
              <FieldError errors={field.state.meta.errors} />
            </div>
          )}
        </form.Field>

        {/* Longitude ------------------------------------------------------ */}
        <form.Field name="longitude">
          {(field) => (
            <div>
              <label htmlFor={field.name}>Longitude</label>
              <input
                id={field.name}
                name={field.name}
                type="number"
                step="any"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.valueAsNumber)}
              />
              <FieldError errors={field.state.meta.errors} />
            </div>
          )}
        </form.Field>

        {/* Use current location ------------------------------------------- */}
        <button
          type="button"
          onClick={() => {
            if (!navigator.geolocation) return;
            navigator.geolocation.getCurrentPosition(({ coords }) => {
              form.setFieldValue("latitude", coords.latitude);
              form.setFieldValue("longitude", coords.longitude);
            });
          }}
        >
          Use my location
        </button>

        {/* Image ---------------------------------------------------------- */}
        <form.Field name="image">
          {(field) => (
            <div>
              <label htmlFor={field.name}>Image (JPEG / PNG, max 10 MB)</label>
              <input
                id={field.name}
                name={field.name}
                type="file"
                accept="image/jpeg,image/png"
                onBlur={field.handleBlur}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  field.handleChange(file);
                }}
              />
              {field.state.value instanceof File && (
                <p>{field.state.value.name}</p>
              )}
              <FieldError errors={field.state.meta.errors} />
            </div>
          )}
        </form.Field>

        {/* Server error --------------------------------------------------- */}
        {serverError != null && <p role="alert">{serverError}</p>}

        {/* Submit --------------------------------------------------------- */}
        <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <button
              type="submit"
              disabled={!canSubmit || isSubmitting || mutation.isPending}
            >
              {isSubmitting || mutation.isPending
                ? "Submitting…"
                : "Submit Report"}
            </button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
}

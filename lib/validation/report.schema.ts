import { z } from "zod";

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 MB
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png"];

export const createReportSchema = z.object({
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(2000, "Description must not exceed 2000 characters"),

  latitude: z.coerce
    .number({ invalid_type_error: "Latitude must be a number" })
    .finite("Please enter a valid latitude")
    .min(-90, "Latitude must be between -90 and 90")
    .max(90, "Latitude must be between -90 and 90"),

  longitude: z.coerce
    .number({ invalid_type_error: "Longitude must be a number" })
    .finite("Please enter a valid longitude")
    .min(-180, "Longitude must be between -180 and 180")
    .max(180, "Longitude must be between -180 and 180"),

  // This schema is only consumed by "use client" components, so File is always
  // available at validation time.
  image: z
    .instanceof(File, { message: "Must be a valid image file" })
    .refine((f) => f.size <= MAX_IMAGE_SIZE, "Image must not exceed 10 MB")
    .refine(
      (f) => ALLOWED_IMAGE_TYPES.includes(f.type),
      "Only JPEG and PNG images are accepted",
    )
    .optional(),
});

export type CreateReportFormValues = z.infer<typeof createReportSchema>;

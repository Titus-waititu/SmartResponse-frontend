/**
 * Accident Report Page
 * Form for reporting accidents with AI-powered image analysis
 */

"use client";

import { useState, useCallback } from "react";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { accidentService, vehicleService, type Vehicle } from "@/lib/api";
import toast from "react-hot-toast";
import {
  MapPin,
  Camera,
  FileText,
  Car,
  X,
  Upload,
  AlertTriangle,
} from "lucide-react";
import { useEffect } from "react";

export default function AccidentReportPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Fetch user's vehicles
    vehicleService
      .getVehicles()
      .then((response) => setVehicles(response.data))
      .catch(() => toast.error("Failed to load vehicles"));
  }, []);

  const form = useForm({
    defaultValues: {
      description: "",
      latitude: 0,
      longitude: 0,
      address: "",
      vehicleId: "",
    },
    onSubmit: async ({ value }) => {
      if (imageFiles.length === 0) {
        toast.error("Please upload at least one image");
        return;
      }

      setIsLoading(true);
      try {
        const reportData = {
          ...value,
          images: imageFiles,
        };

        const accident = await accidentService.reportAccident(reportData);
        toast.success(
          "Accident reported successfully! AI analysis in progress...",
        );
        router.push(`/accidents/${accident.id}`);
      } catch (error: any) {
        toast.error(
          error.response?.data?.message || "Failed to report accident",
        );
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);

      if (files.length + imageFiles.length > 5) {
        toast.error("Maximum 5 images allowed");
        return;
      }

      setImageFiles((prev) => [...prev, ...files]);

      // Create previews
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          setImagePreviews((prev) => [...prev, event.target?.result as string]);
        };
        reader.readAsDataURL(file);
      });
    },
    [imageFiles.length],
  );

  const removeImage = useCallback((index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const getCurrentLocation = useCallback(() => {
    setLoadingLocation(true);

    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      setLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        // Update form values
        form.setFieldValue("latitude", latitude);
        form.setFieldValue("longitude", longitude);

        // Reverse geocode to get address
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
          );
          const data = await response.json();
          form.setFieldValue("address", data.display_name);
          toast.success("Location detected successfully");
        } catch (error) {
          toast.error("Failed to get address from coordinates");
        } finally {
          setLoadingLocation(false);
        }
      },
      (error) => {
        toast.error("Failed to get your location");
        setLoadingLocation(false);
      },
    );
  }, [form]);

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <AlertTriangle className="text-red-600" size={32} />
            Report Accident
          </h1>
          <p className="text-gray-600 mt-2">
            Provide accident details and upload images for AI-powered severity
            analysis
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="bg-white rounded-lg shadow-lg p-8 space-y-6"
        >
          {/* Description */}
          <form.Field
            name="description"
            validators={{
              onChange: ({ value }) =>
                !value ? "Description is required" : undefined,
            }}
          >
            {(field) => (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FileText size={18} />
                  Accident Description
                </label>
                <textarea
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  rows={4}
                  placeholder="Describe what happened..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                />
                {field.state.meta.errors && (
                  <p className="mt-1 text-sm text-red-600">
                    {field.state.meta.errors.join(", ")}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          {/* Location Section */}
          <div className="border border-gray-200 rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <MapPin size={20} />
                Location Details
              </h3>
              <button
                type="button"
                onClick={getCurrentLocation}
                disabled={loadingLocation}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
              >
                {loadingLocation
                  ? "Getting location..."
                  : "Use Current Location"}
              </button>
            </div>

            {/* Address */}
            <form.Field
              name="address"
              validators={{
                onChange: ({ value }) =>
                  !value ? "Address is required" : undefined,
              }}
            >
              {(field) => (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter accident location"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                  {field.state.meta.errors && (
                    <p className="mt-1 text-sm text-red-600">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Coordinates */}
            <div className="grid grid-cols-2 gap-4">
              <form.Field name="latitude">
                {(field) => (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Latitude
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(parseFloat(e.target.value))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                )}
              </form.Field>

              <form.Field name="longitude">
                {(field) => (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Longitude
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(parseFloat(e.target.value))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                )}
              </form.Field>
            </div>
          </div>

          {/* Vehicle Selection */}
          <form.Field name="vehicleId">
            {(field) => (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Car size={18} />
                  Vehicle (Optional)
                </label>
                <select
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">Select a vehicle</option>
                  {vehicles.map((vehicle) => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.year} {vehicle.make} {vehicle.model} -{" "}
                      {vehicle.licensePlate}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </form.Field>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Camera size={18} />
              Accident Images (Required)
            </label>

            {/* Upload Button */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-red-400 transition-colors">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Upload className="mx-auto text-gray-400 mb-2" size={48} />
                <p className="text-gray-600 font-medium">
                  Click to upload accident images
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  PNG, JPG up to 10MB (Max 5 images)
                </p>
              </label>
            </div>

            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mt-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? "Reporting..." : "Report Accident"}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

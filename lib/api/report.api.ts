import { apiClient } from "@/lib/api/axiosInstance";
import { API_ROUTES } from "@/lib/api/apiRoutes";
import { Report, CreateReportPayload } from "@/lib/types/report";

export const reportApi = {
  create: async (payload: CreateReportPayload): Promise<Report> => {
    let fileUrl = null;

    // 1. Upload image if present
    if (payload.image) {
      const form = new FormData();
      form.append("file", payload.image);
      try {
        const uploadRes = await apiClient.post(API_ROUTES.upload.file, form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        // assumption based on typical file upload responses
        fileUrl = uploadRes.data?.public_id || uploadRes.data?.url || uploadRes.data?.fileUrl;
      } catch (e) {
        console.error("Image upload failed", e);
      }
    }

    // 2. Create the accident
    const accidentRes = await apiClient.post(API_ROUTES.accidents.base, {
      description: payload.description,
      severity: "moderate", // Default/fallback
      status: "reported",
      latitude: payload.latitude,
      longitude: payload.longitude,
    });
    
    const accidentId = accidentRes.data.id || accidentRes.data._id;

    // 3. Link media if we have it
    if (fileUrl && accidentId) {
      await apiClient.post(API_ROUTES.media.base, {
        accidentId,
        type: "image",
        fileUrl,
      });
    }

    // 4. Optionally create location (if required by backend design)
    if (accidentId) {
      await apiClient.post(API_ROUTES.locations.base, {
        name: "Report Location",
        latitude: payload.latitude,
        longitude: payload.longitude,
      });
    }

    const createdData = accidentRes.data;
    
    return {
      id: createdData.id || createdData._id || "temp-id",
      description: createdData.description || payload.description,
      latitude: payload.latitude,
      longitude: payload.longitude,
      imageUrl: fileUrl,
      status: "PENDING",
      createdAt: createdData.createdAt || new Date().toISOString(),
      updatedAt: createdData.updatedAt || new Date().toISOString(),
      author: {
        id: "me",
        name: "Current User",
        email: "me@example.com"
      },
    };
  },

  getById: async (id: string): Promise<Report> => {
    const { data } = await apiClient.get<any>(API_ROUTES.accidents.byId(id));
    return {
      id: data.id || data._id,
      description: data.description || "",
      latitude: data.latitude || 0,
      longitude: data.longitude || 0,
      imageUrl: null, // would need to fetch media if required
      status: data.status?.toUpperCase() || "PENDING",
      createdAt: data.createdAt || new Date().toISOString(),
      updatedAt: data.updatedAt || new Date().toISOString(),
      author: { id: "u_1", name: "User", email: "user@example.com" },
    };

import { apiClient } from "@/lib/api/axiosInstance";
import { API_ROUTES } from "@/lib/api/apiRoutes";
import { Report } from "@/lib/types/report";

export const userReportApi = {
  /** GET /accidents — conceptually acts as user's own reports/accidents now given the endpoint layout */
  listMine: async (): Promise<Report[]> => {
    // Assuming /accidents returns accidents the user is involved in or mapped properly
    const { data } = await apiClient.get<any[]>(API_ROUTES.accidents.base);

    // Map to frontend "Report" type
    return (data || []).map((item) => ({
      id: item.id || item._id,
      description: item.description || "",
      latitude: item.latitude || 0,
      longitude: item.longitude || 0,
      imageUrl: item.imageUrl || null,
      status: item.status?.toUpperCase() || "PENDING",
      createdAt: item.createdAt || new Date().toISOString(),
      updatedAt: item.updatedAt || new Date().toISOString(),
      author: {
        id: "u_1",
        name: "User",
        email: "user@example.com",
      },
    }));
  },
};

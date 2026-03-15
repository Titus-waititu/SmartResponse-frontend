import { apiClient } from "@/lib/api/axiosInstance";
import { API_ROUTES } from "@/lib/api/apiRoutes";
import { Report, CreateReportPayload } from "@/lib/types/report";

export const reportApi = {
  /**
   * POST /reports  — multipart/form-data
   */
  create: async (payload: CreateReportPayload): Promise<Report> => {
    const form = new FormData();
    form.append("description", payload.description);
    form.append("latitude", String(payload.latitude));
    form.append("longitude", String(payload.longitude));
    if (payload.image) {
      form.append("image", payload.image);
    }

    const { data } = await apiClient.post<Report>(
      API_ROUTES.reports.base,
      form,
      {
        headers: {
          // Let the browser set the correct Content-Type boundary automatically
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return data;
  },

  /**
   * GET /reports/:id
   */
  getById: async (id: string): Promise<Report> => {
    const { data } = await apiClient.get<Report>(API_ROUTES.reports.byId(id));
    return data;
  },
};

import { apiClient } from "@/lib/api/axiosInstance";
import { API_ROUTES } from "@/lib/api/apiRoutes";
import { Report } from "@/lib/types/report";

export const userReportApi = {
  /** GET /reports/my — returns the authenticated user's own reports */
  listMine: async (): Promise<Report[]> => {
    const { data } = await apiClient.get<Report[]>(API_ROUTES.reports.my);
    return data;
  },
};

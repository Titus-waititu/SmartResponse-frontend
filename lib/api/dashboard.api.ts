import { apiClient } from "@/lib/api/axiosInstance";
import { API_ROUTES } from "@/lib/api/apiRoutes";
import { Incident, DispatchStatus } from "@/lib/types/incident";
import { Report } from "@/lib/types/report";
import { AnalyticsSummary, DispatchLog } from "@/lib/types/incident";

// ---------------------------------------------------------------------------
// Officer
// ---------------------------------------------------------------------------
export const officerApi = {
  /** GET /incidents/my — incidents assigned to the current officer */
  listAssigned: async (): Promise<Incident[]> => {
    const { data } = await apiClient.get<Incident[]>(API_ROUTES.incidents.my);
    return data;
  },

  /** PATCH /incidents/:id/accept */
  accept: async (incidentId: string): Promise<Incident> => {
    const { data } = await apiClient.patch<Incident>(
      API_ROUTES.incidents.accept(incidentId),
    );
    return data;
  },

  /** PATCH /incidents/:id/reject */
  reject: async (incidentId: string): Promise<Incident> => {
    const { data } = await apiClient.patch<Incident>(
      API_ROUTES.incidents.reject(incidentId),
    );
    return data;
  },

  /** PATCH /incidents/:id/dispatch */
  updateDispatch: async (
    incidentId: string,
    status: DispatchStatus,
  ): Promise<Incident> => {
    const { data } = await apiClient.patch<Incident>(
      API_ROUTES.incidents.dispatch(incidentId),
      { status },
    );
    return data;
  },
};

// ---------------------------------------------------------------------------
// Responder
// ---------------------------------------------------------------------------
export const responderApi = {
  /** GET /incidents/queue — active incidents needing a responder */
  getQueue: async (): Promise<Incident[]> => {
    const { data } = await apiClient.get<Incident[]>(
      API_ROUTES.incidents.queue,
    );
    return data;
  },

  /** PATCH /incidents/:id/dispatch */
  updateDispatch: async (
    incidentId: string,
    status: DispatchStatus,
  ): Promise<Incident> => {
    const { data } = await apiClient.patch<Incident>(
      API_ROUTES.incidents.dispatch(incidentId),
      { status },
    );
    return data;
  },
};

// ---------------------------------------------------------------------------
// Admin
// ---------------------------------------------------------------------------
export const adminApi = {
  /** GET /admin/reports */
  listAllReports: async (): Promise<Report[]> => {
    const { data } = await apiClient.get<Report[]>(API_ROUTES.admin.reports);
    return data;
  },

  /** GET /admin/analytics */
  getAnalytics: async (): Promise<AnalyticsSummary> => {
    const { data } = await apiClient.get<AnalyticsSummary>(
      API_ROUTES.admin.analytics,
    );
    return data;
  },

  /** GET /admin/dispatch-logs */
  getDispatchLogs: async (): Promise<DispatchLog[]> => {
    const { data } = await apiClient.get<DispatchLog[]>(
      API_ROUTES.admin.dispatchLogs,
    );
    return data;
  },
};

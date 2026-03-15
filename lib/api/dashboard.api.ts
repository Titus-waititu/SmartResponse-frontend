import { apiClient } from "@/lib/api/axiosInstance";
import { API_ROUTES } from "@/lib/api/apiRoutes";
import { Incident, DispatchStatus } from "@/lib/types/incident";
import { Report } from "@/lib/types/report";
import { AnalyticsSummary, DispatchLog } from "@/lib/types/incident";

// --- Mock Data ---
const mockIncidents: Incident[] = [];
const mockReports: Report[] = [];
const mockAnalytics: AnalyticsSummary = {
  totalIncidents: 100,
  resolved: 50,
  pending: 50,
};
const mockLogs: DispatchLog[] = [];
// -----------------

// ---------------------------------------------------------------------------
// Officer
// ---------------------------------------------------------------------------
export const officerApi = {
  /** GET /incidents/my — incidents assigned to the current officer */
  listAssigned: async (): Promise<Incident[]> => {
    return new Promise((resolve) =>
      setTimeout(() => resolve(mockIncidents), 400),
    );
  },

  /** PATCH /incidents/:id/accept */
  accept: async (incidentId: string): Promise<Incident> => {
    return new Promise((resolve) =>
      setTimeout(() => resolve({ id: incidentId } as Incident), 400),
    );
  },

  /** PATCH /incidents/:id/reject */
  reject: async (incidentId: string): Promise<Incident> => {
    return new Promise((resolve) =>
      setTimeout(() => resolve({ id: incidentId } as Incident), 400),
    );
  },

  /** PATCH /incidents/:id/dispatch */
  updateDispatch: async (
    incidentId: string,
    status: DispatchStatus,
  ): Promise<Incident> => {
    return new Promise((resolve) =>
      setTimeout(
        () => resolve({ id: incidentId, dispatchStatus: status } as Incident),
        400,
      ),
    );
  },
};

// ---------------------------------------------------------------------------
// Responder
// ---------------------------------------------------------------------------
export const responderApi = {
  /** GET /incidents/queue — active incidents needing a responder */
  getQueue: async (): Promise<Incident[]> => {
    return new Promise((resolve) =>
      setTimeout(() => resolve(mockIncidents), 400),
    );
  },

  /** PATCH /incidents/:id/dispatch */
  updateDispatch: async (
    incidentId: string,
    status: DispatchStatus,
  ): Promise<Incident> => {
    return new Promise((resolve) =>
      setTimeout(
        () => resolve({ id: incidentId, dispatchStatus: status } as Incident),
        400,
      ),
    );
  },
};

// ---------------------------------------------------------------------------
// Admin
// ---------------------------------------------------------------------------
export const adminApi = {
  /** GET /admin/reports */
  listAllReports: async (): Promise<Report[]> => {
    return new Promise((resolve) =>
      setTimeout(() => resolve(mockReports), 400),
    );
  },

  /** GET /admin/analytics */
  getAnalytics: async (): Promise<AnalyticsSummary> => {
    return new Promise((resolve) =>
      setTimeout(() => resolve(mockAnalytics), 400),
    );
  },

  /** GET /admin/dispatch-logs */
  getDispatchLogs: async (): Promise<DispatchLog[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(mockLogs), 400));
  },
};

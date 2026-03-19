import { apiClient } from "@/lib/api/axiosInstance";
import { API_ROUTES } from "@/lib/api/apiRoutes";
import { Incident, DispatchStatus } from "@/lib/types/incident";
import { Report } from "@/lib/types/report";
import { AnalyticsSummary, DispatchLog } from "@/lib/types/incident";
import { useAuthStore } from "@/lib/stores/authStore";

// ---------------------------------------------------------------------------
// Helper defaults for types
// ---------------------------------------------------------------------------
const mapAccidentToIncident = (data: any): Incident => ({
  id: data.id || data._id,
  reportId: data.reportId || "unknown",
  report: {
    id: data.id || data._id,
    description: data.description || "",
    latitude: data.latitude || 0,
    longitude: data.longitude || 0,
    imageUrl: data.imageUrl || null,
    status: data.status ? data.status.toUpperCase() : "PENDING",
    createdAt: data.createdAt || new Date().toISOString(),
    updatedAt: data.updatedAt || new Date().toISOString(),
    author: { id: "u_x", name: "System", email: "" },
  },
  assignedOfficerId: data.officerId || null,
  assignedResponderId: data.responderId || null,
  dispatchStatus: "DISPATCHED",
  action: null,
  createdAt: data.createdAt || new Date().toISOString(),
  updatedAt: data.updatedAt || new Date().toISOString(),
});

// ---------------------------------------------------------------------------
// Officer
// ---------------------------------------------------------------------------
export const officerApi = {
  listAssigned: async (): Promise<Incident[]> => {
    const userId = useAuthStore.getState().user?.id;
    if (!userId) return [];
    const { data } = await apiClient.get<any[]>(API_ROUTES.accidents.byOfficer(userId));
    return (data || []).map(mapAccidentToIncident);
  },

  accept: async (incidentId: string): Promise<Incident> => {
    const { data } = await apiClient.patch<any>(API_ROUTES.accidents.status(incidentId), {
      status: "in_progress",
    });
    return mapAccidentToIncident(data);
  },

  reject: async (incidentId: string): Promise<Incident> => {
    const { data } = await apiClient.patch<any>(API_ROUTES.accidents.status(incidentId), {
      status: "reported", // reverted to reported
    });
    return mapAccidentToIncident(data);
  },

  updateDispatch: async (
    incidentId: string,
    status: DispatchStatus,
  ): Promise<Incident> => {
    // using dispatch endpoints
    const { data } = await apiClient.patch<any>(API_ROUTES.accidents.status(incidentId), {
      status: status.toLowerCase(),
    });
    return mapAccidentToIncident(data);
  },
};

// ---------------------------------------------------------------------------
// Responder
// ---------------------------------------------------------------------------
export const responderApi = {
  getQueue: async (): Promise<Incident[]> => {
    // Fetch active dispatches
    const { data } = await apiClient.get<any[]>(API_ROUTES.dispatch.active);
    return (data || []).map(mapAccidentToIncident);
  },

  updateDispatch: async (
    incidentId: string,
    status: DispatchStatus,
  ): Promise<Incident> => {
    // There is no explicit patch dispatch to active? let's change accident status
    const { data } = await apiClient.patch<any>(API_ROUTES.accidents.status(incidentId), {
      status: status.toLowerCase(),
    });
    return mapAccidentToIncident(data);
  },
};

// ---------------------------------------------------------------------------
// Admin
// ---------------------------------------------------------------------------
export const adminApi = {
  listAllReports: async (): Promise<Report[]> => {
    const { data } = await apiClient.get<any[]>(API_ROUTES.reports.base);
    return (data || []).map((r: any) => ({
      id: r.id || r._id,
      description: r.content || r.description || "Report",
      latitude: r.latitude || 0,
      longitude: r.longitude || 0,
      imageUrl: null,
      status: r.status?.toUpperCase() || "PENDING",
      createdAt: r.createdAt || new Date().toISOString(),
      updatedAt: r.updatedAt || new Date().toISOString(),
      author: { id: r.officerId || "u_x", name: "Officer", email: "" },
    }));
  },

  getAnalytics: async (): Promise<AnalyticsSummary> => {
    try {
      const { data } = await apiClient.get<any>(API_ROUTES.accidents.statistics);
      return {
        totalReports: data.total || 0,
        reportsByStatus: {
          PENDING: data.pending || 0,
          UNDER_REVIEW: data.in_progress || 0,
          RESOLVED: data.resolved || 0,
          REJECTED: 0,
        },
        totalIncidents: data.total || 0,
        incidentsByDispatchStatus: {
          DISPATCHED: data.dispatched || 0,
          EN_ROUTE: 0,
          ON_SCENE: 0,
          COMPLETED: data.resolved || 0,
        },
        reportsToday: data.today || 0,
        resolvedToday: data.resolvedToday || 0,
      };
    } catch {
       return {
          totalReports: 0, reportsByStatus: { PENDING: 0, UNDER_REVIEW: 0, RESOLVED: 0, REJECTED: 0 },
          totalIncidents: 0, incidentsByDispatchStatus: { DISPATCHED: 0, EN_ROUTE: 0, ON_SCENE: 0, COMPLETED: 0 },
          reportsToday: 0, resolvedToday: 0,
       };
    }
  },

  getDispatchLogs: async (): Promise<DispatchLog[]> => {
    try {
      const { data } = await apiClient.get<any[]>(API_ROUTES.dispatch.statistics);
      return (data || []).map((d: any) => ({
        id: d.id || d._id || Math.random().toString(),
        incidentId: d.accidentId || "unknown",
        incident: { id: d.accidentId || "unknown", reportId: "unknown" },
        status: "DISPATCHED",
        updatedBy: { id: "admin", name: "System", role: "admin" },
        createdAt: new Date().toISOString(),
      }));
    } catch {
      return [];
    }
  },
};

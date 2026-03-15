import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userReportApi } from "@/lib/api/user.api";
import { officerApi, responderApi, adminApi } from "@/lib/api/dashboard.api";
import { DispatchStatus } from "@/lib/types/incident";

// ---------------------------------------------------------------------------
// Query keys
// ---------------------------------------------------------------------------
export const DASHBOARD_QUERY_KEYS = {
  // USER
  myReports: ["myReports"] as const,

  // OFFICER
  assignedIncidents: ["assignedIncidents"] as const,

  // RESPONDER
  emergencyQueue: ["emergencyQueue"] as const,

  // ADMIN
  adminReports: ["adminReports"] as const,
  adminAnalytics: ["adminAnalytics"] as const,
  adminDispatchLogs: ["adminDispatchLogs"] as const,
};

// ============================================================================
// USER hooks
// ============================================================================
export function useMyReports() {
  return useQuery({
    queryKey: DASHBOARD_QUERY_KEYS.myReports,
    queryFn: userReportApi.listMine,
    staleTime: 30_000,
  });
}

// ============================================================================
// OFFICER hooks
// ============================================================================
export function useAssignedIncidents() {
  return useQuery({
    queryKey: DASHBOARD_QUERY_KEYS.assignedIncidents,
    queryFn: officerApi.listAssigned,
    staleTime: 15_000,
    refetchInterval: 30_000,
  });
}

export function useAcceptIncidentMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (incidentId: string) => officerApi.accept(incidentId),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: DASHBOARD_QUERY_KEYS.assignedIncidents,
      });
    },
  });
}

export function useRejectIncidentMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (incidentId: string) => officerApi.reject(incidentId),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: DASHBOARD_QUERY_KEYS.assignedIncidents,
      });
    },
  });
}

export function useOfficerDispatchMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      incidentId,
      status,
    }: {
      incidentId: string;
      status: DispatchStatus;
    }) => officerApi.updateDispatch(incidentId, status),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: DASHBOARD_QUERY_KEYS.assignedIncidents,
      });
    },
  });
}

// ============================================================================
// RESPONDER hooks
// ============================================================================
export function useEmergencyQueue() {
  return useQuery({
    queryKey: DASHBOARD_QUERY_KEYS.emergencyQueue,
    queryFn: responderApi.getQueue,
    staleTime: 0,
    refetchInterval: 15_000,
  });
}

export function useResponderDispatchMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      incidentId,
      status,
    }: {
      incidentId: string;
      status: DispatchStatus;
    }) => responderApi.updateDispatch(incidentId, status),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: DASHBOARD_QUERY_KEYS.emergencyQueue });
    },
  });
}

// ============================================================================
// ADMIN hooks
// ============================================================================
export function useAdminReports() {
  return useQuery({
    queryKey: DASHBOARD_QUERY_KEYS.adminReports,
    queryFn: adminApi.listAllReports,
    staleTime: 30_000,
  });
}

export function useAdminAnalytics() {
  return useQuery({
    queryKey: DASHBOARD_QUERY_KEYS.adminAnalytics,
    queryFn: adminApi.getAnalytics,
    staleTime: 60_000,
    refetchInterval: 60_000,
  });
}

export function useAdminDispatchLogs() {
  return useQuery({
    queryKey: DASHBOARD_QUERY_KEYS.adminDispatchLogs,
    queryFn: adminApi.getDispatchLogs,
    staleTime: 30_000,
    refetchInterval: 30_000,
  });
}

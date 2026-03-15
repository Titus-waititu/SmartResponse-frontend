import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useWebSocket } from "@/lib/hooks/useWebSocket";
import { parseWsEvent } from "@/lib/ws/wsEvents";
import { REPORT_QUERY_KEYS } from "@/lib/queries/report.queries";
import { DASHBOARD_QUERY_KEYS } from "@/lib/queries/dashboard.queries";
import { useToastStore } from "@/lib/stores/toastStore";

/**
 * Mounts the WebSocket connection and wires incoming events to:
 *   1. TanStack Query cache invalidation
 *   2. In-app toast notifications
 *
 * Should be called once inside the protected layout so it is active for all
 * authenticated routes.
 *
 * Event → query key mapping:
 *   report.updated   → report detail, all reports, myReports, adminReports, adminAnalytics
 *   dispatch.updated → assignedIncidents, emergencyQueue, adminDispatchLogs, adminAnalytics
 *   new.assignment   → assignedIncidents, emergencyQueue
 */
export function useWsQuerySync() {
  const qc = useQueryClient();
  const addToast = useToastStore((s) => s.addToast);

  const onMessage = useCallback(
    (event: MessageEvent) => {
      const wsEvent = parseWsEvent(event.data as unknown);
      if (!wsEvent) return;

      switch (wsEvent.type) {
        case "report.updated":
          qc.invalidateQueries({
            queryKey: REPORT_QUERY_KEYS.detail(wsEvent.reportId),
          });
          qc.invalidateQueries({ queryKey: REPORT_QUERY_KEYS.all });
          qc.invalidateQueries({ queryKey: DASHBOARD_QUERY_KEYS.myReports });
          qc.invalidateQueries({ queryKey: DASHBOARD_QUERY_KEYS.adminReports });
          qc.invalidateQueries({
            queryKey: DASHBOARD_QUERY_KEYS.adminAnalytics,
          });
          addToast(`Report updated — new status: ${wsEvent.status}`, "info");
          break;

        case "dispatch.updated":
          qc.invalidateQueries({
            queryKey: DASHBOARD_QUERY_KEYS.assignedIncidents,
          });
          qc.invalidateQueries({
            queryKey: DASHBOARD_QUERY_KEYS.emergencyQueue,
          });
          qc.invalidateQueries({
            queryKey: DASHBOARD_QUERY_KEYS.adminDispatchLogs,
          });
          qc.invalidateQueries({
            queryKey: DASHBOARD_QUERY_KEYS.adminAnalytics,
          });
          addToast(`Dispatch status changed to ${wsEvent.status}`, "warning");
          break;

        case "new.assignment":
          qc.invalidateQueries({
            queryKey: DASHBOARD_QUERY_KEYS.assignedIncidents,
          });
          qc.invalidateQueries({
            queryKey: DASHBOARD_QUERY_KEYS.emergencyQueue,
          });
          addToast("You have a new incident assignment", "success");
          break;
      }
    },
    [qc, addToast],
  );

  return useWebSocket({ onMessage });
}

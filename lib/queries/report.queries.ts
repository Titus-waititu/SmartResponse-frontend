import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { reportApi } from "@/lib/api/report.api";
import { CreateReportPayload } from "@/lib/types/report";

// ---------------------------------------------------------------------------
// Query keys
// ---------------------------------------------------------------------------
export const REPORT_QUERY_KEYS = {
  all: ["reports"] as const,
  detail: (id: string) => ["reports", id] as const,
};

// ---------------------------------------------------------------------------
// useReportQuery
// Fetches a single report and auto-refetches every 10 seconds.
// ---------------------------------------------------------------------------
export function useReportQuery(reportId: string) {
  return useQuery({
    queryKey: REPORT_QUERY_KEYS.detail(reportId),
    queryFn: () => reportApi.getById(reportId),
    enabled: Boolean(reportId),
    staleTime: 0, // always consider stale so interval fires reliably
    refetchInterval: 10_000, // auto-refetch every 10 s
    refetchIntervalInBackground: false,
  });
}

// ---------------------------------------------------------------------------
// useCreateReportMutation
// ---------------------------------------------------------------------------
export function useCreateReportMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateReportPayload) => reportApi.create(payload),
    onSuccess: (newReport) => {
      // Pre-populate the detail cache so the redirect renders instantly
      queryClient.setQueryData(
        REPORT_QUERY_KEYS.detail(newReport.id),
        newReport,
      );
      // Invalidate any list queries so they refetch
      queryClient.invalidateQueries({ queryKey: REPORT_QUERY_KEYS.all });
    },
  });
}

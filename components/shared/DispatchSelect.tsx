import type { DispatchStatus } from "@/lib/types/incident";

const DISPATCH_STATUSES: DispatchStatus[] = [
  "DISPATCHED",
  "EN_ROUTE",
  "ON_SCENE",
  "COMPLETED",
];

const LABELS: Record<DispatchStatus, string> = {
  DISPATCHED: "Dispatched",
  EN_ROUTE: "En Route",
  ON_SCENE: "On Scene",
  COMPLETED: "Completed",
};

interface DispatchSelectProps {
  incidentId: string;
  currentStatus: DispatchStatus;
  isPending: boolean;
  onChange: (incidentId: string, status: DispatchStatus) => void;
}

/**
 * Inline <select> for updating dispatch status.
 * Intentionally unstyled – layout/theme is the consuming dashboard's concern.
 */
export function DispatchSelect({
  incidentId,
  currentStatus,
  isPending,
  onChange,
}: DispatchSelectProps) {
  return (
    <select
      value={currentStatus}
      disabled={isPending}
      aria-label="Update dispatch status"
      onChange={(e) => onChange(incidentId, e.target.value as DispatchStatus)}
    >
      {DISPATCH_STATUSES.map((s) => (
        <option key={s} value={s}>
          {LABELS[s]}
        </option>
      ))}
    </select>
  );
}

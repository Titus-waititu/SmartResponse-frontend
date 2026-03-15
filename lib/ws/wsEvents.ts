// ---------------------------------------------------------------------------
// Typed WebSocket event definitions
// All events emitted by the backend must conform to one of these shapes.
// ---------------------------------------------------------------------------

export interface ReportUpdatedEvent {
  type: "report.updated";
  /** The ID of the affected report */
  reportId: string;
  /** New status value, e.g. "UNDER_REVIEW" */
  status: string;
}

export interface DispatchUpdatedEvent {
  type: "dispatch.updated";
  /** The ID of the affected incident */
  incidentId: string;
  /** New dispatch status, e.g. "EN_ROUTE" */
  status: string;
}

export interface NewAssignmentEvent {
  type: "new.assignment";
  /** The newly created incident ID */
  incidentId: string;
  /** The report the incident was created from */
  reportId: string;
}

export type WsEvent =
  | ReportUpdatedEvent
  | DispatchUpdatedEvent
  | NewAssignmentEvent;

/**
 * Safely parse a raw WebSocket message string into a typed WsEvent.
 * Returns null when the message is not valid JSON or has an unknown type.
 */
export function parseWsEvent(raw: unknown): WsEvent | null {
  if (typeof raw !== "string") return null;

  try {
    const data = JSON.parse(raw) as unknown;

    if (
      typeof data !== "object" ||
      data === null ||
      !("type" in data) ||
      typeof (data as Record<string, unknown>).type !== "string"
    ) {
      return null;
    }

    const type = (data as Record<string, unknown>).type as string;

    if (
      type === "report.updated" ||
      type === "dispatch.updated" ||
      type === "new.assignment"
    ) {
      return data as WsEvent;
    }

    return null;
  } catch {
    return null;
  }
}

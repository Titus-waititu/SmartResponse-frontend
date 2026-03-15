import { User } from "./auth";
import { Report, ReportStatus } from "./report";

export type DispatchStatus =
  | "DISPATCHED"
  | "EN_ROUTE"
  | "ON_SCENE"
  | "COMPLETED";

export type IncidentAction = "ACCEPTED" | "REJECTED";

export interface Incident {
  id: string;
  reportId: string;
  report: Report;
  assignedOfficerId: string | null;
  assignedResponderId: string | null;
  dispatchStatus: DispatchStatus;
  action: IncidentAction | null;
  createdAt: string;
  updatedAt: string;
}

export interface DispatchLog {
  id: string;
  incidentId: string;
  incident: Pick<Incident, "id" | "reportId">;
  status: DispatchStatus;
  updatedBy: Pick<User, "id" | "name" | "role">;
  createdAt: string;
}

export interface AnalyticsSummary {
  totalReports: number;
  reportsByStatus: Record<ReportStatus, number>;
  totalIncidents: number;
  incidentsByDispatchStatus: Record<DispatchStatus, number>;
  reportsToday: number;
  resolvedToday: number;
}

import { User } from "./auth";

export type ReportStatus = "PENDING" | "UNDER_REVIEW" | "RESOLVED" | "REJECTED";

export interface Report {
  id: string;
  description: string;
  latitude: number;
  longitude: number;
  imageUrl: string | null;
  status: ReportStatus;
  createdAt: string;
  updatedAt: string;
  author: Pick<User, "id" | "name" | "email">;
}

/** Shape the backend expects for multipart/form-data creation */
export interface CreateReportPayload {
  description: string;
  latitude: number;
  longitude: number;
  image?: File;
}

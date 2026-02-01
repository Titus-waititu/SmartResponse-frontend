/**
 * API Types
 * TypeScript interfaces for API requests and responses
 */

// User Types
export enum UserRole {
  ADMIN = 'ADMIN',
  RESPONDER = 'RESPONDER',
  USER = 'USER',
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  role: UserRole;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface SignUpRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

// Accident Types
export enum AccidentSeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export enum AccidentStatus {
  REPORTED = 'REPORTED',
  DISPATCHED = 'DISPATCHED',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
}

export interface Accident {
  id: string;
  userId: string;
  locationId: string;
  vehicleId?: string;
  description: string;
  severity: AccidentSeverity;
  severityScore: number;
  aiAnalysis?: string;
  status: AccidentStatus;
  reportedAt: string;
  resolvedAt?: string;
  createdAt: string;
  updatedAt: string;
  user?: User;
  location?: Location;
  vehicle?: Vehicle;
  media?: Media[];
  dispatches?: Dispatch[];
}

export interface AccidentReportRequest {
  description: string;
  latitude: number;
  longitude: number;
  address: string;
  vehicleId?: string;
  images: File[];
}

// Location Types
export interface Location {
  id: string;
  latitude: number;
  longitude: number;
  address: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  createdAt: string;
  updatedAt: string;
}

// Vehicle Types
export interface Vehicle {
  id: string;
  userId: string;
  make: string;
  model: string;
  year: number;
  color: string;
  licensePlate: string;
  vin?: string;
  createdAt: string;
  updatedAt: string;
}

// Emergency Service Types
export enum ServiceType {
  POLICE = 'POLICE',
  AMBULANCE = 'AMBULANCE',
  FIRE_DEPARTMENT = 'FIRE_DEPARTMENT',
}

export enum ServiceStatus {
  AVAILABLE = 'AVAILABLE',
  BUSY = 'BUSY',
  OFFLINE = 'OFFLINE',
}

export interface EmergencyService {
  id: string;
  name: string;
  type: ServiceType;
  phoneNumber: string;
  email?: string;
  address: string;
  city: string;
  state: string;
  status: ServiceStatus;
  createdAt: string;
  updatedAt: string;
}

// Dispatch Types
export enum DispatchStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  EN_ROUTE = 'EN_ROUTE',
  ON_SCENE = 'ON_SCENE',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface Dispatch {
  id: string;
  accidentId: string;
  emergencyServiceId: string;
  status: DispatchStatus;
  dispatchedAt: string;
  arrivedAt?: string;
  completedAt?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  emergencyService?: EmergencyService;
}

// Media Types
export enum MediaType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  DOCUMENT = 'DOCUMENT',
}

export interface Media {
  id: string;
  accidentId?: string;
  userId?: string;
  type: MediaType;
  url: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  createdAt: string;
  updatedAt: string;
}

// Notification Types
export enum NotificationType {
  ACCIDENT_REPORTED = 'ACCIDENT_REPORTED',
  DISPATCH_SENT = 'DISPATCH_SENT',
  DISPATCH_ACCEPTED = 'DISPATCH_ACCEPTED',
  DISPATCH_COMPLETED = 'DISPATCH_COMPLETED',
  STATUS_UPDATE = 'STATUS_UPDATE',
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  relatedId?: string;
  createdAt: string;
  updatedAt: string;
}

// Report Types
export interface Report {
  id: string;
  accidentId: string;
  generatedBy: string;
  reportData: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

// Pagination Types
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

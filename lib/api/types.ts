/**
 * API Types
 * TypeScript interfaces for API requests and responses
 */

// User Types
export enum UserRole {
  ADMIN = 'admin',
  OFFICER = 'officer',
  USER = 'user',
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  username: string;
  phoneNumber?: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface SignUpRequest {
  fullName: string;
  email: string;
  username: string;
  password: string;
  phoneNumber?: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface UpdateProfileRequest {
  fullName?: string;
  phoneNumber?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

// Accident Types
export type AccidentSeverity = 'minor' | 'moderate' | 'severe' | 'critical';

export type AccidentStatus =
  | 'pending'
  | 'in_progress'
  | 'under_review'
  | 'completed'
  | 'closed';

export interface Accident {
  id: string;
  reportNumber: string;
  description: string;
  severity: AccidentSeverity;
  status: AccidentStatus;
  latitude: number;
  longitude: number;
  locationAddress: string;
  accidentDate: string;
  weatherConditions?: string;
  roadConditions?: string;
  numberOfVehicles: number;
  numberOfInjuries: number;
  numberOfFatalities: number;
  reportedById: string;
  assignedOfficerId?: string;
  createdAt: string;
  updatedAt: string;
  reportedBy?: User;
  assignedOfficer?: User;
  vehicles?: Vehicle[];
  media?: Media[];
  emergencyServices?: EmergencyService[];
}

export interface AccidentCreateRequest {
  description: string;
  severity?: AccidentSeverity;
  latitude: number;
  longitude: number;
  locationAddress: string;
  accidentDate: string;
  weatherConditions?: string;
  roadConditions?: string;
  numberOfVehicles: number;
  numberOfInjuries: number;
  numberOfFatalities: number;
}

export interface AssignOfficerRequest {
  officerId: string;
}

export interface UpdateAccidentStatusRequest {
  status: AccidentStatus;
}

// Location Types
export interface Location {
  id: string;
  name: string;
  description?: string;
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  state: string;
  postalCode?: string;
  country: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Vehicle Types
export type VehicleType = 'sedan' | 'suv' | 'truck' | 'motorcycle' | 'other';

export interface Vehicle {
  id: string;
  accidentId: string;
  licensePlate: string;
  make: string;
  model: string;
  year: number;
  color: string;
  type: VehicleType;
  driverName: string;
  driverLicenseNumber?: string;
  driverPhone?: string;
  insuranceCompany?: string;
  insurancePolicyNumber?: string;
  damage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface VehicleCreateRequest {
  accidentId: string;
  licensePlate: string;
  make: string;
  model: string;
  year: number;
  color: string;
  type: VehicleType;
  driverName: string;
  driverLicenseNumber?: string;
  driverPhone?: string;
  insuranceCompany?: string;
  insurancePolicyNumber?: string;
  damage?: string;
}

// Emergency Service Types
export type EmergencyServiceType = 'police' | 'ambulance' | 'fire' | 'tow';

export type EmergencyServiceStatus =
  | 'dispatched'
  | 'en_route'
  | 'arrived'
  | 'completed'
  | 'cancelled';

export interface EmergencyService {
  id: string;
  accidentId: string;
  type: EmergencyServiceType;
  status: EmergencyServiceStatus;
  serviceProvider: string;
  contactNumber: string;
  dispatchedAt: string;
  arrivedAt?: string;
  completedAt?: string;
  responderId?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  responder?: User;
  accident?: Accident;
}

export interface EmergencyServiceCreateRequest {
  accidentId: string;
  type: EmergencyServiceType;
  status: EmergencyServiceStatus;
  serviceProvider: string;
  contactNumber: string;
  dispatchedAt: string;
  responderId?: string;
  notes?: string;
}

export interface UpdateEmergencyServiceStatusRequest {
  status: EmergencyServiceStatus;
}

export interface AssignResponderRequest {
  responderId: string;
}

// Media Types
export type MediaType = 'image' | 'video' | 'document';

export interface Media {
  id: string;
  accidentId: string;
  type: MediaType;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  description?: string;
  uploadedById: string;
  createdAt: string;
  updatedAt: string;
  uploadedBy?: User;
}

export interface MediaCreateRequest {
  accidentId: string;
  type: MediaType;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  description?: string;
  uploadedById: string;
}

// Notification Types
export type NotificationType =
  | 'accident_assigned'
  | 'accident_updated'
  | 'service_dispatched'
  | 'service_completed'
  | 'general';

export type NotificationPriority = 'low' | 'medium' | 'high';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  priority: NotificationPriority;
  isRead: boolean;
  accidentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationCreateRequest {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  priority: NotificationPriority;
  accidentId?: string;
}

// Report Types
export interface Report {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReportCreateRequest {
  name: string;
  description?: string;
}

// AI Types
export interface AnalyzeAccidentRequest {
  accidentId: string;
  description: string;
  severity: AccidentSeverity;
  weatherConditions?: string;
  roadConditions?: string;
  numberOfVehicles: number;
  numberOfInjuries: number;
  images?: string[];
}

export interface GenerateReportRequest {
  accidentId: string;
  includeAnalysis?: boolean;
  includeRecommendations?: boolean;
}

export interface ExtractTextRequest {
  imageUrl: string;
}

export interface ClassifySeverityRequest {
  description: string;
  numberOfVehicles: number;
  numberOfInjuries: number;
  numberOfFatalities: number;
  weatherConditions?: string;
  roadConditions?: string;
}

// Dispatch Types
export interface DispatchEmergencyRequest {
  accidentId: string;
  serviceTypes: EmergencyServiceType[];
  priority: NotificationPriority;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  notes?: string;
}

export interface UpdateDispatchStatusRequest {
  status: EmergencyServiceStatus;
  estimatedArrival?: string;
}

export interface CancelDispatchRequest {
  reason: string;
}

export interface AssignDispatchRequest {
  responderId: string;
  serviceType: EmergencyServiceType;
}

// Pagination Types
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  search?: string;
  role?: UserRole;
  isActive?: boolean;
  status?: AccidentStatus | EmergencyServiceStatus;
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

// Statistics Types
export interface UserStatistics {
  totalUsers: number;
  activeUsers: number;
  adminCount: number;
  officerCount: number;
  userCount: number;
}

export interface AccidentStatistics {
  totalAccidents: number;
  pendingAccidents: number;
  inProgressAccidents: number;
  completedAccidents: number;
  severityBreakdown: Record<AccidentSeverity, number>;
  monthlyTrend: Array<{
    month: string;
    count: number;
  }>;
}

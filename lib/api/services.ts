/**
 * API Services
 * Service layer for making API requests
 */

import apiClient from './client';
import { API_CONFIG } from './config';
import type {
  AuthResponse,
  SignUpRequest,
  SignInRequest,
  UpdateProfileRequest,
  ChangePasswordRequest,
  User,
  Accident,
  AccidentCreateRequest,
  AssignOfficerRequest,
  UpdateAccidentStatusRequest,
  PaginatedResponse,
  PaginationParams,
  EmergencyService,
  EmergencyServiceCreateRequest,
  UpdateEmergencyServiceStatusRequest,
  AssignResponderRequest,
  Vehicle,
  VehicleCreateRequest,
  Notification,
  NotificationCreateRequest,
  Media,
  MediaCreateRequest,
  Location,
  Report,
  ReportCreateRequest,
  UserStatistics,
  AccidentStatistics,
  AnalyzeAccidentRequest,
  GenerateReportRequest,
  ExtractTextRequest,
  ClassifySeverityRequest,
  DispatchEmergencyRequest,
  UpdateDispatchStatusRequest,
  CancelDispatchRequest,
  AssignDispatchRequest,
} from './types';

// Authentication Service
export const authService = {
  signUp: async (data: SignUpRequest): Promise<AuthResponse> => {
    const response = await apiClient.post(API_CONFIG.ENDPOINTS.USERS.REGISTER, data);
    return response.data;
  },

  signIn: async (data: SignInRequest): Promise<AuthResponse> => {
    const response = await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.SIGNIN, data);
    return response.data;
  },

  refreshToken: async (): Promise<AuthResponse> => {
    const response = await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.REFRESH);
    return response.data;
  },

  getProfile: async (): Promise<User> => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.AUTH.PROFILE);
    return response.data;
  },

  updateProfile: async (data: UpdateProfileRequest): Promise<User> => {
    const response = await apiClient.patch(API_CONFIG.ENDPOINTS.AUTH.UPDATE_PROFILE, data);
    return response.data;
  },

  changePassword: async (data: ChangePasswordRequest): Promise<void> => {
    await apiClient.patch(API_CONFIG.ENDPOINTS.AUTH.CHANGE_PASSWORD, data);
  },

  forgotPassword: async (email: string): Promise<void> => {
    await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
  },

  resetPassword: async (token: string, newPassword: string): Promise<void> => {
    await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.RESET_PASSWORD, { token, newPassword });
  },

  logout: async (): Promise<void> => {
    await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT);
  },

  googleAuth: () => {
    window.location.href = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.GOOGLE}`;
  },
};

// Accident Service
export const accidentService = {
  createAccident: async (data: AccidentCreateRequest): Promise<Accident> => {
    const response = await apiClient.post(API_CONFIG.ENDPOINTS.ACCIDENTS.BASE, data);
    return response.data;
  },

  getAccidents: async (params?: PaginationParams): Promise<PaginatedResponse<Accident>> => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.ACCIDENTS.BASE, { params });
    return response.data;
  },

  getAccidentById: async (id: string): Promise<Accident> => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.ACCIDENTS.BY_ID(id));
    return response.data;
  },

  getAccidentByReportNumber: async (reportNumber: string): Promise<Accident> => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.ACCIDENTS.BY_REPORT(reportNumber));
    return response.data;
  },

  getAccidentsByStatus: async (status: string): Promise<Accident[]> => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.ACCIDENTS.BY_STATUS(status));
    return response.data;
  },

  getAccidentsByOfficer: async (officerId: string): Promise<Accident[]> => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.ACCIDENTS.BY_OFFICER(officerId));
    return response.data;
  },

  updateAccident: async (id: string, data: Partial<Accident>): Promise<Accident> => {
    const response = await apiClient.patch(API_CONFIG.ENDPOINTS.ACCIDENTS.BY_ID(id), data);
    return response.data;
  },

  assignOfficer: async (id: string, data: AssignOfficerRequest): Promise<Accident> => {
    const response = await apiClient.patch(API_CONFIG.ENDPOINTS.ACCIDENTS.ASSIGN_OFFICER(id), data);
    return response.data;
  },

  updateStatus: async (id: string, data: UpdateAccidentStatusRequest): Promise<Accident> => {
    const response = await apiClient.patch(API_CONFIG.ENDPOINTS.ACCIDENTS.UPDATE_STATUS(id), data);
    return response.data;
  },

  deleteAccident: async (id: string): Promise<void> => {
    await apiClient.delete(API_CONFIG.ENDPOINTS.ACCIDENTS.BY_ID(id));
  },

  getStatistics: async (): Promise<AccidentStatistics> => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.ACCIDENTS.STATISTICS);
    return response.data;
  },
};

// Emergency Service Service
export const emergencyServiceService = {
  getEmergencyServices: async (params?: PaginationParams): Promise<PaginatedResponse<EmergencyService>> => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.EMERGENCY_SERVICES.BASE, { params });
    return response.data;
  },

  getEmergencyServiceById: async (id: string): Promise<EmergencyService> => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.EMERGENCY_SERVICES.BY_ID(id));
    return response.data;
  },

  getEmergencyServicesByAccident: async (accidentId: string): Promise<EmergencyService[]> => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.EMERGENCY_SERVICES.BY_ACCIDENT(accidentId));
    return response.data;
  },

  getEmergencyServicesByStatus: async (status: string): Promise<EmergencyService[]> => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.EMERGENCY_SERVICES.BY_STATUS(status));
    return response.data;
  },

  getEmergencyServicesByResponder: async (responderId: string): Promise<EmergencyService[]> => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.EMERGENCY_SERVICES.BY_RESPONDER(responderId));
    return response.data;
  },

  getActiveEmergencyServices: async (): Promise<EmergencyService[]> => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.EMERGENCY_SERVICES.ACTIVE);
    return response.data;
  },

  createEmergencyService: async (data: EmergencyServiceCreateRequest): Promise<EmergencyService> => {
    const response = await apiClient.post(API_CONFIG.ENDPOINTS.EMERGENCY_SERVICES.BASE, data);
    return response.data;
  },

  updateEmergencyService: async (id: string, data: Partial<EmergencyService>): Promise<EmergencyService> => {
    const response = await apiClient.patch(API_CONFIG.ENDPOINTS.EMERGENCY_SERVICES.BY_ID(id), data);
    return response.data;
  },

  updateStatus: async (id: string, data: UpdateEmergencyServiceStatusRequest): Promise<EmergencyService> => {
    const response = await apiClient.patch(API_CONFIG.ENDPOINTS.EMERGENCY_SERVICES.UPDATE_STATUS(id), data);
    return response.data;
  },

  assignResponder: async (id: string, data: AssignResponderRequest): Promise<EmergencyService> => {
    const response = await apiClient.patch(API_CONFIG.ENDPOINTS.EMERGENCY_SERVICES.ASSIGN_RESPONDER(id), data);
    return response.data;
  },

  deleteEmergencyService: async (id: string): Promise<void> => {
    await apiClient.delete(API_CONFIG.ENDPOINTS.EMERGENCY_SERVICES.BY_ID(id));
  },
};

// User Service
export const userService = {
  getUsers: async (params?: PaginationParams): Promise<PaginatedResponse<User>> => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.USERS.BASE, { params });
    return response.data;
  },

  getUserById: async (id: string): Promise<User> => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.USERS.BY_ID(id));
    return response.data;
  },

  getUsersByRole: async (role: string): Promise<User[]> => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.USERS.BY_ROLE(role));
    return response.data;
  },

  getActiveUsers: async (): Promise<User[]> => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.USERS.ACTIVE);
    return response.data;
  },

  getStatistics: async (): Promise<UserStatistics> => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.USERS.STATS);
    return response.data;
  },

  updateUser: async (id: string, data: Partial<User>): Promise<User> => {
    const response = await apiClient.patch(API_CONFIG.ENDPOINTS.USERS.BY_ID(id), data);
    return response.data;
  },

  deactivateUser: async (id: string): Promise<User> => {
    const response = await apiClient.patch(API_CONFIG.ENDPOINTS.USERS.DEACTIVATE(id));
    return response.data;
  },

  activateUser: async (id: string): Promise<User> => {
    const response = await apiClient.patch(API_CONFIG.ENDPOINTS.USERS.ACTIVATE(id));
    return response.data;
  },

  deleteUser: async (id: string): Promise<void> => {
    await apiClient.delete(API_CONFIG.ENDPOINTS.USERS.BY_ID(id));
  },
};

// Vehicle Service
export const vehicleService = {
  getVehicles: async (params?: PaginationParams): Promise<PaginatedResponse<Vehicle>> => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.VEHICLES.BASE, { params });
    return response.data;
  },

  getVehicleById: async (id: string): Promise<Vehicle> => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.VEHICLES.BY_ID(id));
    return response.data;
  },

  getVehiclesByAccident: async (accidentId: string): Promise<Vehicle[]> => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.VEHICLES.BY_ACCIDENT(accidentId));
    return response.data;
  },

  getVehicleByPlate: async (plate: string): Promise<Vehicle> => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.VEHICLES.BY_PLATE(plate));
    return response.data;
  },

  createVehicle: async (data: VehicleCreateRequest): Promise<Vehicle> => {
    const response = await apiClient.post(API_CONFIG.ENDPOINTS.VEHICLES.BASE, data);
    return response.data;
  },

  updateVehicle: async (id: string, data: Partial<Vehicle>): Promise<Vehicle> => {
    const response = await apiClient.patch(API_CONFIG.ENDPOINTS.VEHICLES.BY_ID(id), data);
    return response.data;
  },

  deleteVehicle: async (id: string): Promise<void> => {
    await apiClient.delete(API_CONFIG.ENDPOINTS.VEHICLES.BY_ID(id));
  },
};

// Notification Service
export const notificationService = {
  getNotifications: async (params?: PaginationParams): Promise<PaginatedResponse<Notification>> => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.NOTIFICATIONS.BASE, { params });
    return response.data;
  },

  getNotificationById: async (id: string): Promise<Notification> => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.NOTIFICATIONS.BY_ID(id));
    return response.data;
  },

  getNotificationsByUser: async (userId: string): Promise<Notification[]> => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.NOTIFICATIONS.BY_USER(userId));
    return response.data;
  },

  getUnreadNotifications: async (userId: string): Promise<Notification[]> => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.NOTIFICATIONS.UNREAD(userId));
    return response.data;
  },

  getUnreadCount: async (userId: string): Promise<number> => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.NOTIFICATIONS.UNREAD_COUNT(userId));
    return response.data;
  },

  createNotification: async (data: NotificationCreateRequest): Promise<Notification> => {
    const response = await apiClient.post(API_CONFIG.ENDPOINTS.NOTIFICATIONS.BASE, data);
    return response.data;
  },

  markAsRead: async (id: string): Promise<Notification> => {
    const response = await apiClient.patch(API_CONFIG.ENDPOINTS.NOTIFICATIONS.MARK_READ(id));
    return response.data;
  },

  markAllAsRead: async (userId: string): Promise<void> => {
    await apiClient.patch(API_CONFIG.ENDPOINTS.NOTIFICATIONS.MARK_ALL_READ(userId));
  },

  updateNotification: async (id: string, data: Partial<Notification>): Promise<Notification> => {
    const response = await apiClient.patch(API_CONFIG.ENDPOINTS.NOTIFICATIONS.BY_ID(id), data);
    return response.data;
  },

  deleteNotification: async (id: string): Promise<void> => {
    await apiClient.delete(API_CONFIG.ENDPOINTS.NOTIFICATIONS.BY_ID(id));
  },
};

// Media Service
export const mediaService = {
  getMedia: async (params?: PaginationParams): Promise<PaginatedResponse<Media>> => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.MEDIA.BASE, { params });
    return response.data;
  },

  getMediaById: async (id: string): Promise<Media> => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.MEDIA.BY_ID(id));
    return response.data;
  },

  getMediaByAccident: async (accidentId: string): Promise<Media[]> => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.MEDIA.BY_ACCIDENT(accidentId));
    return response.data;
  },

  getMediaByType: async (type: string): Promise<Media[]> => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.MEDIA.BY_TYPE(type));
    return response.data;
  },

  createMedia: async (data: MediaCreateRequest): Promise<Media> => {
    const response = await apiClient.post(API_CONFIG.ENDPOINTS.MEDIA.BASE, data);
    return response.data;
  },

  updateMedia: async (id: string, data: Partial<Media>): Promise<Media> => {
    const response = await apiClient.patch(API_CONFIG.ENDPOINTS.MEDIA.BY_ID(id), data);
    return response.data;
  },

  deleteMedia: async (id: string): Promise<void> => {
    await apiClient.delete(API_CONFIG.ENDPOINTS.MEDIA.BY_ID(id));
  },
};

// Location Service
export const locationService = {
  getLocations: async (params?: PaginationParams): Promise<PaginatedResponse<Location>> => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.LOCATIONS.BASE, { params });
    return response.data;
  },

  getLocationById: async (id: string): Promise<Location> => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.LOCATIONS.BY_ID(id));
    return response.data;
  },

  getLocationsByCity: async (city: string): Promise<Location[]> => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.LOCATIONS.BY_CITY(city));
    return response.data;
  },

  findNearbyLocations: async (latitude: number, longitude: number, radius: number): Promise<Location[]> => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.LOCATIONS.NEARBY, {
      params: { latitude, longitude, radius },
    });
    return response.data;
  },

  createLocation: async (data: Partial<Location>): Promise<Location> => {
    const response = await apiClient.post(API_CONFIG.ENDPOINTS.LOCATIONS.BASE, data);
    return response.data;
  },

  updateLocation: async (id: string, data: Partial<Location>): Promise<Location> => {
    const response = await apiClient.patch(API_CONFIG.ENDPOINTS.LOCATIONS.BY_ID(id), data);
    return response.data;
  },

  deactivateLocation: async (id: string): Promise<Location> => {
    const response = await apiClient.patch(API_CONFIG.ENDPOINTS.LOCATIONS.DEACTIVATE(id));
    return response.data;
  },

  deleteLocation: async (id: string): Promise<void> => {
    await apiClient.delete(API_CONFIG.ENDPOINTS.LOCATIONS.BY_ID(id));
  },
};

// Report Service
export const reportService = {
  getReports: async (params?: PaginationParams): Promise<PaginatedResponse<Report>> => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.REPORTS.BASE, { params });
    return response.data;
  },

  getReportById: async (id: string): Promise<Report> => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.REPORTS.BY_ID(id));
    return response.data;
  },

  createReport: async (data: ReportCreateRequest): Promise<Report> => {
    const response = await apiClient.post(API_CONFIG.ENDPOINTS.REPORTS.BASE, data);
    return response.data;
  },

  updateReport: async (id: string, data: Partial<Report>): Promise<Report> => {
    const response = await apiClient.patch(API_CONFIG.ENDPOINTS.REPORTS.BY_ID(id), data);
    return response.data;
  },

  deleteReport: async (id: string): Promise<void> => {
    await apiClient.delete(API_CONFIG.ENDPOINTS.REPORTS.BY_ID(id));
  },
};

// AI Service
export const aiService = {
  analyzeAccident: async (data: AnalyzeAccidentRequest): Promise<any> => {
    const response = await apiClient.post(API_CONFIG.ENDPOINTS.AI.ANALYZE_ACCIDENT, data);
    return response.data;
  },

  generateReport: async (data: GenerateReportRequest): Promise<any> => {
    const response = await apiClient.post(API_CONFIG.ENDPOINTS.AI.GENERATE_REPORT, data);
    return response.data;
  },

  extractText: async (data: ExtractTextRequest): Promise<any> => {
    const response = await apiClient.post(API_CONFIG.ENDPOINTS.AI.EXTRACT_TEXT, data);
    return response.data;
  },

  classifySeverity: async (data: ClassifySeverityRequest): Promise<any> => {
    const response = await apiClient.post(API_CONFIG.ENDPOINTS.AI.CLASSIFY_SEVERITY, data);
    return response.data;
  },

  getInsights: async (accidentId: string): Promise<any> => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.AI.INSIGHTS(accidentId));
    return response.data;
  },
};

// Dispatch Service
export const dispatchService = {
  dispatchEmergency: async (data: DispatchEmergencyRequest): Promise<any> => {
    const response = await apiClient.post(API_CONFIG.ENDPOINTS.DISPATCH.EMERGENCY, data);
    return response.data;
  },

  getDispatchStatus: async (accidentId: string): Promise<any> => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.DISPATCH.STATUS(accidentId));
    return response.data;
  },

  updateDispatchStatus: async (accidentId: string, data: UpdateDispatchStatusRequest): Promise<any> => {
    const response = await apiClient.patch(API_CONFIG.ENDPOINTS.DISPATCH.UPDATE_STATUS(accidentId), data);
    return response.data;
  },

  cancelDispatch: async (accidentId: string, data: CancelDispatchRequest): Promise<any> => {
    const response = await apiClient.post(API_CONFIG.ENDPOINTS.DISPATCH.CANCEL(accidentId), data);
    return response.data;
  },

  getActiveDispatches: async (): Promise<any[]> => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.DISPATCH.ACTIVE);
    return response.data;
  },

  getDispatchHistory: async (startDate?: string, endDate?: string): Promise<any[]> => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.DISPATCH.HISTORY, {
      params: { startDate, endDate },
    });
    return response.data;
  },

  assignResponder: async (accidentId: string, data: AssignDispatchRequest): Promise<any> => {
    const response = await apiClient.patch(API_CONFIG.ENDPOINTS.DISPATCH.ASSIGN(accidentId), data);
    return response.data;
  },
};

// Upload Service
export const uploadService = {
  uploadFile: async (file: File, accidentId: string, description?: string): Promise<Media> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('accidentId', accidentId);
    if (description) {
      formData.append('description', description);
    }

    const response = await apiClient.post(API_CONFIG.ENDPOINTS.UPLOAD.FILE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  uploadFiles: async (files: File[], accidentId: string): Promise<Media[]> => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });
    formData.append('accidentId', accidentId);

    const response = await apiClient.post(API_CONFIG.ENDPOINTS.UPLOAD.FILES, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  uploadDocument: async (file: File, accidentId: string, documentType: string): Promise<Media> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('accidentId', accidentId);
    formData.append('documentType', documentType);

    const response = await apiClient.post(API_CONFIG.ENDPOINTS.UPLOAD.DOCUMENT, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  uploadVideo: async (file: File, accidentId: string, description?: string): Promise<Media> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('accidentId', accidentId);
    if (description) {
      formData.append('description', description);
    }

    const response = await apiClient.post(API_CONFIG.ENDPOINTS.UPLOAD.VIDEO, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getUploadStatus: async (uploadId: string): Promise<any> => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.UPLOAD.STATUS(uploadId));
    return response.data;
  },

  deleteFile: async (fileId: string): Promise<void> => {
    await apiClient.delete(API_CONFIG.ENDPOINTS.UPLOAD.DELETE(fileId));
  },
};

/**
 * API Services
 * Service layer for making API requests
 */

import apiClient from "./client";
import { API_CONFIG } from "./config";
import type {
  AuthResponse,
  SignUpRequest,
  SignInRequest,
  User,
  Accident,
  AccidentReportRequest,
  PaginatedResponse,
  PaginationParams,
  EmergencyService,
  Vehicle,
  Notification,
} from "./types";

// Authentication Service
export const authService = {
  signUp: async (data: SignUpRequest): Promise<AuthResponse> => {
    const response = await apiClient.post(
      API_CONFIG.ENDPOINTS.AUTH.SIGNUP,
      data,
    );
    return response.data;
  },

  signIn: async (data: SignInRequest): Promise<AuthResponse> => {
    const response = await apiClient.post(
      API_CONFIG.ENDPOINTS.AUTH.SIGNIN,
      data,
    );
    return response.data;
  },

  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const response = await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.REFRESH, {
      refreshToken,
    });
    return response.data;
  },

  googleAuth: () => {
    window.location.href = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.GOOGLE}`;
  },
};

// Accident Service
export const accidentService = {
  reportAccident: async (data: AccidentReportRequest): Promise<Accident> => {
    const formData = new FormData();

    formData.append("description", data.description);
    formData.append("latitude", data.latitude.toString());
    formData.append("longitude", data.longitude.toString());
    formData.append("address", data.address);

    if (data.vehicleId) {
      formData.append("vehicleId", data.vehicleId);
    }

    data.images.forEach((image) => {
      formData.append("images", image);
    });

    const response = await apiClient.post(
      API_CONFIG.ENDPOINTS.ACCIDENTS.REPORT,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response.data;
  },

  getAccidents: async (
    params?: PaginationParams,
  ): Promise<PaginatedResponse<Accident>> => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.ACCIDENTS.BASE, {
      params,
    });
    return response.data;
  },

  getAccidentById: async (id: string): Promise<Accident> => {
    const response = await apiClient.get(
      API_CONFIG.ENDPOINTS.ACCIDENTS.BY_ID(id),
    );
    return response.data;
  },

  updateAccident: async (
    id: string,
    data: Partial<Accident>,
  ): Promise<Accident> => {
    const response = await apiClient.patch(
      API_CONFIG.ENDPOINTS.ACCIDENTS.BY_ID(id),
      data,
    );
    return response.data;
  },

  deleteAccident: async (id: string): Promise<void> => {
    await apiClient.delete(API_CONFIG.ENDPOINTS.ACCIDENTS.BY_ID(id));
  },
};

// Emergency Service Service
export const emergencyServiceService = {
  getEmergencyServices: async (
    params?: PaginationParams,
  ): Promise<PaginatedResponse<EmergencyService>> => {
    const response = await apiClient.get(
      API_CONFIG.ENDPOINTS.EMERGENCY_SERVICES.BASE,
      { params },
    );
    return response.data;
  },

  getEmergencyServiceById: async (id: string): Promise<EmergencyService> => {
    const response = await apiClient.get(
      API_CONFIG.ENDPOINTS.EMERGENCY_SERVICES.BY_ID(id),
    );
    return response.data;
  },

  createEmergencyService: async (
    data: Partial<EmergencyService>,
  ): Promise<EmergencyService> => {
    const response = await apiClient.post(
      API_CONFIG.ENDPOINTS.EMERGENCY_SERVICES.BASE,
      data,
    );
    return response.data;
  },

  updateEmergencyService: async (
    id: string,
    data: Partial<EmergencyService>,
  ): Promise<EmergencyService> => {
    const response = await apiClient.patch(
      API_CONFIG.ENDPOINTS.EMERGENCY_SERVICES.BY_ID(id),
      data,
    );
    return response.data;
  },

  deleteEmergencyService: async (id: string): Promise<void> => {
    await apiClient.delete(API_CONFIG.ENDPOINTS.EMERGENCY_SERVICES.BY_ID(id));
  },
};

// User Service
export const userService = {
  getUsers: async (
    params?: PaginationParams,
  ): Promise<PaginatedResponse<User>> => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.USERS.BASE, {
      params,
    });
    return response.data;
  },

  getUserById: async (id: string): Promise<User> => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.USERS.BY_ID(id));
    return response.data;
  },

  getProfile: async (): Promise<User> => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.USERS.PROFILE);
    return response.data;
  },

  updateUser: async (id: string, data: Partial<User>): Promise<User> => {
    const response = await apiClient.patch(
      API_CONFIG.ENDPOINTS.USERS.BY_ID(id),
      data,
    );
    return response.data;
  },

  deleteUser: async (id: string): Promise<void> => {
    await apiClient.delete(API_CONFIG.ENDPOINTS.USERS.BY_ID(id));
  },
};

// Vehicle Service
export const vehicleService = {
  getVehicles: async (
    params?: PaginationParams,
  ): Promise<PaginatedResponse<Vehicle>> => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.VEHICLES.BASE, {
      params,
    });
    return response.data;
  },

  getVehicleById: async (id: string): Promise<Vehicle> => {
    const response = await apiClient.get(
      API_CONFIG.ENDPOINTS.VEHICLES.BY_ID(id),
    );
    return response.data;
  },

  createVehicle: async (data: Partial<Vehicle>): Promise<Vehicle> => {
    const response = await apiClient.post(
      API_CONFIG.ENDPOINTS.VEHICLES.BASE,
      data,
    );
    return response.data;
  },

  updateVehicle: async (
    id: string,
    data: Partial<Vehicle>,
  ): Promise<Vehicle> => {
    const response = await apiClient.patch(
      API_CONFIG.ENDPOINTS.VEHICLES.BY_ID(id),
      data,
    );
    return response.data;
  },

  deleteVehicle: async (id: string): Promise<void> => {
    await apiClient.delete(API_CONFIG.ENDPOINTS.VEHICLES.BY_ID(id));
  },
};

// Notification Service
export const notificationService = {
  getNotifications: async (
    params?: PaginationParams,
  ): Promise<PaginatedResponse<Notification>> => {
    const response = await apiClient.get(
      API_CONFIG.ENDPOINTS.NOTIFICATIONS.BASE,
      { params },
    );
    return response.data;
  },

  markAsRead: async (id: string): Promise<Notification> => {
    const response = await apiClient.patch(
      API_CONFIG.ENDPOINTS.NOTIFICATIONS.BY_ID(id),
      {
        isRead: true,
      },
    );
    return response.data;
  },

  deleteNotification: async (id: string): Promise<void> => {
    await apiClient.delete(API_CONFIG.ENDPOINTS.NOTIFICATIONS.BY_ID(id));
  },
};

/**
 * API Configuration
 * Centralized configuration for all backend API endpoints
 */

export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1",
  TIMEOUT: 30000,

  // API Endpoints
  ENDPOINTS: {
    // Authentication
    AUTH: {
      SIGNIN: "/auth/signin",
      REFRESH: "/auth/refresh",
      PROFILE: "/auth/profile",
      UPDATE_PROFILE: "/auth/profile",
      CHANGE_PASSWORD: "/auth/change-password",
      FORGOT_PASSWORD: "/auth/forgot-password",
      RESET_PASSWORD: "/auth/reset-password",
      LOGOUT: "/auth/logout",
      GOOGLE: "/auth/google",
      GOOGLE_CALLBACK: "/auth/google/callback",
    },

    // Users
    USERS: {
      BASE: "/users",
      REGISTER: "/users",
      BY_ID: (id: string) => `/users/${id}`,
      DEACTIVATE: (id: string) => `/users/${id}/deactivate`,
      ACTIVATE: (id: string) => `/users/${id}/activate`,
      BY_ROLE: (role: string) => `/users/role/${role}`,
      ACTIVE: "/users/active",
      STATS: "/users/stats",
    },

    // Accidents
    ACCIDENTS: {
      BASE: "/accidents",
      BY_ID: (id: string) => `/accidents/${id}`,
      BY_REPORT: (reportNumber: string) => `/accidents/report/${reportNumber}`,
      BY_STATUS: (status: string) => `/accidents/status/${status}`,
      BY_OFFICER: (officerId: string) => `/accidents/officer/${officerId}`,
      ASSIGN_OFFICER: (id: string) => `/accidents/${id}/assign-officer`,
      UPDATE_STATUS: (id: string) => `/accidents/${id}/status`,
      STATISTICS: "/accidents/statistics",
    },

    // Vehicles
    VEHICLES: {
      BASE: "/vehicles",
      BY_ID: (id: string) => `/vehicles/${id}`,
      BY_ACCIDENT: (accidentId: string) => `/vehicles/accident/${accidentId}`,
      BY_PLATE: (plate: string) => `/vehicles/plate/${plate}`,
    },

    // Media
    MEDIA: {
      BASE: "/media",
      BY_ID: (id: string) => `/media/${id}`,
      BY_ACCIDENT: (accidentId: string) => `/media/accident/${accidentId}`,
      BY_TYPE: (type: string) => `/media/type/${type}`,
    },

    // Locations
    LOCATIONS: {
      BASE: "/locations",
      BY_ID: (id: string) => `/locations/${id}`,
      BY_CITY: (city: string) => `/locations/city/${city}`,
      NEARBY: "/locations/nearby",
      DEACTIVATE: (id: string) => `/locations/${id}/deactivate`,
    },

    // Notifications
    NOTIFICATIONS: {
      BASE: "/notifications",
      BY_ID: (id: string) => `/notifications/${id}`,
      BY_USER: (userId: string) => `/notifications/user/${userId}`,
      UNREAD: (userId: string) => `/notifications/user/${userId}/unread`,
      UNREAD_COUNT: (userId: string) =>
        `/notifications/user/${userId}/unread/count`,
      MARK_READ: (id: string) => `/notifications/${id}/read`,
      MARK_ALL_READ: (userId: string) =>
        `/notifications/user/${userId}/read-all`,
    },

    // Emergency Services
    EMERGENCY_SERVICES: {
      BASE: "/emergency-services",
      BY_ID: (id: string) => `/emergency-services/${id}`,
      BY_ACCIDENT: (accidentId: string) =>
        `/emergency-services/accident/${accidentId}`,
      BY_STATUS: (status: string) => `/emergency-services/status/${status}`,
      BY_RESPONDER: (responderId: string) =>
        `/emergency-services/responder/${responderId}`,
      ACTIVE: "/emergency-services/active",
      UPDATE_STATUS: (id: string) => `/emergency-services/${id}/status`,
      ASSIGN_RESPONDER: (id: string) =>
        `/emergency-services/${id}/assign-responder`,
    },

    // Reports
    REPORTS: {
      BASE: "/reports",
      BY_ID: (id: string) => `/reports/${id}`,
    },

    // AI
    AI: {
      ANALYZE_ACCIDENT: "/ai/analyze-accident",
      GENERATE_REPORT: "/ai/generate-report",
      EXTRACT_TEXT: "/ai/extract-text",
      CLASSIFY_SEVERITY: "/ai/classify-severity",
      INSIGHTS: (accidentId: string) => `/ai/insights/${accidentId}`,
    },

    // Dispatch
    DISPATCH: {
      EMERGENCY: "/dispatch/emergency",
      STATUS: (accidentId: string) => `/dispatch/status/${accidentId}`,
      UPDATE_STATUS: (accidentId: string) => `/dispatch/${accidentId}/status`,
      CANCEL: (accidentId: string) => `/dispatch/${accidentId}/cancel`,
      ACTIVE: "/dispatch/active",
      HISTORY: "/dispatch/history",
      ASSIGN: (accidentId: string) => `/dispatch/${accidentId}/assign`,
    },

    // Upload
    UPLOAD: {
      FILE: "/upload/file",
      FILES: "/upload/files",
      DOCUMENT: "/upload/document",
      VIDEO: "/upload/video",
      STATUS: (uploadId: string) => `/upload/status/${uploadId}`,
      DELETE: (fileId: string) => `/upload/file/${fileId}`,
    },
  },
} as const;

export type ApiConfig = typeof API_CONFIG;

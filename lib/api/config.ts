/**
 * API Configuration
 * Centralized configuration for all backend API endpoints
 */

export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  TIMEOUT: 30000,

  // API Endpoints
  ENDPOINTS: {
    // Authentication
    AUTH: {
      SIGNUP: "/auth/signup",
      SIGNIN: "/auth/signin",
      REFRESH: "/auth/refresh",
      GOOGLE: "/auth/google",
      GOOGLE_CALLBACK: "/auth/google/callback",
    },

    // Accidents
    ACCIDENTS: {
      BASE: "/accidents",
      REPORT: "/accidents/report",
      BY_ID: (id: string) => `/accidents/${id}`,
    },

    // Emergency Services
    EMERGENCY_SERVICES: {
      BASE: "/emergency-services",
      BY_ID: (id: string) => `/emergency-services/${id}`,
    },

    // Dispatch
    DISPATCH: {
      BASE: "/dispatch",
      BY_ID: (id: string) => `/dispatch/${id}`,
    },

    // Users
    USERS: {
      BASE: "/users",
      BY_ID: (id: string) => `/users/${id}`,
      PROFILE: "/users/profile",
    },

    // Vehicles
    VEHICLES: {
      BASE: "/vehicles",
      BY_ID: (id: string) => `/vehicles/${id}`,
    },

    // Locations
    LOCATIONS: {
      BASE: "/locations",
      BY_ID: (id: string) => `/locations/${id}`,
    },

    // Media
    MEDIA: {
      BASE: "/media",
      UPLOAD: "/upload",
      BY_ID: (id: string) => `/media/${id}`,
    },

    // Reports
    REPORTS: {
      BASE: "/reports",
      BY_ID: (id: string) => `/reports/${id}`,
    },

    // Notifications
    NOTIFICATIONS: {
      BASE: "/notifications",
      BY_ID: (id: string) => `/notifications/${id}`,
    },
  },
} as const;

export type ApiConfig = typeof API_CONFIG;

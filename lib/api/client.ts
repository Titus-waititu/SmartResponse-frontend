/**
 * API Client
 * Axios instance with interceptors for authentication and error handling
 */

import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { API_CONFIG } from "./config";
import toast from "react-hot-toast";

// Create axios instance
export const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("accessToken");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// Response interceptor for error handling and token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Handle 401 errors (Unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log("⚠️ 401 error detected, attempting token refresh...");
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          console.log("❌ No refresh token available");
          throw new Error("No refresh token available");
        }

        console.log("🔄 Attempting to refresh token...");
        // Attempt to refresh token
        const response = await axios.post(
          `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.REFRESH}`,
          { refreshToken },
        );

        // Handle nested tokens structure
        const tokens = response.data.tokens || response.data;
        const accessToken = tokens.accessToken;
        const newRefreshToken = tokens.refreshToken;
        
        console.log("✅ Token refreshed successfully");

        // Store new tokens
        localStorage.setItem("accessToken", accessToken);
        if (newRefreshToken) {
          localStorage.setItem("refreshToken", newRefreshToken);
        }

        // Retry original request with new token
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }

        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error("❌ Token refresh failed:", refreshError);

        // Only logout if we're not on auth pages
        const isAuthPage = window.location.pathname.startsWith("/auth");

        if (!isAuthPage) {
          console.log("🚪 Logging out user due to failed token refresh");
          // Clear tokens and redirect to login
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("user");
          localStorage.removeItem("auth-storage");

          toast.error("Session expired. Please login again.");

          // Redirect to login page
          if (typeof window !== "undefined") {
            window.location.href = "/auth/signin";
          }
        }

        return Promise.reject(refreshError);
      }
    }

    // Handle other errors
    const errorMessage =
      (error.response?.data as any)?.message ||
      error.message ||
      "An unexpected error occurred";

    toast.error(errorMessage);

    return Promise.reject(error);
  },
);

export default apiClient;

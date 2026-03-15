import { apiClient } from "@/lib/api/axiosInstance";
import { API_ROUTES } from "@/lib/api/apiRoutes";
import {
  LoginCredentials,
  LoginResponse,
  RegisterCredentials,
  RegisterResponse,
  User,
} from "@/lib/types/auth";

// --- Mock Data ---
const mockUser = {
  id: "u_1",
  name: "Current User",
  email: "demo@example.com",
};

const mockTokens = {
  accessToken: "mock.jwt.token",
  refreshToken: "mock.refresh.token",
};
// -----------------

export const authApi = {
  /**
   * POST /auth/login
   * Returns user + tokens.
   */
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    // Generate a mock role based on email to allow testing different dashboards
    let role = "USER" as User["role"];
    if (credentials.email.includes("admin")) role = "ADMIN";
    if (credentials.email.includes("officer")) role = "OFFICER";
    if (credentials.email.includes("responder")) role = "RESPONDER";
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: { ...mockUser, email: credentials.email, role },
          tokens: mockTokens,
        });
      }, 600);
    });
  },

  /**
   * POST /auth/register
   * Creates a new account and returns user + tokens (auto-login).
   */
  register: async (
    credentials: RegisterCredentials,
  ): Promise<RegisterResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: { 
            id: "u_2", 
            email: credentials.email, 
            name: credentials.name, 
            role: credentials.role || "USER" 
          },
          tokens: mockTokens,
        });
      }, 600);
    });
  },

  /**
   * GET /auth/me
   * Returns the currently authenticated user (requires Bearer token).
   */
  me: async (): Promise<User> => {
    // Determine last saved token from state or cookie if needed, but for mock:
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ...mockUser,
          role: "USER" // Note: This resets on reload if unpersisted, but it's enough to clear network errors.
        });
      }, 600);
    });
  },

  /**
   * POST /auth/logout
   * Invalidates the refresh token server-side. Fire-and-forget is fine.
   */
  logout: async (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(resolve, 400);
    });
  }
};

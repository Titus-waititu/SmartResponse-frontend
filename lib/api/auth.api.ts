import { apiClient } from "@/lib/api/axiosInstance";
import { API_ROUTES } from "@/lib/api/apiRoutes";
import {
  LoginCredentials,
  LoginResponse,
  RegisterCredentials,
  RegisterResponse,
  User,
} from "@/lib/types/auth";

export const authApi = {
  /**
   * POST /auth/login
   * Returns user + tokens.
   */
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const { data } = await apiClient.post<LoginResponse>(
      API_ROUTES.auth.login,
      credentials,
    );
    return data;
  },

  /**
   * POST /auth/register
   * Creates a new account and returns user + tokens (auto-login).
   */
  register: async (
    credentials: RegisterCredentials,
  ): Promise<RegisterResponse> => {
    const { data } = await apiClient.post<RegisterResponse>(
      API_ROUTES.auth.register,
      credentials,
    );
    return data;
  },

  /**
   * GET /auth/me
   * Returns the currently authenticated user (requires Bearer token).
   */
  me: async (): Promise<User> => {
    const { data } = await apiClient.get<User>(API_ROUTES.auth.me);
    return data;
  },

  /**
   * POST /auth/logout
   * Invalidates the refresh token server-side. Fire-and-forget is fine.
   */
  logout: async (): Promise<void> => {
    await apiClient.post(API_ROUTES.auth.logout);
  },
};

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
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const { data } = await apiClient.post<LoginResponse>(
      API_ROUTES.auth.signin,
      credentials,
    );
    return data;
  },

  register: async (
    credentials: RegisterCredentials,
  ): Promise<RegisterResponse> => {
    // Map the expected payload
    const payload = {
      fullName: credentials.fullName || (credentials as any).name || "User",
      email: credentials.email,
      username: credentials.email.split("@")[0], // Fallback username
      password: credentials.password,
      role: credentials.role || "user",
      isActive: true,
    };

    // The endpoint is actually creating a user
    const { data } = await apiClient.post<any>(
      API_ROUTES.auth.register,
      payload,
    );

    // The register endpoint might just return the user, not tokens if we follow the REST principles for /users creation.
    // Assuming backend returns user + tokens or we login right after.
    // If backend returns just user without token:
    if (data && (!data.tokens || !data.accessToken)) {
      // We might need to call login immediately
      const loginResp = await authApi.login({
        email: payload.email,
        password: payload.password,
      });
      return loginResp;
    }

    return data;
  },

  me: async (): Promise<User> => {
    const { data } = await apiClient.get<User>(API_ROUTES.auth.profile);
    // map fullName to name if necessary for existing components
    if (data && data.fullName) {
      data.name = data.fullName;
    }
    return data;
  },

  logout: async (): Promise<void> => {
    try {
      await apiClient.post(API_ROUTES.auth.logout);
    } catch {
      // Ignore failure on logout
    }
  },
};

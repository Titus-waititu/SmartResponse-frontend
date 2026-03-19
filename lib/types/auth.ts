export type UserRole = "user" | "officer" | "emergency_responder" | "admin";

export interface User {
  id: string; // Wait, actually the ID in backend might be a string (UUID)
  email: string;
  fullName: string;
  username: string;
  phoneNumber?: string;
  role: UserRole;
  isActive: boolean;
  name?: string; // fallback if components use name
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  fullName: string;
  email: string;
  username: string;
  password: string;
  phoneNumber?: string;
  role?: UserRole;
  isActive?: boolean;
}

export interface LoginResponse {
  user: User;
  tokens: AuthTokens;
}

export interface RegisterResponse {
  user: User;
  tokens: AuthTokens;
}

export interface RefreshResponse {
  accessToken: string;
}

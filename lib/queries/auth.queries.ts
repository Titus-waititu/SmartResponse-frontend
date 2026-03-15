import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/lib/api/auth.api";
import { useAuthStore } from "@/lib/stores/authStore";
import { LoginCredentials, RegisterCredentials } from "@/lib/types/auth";

// ---------------------------------------------------------------------------
// Query keys
// ---------------------------------------------------------------------------
export const AUTH_QUERY_KEYS = {
  all: ["auth"] as const,
  me: () => [...AUTH_QUERY_KEYS.all, "me"] as const,
};

// ---------------------------------------------------------------------------
// useCurrentUser
// Fetches GET /auth/me and keeps the Zustand user in sync.
// Only runs when the user is authenticated.
// ---------------------------------------------------------------------------
export function useCurrentUser() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const setUser = useAuthStore((s) => s.setUser);

  return useQuery({
    queryKey: AUTH_QUERY_KEYS.me(),
    queryFn: async () => {
      const user = await authApi.me();
      setUser(user); // keep Zustand in sync
      return user;
    },
    enabled: isAuthenticated,
    staleTime: 5 * 60_000, // 5 min
    retry: false,
  });
}

// ---------------------------------------------------------------------------
// useLoginMutation
// Post credentials → store tokens → invalidate/refetch current user.
// ---------------------------------------------------------------------------
export function useLoginMutation() {
  const queryClient = useQueryClient();
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
    onSuccess: (data) => {
      setAuth(data.user, data.tokens);
      queryClient.setQueryData(AUTH_QUERY_KEYS.me(), data.user);
    },
  });
}

// ---------------------------------------------------------------------------
// useRegisterMutation
// ---------------------------------------------------------------------------
export function useRegisterMutation() {
  const queryClient = useQueryClient();
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: (credentials: RegisterCredentials) =>
      authApi.register(credentials),
    onSuccess: (data) => {
      setAuth(data.user, data.tokens);
      queryClient.setQueryData(AUTH_QUERY_KEYS.me(), data.user);
    },
  });
}

// ---------------------------------------------------------------------------
// useLogoutMutation
// ---------------------------------------------------------------------------
export function useLogoutMutation() {
  const queryClient = useQueryClient();
  const clearAuth = useAuthStore((s) => s.clearAuth);

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSettled: () => {
      clearAuth();
      queryClient.clear();
    },
  });
}

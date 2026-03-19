import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/authStore";
import {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useCurrentUser,
} from "@/lib/queries/auth.queries";
import { getDashboardPath } from "@/lib/constants/roles";
import { LoginCredentials, RegisterCredentials } from "@/lib/types/auth";

/**
 * Primary auth hook.
 * Combines Zustand state, TanStack Query mutations, and navigation.
 * Components should import from here — not from stores / queries directly.
 */
export function useAuth() {
  const router = useRouter();

  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isHydrated = useAuthStore((s) => s.isHydrated);

  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();
  const logoutMutation = useLogoutMutation();
  const currentUserQuery = useCurrentUser();

  // ---------------------------------------------------------------------------
  // login – authenticate and redirect to role dashboard
  // ---------------------------------------------------------------------------
  const login = async (credentials: LoginCredentials): Promise<void> => {
    const data = await loginMutation.mutateAsync(credentials);
    const role = (data.user.role?.toLowerCase() as any) || "user";
    router.push(getDashboardPath(role) ?? "/dashboard/user");
  };

  // ---------------------------------------------------------------------------
  // register – create account and redirect to role dashboard
  // ---------------------------------------------------------------------------
  const register = async (credentials: RegisterCredentials): Promise<void> => {
    const data = await registerMutation.mutateAsync(credentials);
    const role = (data.user.role?.toLowerCase() as any) || "user";
    router.push(getDashboardPath(role) ?? "/dashboard/user");
  };

  // ---------------------------------------------------------------------------
  // logout – clear state and return to login
  // ---------------------------------------------------------------------------
  const logout = async (): Promise<void> => {
    await logoutMutation.mutateAsync();
    router.push("/login");
  };

  return {
    // State
    user,
    isAuthenticated,
    isHydrated,

    // Actions
    login,
    register,
    logout,

    // Mutation pending / error state (for form feedback)
    loginPending: loginMutation.isPending,
    loginError: loginMutation.error,
    registerPending: registerMutation.isPending,
    registerError: registerMutation.error,
    logoutPending: logoutMutation.isPending,

    // Current-user query (for manual refetch or suspense)
    currentUserQuery,
  };
}

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User, AuthTokens } from "@/lib/types/auth";
import { tokenStorage } from "@/lib/api/axiosInstance";

// ---------------------------------------------------------------------------
// State shape
// ---------------------------------------------------------------------------
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isHydrated: boolean;

  // Actions
  setAuth: (user: User, tokens: AuthTokens) => void;
  setUser: (user: User) => void;
  clearAuth: () => void;
  setHydrated: () => void;
}

// ---------------------------------------------------------------------------
// Store
// Only non-sensitive user profile data is persisted in localStorage.
// Tokens are stored separately via tokenStorage to keep concerns clear.
// ---------------------------------------------------------------------------
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isHydrated: false,

      setAuth: (user, tokens) => {
        tokenStorage.setTokens(tokens.accessToken, tokens.refreshToken);
        // Mirror the role into a cookie so Next.js middleware can read it
        tokenStorage.setRoleCookie(user.role);
        set({ user, isAuthenticated: true });
      },

      setUser: (user) => {
        // Keep the role cookie in sync when the profile is refreshed
        tokenStorage.setRoleCookie(user.role);
        set({ user });
      },

      clearAuth: () => {
        tokenStorage.clearTokens();
        set({ user: null, isAuthenticated: false });
      },

      setHydrated: () => {
        set({ isHydrated: true });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      // Only persist the user profile – tokens are managed by tokenStorage
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        // Re-sync the role cookie from persisted state on page load
        if (state?.user) {
          tokenStorage.setRoleCookie(state.user.role);
        }
        state?.setHydrated();
      },
    },
  ),
);

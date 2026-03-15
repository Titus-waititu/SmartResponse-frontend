/**
 * Centralised API route constants.
 * Import these instead of hard-coding path strings.
 */
export const API_ROUTES = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
    me: "/auth/me",
  },
  reports: {
    base: "/reports",
    my: "/reports/my",
    byId: (id: string) => `/reports/${id}`,
    submit: (id: string) => `/reports/${id}/submit`,
  },
  incidents: {
    my: "/incidents/my",
    queue: "/incidents/queue",
    byId: (id: string) => `/incidents/${id}`,
    accept: (id: string) => `/incidents/${id}/accept`,
    reject: (id: string) => `/incidents/${id}/reject`,
    dispatch: (id: string) => `/incidents/${id}/dispatch`,
  },
  admin: {
    reports: "/admin/reports",
    analytics: "/admin/analytics",
    dispatchLogs: "/admin/dispatch-logs",
  },
} as const;

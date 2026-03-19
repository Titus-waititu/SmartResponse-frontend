/**
 * Centralised API route constants.
 * Import these instead of hard-coding path strings.
 */
export const API_ROUTES = {
  auth: {
    signin: "/auth/signin",
    register: "/users",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
    profile: "/auth/profile",
    changePassword: "/auth/change-password",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
    sessions: "/auth/sessions",
  },
  users: {
    base: "/users",
    stats: "/users/stats",
    active: "/users/active",
    byRole: (role: string) => `/users/role/${role}`,
    byId: (id: string) => `/users/${id}`,
    deactivate: (id: string) => `/users/${id}/deactivate`,
    activate: (id: string) => `/users/${id}/activate`,
  },
  accidents: {
    base: "/accidents",
    reportDirect: "/accidents/report",
    byReportNumber: (reportNo: string) => `/accidents/report/${reportNo}`,
    byStatus: (status: string) => `/accidents/status/${status}`,
    byOfficer: (officerId: string) => `/accidents/officer/${officerId}`,
    statistics: "/accidents/statistics",
    byId: (id: string) => `/accidents/${id}`,
    assignOfficer: (id: string) => `/accidents/${id}/assign-officer`,
    status: (id: string) => `/accidents/${id}/status`,
  },
  ai: {
    analyzeAccident: "/ai/analyze-accident",
    generateReport: "/ai/generate-report",
    extractText: "/ai/extract-text",
    classifySeverity: "/ai/classify-severity",
    insights: (id: string) => `/ai/insights/${id}`,
  },
  dispatch: {
    manual: "/dispatch/manual",
    active: "/dispatch/active",
    byAccident: (id: string) => `/dispatch/accident/${id}`,
    pending: "/dispatch/pending",
    completed: "/dispatch/completed",
    statistics: "/dispatch/statistics",
  },
  emergencyServices: {
    base: "/emergency-services",
    byId: (id: string) => `/emergency-services/${id}`,
  },
  locations: {
    base: "/locations",
    byId: (id: string) => `/locations/${id}`,
  },
  media: {
    base: "/media",
    byId: (id: string) => `/media/${id}`,
  },
  notifications: {
    base: "/notifications",
    byId: (id: string) => `/notifications/${id}`,
  },
  reports: {
    base: "/reports",
    byReportNumber: (reportNo: string) => `/reports/report/${reportNo}`,
    byAccident: (id: string) => `/reports/accident/${id}`,
    byOfficer: (id: string) => `/reports/officer/${id}`,
    submitted: "/reports/submitted",
    draft: "/reports/draft",
    statistics: "/reports/statistics",
    byId: (id: string) => `/reports/${id}`,
    submit: (id: string) => `/reports/${id}/submit`,
  },
  upload: {
    file: "/upload/file",
    files: "/upload/files",
    document: "/upload/document",
    video: "/upload/video",
    status: (id: string) => `/upload/status/${id}`,
    fileById: (publicId: string) => `/upload/file/${publicId}`,
  },
  vehicles: {
    base: "/vehicles",
    byAccident: (id: string) => `/vehicles/accident/${id}`,
    byPlate: (plate: string) => `/vehicles/plate/${plate}`,
    byId: (id: string) => `/vehicles/${id}`,
  },
} as const;

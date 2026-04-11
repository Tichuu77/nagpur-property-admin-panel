/**
 * All API endpoint paths in one place.
 * Usage: apiClient.get(ENDPOINTS.brokers.list)
 */
export const ENDPOINTS = {
  auth: {
    login:  '/auth/login',
    logout: '/auth/logout',
    me:     '/auth/me',
  },
  brokers: {
    list:         '/brokers',
    detail:       (id) => `/brokers/${id}`,
    applications: '/brokers/applications',
    approve:      (id) => `/brokers/${id}/approve`,
    reject:       (id) => `/brokers/${id}/reject`,
  },
  customers: {
    list:   '/customers',
    detail: (id) => `/customers/${id}`,
  },
  properties: {
    list:     '/properties',
    detail:   (id) => `/properties/${id}`,
    listings: '/properties/listings',
  },
  leads: {
    list:   '/leads',
    detail: (id) => `/leads/${id}`,
    assign: (id) => `/leads/${id}/assign`,
  },
  plans: {
    list:   '/plans',
    detail: (id) => `/plans/${id}`,
  },
  revenue: {
    summary:      '/revenue',
    transactions: '/revenue/transactions',
  },
  analytics: {
    overview: '/analytics',
    charts:   '/analytics/charts',
  },
  notifications: {
    list:     '/notifications',
    markRead: (id) => `/notifications/${id}/read`,
    markAll:  '/notifications/read-all',
  },
  subAdmins: {
    list:        '/sub-admins',
    detail:      (id) => `/sub-admins/${id}`,
    permissions: (id) => `/sub-admins/${id}/permissions`,
  },
}
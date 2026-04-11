import apiClient from '@/api/client'
import { ENDPOINTS } from '@/api/endpoints'

export const brokersApi = {
  getAll:      (params) => apiClient.get(ENDPOINTS.brokers.list, { params }),
  getById:     (id)     => apiClient.get(ENDPOINTS.brokers.detail(id)),
  getApplications: (params) => apiClient.get(ENDPOINTS.brokers.applications, { params }),
  approve:     (id)     => apiClient.patch(ENDPOINTS.brokers.approve(id)),
  reject:      (id, reason) => apiClient.patch(ENDPOINTS.brokers.reject(id), { reason }),
  create:      (data)   => apiClient.post(ENDPOINTS.brokers.list, data),
  update:      (id, data) => apiClient.patch(ENDPOINTS.brokers.detail(id), data),
  delete:      (id)     => apiClient.delete(ENDPOINTS.brokers.detail(id)),
}
import apiClient from '@/api/client'
import { ENDPOINTS } from '@/api/endpoints'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-keys'
import { useToast } from '@/hooks/useToast'

// ── API ───────────────────────────────────────────────────────────────────────
export const customersApi = {
  getAll:  (params) => apiClient.get(ENDPOINTS.customers.list, { params }),
  getById: (id)     => apiClient.get(ENDPOINTS.customers.detail(id)),
  update:  (id, data) => apiClient.patch(ENDPOINTS.customers.detail(id), data),
  delete:  (id)     => apiClient.delete(ENDPOINTS.customers.detail(id)),
}

// ── Hooks ─────────────────────────────────────────────────────────────────────
export function useCustomers(params) {
  return useQuery({
    queryKey: [...queryKeys.customers.list(), params],
    queryFn:  () => customersApi.getAll(params),
  })
}

export function useCustomer(id) {
  return useQuery({
    queryKey: queryKeys.customers.detail(id),
    queryFn:  () => customersApi.getById(id),
    enabled:  Boolean(id),
  })
}

export function useDeleteCustomer() {
  const qc = useQueryClient()
  const toast = useToast()
  return useMutation({
    mutationFn: (id) => customersApi.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.customers.all })
      toast.success('Customer removed.')
    },
    onError: () => toast.error('Failed to remove customer.'),
  })
}
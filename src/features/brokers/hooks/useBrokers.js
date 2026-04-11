import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { brokersApi } from '../api/brokers.api'
import { queryKeys } from '@/lib/query-keys'
import { useToast } from '@/hooks/useToast'

// ── Queries ───────────────────────────────────────────────────────────────────

export function useBrokers(params) {
  return useQuery({
    queryKey: [...queryKeys.brokers.list(), params],
    queryFn:  () => brokersApi.getAll(params),
  })
}

export function useBroker(id) {
  return useQuery({
    queryKey: queryKeys.brokers.detail(id),
    queryFn:  () => brokersApi.getById(id),
    enabled:  Boolean(id),
  })
}

export function useBrokerApplications(params) {
  return useQuery({
    queryKey: [...queryKeys.brokers.all, 'applications', params],
    queryFn:  () => brokersApi.getApplications(params),
  })
}

// ── Mutations ─────────────────────────────────────────────────────────────────

export function useApproveBroker() {
  const qc = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: (id) => brokersApi.approve(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.brokers.all })
      toast.success('Broker approved successfully.')
    },
    onError: () => toast.error('Failed to approve broker.'),
  })
}

export function useRejectBroker() {
  const qc = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: ({ id, reason }) => brokersApi.reject(id, reason),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.brokers.all })
      toast.success('Broker rejected.')
    },
    onError: () => toast.error('Failed to reject broker.'),
  })
}

export function useDeleteBroker() {
  const qc = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: (id) => brokersApi.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.brokers.all })
      toast.success('Broker removed.')
    },
    onError: () => toast.error('Failed to remove broker.'),
  })
}
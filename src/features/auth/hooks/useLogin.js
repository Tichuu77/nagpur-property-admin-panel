import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store'
import { loginApi } from '../api/auth.api'
import { ROUTES } from '@/routes/route-paths'
import { useToast } from '@/hooks/useToast'

/**
 * useLogin – TanStack mutation that authenticates and stores credentials.
 */
export function useLogin() {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const toast = useToast()

  const mutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      login(data.user, data.token)
      toast.success('Welcome back!')
      navigate(ROUTES.DASHBOARD, { replace: true })
    },
    onError: (error) => {
      const message = error?.response?.data?.message ?? 'Invalid credentials. Please try again.'
      toast.error(message)
    },
  })

  return {
    login:     mutation.mutate,
    isLoading: mutation.isPending,
    error:     mutation.error,
  }
}
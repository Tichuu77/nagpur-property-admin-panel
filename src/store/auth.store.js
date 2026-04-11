import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      user:  null,
      token: null,
      role:  null,

      login: (user, token) =>
        set({ isAuthenticated: true, user, token, role: user?.role ?? 'admin' }),

      logout: () =>
        set({ isAuthenticated: false, user: null, token: null, role: null }),

      updateUser: (partial) =>
        set((state) => ({ user: { ...state.user, ...partial } })),

      setToken: (token) => set({ token }),
    }),
    {
      name: 'auth-store',
      partialize: (s) => ({
        isAuthenticated: s.isAuthenticated,
        user:  s.user,
        token: s.token,
        role:  s.role,
      }),
    }
  )
)
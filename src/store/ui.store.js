import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useUIStore = create(
  persist(
    (set) => ({
      theme:            'light',
      isMobileMenuOpen: false,
      isSidebarOpen:    true,

      setTheme:            (theme) => set({ theme }),
      toggleTheme:         ()      => set((s) => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),
      setIsMobileMenuOpen: (open)  => set({ isMobileMenuOpen: open }),
      toggleMobileMenu:    ()      => set((s) => ({ isMobileMenuOpen: !s.isMobileMenuOpen })),
      setSidebarOpen:      (open)  => set({ isSidebarOpen: open }),
    }),
    { name: 'ui-store', partialize: (s) => ({ theme: s.theme, isSidebarOpen: s.isSidebarOpen }) }
  )
)
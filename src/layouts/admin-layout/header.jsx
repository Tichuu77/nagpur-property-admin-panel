import { useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { LogOut, Bell } from 'lucide-react'
import { SIDEBAR_ITEMS } from '@/constants/nav'

function Header() {
  const { user, logout } = useAuthStore()
  const location = useLocation()

  // Derive current page title from nav config
  const currentNav = SIDEBAR_ITEMS.find((item) =>
    location.pathname.startsWith(item.href)
  )
  const pageTitle = currentNav?.label ?? 'Dashboard'

  return (
    <header className="h-16 px-6 flex items-center justify-between bg-card border-b border-border">
      {/* Page title */}
      <div>
        <h2 className="text-base font-semibold text-foreground">{pageTitle}</h2>
        <p className="text-xs text-muted-foreground">{location.pathname}</p>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-3">
        {/* Notification bell placeholder */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
        </Button>

        {/* User info */}
        <div className="flex items-center gap-2.5">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
              {user?.name?.charAt(0)?.toUpperCase() ?? 'A'}
            </AvatarFallback>
          </Avatar>
          <div className="text-sm leading-tight hidden sm:block">
            <p className="font-semibold text-foreground">{user?.name ?? 'Admin'}</p>
            <p className="text-xs text-muted-foreground">{user?.role ?? 'admin'}</p>
          </div>
        </div>

        {/* Logout */}
        <Button
          variant="ghost"
          size="icon"
          onClick={logout}
          title="Sign out"
          className="text-muted-foreground hover:text-destructive"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}

export default Header
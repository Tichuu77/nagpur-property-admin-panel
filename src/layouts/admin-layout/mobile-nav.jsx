import { NavLink } from 'react-router-dom'
import { useUIStore } from '@/store'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu, Shield } from 'lucide-react'
import { SIDEBAR_ITEMS } from '@/constants/nav'
import { cn } from '@/lib/utils'

function MobileNav() {
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useUIStore()

  return (
    <div className="h-14 border-b border-border flex items-center gap-3 px-4 bg-card">
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="w-64 p-0 bg-sidebar text-sidebar-foreground border-r-0">
          {/* Header */}
          <div className="h-14 px-4 flex items-center gap-3 border-b border-sidebar-border">
            <div className="bg-white/20 rounded-lg p-1.5">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-white text-sm">PropertyConnect</span>
          </div>

          {/* Nav links */}
          <nav className="py-3 px-2 space-y-0.5">
            {SIDEBAR_ITEMS.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition',
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'text-white/75 hover:bg-white/10 hover:text-white'
                  )
                }
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      <span className="text-sm font-semibold text-foreground">PropertyConnect</span>
    </div>
  )
}

export default MobileNav
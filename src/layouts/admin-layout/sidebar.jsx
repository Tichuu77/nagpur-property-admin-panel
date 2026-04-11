import { NavLink } from 'react-router-dom'
import { SIDEBAR_ITEMS } from '@/constants/nav'
import { Shield } from 'lucide-react'
import { cn } from '@/lib/utils'

function Sidebar() {
  return (
    <aside className="w-64 h-full bg-sidebar text-sidebar-foreground flex flex-col shadow-xl">
      {/* ── Logo ─────────────────────────────────── */}
      <div className="h-16 px-5 flex items-center gap-3 border-b border-sidebar-border">
        <div className="bg-white/20 rounded-lg p-1.5">
          <Shield className="h-5 w-5 text-white" />
        </div>
        <div className="leading-tight">
          <p className="font-bold text-white text-sm tracking-wide">PropertyConnect</p>
          <p className="text-[10px] text-white/70 font-medium uppercase tracking-wider">Admin Panel</p>
        </div>
      </div>

      {/* ── Nav ──────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
        {SIDEBAR_ITEMS.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                isActive
                  ? 'bg-white/20 text-white shadow-sm'
                  : 'text-white/75 hover:bg-white/10 hover:text-white'
              )
            }
          >
            <item.icon className="h-4 w-4 shrink-0" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* ── Footer ───────────────────────────────── */}
      <div className="px-5 py-4 border-t border-sidebar-border">
        <p className="text-[11px] text-white/50 text-center">© 2025 PropertyConnect</p>
      </div>
    </aside>
  )
}

export default Sidebar
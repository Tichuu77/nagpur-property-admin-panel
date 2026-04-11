import {
  LayoutDashboard,
  UserCheck,
  Users,
  Building2,
  Zap,
  CreditCard,
  BarChart3,
  Package,
  Bell,
  Shield,
  Settings,
} from 'lucide-react'
import { ROUTES } from '@/routes/route-paths'

export const SIDEBAR_ITEMS = [
  { href: ROUTES.DASHBOARD,     label: 'Dashboard',     icon: LayoutDashboard },
  { href: ROUTES.SUB_ADMIN,     label: 'Sub Admins',    icon: Shield },
  { href: ROUTES.BROKERS,       label: 'Brokers',       icon: UserCheck },
  { href: ROUTES.CUSTOMERS,     label: 'Customers',     icon: Users },
  { href: ROUTES.LEADS,         label: 'Leads',         icon: Zap },
  { href: ROUTES.PROPERTIES,    label: 'Properties',    icon: Building2 },
  { href: ROUTES.REVENUE,       label: 'Revenue',       icon: CreditCard },
  { href: ROUTES.ANALYTICS,     label: 'Analytics',     icon: BarChart3 },
  { href: ROUTES.PLANS,         label: 'Plans',         icon: Package },
  { href: ROUTES.NOTIFICATIONS, label: 'Notifications', icon: Bell },
  { href: ROUTES.SETTINGS,      label: 'Settings',      icon: Settings },
]
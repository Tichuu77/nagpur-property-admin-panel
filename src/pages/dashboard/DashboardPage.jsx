import { Users, UserCheck, Building2, Zap, TrendingUp, DollarSign } from 'lucide-react'
import StatCard from '@/components/shared/StatCard'
import PageHeader from '@/components/shared/PageHeader'
import { formatCurrency, formatCompact } from '@/utils/format'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend,
} from 'recharts'

// Mock data – swap for real API calls once backend is ready
const STATS = [
  { title: 'Total Brokers',    value: '248',  icon: <UserCheck className="h-5 w-5" />, trend: '+12%', trendLabel: 'vs last month' },
  { title: 'Total Customers',  value: '1,842', icon: <Users className="h-5 w-5" />,    trend: '+8%',  trendLabel: 'vs last month' },
  { title: 'Total Properties', value: '3,560', icon: <Building2 className="h-5 w-5" />, trend: '+5%', trendLabel: 'vs last month' },
  { title: 'Total Leads',      value: '924',  icon: <Zap className="h-5 w-5" />,       trend: '+21%', trendLabel: 'vs last month' },
  { title: 'Monthly Revenue',  value: formatCurrency(1_420_000), icon: <DollarSign className="h-5 w-5" />, trend: '+18%', trendLabel: 'vs last month' },
  { title: 'Conversions',      value: '38%',  icon: <TrendingUp className="h-5 w-5" />, trend: '+3%', trendLabel: 'vs last month' },
]

const MONTHLY_REVENUE = [
  { month: 'Jun', revenue: 820000, leads: 68 },
  { month: 'Jul', revenue: 930000, leads: 74 },
  { month: 'Aug', revenue: 750000, leads: 61 },
  { month: 'Sep', revenue: 1100000, leads: 89 },
  { month: 'Oct', revenue: 1280000, leads: 102 },
  { month: 'Nov', revenue: 1420000, leads: 118 },
]

const BROKER_ACTIVITY = [
  { month: 'Jun', approved: 12, pending: 5, rejected: 2 },
  { month: 'Jul', approved: 18, pending: 7, rejected: 3 },
  { month: 'Aug', approved: 14, pending: 4, rejected: 1 },
  { month: 'Sep', approved: 22, pending: 9, rejected: 4 },
  { month: 'Oct', approved: 19, pending: 6, rejected: 2 },
  { month: 'Nov', approved: 25, pending: 8, rejected: 3 },
]

function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's what's happening on the platform."
      />

      {/* ── KPI Grid ───────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {STATS.map((s) => (
          <StatCard key={s.title} {...s} />
        ))}
      </div>

      {/* ── Charts Row ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Revenue Area Chart */}
        <div className="bg-card border border-border rounded-xl p-5">
          <p className="text-sm font-semibold text-foreground mb-1">Revenue & Leads (6 months)</p>
          <p className="text-xs text-muted-foreground mb-4">Monthly revenue in INR alongside lead volume</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={MONTHLY_REVENUE} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={(v) => formatCompact(v)} tick={{ fontSize: 11 }} />
              <Tooltip
                formatter={(val, name) =>
                  name === 'revenue' ? [formatCurrency(val), 'Revenue'] : [val, 'Leads']
                }
              />
              <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fill="url(#revGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Broker Activity Bar Chart */}
        <div className="bg-card border border-border rounded-xl p-5">
          <p className="text-sm font-semibold text-foreground mb-1">Broker Applications (6 months)</p>
          <p className="text-xs text-muted-foreground mb-4">Approved, pending and rejected applications</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={BROKER_ACTIVITY} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="approved" fill="#10b981" radius={[3, 3, 0, 0]} />
              <Bar dataKey="pending"  fill="#f59e0b" radius={[3, 3, 0, 0]} />
              <Bar dataKey="rejected" fill="#ef4444" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Recent Activity ─────────────────────────────────────────────────── */}
      <div className="bg-card border border-border rounded-xl p-5">
        <p className="text-sm font-semibold text-foreground mb-4">Recent Activity</p>
        <div className="space-y-3">
          {[
            { actor: 'Broker Ramesh K.', action: 'submitted a new application', time: '2 min ago', color: 'bg-blue-500' },
            { actor: 'Customer Priya S.', action: 'enquired about a property in Nagpur', time: '15 min ago', color: 'bg-emerald-500' },
            { actor: 'Admin', action: 'approved broker Suresh M.', time: '1 hr ago', color: 'bg-primary' },
            { actor: 'System', action: 'generated monthly revenue report', time: '3 hr ago', color: 'bg-purple-500' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 text-sm">
              <span className={`mt-1 h-2 w-2 rounded-full shrink-0 ${item.color}`} />
              <div className="flex-1 min-w-0">
                <span className="font-medium text-foreground">{item.actor}</span>
                {' '}<span className="text-muted-foreground">{item.action}</span>
              </div>
              <span className="text-xs text-muted-foreground shrink-0">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
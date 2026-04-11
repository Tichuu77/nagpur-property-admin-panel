import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown } from 'lucide-react'

/**
 * StatCard – reusable KPI card used across dashboard pages.
 *
 * @param {object} props
 * @param {string}  props.title       - Label shown above the value
 * @param {string|number} props.value - Primary metric
 * @param {React.ReactNode} [props.icon]  - Lucide icon element
 * @param {string}  [props.trend]     - "+12%" / "-3%" string
 * @param {string}  [props.trendLabel] - e.g. "vs last month"
 * @param {string}  [props.className]
 */
export default function StatCard({ title, value, icon, trend, trendLabel, className }) {
  const isPositive = trend && !trend.startsWith('-')

  return (
    <div
      className={cn(
        'bg-card border border-border rounded-xl p-5 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow',
        className
      )}
    >
      {/* Header row */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        {icon && (
          <span className="p-2 rounded-lg bg-primary/10 text-primary">
            {icon}
          </span>
        )}
      </div>

      {/* Value */}
      <p className="text-3xl font-bold tracking-tight text-foreground">{value}</p>

      {/* Trend */}
      {trend && (
        <div className="flex items-center gap-1.5 text-xs">
          {isPositive ? (
            <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
          ) : (
            <TrendingDown className="h-3.5 w-3.5 text-destructive" />
          )}
          <span className={cn('font-semibold', isPositive ? 'text-emerald-500' : 'text-destructive')}>
            {trend}
          </span>
          {trendLabel && <span className="text-muted-foreground">{trendLabel}</span>}
        </div>
      )}
    </div>
  )
}
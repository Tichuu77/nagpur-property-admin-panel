import { cn } from '@/lib/utils'

const VARIANTS = {
  active:    'bg-emerald-100 text-emerald-700 border-emerald-200',
  inactive:  'bg-gray-100 text-gray-600 border-gray-200',
  pending:   'bg-amber-100 text-amber-700 border-amber-200',
  approved:  'bg-blue-100 text-blue-700 border-blue-200',
  rejected:  'bg-red-100 text-red-700 border-red-200',
  sold:      'bg-purple-100 text-purple-700 border-purple-200',
  available: 'bg-teal-100 text-teal-700 border-teal-200',
  default:   'bg-muted text-muted-foreground border-border',
}

/**
 * StatusBadge – pill badge for entity statuses.
 *
 * @param {object} props
 * @param {string} props.status  - key used to pick colour variant
 * @param {string} [props.label] - override display text (defaults to status)
 * @param {string} [props.className]
 */
export default function StatusBadge({ status, label, className }) {
  const key = status?.toLowerCase() ?? 'default'
  const variant = VARIANTS[key] ?? VARIANTS.default

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize',
        variant,
        className
      )}
    >
      {label ?? status}
    </span>
  )
}
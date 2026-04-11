import { cn } from '@/lib/utils'
import { Inbox } from 'lucide-react'

/**
 * EmptyState – placeholder when a list/table has no data.
 *
 * @param {object} props
 * @param {string}  [props.title]
 * @param {string}  [props.description]
 * @param {React.ReactNode} [props.icon]
 * @param {React.ReactNode} [props.action]
 * @param {string}  [props.className]
 */
export default function EmptyState({
  title = 'No results',
  description = 'Nothing to show here yet.',
  icon,
  action,
  className,
}) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 text-center gap-4', className)}>
      <span className="p-4 rounded-full bg-muted text-muted-foreground">
        {icon ?? <Inbox className="h-8 w-8" />}
      </span>
      <div>
        <p className="font-semibold text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground mt-1 max-w-xs">{description}</p>
      </div>
      {action}
    </div>
  )
}
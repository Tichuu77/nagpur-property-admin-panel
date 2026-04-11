import { cn } from '@/lib/utils'

/**
 * PageHeader – consistent page title + optional action slot.
 *
 * @param {object} props
 * @param {string}  props.title
 * @param {string}  [props.description]
 * @param {React.ReactNode} [props.action] - Button / controls on the right
 * @param {string}  [props.className]
 */
export default function PageHeader({ title, description, action, className }) {
  return (
    <div className={cn('flex items-start justify-between gap-4 mb-6', className)}>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
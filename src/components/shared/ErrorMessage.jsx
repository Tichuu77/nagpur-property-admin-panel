import { AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * ErrorMessage – inline or full-page error display.
 *
 * @param {object}  props
 * @param {string}  [props.message]
 * @param {function} [props.onRetry]
 * @param {string}  [props.className]
 */
export default function ErrorMessage({ message = 'Something went wrong.', onRetry, className }) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 py-12 text-center',
        className
      )}
    >
      <AlertTriangle className="h-8 w-8 text-destructive" />
      <p className="text-sm text-muted-foreground max-w-xs">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-1 text-xs font-medium text-primary underline underline-offset-2"
        >
          Try again
        </button>
      )}
    </div>
  )
}
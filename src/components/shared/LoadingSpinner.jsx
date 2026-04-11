import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

/**
 * LoadingSpinner – centred spinner with optional message.
 *
 * @param {object} props
 * @param {string}  [props.message]
 * @param {string}  [props.className]
 * @param {'sm'|'md'|'lg'} [props.size]
 */
export default function LoadingSpinner({ message, className, size = 'md' }) {
  const sizeMap = { sm: 'h-4 w-4', md: 'h-6 w-6', lg: 'h-10 w-10' }

  return (
    <div className={cn('flex flex-col items-center justify-center gap-3 py-12', className)}>
      <Loader2 className={cn('animate-spin text-primary', sizeMap[size])} />
      {message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  )
}
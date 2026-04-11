import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * PaginationBar – prev/next + page number controls.
 *
 * @param {object}   props
 * @param {number}   props.page       - current 1-based page
 * @param {number}   props.totalPages
 * @param {function} props.onPageChange - (page: number) => void
 * @param {string}   [props.className]
 */
export default function PaginationBar({ page, totalPages, onPageChange, className }) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  const visible = pages.filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)

  return (
    <div className={cn('flex items-center justify-center gap-1', className)}>
      {/* Prev */}
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="h-8 w-8 flex items-center justify-center rounded-md border border-border hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {/* Pages */}
      {visible.reduce((acc, p, i, arr) => {
        if (i > 0 && arr[i - 1] !== p - 1) {
          acc.push(
            <span key={`ellipsis-${p}`} className="h-8 w-8 flex items-center justify-center text-sm text-muted-foreground">
              …
            </span>
          )
        }
        acc.push(
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={cn(
              'h-8 w-8 flex items-center justify-center rounded-md text-sm font-medium border transition',
              p === page
                ? 'bg-primary text-primary-foreground border-primary'
                : 'border-border hover:bg-muted'
            )}
          >
            {p}
          </button>
        )
        return acc
      }, [])}

      {/* Next */}
      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="h-8 w-8 flex items-center justify-center rounded-md border border-border hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  )
}
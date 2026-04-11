import { useState } from 'react'
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import EmptyState from './EmptyState'
import LoadingSpinner from './LoadingSpinner'
import PaginationBar from './PaginationBar'

/**
 * DataTable – generic sortable/paginated table.
 *
 * @param {object}   props
 * @param {Array}    props.columns   - [{ key, header, render?, sortable?, className? }]
 * @param {Array}    props.data
 * @param {boolean}  [props.isLoading]
 * @param {string}   [props.emptyTitle]
 * @param {string}   [props.emptyDescription]
 * @param {number}   [props.pageSize=10]
 * @param {string}   [props.className]
 */
export default function DataTable({
  columns = [],
  data = [],
  isLoading = false,
  emptyTitle,
  emptyDescription,
  pageSize = 10,
  className,
}) {
  const [sortKey, setSortKey] = useState(null)
  const [sortDir, setSortDir] = useState('asc')
  const [page, setPage] = useState(1)

  // Sorting
  const handleSort = (key) => {
    if (!key) return
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const sorted = sortKey
    ? [...data].sort((a, b) => {
        const av = a[sortKey] ?? ''
        const bv = b[sortKey] ?? ''
        const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true })
        return sortDir === 'asc' ? cmp : -cmp
      })
    : data

  // Pagination
  const totalPages = Math.ceil(sorted.length / pageSize)
  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize)

  const SortIcon = ({ col }) => {
    if (!col.sortable) return null
    if (sortKey !== col.key) return <ChevronsUpDown className="h-3.5 w-3.5 ml-1 opacity-40" />
    return sortDir === 'asc'
      ? <ChevronUp className="h-3.5 w-3.5 ml-1 text-primary" />
      : <ChevronDown className="h-3.5 w-3.5 ml-1 text-primary" />
  }

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <div className="rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => col.sortable && handleSort(col.key)}
                    className={cn(
                      'px-4 py-3 text-left font-semibold text-muted-foreground whitespace-nowrap select-none',
                      col.sortable && 'cursor-pointer hover:text-foreground',
                      col.className
                    )}
                  >
                    <span className="inline-flex items-center">
                      {col.header}
                      <SortIcon col={col} />
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={columns.length}>
                    <LoadingSpinner message="Loading…" />
                  </td>
                </tr>
              ) : paginated.length === 0 ? (
                <tr>
                  <td colSpan={columns.length}>
                    <EmptyState title={emptyTitle} description={emptyDescription} />
                  </td>
                </tr>
              ) : (
                paginated.map((row, i) => (
                  <tr
                    key={row.id ?? i}
                    className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                  >
                    {columns.map((col) => (
                      <td key={col.key} className={cn('px-4 py-3 text-foreground', col.className)}>
                        {col.render ? col.render(row[col.key], row) : row[col.key] ?? '—'}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer: count + pagination */}
      {!isLoading && data.length > 0 && (
        <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
          <span>
            Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, data.length)} of {data.length}
          </span>
          <PaginationBar page={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      )}
    </div>
  )
}
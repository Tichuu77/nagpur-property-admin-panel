import { cn } from '@/lib/utils'
import SearchInput from './SearchInput'

/**
 * FilterBar – search + optional filter slot used above tables.
 *
 * @param {object}   props
 * @param {string}   props.search
 * @param {function} props.onSearchChange
 * @param {string}   [props.searchPlaceholder]
 * @param {React.ReactNode} [props.filters]   - dropdowns / selects
 * @param {React.ReactNode} [props.actions]   - right-side buttons
 * @param {string}   [props.className]
 */
export default function FilterBar({ search, onSearchChange, searchPlaceholder, filters, actions, className }) {
  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      <SearchInput
        value={search}
        onChange={onSearchChange}
        placeholder={searchPlaceholder}
        className="w-64 max-w-full"
      />
      {filters && <div className="flex items-center gap-2">{filters}</div>}
      {actions && <div className="ml-auto flex items-center gap-2">{actions}</div>}
    </div>
  )
}
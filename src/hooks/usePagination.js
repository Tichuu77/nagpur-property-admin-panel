import { useState } from 'react'

/**
 * usePagination – manages page / pageSize state.
 *
 * @param {object} [opts]
 * @param {number} [opts.initialPage=1]
 * @param {number} [opts.initialPageSize=10]
 */
export function usePagination({ initialPage = 1, initialPageSize = 10 } = {}) {
  const [page, setPage] = useState(initialPage)
  const [pageSize, setPageSize] = useState(initialPageSize)

  const reset = () => setPage(1)

  return { page, setPage, pageSize, setPageSize, reset }
}
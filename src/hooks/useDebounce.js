import { useEffect, useState } from 'react'

/**
 * useDebounce – delays a value update by `delay` ms.
 *
 * @param {*}      value
 * @param {number} delay - milliseconds (default 300)
 * @returns debounced value
 */
export function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(id)
  }, [value, delay])

  return debounced
}
import { format, formatDistanceToNow } from 'date-fns'

/**
 * Format a number as Indian Rupee currency.
 * @param {number} amount
 * @param {object} [opts] - Intl.NumberFormat options
 */
export function formatCurrency(amount, opts = {}) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
    ...opts,
  }).format(amount)
}

/**
 * Format a date string / Date object.
 * @param {string|Date} date
 * @param {string} [pattern='dd MMM yyyy']
 */
export function formatDate(date, pattern = 'dd MMM yyyy') {
  if (!date) return '—'
  return format(new Date(date), pattern)
}

/**
 * Format a date as "X ago".
 * @param {string|Date} date
 */
export function formatRelative(date) {
  if (!date) return '—'
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

/**
 * Compact large numbers: 1200 → "1.2K".
 * @param {number} num
 */
export function formatCompact(num) {
  return new Intl.NumberFormat('en-IN', { notation: 'compact' }).format(num)
}

/**
 * Capitalise first letter of each word.
 * @param {string} str
 */
export function titleCase(str) {
  return str
    ? str.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    : ''
}
import { toast } from 'sonner'

/**
 * useToast – thin wrapper around Sonner for consistent toast calls.
 *
 * @returns {{ success, error, info, warning, loading, dismiss }}
 */
export function useToast() {
  return {
    success: (msg, opts) => toast.success(msg, opts),
    error:   (msg, opts) => toast.error(msg, opts),
    info:    (msg, opts) => toast.info(msg, opts),
    warning: (msg, opts) => toast.warning(msg, opts),
    loading: (msg, opts) => toast.loading(msg, opts),
    dismiss: (id) => toast.dismiss(id),
  }
}
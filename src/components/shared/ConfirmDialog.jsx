import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { cn } from '@/lib/utils'

/**
 * ConfirmDialog – destructive/confirm action guard.
 *
 * @param {object}   props
 * @param {boolean}  props.open
 * @param {function} props.onOpenChange
 * @param {string}   props.title
 * @param {string}   [props.description]
 * @param {string}   [props.confirmLabel]
 * @param {string}   [props.cancelLabel]
 * @param {function} props.onConfirm
 * @param {'default'|'destructive'} [props.variant]
 */
export default function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  variant = 'destructive',
}) {
  return (
    <AlertDialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <AlertDialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border bg-card p-6 shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          <AlertDialogPrimitive.Title className="text-lg font-semibold text-foreground">
            {title}
          </AlertDialogPrimitive.Title>
          {description && (
            <AlertDialogPrimitive.Description className="mt-2 text-sm text-muted-foreground">
              {description}
            </AlertDialogPrimitive.Description>
          )}
          <div className="mt-6 flex justify-end gap-3">
            <AlertDialogPrimitive.Cancel
              className="inline-flex items-center justify-center h-9 px-4 rounded-lg border border-border bg-background text-sm font-medium hover:bg-muted transition"
            >
              {cancelLabel}
            </AlertDialogPrimitive.Cancel>
            <AlertDialogPrimitive.Action
              onClick={onConfirm}
              className={cn(
                'inline-flex items-center justify-center h-9 px-4 rounded-lg text-sm font-medium transition',
                variant === 'destructive'
                  ? 'bg-destructive text-white hover:bg-destructive/90'
                  : 'bg-primary text-primary-foreground hover:bg-primary/90'
              )}
            >
              {confirmLabel}
            </AlertDialogPrimitive.Action>
          </div>
        </AlertDialogPrimitive.Content>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  )
}
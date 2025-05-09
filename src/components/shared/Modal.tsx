'use client';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../../components/ui/dialog';
import { Button, ButtonProps } from '../../components/ui/button';
import { ReactNode, forwardRef, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils'; // Assuming you have a cn utility

interface ModalProps {
  trigger: ReactNode;
  title?: string;
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onConfirm?: () => Promise<void> | void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  showCloseButton?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  contentClassName?: string;
  overlayClassName?: string;
  icon?: ReactNode;
  disableBackdropClose?: boolean;
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      trigger,
      title,
      children,
      open,
      onOpenChange,
      onConfirm,
      onCancel,
      confirmText = 'Confirm',
      cancelText = 'Cancel',
      confirmButtonProps,
      cancelButtonProps,
      showCloseButton = true,
      size = 'md',
      contentClassName,
      overlayClassName,
      icon,
      disableBackdropClose = false,
    },
    ref,
  ) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirm = async () => {
      try {
        setIsLoading(true);
        await onConfirm?.();
        onOpenChange?.(false);
      } finally {
        setIsLoading(false);
      }
    };

    const handleCancel = () => {
      onCancel?.();
      onOpenChange?.(false);
    };

    const sizeClasses = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
    };

    return (
      <Dialog
        open={open}
        onOpenChange={onOpenChange}
        modal={!disableBackdropClose}
      >
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent
          className={cn(
            'bg-background text-foreground rounded-lg overflow-visible',
            sizeClasses[size],
            contentClassName,
          )}
          overlayClassName={cn(
            'backdrop-blur-sm bg-background/80',
            overlayClassName,
          )}
          onPointerDownOutside={(e) =>
            disableBackdropClose && e.preventDefault()
          }
          onEscapeKeyDown={(e) => disableBackdropClose && e.preventDefault()}
          ref={ref}
        >
          {/* {showCloseButton && (
            <button
              onClick={handleCancel}
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          )} */}

          {(title || icon) && (
            <DialogHeader className="text-left">
              {icon && <div className="mb-2">{icon}</div>}
              {title && (
                <DialogTitle className="text-lg font-semibold leading-none tracking-tight">
                  {title}
                </DialogTitle>
              )}
            </DialogHeader>
          )}

          <DialogDescription className="max-h-[70vh] overflow-y-auto p-6">
            {children}
          </DialogDescription>

          {(onConfirm || onCancel) && (
            <div className="mt-4 flex justify-end gap-2">
              {onCancel && (
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isLoading}
                  {...cancelButtonProps}
                >
                  {cancelText}
                </Button>
              )}
              {onConfirm && (
                <Button
                  onClick={handleConfirm}
                  loading={isLoading}
                  disabled={isLoading}
                  {...confirmButtonProps}
                >
                  {confirmText}
                </Button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    );
  },
);

Modal.displayName = 'Modal';

export default Modal;

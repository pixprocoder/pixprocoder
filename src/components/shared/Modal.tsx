'use client';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../../components/ui/dialog';
import { Button } from '../../components/ui/button';
import React, { useState } from 'react';

interface ModalProps {
  trigger: React.ReactNode;
  title?: string;
  children: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}

const Modal = ({
  trigger,
  title,
  children,
  onConfirm,
  onCancel,
  confirmText,
  cancelText,
}: ModalProps) => {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    if (onConfirm) onConfirm(); // Execute delete logic
    setOpen(false); // Close modal after confirming
  };

  const handleCancel = () => {
    if (onCancel) onCancel(); // Handle cancel logic
    setOpen(false); // Close modal when clicking cancel
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        {trigger}
      </DialogTrigger>
      <DialogContent className="bg-background text-foreground ">
        <DialogHeader>
          <DialogTitle className="font-bold text-lg">{title}</DialogTitle>
          <DialogDescription>{children}</DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2 mt-4">
          {onCancel && (
            <Button
              className="bg-gray-600 hover:bg-gray-700"
              onClick={handleCancel}
            >
              {cancelText}
            </Button>
          )}
          {onConfirm && (
            <Button
              className="bg-red-500 hover:bg-red-600"
              onClick={handleConfirm}
            >
              {confirmText}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;

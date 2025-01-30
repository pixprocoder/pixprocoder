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
import { useState } from 'react';

const Modal = ({
  trigger,
  title = 'Modal Title',
  children,
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}) => {
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
      <DialogContent className="bg-black border-gray-800">
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
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500"
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

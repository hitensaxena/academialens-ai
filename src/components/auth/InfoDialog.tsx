'use client';

import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog/dialog';
import { Button } from '@/components/ui/button/button';

interface InfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  iconSrc?: string;
  actionLabel?: string;
  onActionClick?: () => void;
}

export function InfoDialog({
  open,
  onOpenChange,
  title,
  description,
  iconSrc,
  actionLabel, // Removed default value
  onActionClick,
}: InfoDialogProps) {
  const handleAction = () => {
    if (onActionClick) {
      onActionClick();
    } else {
      onOpenChange(false); // Default action is to close the dialog
    }
  };

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] p-8 rounded-lg shadow-xl text-center">
        <DialogHeader className="mb-6">
          {iconSrc && (
            <div className="mx-auto mb-6 h-20 w-20 relative">
              <Image src={iconSrc} alt="Dialog Icon" layout="fill" objectFit="contain" />
            </div>
          )}
          <DialogTitle className="auth-dialog-title">{title}</DialogTitle>
          {description && (
            <DialogDescription className="auth-dialog-description whitespace-pre-line">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        {actionLabel && (
          <Button onClick={handleAction} className="auth-accent-button mt-4">
            {actionLabel}
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}

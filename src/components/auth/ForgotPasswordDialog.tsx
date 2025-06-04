'use client';

import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input/input';
import { Label } from '@/components/ui/label/label';
import { Icons } from '@/components';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog/dialog';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

interface ForgotPasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccessShowInfo: () => void;
}

export function ForgotPasswordDialog({
  open,
  onOpenChange,
  onSuccessShowInfo,
}: ForgotPasswordDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  // Initialize state for error handling (commented out as not used in this version)
  // const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Show success message and trigger the success callback
      setSuccess(true);
      onSuccessShowInfo();
      onOpenChange(false);
    } catch (err) {
      // In a real app, you would show this error to the user
      console.error('Error sending password reset email:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] p-8 rounded-lg shadow-xl">
        <DialogHeader className="mb-6">
          <DialogTitle className="auth-dialog-title">Reset Your Password</DialogTitle>
          {success ? (
            <DialogDescription className="auth-dialog-description">
              We&apos;ve sent a password reset link to your email. Please check your inbox and
              follow the instructions to reset your password.
            </DialogDescription>
          ) : (
            <DialogDescription className="auth-dialog-description">
              Enter your email and we&apos;ll send you a link to reset your password.
            </DialogDescription>
          )}
        </DialogHeader>
        {/* DialogContent from @/components/ui/dialog/dialog handles its own close button */}
        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <div className="space-y-2">
            <Label htmlFor="email-dialog" className="auth-label">
              Email
            </Label>
            <div className="relative">
              <Input
                id="email-dialog"
                type="email"
                placeholder="Your Email Address"
                className={`auth-input ${errors.email ? 'border-destructive' : ''}`}
                {...register('email')}
                disabled={isLoading}
              />
            </div>
            {errors.email && <p className="auth-input-error">{errors.email.message}</p>}
          </div>
          <Button type="submit" className="auth-primary-button" disabled={isLoading}>
            {isLoading ? <Icons.loader className="auth-primary-button-icon" /> : null}
            Send Reset Link
          </Button>
        </form>
        <div className="mt-6 text-center text-sm">
          <button type="button" onClick={() => onOpenChange(false)} className="auth-link">
            Remember Your Password? <span className="auth-link">Login Now</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

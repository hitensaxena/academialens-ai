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
      <DialogContent className="sm:max-w-[425px] p-8 bg-white rounded-lg shadow-xl">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-2xl font-semibold text-center text-figmaText-heading">
            Reset Your Password
          </DialogTitle>
          {success ? (
            <DialogDescription className="text-sm text-center text-figmaText-subheading mt-1">
              We&apos;ve sent a password reset link to your email. Please check your inbox and
              follow the instructions to reset your password.
            </DialogDescription>
          ) : (
            <DialogDescription className="text-sm text-center text-figmaText-subheading mt-1">
              Enter your email and we&apos;ll send you a link to reset your password.
            </DialogDescription>
          )}
        </DialogHeader>
        {/* DialogContent from @/components/ui/dialog/dialog handles its own close button */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email-dialog" className="text-sm font-medium text-figmaText-label">
              Email
            </Label>
            <div className="relative">
              <Input
                id="email-dialog"
                type="email"
                placeholder="Your Email Address"
                className={`w-full px-4 h-12 rounded-md bg-formInput-bg border border-formInput-border text-formInput-text placeholder-formInput-placeholder focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm ${errors.email ? 'border-red-500' : ''}`}
                {...register('email')}
                disabled={isLoading}
              />
            </div>
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
          </div>
          <Button
            type="submit"
            className="w-full h-12 flex items-center justify-center rounded-md bg-gradient-to-r from-brand-green-light to-brand-green-dark px-4 text-sm font-semibold text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-brand-green-dark focus:ring-offset-2 disabled:opacity-50 transition-opacity"
            disabled={isLoading}
          >
            {isLoading ? <Icons.loader className="mr-2 h-4 w-4 animate-spin" /> : null}
            Send Reset Link
          </Button>
        </form>
        <div className="mt-6 text-center text-sm">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="font-medium text-figmaText-subheading hover:text-figmaText-heading hover:underline"
          >
            Remember Your Password?{' '}
            <span className="text-link-DEFAULT hover:text-link-hover">Login Now</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

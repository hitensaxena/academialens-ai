'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input/input';
import { Label } from '@/components/ui/label/label';
import { useToast } from '@/components/ui/use-toast';
import { Icons } from '@/components';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (formData: ForgotPasswordFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      });
      await response.json();
      // Handle success (show success message)
      console.log('Password reset email sent');
      // Redirect to the email sent confirmation page
      router.push('/reset-password-email-sent');
    } catch (error) {
      console.error('Forgot password error:', error);
      toast({
        title: 'Error',
        description: 'An error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-center text-figmaText-heading mb-2">
          Forgot Password
        </h1>
        <p className="text-base text-center text-muted-foreground">
          Enter your email to reset your password
        </p>
      </div>
      <div className="w-full rounded-2xl bg-card text-card-foreground p-10 shadow-xl">
        <div className="w-full space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="block text-sm font-medium text-figmaText-label mb-2"
              >
                Email
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icons.mail className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="pl-10 pr-3 h-12 bg-formInput-bg border border-formInput-border text-formInput-text placeholder:text-formInput-placeholder focus:ring-ring focus:border-ring"
                  {...register('email')}
                  error={errors.email?.message}
                  disabled={isLoading}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary-accent hover:bg-primary-accent/90 h-12 text-white mt-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
                  Sending reset link...
                </>
              ) : (
                'Send Reset Link'
              )}
            </Button>
          </form>
          {/* Remember password Link */}
          <p className="text-center text-sm text-muted-foreground mt-2">
            Remember your password?{' '}
            <Link href="/login" className="font-medium text-primary-accent hover:underline">
              Sign in
            </Link>
          </p>
        </div>{' '}
        {/* Closes inner wrapper <div className="w-full space-y-6"> */}
      </div>{' '}
      {/* Closes card <div className="w-full rounded-2xl ..."> */}
    </div> // Closes root page <div className="w-full flex flex-col items-center">
  );
}

'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input/input';
import { Label } from '@/components/ui/label/label';
import { useToast } from '@/components/ui/use-toast';
import { Icons } from '@/components';

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  // Check for token and validate it
  useEffect(() => {
    const tokenParam = searchParams.get('token');
    const emailParam = searchParams.get('email');

    if (!tokenParam || !emailParam) {
      setIsValidToken(false);
      return;
    }

    setToken(tokenParam);
    setEmail(emailParam);

    // TODO: Add actual token validation with the backend
    const validateToken = async () => {
      try {
        // Simulate API call to validate token
        await new Promise((resolve) => setTimeout(resolve, 500));
        setIsValidToken(true);
      } catch (error) {
        console.error('Token validation error:', error);
        setIsValidToken(false);
      }
    };

    validateToken();
  }, [searchParams]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token || !email) return;

    try {
      // TODO: Replace with actual API call
      console.log('Reset password data:', { email, token, newPassword: data.password });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to password reset success page
      router.push('/reset-password-success');
    } catch (error) {
      console.error('Reset password error:', error);
      toast({
        title: 'Error',
        description: 'An error occurred. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (isValidToken === null) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isValidToken) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="w-full max-w-md space-y-4 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Invalid or Expired Link</h1>
          <p className="text-muted-foreground">
            The password reset link is invalid or has expired. Please request a new one.
          </p>
          <Button asChild className="mt-4">
            <Link href="/forgot-password">Request New Link</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-8 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center text-figmaText-heading mb-2">
          Reset Password
        </h1>
        <p className="text-lg text-center text-muted-foreground">Enter your new password below</p>
      </div>
      <div className="w-full max-w-md rounded-2xl bg-card text-card-foreground p-8 shadow-xl">
        <div className="grid gap-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="password">New Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="h-12 pr-10"
                    {...register('password')}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <Icons.eyeOff className="h-4 w-4" />
                    ) : (
                      <Icons.eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="h-12 pr-10"
                    {...register('confirmPassword')}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <Icons.eyeOff className="h-4 w-4" />
                    ) : (
                      <Icons.eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-primary-accent hover:bg-primary-accent/90 h-12 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Icons.loader className="mr-2 h-4 w-4 animate-spin" /> Resetting...
                  </>
                ) : (
                  'Reset Password'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Remember your password?{' '}
        <Link href="/login" className="font-medium text-primary-accent hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}

'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';

import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input/input';
import { Icons } from '@/components/icons';
import { Label } from '@/components/ui/label/label';
import { Checkbox } from '@/components/ui/checkbox/checkbox';

const signupSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      ),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, {
      message: 'You must accept the terms and conditions',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  // Toast functionality can be added here if needed
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue, // To set checkbox value
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  });

  const onSubmit = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Redirect to verify email page
      router.push('/verify-email');
    } catch (err) {
      console.error('Error during sign up:', err);
      // In a real app, you would show this error to the user
      console.error('An error occurred while creating your account. Please try again.');
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Title & Subtitle */}
      <div className="auth-title-block">
        <h1 className="auth-title">Create Your Account</h1>
        <p className="auth-subtitle">Provide us details to create a new account</p>
      </div>

      {/* Card */}
      <div className="auth-card">
        <div className="w-full space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            {/* Full Name Input */}
            <div>
              <Label htmlFor="name" className="auth-label">
                Full Name
              </Label>
              <Input
                id="name"
                placeholder="Your Name"
                className={`auth-input ${errors.name ? 'border-destructive' : ''}`}
                {...register('name')}
                disabled={isSubmitting}
              />
              {errors.name && <p className="auth-input-error">{errors.name.message}</p>}
            </div>

            {/* Email Input */}
            <div>
              <Label htmlFor="email" className="auth-label">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Your Email Address"
                className={`auth-input ${errors.email ? 'border-destructive' : ''}`}
                {...register('email')}
                disabled={isSubmitting}
              />
              {errors.email && <p className="auth-input-error">{errors.email.message}</p>}
            </div>

            {/* Password Input */}
            <div>
              <Label htmlFor="password" className="auth-label">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a new password"
                  className={`auth-input ${errors.password ? 'border-destructive' : ''}`}
                  {...register('password')}
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="auth-password-toggle-icon"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  disabled={isSubmitting}
                >
                  {showPassword ? (
                    <Icons.eyeOff className="h-5 w-5" />
                  ) : (
                    <Icons.eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && <p className="auth-input-error">{errors.password.message}</p>}
            </div>

            {/* Confirm Password Input */}
            <div>
              <Label htmlFor="confirmPassword" className="auth-label">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm password"
                  className={`auth-input ${errors.confirmPassword ? 'border-destructive' : ''}`}
                  {...register('confirmPassword')}
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="auth-password-toggle-icon"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  disabled={isSubmitting}
                >
                  {showConfirmPassword ? (
                    <Icons.eyeOff className="h-5 w-5" />
                  ) : (
                    <Icons.eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="auth-input-error">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                className="auth-checkbox"
                {...register('terms')}
                onCheckedChange={(checked) =>
                  setValue('terms', checked as boolean, { shouldValidate: true })
                }
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="terms" className="auth-checkbox-label">
                  I agree to the{' '}
                  <Link href="/terms" className="auth-link">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="auth-link">
                    Privacy Policy
                  </Link>
                </Label>
                {errors.terms && <p className="text-xs text-red-600">{errors.terms.message}</p>}
              </div>
            </div>

            {/* Sign Up Button */}
            <div className="mt-2">
              <Button type="submit" disabled={isSubmitting} className="auth-primary-button">
                {isSubmitting ? <Icons.loader className="auth-primary-button-icon" /> : null}
                Sign Up
              </Button>
            </div>
          </form>

          {/* Login Link */}
          <div className="auth-footer-link-group">
            Already Have An Account?{' '}
            <Link href="/login" className="auth-link">
              Login Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

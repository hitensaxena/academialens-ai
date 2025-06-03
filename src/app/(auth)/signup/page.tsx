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
    <>
      {/* Create Your Account Heading & Subheading - MOVED OUTSIDE AND ABOVE THE CARD */}
      <div className="text-left space-y-1 mb-6 sm:mb-8">
        <h2 className="text-2xl font-bold text-figmaText-heading">Create Your Account</h2>
        <p className="text-sm text-figmaText-subheading">
          Provide us details to create a new account
        </p>
      </div>

      {/* Main card container for form elements */}
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full">
        <div className="w-full max-w-[360px] mx-auto space-y-5">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Full Name Input */}
            <div>
              <Label htmlFor="name" className="block text-sm font-medium text-figmaText-label mb-1">
                Full Name
              </Label>
              <Input
                id="name"
                placeholder="Your Name"
                className={`w-full px-4 h-12 rounded-md bg-formInput-bg border border-formInput-border text-formInput-text placeholder-formInput-placeholder focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm ${errors.name ? 'border-red-500' : ''}`}
                {...register('name')}
                disabled={isSubmitting}
              />
              {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
            </div>

            {/* Email Input */}
            <div>
              <Label
                htmlFor="email"
                className="block text-sm font-medium text-figmaText-label mb-1"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Your Email Address"
                className={`w-full px-4 h-12 rounded-md bg-formInput-bg border border-formInput-border text-formInput-text placeholder-formInput-placeholder focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm ${errors.email ? 'border-red-500' : ''}`}
                {...register('email')}
                disabled={isSubmitting}
              />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
            </div>

            {/* Password Input */}
            <div>
              <Label
                htmlFor="password"
                className="block text-sm font-medium text-figmaText-label mb-1"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a new password"
                  className={`w-full px-4 h-12 rounded-md bg-formInput-bg border border-formInput-border text-formInput-text placeholder-formInput-placeholder focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm ${errors.password ? 'border-red-500' : ''}`}
                  {...register('password')}
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-500"
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
              {errors.password && (
                <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div>
              <Label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-figmaText-label mb-1"
              >
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm password"
                  className={`w-full px-4 h-12 rounded-md bg-formInput-bg border border-formInput-border text-formInput-text placeholder-formInput-placeholder focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm ${errors.confirmPassword ? 'border-red-500' : ''}`}
                  {...register('confirmPassword')}
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-500"
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
                <p className="mt-1 text-xs text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start space-x-2 pt-1">
              <Checkbox
                id="terms"
                className="mt-0.5 h-4 w-4 rounded border-googleButton-border text-link-DEFAULT focus:ring-link-DEFAULT"
                {...register('terms')}
                onCheckedChange={(checked) =>
                  setValue('terms', checked as boolean, { shouldValidate: true })
                }
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="terms" className="text-sm font-normal text-figmaText-label">
                  I agree to the{' '}
                  <Link
                    href="/terms"
                    className="font-medium text-link-DEFAULT hover:text-link-hover hover:underline"
                  >
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link
                    href="/privacy"
                    className="font-medium text-link-DEFAULT hover:text-link-hover hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </Label>
                {errors.terms && <p className="text-xs text-red-600">{errors.terms.message}</p>}
              </div>
            </div>

            {/* Sign Up Button */}
            <div className="pt-1">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 flex items-center justify-center rounded-md bg-gradient-to-r from-brand-green-light to-brand-green-dark px-4 text-sm font-semibold text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-brand-green-dark focus:ring-offset-2 disabled:opacity-50 transition-opacity"
              >
                {isSubmitting ? <Icons.loader className="mr-2 h-4 w-4 animate-spin" /> : null}
                Sign Up
              </Button>
            </div>
          </form>

          {/* Login Link */}
          <div className="text-center text-sm text-figmaText-subheading pt-2">
            Already Have An Account?{' '}
            <Link
              href="/login"
              className="font-medium text-link-DEFAULT hover:text-link-hover hover:underline"
            >
              Login Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

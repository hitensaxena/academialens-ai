'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, ChangeEvent, FormEvent, useEffect, Suspense } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input/input';
import { Label } from '@/components/ui/label/label';
import { Button } from '@/components/ui/button/button';
import { Checkbox } from '@/components/ui/checkbox/checkbox';
import Link from 'next/link';
import { Icons } from '@/components';
import { ForgotPasswordDialog } from '@/components/auth/ForgotPasswordDialog';
import { InfoDialog } from '@/components/auth/InfoDialog';

// Form validation schema
const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// This component is wrapped in Suspense to handle useSearchParams
function LoginForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/';
  const router = useRouter();
  const { login } = useAuth();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false);
  const [infoDialogContent, setInfoDialogContent] = useState({
    title: '',
    description: '',
    iconSrc: '',
    actionLabel: undefined as string | undefined,
  });

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!validateEmail(email)) newErrors.email = 'Please enter a valid email address';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      await login(email, password);
      if (rememberMe) localStorage.setItem('rememberMe', 'true');
      else localStorage.removeItem('rememberMe');
      router.push(redirectTo);
    } catch (error) {
      toast({
        title: 'Login Failed',
        description: error instanceof Error ? error.message : 'An error occurred during login',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPasswordSuccess = () => {
    setInfoDialogContent({
      title: 'Check Your Inbox',
      description:
        "We've sent a password reset link to your email address.\nPlease check your inbox and follow the instructions.",
      iconSrc: '/images/email-envelope-lock.png', // Updated icon
      actionLabel: undefined, // No bottom button
    });
    setIsInfoDialogOpen(true);
  };

  useEffect(() => {
    const status = searchParams.get('status');
    if (status === 'verifyEmailSent') {
      setInfoDialogContent({
        title: 'Check Your Inbox',
        description:
          "We've sent a verification link to your email address.\nPlease check your inbox and click the link to activate your account.",
        iconSrc: '/images/email-envelope-lock.png', // Updated icon
        actionLabel: undefined, // No bottom button
      });
      setIsInfoDialogOpen(true);
      // Clean the URL
      const newUrl = window.location.pathname;
      window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);
    }
  }, [searchParams]);

  const handleSocialLogin = (provider: string) => {
    toast({ title: 'Coming Soon', description: `${provider} login will be available soon.` });
  };

  return (
    <>
      {/* Welcome Back Heading & Subheading - MOVED OUTSIDE AND ABOVE THE CARD */}
      <div className="text-left space-y-1 mb-6 sm:mb-8">
        <h2 className="text-2xl font-bold text-figmaText-heading">Welcome Back</h2>
        <p className="text-sm text-figmaText-subheading">Login to your account below</p>
      </div>

      {/* Main card container for form elements */}
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full">
        {/* Inner container for content, ensures max-width for form elements */}
        <div className="w-full max-w-[360px] mx-auto">
          <form onSubmit={handleSubmit} className="space-y-5">
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
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Your Email Address"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                className={`w-full px-4 h-12 rounded-md bg-formInput-bg border border-formInput-border text-formInput-text placeholder-formInput-placeholder focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>

            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <Label
                  htmlFor="password"
                  className="block text-sm font-medium text-figmaText-label"
                >
                  Password
                </Label>
                <button
                  type="button"
                  onClick={() => setIsForgotPasswordOpen(true)}
                  className="text-xs font-medium text-link-DEFAULT hover:text-link-hover hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  className={`w-full px-4 h-12 rounded-md bg-formInput-bg border border-formInput-border text-formInput-text placeholder-formInput-placeholder focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm ${errors.password ? 'border-red-500' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-500"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <Icons.eyeOff className="h-5 w-5" />
                  ) : (
                    <Icons.eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center pt-1">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked: boolean) => setRememberMe(checked)}
                className="h-4 w-4 rounded border-googleButton-border text-link-DEFAULT focus:ring-link-DEFAULT"
              />
              <Label
                htmlFor="remember"
                className="ml-2 block text-sm font-medium text-figmaText-label"
              >
                Remember me
              </Label>
            </div>

            {/* Log In Button */}
            <div className="pt-1">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 flex items-center justify-center rounded-md bg-gradient-to-r from-brand-green-light to-brand-green-dark px-4 text-sm font-semibold text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-brand-green-dark focus:ring-offset-2 disabled:opacity-50 transition-opacity"
              >
                {isLoading ? <Icons.loader className="mr-2 h-4 w-4 animate-spin" /> : null}
                Log In
              </Button>
            </div>
          </form>

          {/* Or continue with Divider */}
          <div className="relative pt-1">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-formInput-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-formInput-bg px-2 text-figmaText-subheading">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Button */}
          <div className="pt-1">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialLogin('Google')}
              className="w-full h-12 flex items-center justify-center rounded-md border border-googleButton-border bg-formInput-bg px-4 text-sm font-medium text-googleButton-text hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
            >
              <Icons.google className="mr-2 h-5 w-5" />
              Google
            </Button>
          </div>

          {/* Create Account Link */}
          <div className="text-center text-sm text-figmaText-subheading pt-2">
            Don&apos;t have an account?{' '}
            <Link
              href="/signup"
              className="font-medium text-link-DEFAULT hover:text-link-hover hover:underline"
            >
              Create An Account
            </Link>
          </div>
        </div>
      </div>
      <ForgotPasswordDialog
        open={isForgotPasswordOpen}
        onOpenChange={setIsForgotPasswordOpen}
        onSuccessShowInfo={handleForgotPasswordSuccess}
      />
      <InfoDialog
        open={isInfoDialogOpen}
        onOpenChange={setIsInfoDialogOpen}
        title={infoDialogContent.title}
        description={infoDialogContent.description}
        iconSrc={infoDialogContent.iconSrc}
        actionLabel={infoDialogContent.actionLabel}
      />
    </>
  );
}

function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}

export default LoginPage;

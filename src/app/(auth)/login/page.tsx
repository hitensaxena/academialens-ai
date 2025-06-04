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
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Title Block */}
      <div className="auth-title-block">
        <h1 className="auth-title">Welcome Back to AcademiaLens</h1>
        <p className="auth-subtitle">Log in to access your research dashboard and tools.</p>
      </div>
      {/* Card for the form */}
      <div className="mt-10 auth-card">
        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div>
            <Label htmlFor="email" className="auth-label">
              Email address
            </Label>
            <div className="mt-2">
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Your Email Address"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                className={`auth-input ${errors.email ? 'border-destructive' : ''}`}
              />
              {errors.email && <p className="auth-input-error">{errors.email}</p>}
            </div>
          </div>{' '}
          {/* Closes the main div for Email Input section */}
          {/* Password Input */}
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="auth-label">
                Password
              </Label>
              <button
                type="button"
                onClick={() => setIsForgotPasswordOpen(true)}
                className="text-xs auth-link"
              >
                Forgot Password?
              </button>
            </div>
            <div className="mt-2 relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Your Password"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                className={`auth-input ${errors.password ? 'border-destructive' : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="auth-password-toggle-icon"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <Icons.eyeOff className="h-5 w-5" />
                ) : (
                  <Icons.eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && <p className="auth-input-error">{errors.password}</p>}
          </div>
          {/* Remember Me Checkbox */}
          <div className="flex items-center">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked: boolean) => setRememberMe(checked)}
              className="h-4 w-4 rounded border-border text-primary focus:ring-ring"
            />
            <Label htmlFor="remember" className="auth-checkbox-label">
              Remember me
            </Label>
          </div>
          {/* Log In Button */}
          <div className="mt-2">
            <Button type="submit" disabled={isLoading} className="auth-primary-button">
              {isLoading ? <Icons.loader className="auth-primary-button-icon" /> : null}
              Log In
            </Button>
          </div>
        </form>

        {/* Or continue with Divider */}
        <div className="auth-divider">
          <div className="auth-divider-line" aria-hidden="true">
            <div />
          </div>
          <div className="auth-divider-text-wrapper">
            <span className="auth-divider-text">Or continue with</span>
          </div>
        </div>

        {/* Google Button */}
        <div className="mt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialLogin('Google')}
            className="auth-secondary-button"
          >
            <Icons.google className="auth-secondary-button-icon" />
            Google
          </Button>
        </div>

        {/* Create Account Link */}
        <div className="auth-footer-link-group mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="auth-link">
            Create An Account
          </Link>
        </div>
      </div>{' '}
      {/* Closes auth-card div */}
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
    </div> // Closes main wrapping div for LoginForm
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

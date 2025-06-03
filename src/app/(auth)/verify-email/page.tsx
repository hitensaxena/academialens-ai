'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button/button';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';
import { AuthOverlayCard } from '@/components/auth/AuthOverlayCard';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    if (!token || !email) {
      setStatus('error');
      setMessage('Invalid verification link. Please check the link and try again.');
      return;
    }

    const verifyEmail = async () => {
      try {
        // TODO: Replace with actual API call
        console.log('Verifying email with token:', { token, email });

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Simulate success response
        setStatus('success');
        setMessage('Your email has been successfully verified!');
        // No automatic redirect or toast, AuthOverlayCard will handle this
      } catch (error) {
        console.error('Email verification error:', error);
        setStatus('error');
        setMessage('Failed to verify your email. The link may have expired or is invalid.');
      }
    };

    verifyEmail();
  }, [searchParams, router, toast]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-authLayout-bg p-4">
      {status === 'success' ? (
        <AuthOverlayCard
          title="Email Verified!"
          subtitle="Your email has been successfully verified."
          description="You can now use all the features of AcademiaLens."
          actionLabel="Go to Login"
          actionHref="/login"
        />
      ) : (
        <div className="w-full max-w-md space-y-6 rounded-lg border bg-card p-8 text-card-foreground shadow-sm">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold tracking-tight">
              {status === 'verifying' && 'Verifying Your Email'}
              {status === 'error' && 'Verification Failed'}
            </h1>
            <p className="text-sm text-muted-foreground">{message}</p>
          </div>

          {status === 'verifying' && (
            <div className="flex justify-center py-4">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
          )}

          {status === 'error' && (
            <div className="pt-4">
              <Button className="w-full" asChild>
                <Link href="/signup">Back to Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}

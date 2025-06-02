'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button/button';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';

export default function VerifyEmailPage() {
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

        toast({
          title: 'Email verified!',
          description: 'Your email has been successfully verified.',
        });

        // Redirect to login after a short delay
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } catch (error) {
        console.error('Email verification error:', error);
        setStatus('error');
        setMessage('Failed to verify your email. The link may have expired or is invalid.');

        toast({
          title: 'Verification failed',
          description: 'Failed to verify your email. Please try again.',
          variant: 'destructive',
        });
      }
    };

    verifyEmail();
  }, [searchParams, router, toast]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
        {status === 'verifying' && (
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        )}
        {status === 'success' && (
          <svg
            className="h-12 w-12 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
        {status === 'error' && (
          <svg
            className="h-12 w-12 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
      </div>

      <h1 className="text-2xl font-semibold tracking-tight">
        {status === 'verifying' && 'Verifying your email...'}
        {status === 'success' && 'Email Verified!'}
        {status === 'error' && 'Verification Failed'}
      </h1>

      <p className="text-muted-foreground max-w-md">{message}</p>

      {status === 'success' && (
        <div className="flex flex-col space-y-2">
          <p className="text-sm text-muted-foreground">Redirecting to login page...</p>
          <Button asChild variant="link" className="text-primary">
            <Link href="/login">Go to login now</Link>
          </Button>
        </div>
      )}

      {status === 'error' && (
        <div className="flex flex-col space-y-4">
          <Button asChild>
            <Link href="/signup">Sign up again</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/login">Back to login</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

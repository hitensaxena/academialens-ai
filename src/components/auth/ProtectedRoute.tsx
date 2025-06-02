'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
  loadingComponent?: React.ReactNode;
}

export default function ProtectedRoute({
  children,
  requireAuth = true,
  redirectTo = '/login',
  loadingComponent,
}: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // TODO: Replace with actual authentication check
        // This is a mock implementation - in a real app, you would check the auth state
        // from your auth provider or make an API call to verify the session
        const token = localStorage.getItem('auth_token');
        const isAuth = !!token;

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        setIsAuthenticated(isAuth);

        if (requireAuth && !isAuth) {
          // Store the current path to redirect back after login
          const redirectPath =
            pathname !== '/login' ? `?redirect=${encodeURIComponent(pathname)}` : '';
          router.push(`${redirectTo}${redirectPath}`);

          toast({
            title: 'Authentication required',
            description: 'Please sign in to access this page.',
            variant: 'default',
          });
        } else if (!requireAuth && isAuth) {
          // If user is authenticated but the page doesn't require auth (like login/signup pages)
          // Redirect to dashboard or home
          router.push('/dashboard');
        }
      } catch (error) {
        console.error('Auth check error:', error);
        // On error, assume not authenticated
        if (requireAuth) {
          router.push(redirectTo);
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [requireAuth, redirectTo, router, pathname, toast]);

  if (isLoading) {
    return (
      loadingComponent || (
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      )
    );
  }

  if (requireAuth && !isAuthenticated) {
    // Show loading or redirecting state
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // If we get here, either:
  // 1. Authentication is required and user is authenticated
  // 2. Authentication is not required and user is not authenticated
  return <>{children}</>;
}

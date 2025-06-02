'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
  loadingComponent?: React.ReactNode;
  roles?: string[]; // Optional: Required roles to access the route
}

export default function ProtectedRoute({
  children,
  requireAuth = true,
  redirectTo = '/login',
  loadingComponent,
  roles = [],
}: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  // Check if user has required roles
  const isAuthorized = !roles.length || (user?.role && roles.includes(user.role));

  // Add debug effect to log auth state changes
  useEffect(() => {
    console.log('Auth state changed:', { isAuthenticated, authLoading, user });
  }, [isAuthenticated, authLoading, user]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('ProtectedRoute checkAuth:', {
          pathname,
          isAuthenticated,
          authLoading,
          requireAuth,
          isAuthorized,
        });

        // If still loading auth state, wait
        if (authLoading) {
          console.log('Auth still loading...');
          return;
        }

        // Handle unauthenticated access to protected routes
        if (requireAuth && !isAuthenticated) {
          console.log('Not authenticated, redirecting to login');
          const redirectPath =
            pathname !== '/login' ? `?redirect=${encodeURIComponent(pathname)}` : '';

          // Use replace instead of push to prevent back button issues
          router.replace(`${redirectTo}${redirectPath}`);

          toast({
            title: 'Authentication required',
            description: 'Please sign in to access this page.',
            variant: 'default',
          });
          return;
        }

        // Handle authenticated users trying to access auth pages
        if (!requireAuth && isAuthenticated) {
          const redirectPath = searchParams.get('redirect') || '/dashboard';
          console.log('Already authenticated, redirecting to:', redirectPath);
          router.replace(redirectPath);
          return;
        }

        // Handle unauthorized role access
        if (isAuthenticated && !isAuthorized) {
          console.log('Unauthorized access, redirecting to /unauthorized');
          router.replace('/unauthorized');
          toast({
            title: 'Access Denied',
            description: 'You do not have permission to access this page.',
            variant: 'destructive',
          });
        }
      } catch (error) {
        console.error('Error in ProtectedRoute:', error);
        toast({
          title: 'Error',
          description: 'An error occurred while checking your access.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [
    isAuthenticated,
    authLoading,
    requireAuth,
    pathname,
    router,
    toast,
    isAuthorized,
    redirectTo,
    searchParams,
  ]);

  // Show loading state
  if (isLoading || authLoading) {
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

  // If route requires auth and user is not authenticated, show redirecting state
  if (requireAuth && !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // If user is authenticated but doesn't have required role, show unauthorized
  if (isAuthenticated && !isAuthorized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-muted-foreground">You don&apos;t have permission to view this page.</p>
        </div>
      </div>
    );
  }

  // If we get here, render the protected content
  return <>{children}</>;
}

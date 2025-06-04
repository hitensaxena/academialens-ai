'use client';

import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    console.log('\n--- DashboardPage Debug ---');
    console.log('Mounted with auth state:', {
      isAuthenticated,
      isLoading,
      user: user ? { id: user.id, name: user.name, email: user.email } : null,
      cookies: document.cookie,
      path: window.location.pathname,
      search: window.location.search,
    });

    // Check for any auth-related errors in the URL
    const params = new URLSearchParams(window.location.search);
    if (params.has('error')) {
      console.error('Auth error from URL:', params.get('error'));
    }
  }, [isAuthenticated, user, isLoading]);

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-theme(spacing.32))] items-center justify-center p-8 text-foreground">
        Loading dashboard...
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[calc(100vh-theme(spacing.32))] items-center justify-center p-8 text-destructive">
        Not authenticated. Redirecting to login...
      </div>
    );
  }

  return (
    <div className="p-8 bg-card text-card-foreground rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Welcome to your dashboard, {user?.name || 'User'}!</p>
    </div>
  );
}

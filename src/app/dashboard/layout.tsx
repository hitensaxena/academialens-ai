'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button/button';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { Home, FileText, BookOpen, Settings, LogOut, Menu, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Documents', href: '/dashboard/documents', icon: FileText },
  { name: 'Research', href: '/dashboard/research', icon: BookOpen },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  // Debug effect to log auth state changes
  useEffect(() => {
    console.log('DashboardLayout - Auth state:', { isAuthenticated, isLoading, user });
  }, [isAuthenticated, isLoading, user]);

  // Show loading state while auth is being checked
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, the ProtectedRoute should handle the redirect
  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: 'Logged out successfully',
        description: 'You have been logged out.',
      });
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: 'Error',
        description: 'Failed to log out. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const getUserInitials = () => {
    if (!user) return 'U';
    return user.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={cn('fixed inset-0 z-40 lg:hidden', sidebarOpen ? 'block' : 'hidden')}>
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          aria-hidden="true"
          onClick={() => setSidebarOpen(false)}
        />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
          <div className="flex h-16 flex-shrink-0 items-center px-4 bg-indigo-600">
            <h1 className="text-xl font-bold text-white">AcademiaLens</h1>
            <button
              type="button"
              className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-md p-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <nav className="flex-1 space-y-1 px-2">
              {navigation.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      isActive
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                    )}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon
                      className={cn(
                        isActive ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500',
                        'mr-3 h-6 w-6 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-auto p-4">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-600 font-semibold">
                  {getUserInitials()}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">{user?.name || 'User'}</p>
                  <p className="text-xs font-medium text-gray-500">{user?.email || ''}</p>
                </div>
                <Button variant="ghost" size="sm" className="ml-auto" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                  <span className="sr-only">Sign out</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
          <div className="flex h-16 flex-shrink-0 items-center px-4 bg-indigo-600">
            <h1 className="text-xl font-bold text-white">AcademiaLens</h1>
          </div>
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <nav className="flex-1 space-y-1 px-2">
              {navigation.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      isActive
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                    )}
                  >
                    <item.icon
                      className={cn(
                        isActive ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500',
                        'mr-3 h-6 w-6 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-auto p-4">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-600 font-semibold">
                  {getUserInitials()}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">{user?.name || 'User'}</p>
                  <p className="text-xs font-medium text-gray-500">{user?.email || ''}</p>
                </div>
                <Button variant="ghost" size="sm" className="ml-auto" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                  <span className="sr-only">Sign out</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex min-w-0 flex-1 flex-col lg:pl-64">
        {/* Mobile top navigation */}
        <div className="sticky top-0 z-10 bg-white pl-1 pt-1 sm:pl-3 sm:pt-3 lg:hidden">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <main className="flex-1">
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  );
}

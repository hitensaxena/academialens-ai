'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button/button';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { Home, FileText, BookOpen, Settings, LogOut, Menu, X, User } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Documents', href: '/dashboard/documents', icon: FileText },
  { name: 'Research', href: '/dashboard/research', icon: BookOpen },
  { name: 'Profile', href: '/dashboard/profile', icon: User },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.profile-dropdown')) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown when route changes
  useEffect(() => {
    setShowProfileDropdown(false);
  }, [pathname]);

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
          <div className="flex h-16 flex-shrink-0 items-center justify-between px-4 bg-indigo-600">
            <h1 className="text-xl font-bold text-white">AcademiaLens</h1>
            <button
              type="button"
              className="rounded-md p-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-white"
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
                  <p className="text-xs text-gray-500">{user?.email || ''}</p>
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
          <div className="flex h-16 flex-shrink-0 items-center justify-between px-4 bg-indigo-600">
            <h1 className="text-xl font-bold text-white">AcademiaLens</h1>
            <div className="relative profile-dropdown">
              <button
                type="button"
                className="flex items-center rounded-full bg-white/10 p-1 text-sm text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              >
                <span className="sr-only">Open user menu</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                  <User className="h-5 w-5 text-white" />
                </div>
              </button>

              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Link
                    href="/dashboard/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowProfileDropdown(false)}
                  >
                    Your Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
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
                  <p className="text-xs text-gray-500">{user?.email || ''}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col lg:pl-64">
        <div className="sticky top-0 z-10 bg-white shadow-sm lg:hidden">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-ml-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex-1 text-center">
              <h1 className="text-lg font-medium text-gray-900">
                {navigation.find((item) => pathname.startsWith(item.href))?.name || 'Dashboard'}
              </h1>
            </div>
            <div className="w-6"></div> {/* Spacer for flex alignment */}
          </div>
        </div>

        <main className="flex-1 pb-8">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>

      <Toaster />
    </div>
  );
}

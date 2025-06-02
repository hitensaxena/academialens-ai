'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast/toast-hook';

// Define the user type
type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  role: string;
  avatar?: string;
};

// Define the auth context type
type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, email: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<boolean>;
  refreshUser: () => Promise<boolean>;
};

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider props
type AuthProviderProps = {
  children: ReactNode;
};

// Auth provider component
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  // Check if user is authenticated
  const isAuthenticated = !!user;

  // Initialize auth state on mount and on token changes
  useEffect(() => {
    console.log('AuthProvider mounted, initializing auth state...');

    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
      return null;
    };

    const initializeAuth = async () => {
      try {
        // Check for existing session
        const token = getCookie('auth_token');
        console.log('Auth init - Token in cookies:', token ? 'exists' : 'not found');

        if (token) {
          // In a real app, you would verify the token with the backend
          // For now, we'll just simulate a user
          const mockUser = {
            id: '1',
            name: 'Demo User',
            email: 'demo@example.com',
            emailVerified: true,
            role: 'user',
          };

          console.log('Auth init - Setting user:', mockUser);
          setUser(mockUser);
          return true;
        } else {
          console.log('Auth init - No token found, setting user to null');
          setUser(null);
          return false;
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        // Clear any invalid tokens
        document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        setUser(null);
        return false;
      } finally {
        console.log('Auth initialization complete, setting isLoading to false');
        setIsLoading(false);
      }
    };

    // Initial auth check - don't await here to prevent blocking
    initializeAuth().then((isAuthenticated) => {
      console.log('Initial auth check complete, isAuthenticated:', isAuthenticated);

      // If we have a token but still not authenticated, there might be an issue
      if (getCookie('auth_token') && !isAuthenticated) {
        console.log('Token exists but auth failed, clearing token...');
        localStorage.removeItem('auth_token');
      }
    });

    // Listen for storage events to sync auth state across tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'auth_token' || e.key === null) {
        console.log('auth_token changed in localStorage, reinitializing auth...');
        initializeAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      console.log('Login started with email:', email);
      setIsLoading(true);

      // Simulate API call with a small delay
      console.log('Simulating API call with password length:', password.length);
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Simulate successful login
      const mockUser = {
        id: '1',
        name: 'Demo User',
        email,
        emailVerified: true,
        role: 'user',
      };

      // Store token in cookies
      const authToken = `mock-jwt-token-${Date.now()}`;
      console.log('Setting auth token in cookies');
      document.cookie = `auth_token=${authToken}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`; // 1 week expiry

      // Update user state
      console.log('Setting user state:', mockUser);
      setUser(mockUser);

      // Show success message
      toast({
        title: 'Login successful',
        description: `Welcome back, ${mockUser.name}!`,
      });

      console.log('Login completed, returning user data');
      return mockUser;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);

      // TODO: Replace with actual API call
      console.log('Register attempt with:', { name, email, password });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate successful registration
      // In a real app, you would typically verify the email before logging in

      // Show success message
      toast({
        title: 'Registration successful!',
        description: 'Please check your email to verify your account.',
      });

      // Redirect to login page
      router.push('/login');
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setIsLoading(true);

      // TODO: Replace with actual API call to invalidate token
      console.log('Logging out...');

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Clear auth state
      console.log('Clearing auth cookies...');
      document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      setUser(null);

      // Force clear all auth-related state
      window.dispatchEvent(new Event('storage'));

      // Show success message
      toast({
        title: 'Logged out',
        description: 'You have been successfully logged out.',
      });

      // Redirect to login page
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
      throw new Error('Failed to log out. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Forgot password function
  const forgotPassword = async (email: string) => {
    try {
      setIsLoading(true);

      // TODO: Replace with actual API call
      console.log('Forgot password request for:', email);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success message
      toast({
        title: 'Check your email',
        description: "We've sent you a link to reset your password.",
      });
    } catch (error) {
      console.error('Forgot password error:', error);
      throw new Error('Failed to process your request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Reset password function
  const resetPassword = async (token: string, email: string) => {
    try {
      setIsLoading(true);

      // TODO: Replace with actual API call
      console.log('Reset password request:', { token, email });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success message
      toast({
        title: 'Password updated',
        description: 'Your password has been successfully reset.',
      });

      // Redirect to login page
      router.push('/login');
    } catch (error) {
      console.error('Reset password error:', error);
      throw new Error('Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Verify email function
  const verifyEmail = async (token: string) => {
    try {
      setIsLoading(true);

      // TODO: Replace with actual API call
      console.log('Verify email with token:', token);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update user's email verification status
      if (user) {
        setUser({ ...user, emailVerified: true });
      }

      // Show success message
      toast({
        title: 'Email verified!',
        description: 'Your email has been successfully verified.',
      });

      return true;
    } catch (error) {
      console.error('Email verification error:', error);
      throw new Error('Failed to verify email. The link may be invalid or expired.');
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh user data
  const refreshUser = async () => {
    try {
      // TODO: Replace with actual API call to refresh user data
      console.log('Refreshing user data...');

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // In a real app, you would fetch the latest user data here
      return true;
    } catch (error) {
      console.error('Failed to refresh user data:', error);
      return false;
    }
  };

  // Context value
  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    verifyEmail,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

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
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
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

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check for existing session
        const token = localStorage.getItem('auth_token');

        if (token) {
          // TODO: Verify token with backend
          // For now, we'll just simulate a user
          setUser({
            id: '1',
            name: 'Demo User',
            email: 'demo@example.com',
            emailVerified: true,
            role: 'user',
          });
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        // Clear any invalid tokens
        localStorage.removeItem('auth_token');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string, rememberMe = false) => {
    try {
      setIsLoading(true);

      // TODO: Replace with actual API call
      console.log('Login attempt with:', { email, rememberMe });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate successful login
      const mockUser = {
        id: '1',
        name: 'Demo User',
        email,
        emailVerified: true,
        role: 'user',
      };

      // Store token in localStorage
      localStorage.setItem('auth_token', 'mock-jwt-token');

      // Update user state
      setUser(mockUser);

      // Show success message
      toast({
        title: 'Login successful',
        description: `Welcome back, ${mockUser.name}!`,
      });

      // Redirect to dashboard or previous page
      router.push('/dashboard');
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
      localStorage.removeItem('auth_token');
      setUser(null);

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

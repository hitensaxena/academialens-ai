'use client';

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast/toast-hook';
import apiClient from '../lib/apiClient';

interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  role: string;
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface BackendUser {
  id: number;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  full_name: string | null;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, email: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<boolean>;
  refreshUser: () => Promise<boolean>;
  updateProfile: (updates: Partial<User>) => Promise<User | null>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const mapBackendUserToFrontendUser = (backendUser: BackendUser): User => {
  return {
    id: backendUser.id.toString(),
    email: backendUser.email,
    name: backendUser.full_name || 'User',
    emailVerified: backendUser.is_active,
    role: backendUser.is_superuser ? 'admin' : 'user',
  };
};

const getErrorMessage = (error: unknown, defaultMessage: string): string => {
  if (typeof error === 'object' && error !== null) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const err = error as any; // Use 'any' here for easier property access after check
    return err.response?.data?.detail || err.message || defaultMessage;
  }
  if (typeof error === 'string') {
    return error;
  }
  return defaultMessage;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  const isAuthenticated = !!user;

  const getCookie = (name: string): string | null => {
    if (typeof document === 'undefined') return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  };

  const setAuthCookie = (token: string) => {
    document.cookie = `auth_token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax; Secure`;
  };

  const clearAuthCookie = useCallback(() => {
    document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax; Secure';
  }, []);

  const fetchCurrentUser = useCallback(async (): Promise<User | null> => {
    console.log('Fetching current user...');
    try {
      const { data: backendUser } = await apiClient.get<BackendUser>('/users/me');
      const frontendUser = mapBackendUserToFrontendUser(backendUser);
      setUser(frontendUser);
      console.log('Current user fetched and set:', frontendUser);
      return frontendUser;
    } catch (error) {
      console.error('Failed to fetch current user:', error);
      setUser(null);
      clearAuthCookie();
      return null;
    }
  }, [setUser, clearAuthCookie]); // apiClient and mapBackendUserToFrontendUser are assumed stable or defined outside

  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      console.log('AuthProvider: Initializing auth state...');
      const token = getCookie('auth_token');
      if (token) {
        console.log('AuthProvider: Token found, attempting to fetch current user.');
        await fetchCurrentUser();
      } else {
        console.log('AuthProvider: No token found.');
        setUser(null);
      }
      setIsLoading(false);
      console.log('AuthProvider: Auth initialization complete.');
    };

    initializeAuth();

    // Listener for cross-tab auth changes (e.g., logout in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'auth_token_sync' && e.newValue === null) {
        console.log('Auth token sync: logout detected in another tab, re-initializing auth...');
        // Re-fetch user or clear state if token is gone
        initializeAuth();
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [fetchCurrentUser]); // fetchCurrentUser is now stable due to useCallback

  const login = async (email: string, password: string): Promise<User | null> => {
    setIsLoading(true);
    console.log('Login attempt with email:', email);
    try {
      const formData = new FormData();
      formData.append('username', email);
      formData.append('password', password);

      const { data } = await apiClient.post<{ access_token: string; token_type: string }>(
        '/login/access-token',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      setAuthCookie(data.access_token);
      console.log('Login successful, token stored. Fetching user details...');

      const currentUser = await fetchCurrentUser();

      if (currentUser) {
        toast({
          title: 'Login Successful',
          description: `Welcome back, ${currentUser.name}!`,
        });
        return currentUser;
      } else {
        throw new Error('Failed to fetch user details after login.');
      }

    } catch (error: unknown) {
      console.error('Login failed:', error);
      clearAuthCookie();
      setUser(null);
      const errorMessage = getErrorMessage(error, 'Invalid email or password.');
      toast({
        title: 'Login Failed',
        description: errorMessage,
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    console.log('Logging out...');
    try {
      clearAuthCookie();
      setUser(null);
      router.push('/auth/login');
      toast({
        title: 'Logged Out',
        description: 'You have been successfully logged out.',
      });
    } catch (error: unknown) {
      console.error('Logout failed:', error);
      toast({
        title: 'Logout Failed',
        description: getErrorMessage(error, 'An unexpected error occurred during logout.'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<void> => {
    toast({ title: 'Info', description: 'Register function not implemented yet.'});
    console.warn('Register function not implemented yet.', { name, email, password });
  };

  const forgotPassword = async (email: string): Promise<void> => {
    toast({ title: 'Info', description: 'Forgot Password function not implemented yet.'});
    console.warn('Forgot Password function not implemented yet.', { email });
  };

  const resetPassword = async (token: string, email: string): Promise<void> => {
    toast({ title: 'Info', description: 'Reset Password function not implemented yet.'});
    console.warn('Reset Password function not implemented yet.', { token, email });
  };

  const verifyEmail = async (token: string): Promise<boolean> => {
    toast({ title: 'Info', description: 'Verify Email function not implemented yet.'});
    console.warn('Verify Email function not implemented yet.', { token });
    return false;
  };

  const refreshUser = async (): Promise<boolean> => {
    setIsLoading(true);
    const success = !!(await fetchCurrentUser());
    setIsLoading(false);
    return success;
  };

  const updateProfile = async (updates: Partial<User>): Promise<User | null> => {
    toast({ title: 'Info', description: 'Update Profile function not implemented yet.'});
    console.warn('Update Profile function not implemented yet.', { updates });
    return null;
  };

  const changePassword = async (currentPassword: string, newPassword: string): Promise<void> => {
    toast({ title: 'Info', description: 'Change Password function not implemented yet.'});
    console.warn('Change Password function not implemented yet.', { currentPassword, newPassword });
  };

  const value: AuthContextType = {
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
    updateProfile,
    changePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

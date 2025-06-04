import { create } from 'zustand';
import { AxiosError } from 'axios';
import apiClient from '@/lib/apiClient'; // Assuming your API client is here

interface User {
  id: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  bio?: string | null;
  // Add other user-related fields as needed
}

interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  fetchCurrentUser: () => Promise<void>;
  clearUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  setUser: (user) => set({ user, isLoading: false, error: null }),
  fetchCurrentUser: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.get<User>('/users/me'); // Endpoint to get current user
      set({ user: response.data, isLoading: false });
    } catch (err: unknown) {
      console.error('Failed to fetch current user:', err);
      let errorMessage = 'Failed to fetch user data';
      if (err instanceof AxiosError) {
        errorMessage = err.response?.data?.detail || err.message || errorMessage;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      set({
        user: null,
        isLoading: false,
        error: errorMessage,
      });
    }
  },
  clearUser: () => set({ user: null, isLoading: false, error: null }),
}));

export default useUserStore;

import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1', // Default to localhost:8000/api/v1
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add the auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      // Try to get token from cookies first
      const cookieToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('auth_token='))
        ?.split('=')[1];

      if (cookieToken) {
        config.headers.Authorization = `Bearer ${cookieToken}`;
      } else {
        // Fallback to localStorage if not in cookies (though cookies are preferred for storing tokens)
        const localStorageToken = localStorage.getItem('auth_token');
        if (localStorageToken) {
          config.headers.Authorization = `Bearer ${localStorageToken}`;
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;

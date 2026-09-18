import axios from 'axios';
import { storage, STORAGE_KEYS } from '@/utils/storage';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Track if refresh is in progress to avoid multiple refresh attempts
let isRefreshing = false;
let failedQueue: Array<{ resolve: Function; reject: Function }> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  isRefreshing = false;
  failedQueue = [];
};

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = storage.get<string>(STORAGE_KEYS.AUTH_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const errorData = error.response?.data;

    // ✅ 401 Unauthorized - Distinguish between token expiry and auth failure
    if (status === 401 && originalRequest) {
      // Prevent infinite refresh loops
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            if (token) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return api(originalRequest);
            }
            throw new Error('Failed to refresh token');
          })
          .catch(err => {
            // Force logout after failed refresh
            handleLogout();
            return Promise.reject(err);
          });
      }

      isRefreshing = true;

      // Check if error is "token expired" vs "invalid credentials"
      const isTokenExpired = 
        errorData?.message?.includes('expired') || 
        errorData?.message?.includes('Expired token');

      if (isTokenExpired) {
        // 🔄 Try to refresh token silently
        return attemptTokenRefresh()
          .then(newToken => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            processQueue(null, newToken);
            return api(originalRequest);
          })
          .catch(err => {
            processQueue(err);
            handleLogout();
            return Promise.reject(err);
          });
      } else {
        // 🚫 Invalid credentials or session revoked - immediate logout
        handleLogout();
        return Promise.reject(error);
      }
    }

    // 403 Forbidden - User doesn't have permission
    if (status === 403) {
      console.warn('⚠️ Access denied:', errorData?.message);
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

/**
 * Attempt to refresh the auth token via Supabase
 */
async function attemptTokenRefresh(): Promise<string> {
  try {
    // Try to refresh via the backend auth endpoint (if available)
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL || '/api'}/auth/refresh`,
      {}
    );

    if (response.data?.token) {
      storage.set(STORAGE_KEYS.AUTH_TOKEN, response.data.token);
      return response.data.token;
    }

    throw new Error('No token in refresh response');
  } catch (err) {
    console.error('❌ Token refresh failed:', err);
    throw err;
  }
}

/**
 * Handle logout - clear auth data and redirect to login
 */
function handleLogout() {
  console.warn('🔐 Session expired or invalid. Please login again.');
  storage.remove(STORAGE_KEYS.AUTH_TOKEN);
  storage.remove(STORAGE_KEYS.USER);
  window.location.href = '/login';
}

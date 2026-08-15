import { create } from 'zustand';
import { User } from '@/types/user.types';
import { storage, STORAGE_KEYS } from '@/utils/storage';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  login: (user: User, token: string) => void;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) => set({ user, isAuthenticated: !!user }),

  setToken: (token) => {
    if (token) {
      storage.set(STORAGE_KEYS.AUTH_TOKEN, token);
    } else {
      storage.remove(STORAGE_KEYS.AUTH_TOKEN);
    }
    set({ token });
  },

  login: (user, token) => {
    storage.set(STORAGE_KEYS.USER, user);
    storage.set(STORAGE_KEYS.AUTH_TOKEN, token);
    set({ user, token, isAuthenticated: true });
  },

  logout: () => {
    storage.remove(STORAGE_KEYS.USER);
    storage.remove(STORAGE_KEYS.AUTH_TOKEN);
    set({ user: null, token: null, isAuthenticated: false });
  },

  initialize: () => {
    const user = storage.get<User>(STORAGE_KEYS.USER);
    const token = storage.get<string>(STORAGE_KEYS.AUTH_TOKEN);
    set({
      user,
      token,
      isAuthenticated: !!(user && token),
      isLoading: false,
    });
  },
}));

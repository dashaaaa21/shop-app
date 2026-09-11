import { create } from 'zustand';
import { supabase, signIn, signOut, signUp, getSession } from '../lib/supabase';
import type { Session, User as SupabaseUser } from '@supabase/supabase-js';

export interface AppUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin';
}

interface AuthState {
  user: AppUser | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
  clearError: () => void;
}

const mapSupabaseUser = (supabaseUser: SupabaseUser): AppUser => ({
  id: supabaseUser.id,
  email: supabaseUser.email ?? '',
  name:
    supabaseUser.user_metadata?.full_name ??
    supabaseUser.email?.split('@')[0] ??
    'User',
  avatar: supabaseUser.user_metadata?.avatar_url,
  role: (supabaseUser.user_metadata?.role as 'user' | 'admin') ?? 'user',
});

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const data = await signIn(email, password);
      set({
        user: mapSupabaseUser(data.user),
        session: data.session,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Login failed';
      set({ isLoading: false, error: message, isAuthenticated: false });
      throw err;
    }
  },

  register: async (name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const data = await signUp(email, password, name);
      if (data.user) {
        set({
          user: mapSupabaseUser(data.user),
          session: data.session,
          isAuthenticated: !!data.session,
          isLoading: false,
          error: null,
        });
      } else {
        // Email confirmation required
        set({ isLoading: false, error: null });
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      set({ isLoading: false, error: message });
      throw err;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await signOut();
    } catch {
      // ignore signout errors
    } finally {
      set({ user: null, session: null, isAuthenticated: false, isLoading: false });
    }
  },

  initialize: async () => {
    set({ isLoading: true });
    try {
      const session = await getSession();
      if (session?.user) {
        set({
          user: mapSupabaseUser(session.user),
          session,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        set({ user: null, session: null, isAuthenticated: false, isLoading: false });
      }
    } catch {
      set({ user: null, session: null, isAuthenticated: false, isLoading: false });
    }

    // Listen for auth state changes
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        set({
          user: mapSupabaseUser(session.user),
          session,
          isAuthenticated: true,
        });
      } else {
        set({ user: null, session: null, isAuthenticated: false });
      }
    });
  },

  clearError: () => set({ error: null }),
}));

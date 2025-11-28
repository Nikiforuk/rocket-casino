import type { Session } from '@supabase/supabase-js';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  email: string;
  username?: string | null;
}

interface AuthState {
  user: User | null;
  session: Session | null;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  getUsername: () => string | null;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      setUser: (user) => set({ user }),
      setSession: (session) => set({ session }),
      getUsername: () => get().session?.user?.user_metadata?.username ?? null,
      clearUser: () => set({ user: null, session: null }),
    }),
    {
      name: 'auth-storage',
    },
  ),
);

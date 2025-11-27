import type { Session } from '@supabase/supabase-js';
import { create } from 'zustand';

interface User {
  email: string;
  username?: string | null;
}

interface AuthState {
  user: User | null;
  session: Session | null;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  clearUser: () => set({ user: null, session: null }),
}));

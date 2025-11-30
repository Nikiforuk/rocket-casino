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
  updateUsername: (username: string) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      setUser: (user) => set({ user }),
      setSession: (session) => set({ session }),
      getUsername: () => {
        const session = get().session;
        if (session?.user?.user_metadata?.username) {
          return session.user.user_metadata.username;
        }
        return get().user?.username ?? null;
      },
      updateUsername: (username: string) => {
        const currentSession = get().session;
        const currentUser = get().user;

        if (currentSession) {
          const updatedSession = {
            ...currentSession,
            user: {
              ...currentSession.user,
              user_metadata: {
                ...currentSession.user.user_metadata,
                username,
              },
            },
          };
          set({ session: updatedSession });
        }

        if (currentUser) {
          set({ user: { ...currentUser, username } });
        }
      },
      clearUser: () => set({ user: null, session: null }),
    }),
    {
      name: 'auth-storage',
    },
  ),
);

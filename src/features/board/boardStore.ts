import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { getProfile } from './api/boardApi';

interface BoardState {
  isModal: boolean;
  balance: number;

  setIsModal: (value: boolean) => void;
  setBalance: (value: number | ((prev: number) => number)) => void;
  refreshBalance: () => Promise<void>;
}

export const useBoardStore = create<BoardState>()(
  persist(
    (set) => ({
      isModal: false,
      balance: 0,

      setIsModal: (value) => set({ isModal: value }),

      setBalance: (value) =>
        set((state) => ({
          balance: typeof value === 'function' ? value(state.balance) : value,
        })),

      refreshBalance: async () => {
        try {
          const data = await getProfile();
          set({ balance: Number(data.balance) });
        } catch {
          console.error('Failed to update balance');
        }
      },
    }),
    {
      name: 'board-storage',
      partialize: (state) => ({ balance: state.balance }),
    },
  ),
);

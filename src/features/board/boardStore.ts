import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { getProfile } from './api/boardApi';

interface BoardState {
  isModal: boolean;
  balance: number;
  newUsername: string;
  gamesPlayed: number;
  totalWagered: number;
  totalWon: number;

  setIsModal: (value: boolean) => void;
  setBalance: (value: number | ((prev: number) => number)) => void;
  setGamesPlayed: (value: number) => void;
  setTotalWon: (value: number) => void;
  setNewUsername: (value: string) => void;
  setTotalWagered: (value: number) => void;
  refreshProfile: () => Promise<void>;
  resetLocal: () => void;
}

export const useBoardStore = create<BoardState>()(
  persist(
    (set) => ({
      isModal: false,
      balance: 0,
      newUsername: '',
      gamesPlayed: 0,
      totalWagered: 0,
      totalWon: 0,

      setIsModal: (value) => set({ isModal: value }),

      setBalance: (value) =>
        set((state) => ({
          balance: typeof value === 'function' ? value(state.balance) : value,
        })),

      setTotalWon: (value) => set({ gamesPlayed: value }),

      setGamesPlayed: (value) => set({ gamesPlayed: value }),

      setNewUsername: (value) => set({ newUsername: value }),

      setTotalWagered: (value) => set({ totalWagered: value }),

      refreshProfile: async () => {
        try {
          const data = await getProfile();
          set({
            balance: Number(data.balance),
            gamesPlayed: data.games_played,
            totalWagered: data.total_wagered,
            totalWon: data.total_won,
          });
        } catch {
          console.error('Failed to refresh profile');
        }
      },

      resetLocal: () =>
        set({
          balance: 0,
          gamesPlayed: 0,
          newUsername: '',
          totalWon: 0,
          totalWagered: 0,
        }),
    }),
    {
      name: 'board-storage',
      partialize: (state) => ({
        balance: state.balance,
        gamesPlayed: state.gamesPlayed,
        totalWagered: state.totalWagered,
        totalWon: state.totalWon,
      }),
    },
  ),
);

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { useAuthStore } from '../auth/authStore';
import { getLeaderboard } from './api/leaderBoardApi';
import { getPercentageWin } from './utils/leaderboardHelpers';

export interface LeaderboardPlayer {
  id: string;
  username: string;
  gamesPlayed: number;
  totalWon: number;
  totalWagered: number;
  winPercentage: number;
  rank: number;
  isCurrentUser: boolean;
  isWinner: boolean;
}

interface LeaderboardState {
  players: LeaderboardPlayer[];
  isLoading: boolean;

  fetchLeaderboard: () => Promise<void>;
  getTopPlayers: () => LeaderboardPlayer[];
  getCurrentUserRank: () => number | null;
}

export const useLeaderboardStore = create<LeaderboardState>()(
  persist(
    (set, get) => ({
      players: [],
      isLoading: false,

      fetchLeaderboard: async () => {
        set({ isLoading: true });
        try {
          const data = await getLeaderboard();
          const session = useAuthStore.getState().session;
          const currentUserId = session?.user?.id;

          const processedPlayers: LeaderboardPlayer[] = data
            .map((player, index) => {
              const username = player.username || 'Anonymous';
              const isCurrentUser = player.id === currentUserId;
              const winPercentage = getPercentageWin(player.total_won, player.total_wagered);
              const isWinner = player.total_won > 0;

              return {
                id: player.id,
                username: isCurrentUser ? `${username} (You)` : username,
                gamesPlayed: player.games_played,
                totalWon: player.total_won,
                totalWagered: player.total_wagered,
                winPercentage,
                rank: index + 1,
                isCurrentUser,
                isWinner,
              };
            })
            .filter((p) => {
              const validId = typeof p.id === 'string' && p.id.length > 0;
              const validName = typeof p.username === 'string' && p.username.length > 0;
              const validNumbers = [
                p.gamesPlayed,
                p.totalWon,
                p.totalWagered,
                p.winPercentage,
              ].every((n) => Number.isFinite(n) && n >= 0);
              return validId && validName && validNumbers;
            });

          const top10 = processedPlayers
            .sort((a, b) => b.totalWon - a.totalWon)
            .map((p, idx) => ({ ...p, rank: idx + 1 }))
            .slice(0, 10);

          set({ players: top10, isLoading: false });
        } catch (error) {
          console.error('Failed to fetch leaderboard:', error);
          set({ isLoading: false });
        }
      },

      getTopPlayers: () => {
        const { players } = get();
        return players;
      },

      getCurrentUserRank: () => {
        const { players } = get();
        const session = useAuthStore.getState().session;
        const currentUserId = session?.user?.id;
        const player = players.find((p) => p.id === currentUserId);
        return player ? player.rank : null;
      },
    }),
    {
      name: 'leaderboard-storage',
      partialize: (state) => ({
        players: state.players,
      }),
    },
  ),
);

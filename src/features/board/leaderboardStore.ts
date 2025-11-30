import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { useAuthStore } from '../auth/authStore';
import { getLeaderboard } from './api/boardApi';

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
  loading: boolean;

  fetchLeaderboard: () => Promise<void>;
  getTopPlayers: () => LeaderboardPlayer[];
  getCurrentUserRank: () => number | null;
}

const calculateWinPercentage = (totalWon: number, totalWagered: number): number => {
  if (totalWagered === 0) return 0;
  return Math.round((totalWon / totalWagered) * 100);
};

export const useLeaderboardStore = create<LeaderboardState>()(
  persist(
    (set, get) => ({
      players: [],
      loading: false,

      fetchLeaderboard: async () => {
        set({ loading: true });
        try {
          const data = await getLeaderboard();
          const session = useAuthStore.getState().session;
          const currentUserId = session?.user?.id;

          const processedPlayers: LeaderboardPlayer[] = data.map((player, index) => {
            const username = player.username || 'Anonymous';
            const isCurrentUser = player.id === currentUserId;
            const winPercentage = calculateWinPercentage(player.total_won, player.total_wagered);
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
          });

          const top10 = processedPlayers.slice(0, 10);

          set({ players: top10, loading: false });
        } catch (error) {
          console.error('Failed to fetch leaderboard:', error);
          set({ loading: false });
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

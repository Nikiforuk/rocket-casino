import { useEffect } from 'react';

import { useLeaderboardStore } from '../leaderboardStore';

export const useLeaderboard = () => {
  const fetchLeaderboard = useLeaderboardStore((state) => state.fetchLeaderboard);
  const getTopPlayers = useLeaderboardStore((state) => state.getTopPlayers);
  const getCurrentUserRank = useLeaderboardStore((state) => state.getCurrentUserRank);
  const isLoading = useLeaderboardStore((state) => state.isLoading);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  const players = getTopPlayers();
  const currentUserRank = getCurrentUserRank();

  return { players, currentUserRank, isLoading };
};

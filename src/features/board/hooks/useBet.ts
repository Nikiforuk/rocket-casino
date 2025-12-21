import { useState } from 'react';

import { addWager, addWin } from '../api/amountApi';
import { spendBalance } from '../api/balanceApi';
import { getProfile } from '../api/profileApi';
import { useBoardStore } from '../boardStore';
import { useLeaderboardStore } from '../leaderboardStore';

export const useBet = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setBalance, setGamesPlayed, setTotalWon, setTotalWagered } = useBoardStore();
  const fetchLeaderboard = useLeaderboardStore((state) => state.fetchLeaderboard);

  const startBet = async (amount: number) => {
    const balance = useBoardStore.getState().balance;

    if (amount <= 0) {
      return { success: false, error: 'Enter valid amount' };
    }

    if (amount > balance) {
      return { success: false, error: 'Not enough balance' };
    }

    setIsLoading(true);

    try {
      const ok = await spendBalance(amount);
      if (!ok) {
        return { success: false, error: 'Not enough balance' };
      }

      const profile = await getProfile();
      setGamesPlayed(profile.games_played);
      setTotalWagered(profile.total_wagered);
      setTotalWon(profile.total_won);
      setBalance((prev) => prev - amount);
      await addWager(amount);

      await fetchLeaderboard();

      return { success: true };
    } catch (e) {
      await useBoardStore.getState().refreshProfile();
      return { success: false, error: e instanceof Error ? e.message : 'Unknown error' };
    } finally {
      setIsLoading(false);
    }
  };

  const cashOut = async (profit: number) => {
    try {
      await addWin(profit);
      const profile = await getProfile();
      setGamesPlayed(profile.games_played);
      setTotalWagered(profile.total_wagered);
      setTotalWon(profile.total_won);
      setBalance((prev) => prev + profit);

      await fetchLeaderboard();

      return { success: true };
    } catch (e) {
      await useBoardStore.getState().refreshProfile();
      return { success: false, error: e instanceof Error ? e.message : 'Unknown error' };
    }
  };

  return { startBet, cashOut, isLoading };
};

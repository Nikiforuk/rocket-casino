import { useState } from 'react';

import { spendBalance, addWager, addWin } from '../api/boardApi';
import { useBoardStore } from '../boardStore';

export const useBet = () => {
  const [loading, setLoading] = useState(false);
  const { setBalance } = useBoardStore();

  const startBet = async (amount: number) => {
    const balance = useBoardStore.getState().balance;

    if (amount <= 0) {
      return { success: false, error: 'Enter valid amount' };
    }

    if (amount > balance) {
      return { success: false, error: 'Not enough balance' };
    }

    setLoading(true);

    try {
      const ok = await spendBalance(amount);
      if (!ok) {
        return { success: false, error: 'Not enough balance' };
      }

      setBalance((prev) => prev - amount);
      await addWager(amount);

      return { success: true };
    } catch (e) {
      await useBoardStore.getState().refreshBalance();
      return { success: false, error: e instanceof Error ? e.message : 'Unknown error' };
    } finally {
      setLoading(false);
    }
  };

  const cashOut = async (profit: number) => {
    try {
      await addWin(profit);
      setBalance((prev) => prev + profit);

      return { success: true };
    } catch (e) {
      await useBoardStore.getState().refreshBalance();
      return { success: false, error: e instanceof Error ? e.message : 'Unknown error' };
    }
  };

  return { startBet, cashOut, loading };
};

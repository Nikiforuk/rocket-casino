import { useToast } from '../../../../toast/hooks/useToast';
import { addWager, addWin } from '../../../api/amountApi';
import { spendBalance } from '../../../api/balanceApi';
import { useBoardStore } from '../../../store/boardStore';
import { useLeaderboardStore } from '../../../store/leaderboardStore';

export const useCaseBalance = () => {
  const { showError } = useToast();
  const balance = useBoardStore((state) => state.balance);
  const setBalance = useBoardStore((state) => state.setBalance);
  const refreshProfile = useBoardStore.getState().refreshProfile;
  const refreshLeaderboard = useLeaderboardStore.getState().fetchLeaderboard;

  const canOpen = (price: number) => balance >= price;

  const spendCase = async (price: number) => {
    setBalance((prev) => prev - price);
    try {
      const ok = await spendBalance(price);
      if (!ok) throw new Error('spend failed');
      await addWager(price);
      refreshProfile();
      if (refreshLeaderboard) refreshLeaderboard();
      return true;
    } catch {
      showError('Insufficient balance');
      setBalance((prev) => prev + price);
      return false;
    }
  };

  const applyPrize = async (prize: number) => {
    setBalance((prev) => prev + prize);
    await addWin(prize);
    refreshProfile();
    if (refreshLeaderboard) refreshLeaderboard();
  };

  return { canOpen, spendCase, applyPrize };
};

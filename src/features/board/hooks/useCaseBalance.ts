import { useToast } from '../../toast/useToast';
import { addWager, addWin, spendBalance } from '../api/boardApi';
import { useBoardStore } from '../boardStore';
import { useLeaderboardStore } from '../leaderboardStore';

export const useCaseBalance = () => {
  const { showError } = useToast();
  const balance = useBoardStore((s) => s.balance);
  const setBalance = useBoardStore((s) => s.setBalance);
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

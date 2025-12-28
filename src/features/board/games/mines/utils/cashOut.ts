import { revealAll } from './revealAll';
import { minesCashout } from '../api/minesApi';
import { useMinesStore } from '../store/minesStore';
import { EMinesState } from '../types/mines';

export const cashOut = async () => {
  const { state, gameId, betAmount, currentMultiplier, setState } = useMinesStore.getState();
  if (state !== EMinesState.PLAYING) return { success: false, profit: 0 };
  const total = Math.floor(betAmount * currentMultiplier);
  const profit = total - betAmount;
  try {
    if (gameId) await minesCashout(gameId);
  } catch {
    // local-only fallback
  }
  setState(EMinesState.ENDED);
  revealAll();
  return { success: true, profit, total };
};

import { safeNumber } from '../../../utils/numberHelpers';
import { MINES_CONFIG } from '../constants/mines';

export const computeTotalMultiplier = (
  minesCount: number,
  revealedSafeCount: number,
  rtp: number = MINES_CONFIG.rtp,
): number => {
  const N = MINES_CONFIG.totalTiles;
  const M = minesCount;
  let mult = 1;
  for (let i = 0; i < revealedSafeCount; i++) {
    const totalRemaining = N - i;
    const safeRemaining = N - M - i;
    mult *= totalRemaining / safeRemaining;
  }
  return safeNumber(mult * rtp, 6);
};

export const computeStepMultiplier = (minesCount: number, revealedSafeCount: number): number => {
  const N = MINES_CONFIG.totalTiles;
  const M = minesCount;
  const i = revealedSafeCount;
  const totalRemaining = N - i;
  const safeRemaining = N - M - i;
  return totalRemaining / safeRemaining;
};

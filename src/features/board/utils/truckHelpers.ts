import { EGameState } from '../../../shared/types/board';

export const lockTruck = (
  setUiLocked: (value: boolean) => void,
  setTruckActive: (value: boolean) => void,
) => {
  setUiLocked(true);
  setTruckActive(true);
};

export const unlockTruck = (
  setUiLocked: (value: boolean) => void,
  setTruckActive: (value: boolean) => void,
) => {
  setUiLocked(false);
  setTruckActive(false);
};

export const computePayout = (betAmount: number, multiplier: number) => {
  const total = Math.floor(betAmount * multiplier);
  const profit = total - betAmount;
  return { total, profit };
};

export const beginTruckRound = (
  crashAt: number,
  setGameState: (s: EGameState) => void,
  playAudio: () => void,
  startMultiplier: (crash: number, step: number, fps: number, onCrash: () => void) => void,
  onCrash: () => void,
  lock: () => void,
) => {
  setGameState(EGameState.Accelerating);
  lock();
  playAudio();
  setTimeout(() => {
    setGameState(EGameState.Moving);
    startMultiplier(crashAt, 0.01, 30, onCrash);
  }, 1200);
};

export const makeCrashHandler = (
  setGameState: (s: EGameState) => void,
  stopAudio: () => void,
  unlock: () => void,
  refreshProfile: () => Promise<void> | void,
  refreshLeaderboard: () => void,
) => {
  return () => {
    setGameState(EGameState.Crashed);
    stopAudio();
    unlock();
    Promise.resolve(refreshProfile());
    refreshLeaderboard();
  };
};

export const getTruckButtonText = (isBetting: boolean, gameState: EGameState) => {
  if (isBetting) return 'Starting...';
  if ([EGameState.Accelerating, EGameState.Moving].includes(gameState)) return 'Cash Out';
  if ([EGameState.Crashed, EGameState.Escaped].includes(gameState)) return 'Play Again';
  return 'Start';
};

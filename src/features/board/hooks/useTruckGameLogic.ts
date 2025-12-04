import { useState } from 'react';

import { useBoardStore } from '../boardStore';
import { useLeaderboardStore } from '../leaderboardStore';
import { useBet } from './useBet';
import { useTruckAudio } from './useTruckAudio';
import { useMultiplier } from './useTruckMultiplier';
import { useToast } from '../../../features/toast/useToast';
import { EGameState } from '../../../shared/types/board';
import { generateCrashAt } from '../utils/generateCrashAt';

export const useTruckGameLogic = () => {
  const { startBet, cashOut, isLoading: isBetting } = useBet();
  const { showError } = useToast();
  const setUiLocked = useBoardStore((s) => s.setUiLocked);
  const setTruckActive = useBoardStore((s) => s.setTruckActive);
  const balance = useBoardStore((s) => s.balance);
  const refreshProfile = useBoardStore.getState().refreshProfile;
  const refreshLeaderboard = useLeaderboardStore.getState().fetchLeaderboard;

  const [gameState, setGameState] = useState<EGameState>(EGameState.Idle);
  const [betAmount, setBetAmount] = useState(0);

  const {
    multiplier,
    start: startMultiplier,
    reset: resetMultiplier,
    stop: stopMultiplier,
  } = useMultiplier();
  const { play: playAudio, stop: stopAudio } = useTruckAudio();

  const handleStartBet = async (amount: number) => {
    if (balance < amount) return (showError('Insufficient balance'), false);

    const result = await startBet(amount);
    if (!result.success) return (showError(result.error ?? 'Something went wrong'), false);

    await refreshProfile();
    refreshLeaderboard();

    setBetAmount(amount);
    const crashMultiplier = generateCrashAt();

    setGameState(EGameState.Accelerating);
    setUiLocked(true);
    setTruckActive(true);
    playAudio();

    setTimeout(() => {
      setGameState(EGameState.Moving);
      startMultiplier(crashMultiplier, 0.01, 30, () => {
        setGameState(EGameState.Crashed);
        stopAudio();
        setUiLocked(false);
        setTruckActive(false);
        refreshProfile();
        refreshLeaderboard();
      });
    }, 1200);

    return true;
  };

  const handleCashOut = async () => {
    stopMultiplier();
    stopAudio();
    const totalPayout = Math.floor(betAmount * multiplier);
    const profit = totalPayout - betAmount;
    const result = await cashOut(profit);

    if (!result.success) return (showError(result.error ?? 'Something went wrong'), false);

    setGameState(EGameState.Escaped);
    setUiLocked(false);
    setTruckActive(false);
    await refreshProfile();
    refreshLeaderboard();
    return true;
  };

  const resetGame = () => {
    stopMultiplier();
    stopAudio();
    resetMultiplier();
    setGameState(EGameState.Idle);
    setUiLocked(false);
    setTruckActive(false);
  };

  const getButtonText = () => {
    if (isBetting) return 'Starting...';
    if ([EGameState.Accelerating, EGameState.Moving].includes(gameState)) return 'Cash Out';
    if ([EGameState.Crashed, EGameState.Escaped].includes(gameState)) return 'Play Again';
    return 'Start';
  };

  const isActive = [EGameState.Accelerating, EGameState.Moving].includes(gameState);
  const isCashOutActive = isActive;

  return {
    gameState,
    currentMultiplier: multiplier,
    isBetting,
    isActive,
    isCashOutActive,
    handleStartBet,
    handleCashOut,
    resetGame,
    getButtonText,
  };
};

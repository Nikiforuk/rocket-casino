import { useState } from 'react';

import {
  beginTruckRound,
  makeCrashHandler,
  unlockTruck,
  lockTruck,
  computePayout,
  getTruckButtonText,
} from './truckHelpers';
import { useTruckAudio } from './useTruckAudio';
import { useMultiplier } from './useTruckMultiplier';
import { useToast } from '../../../../toast/hooks/useToast';
import { useBet } from '../../../hooks/useBet';
import { useBoardStore } from '../../../store/boardStore';
import { useLeaderboardStore } from '../../../store/leaderboardStore';
import { EGameState } from '../types/truck';
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

    beginTruckRound(
      crashMultiplier,
      setGameState,
      playAudio,
      startMultiplier,
      makeCrashHandler(
        setGameState,
        stopAudio,
        () => unlockTruck(setUiLocked, setTruckActive),
        refreshProfile,
        refreshLeaderboard,
      ),
      () => lockTruck(setUiLocked, setTruckActive),
    );

    return true;
  };

  const handleCashOut = async () => {
    stopMultiplier();
    stopAudio();
    const { profit } = computePayout(betAmount, multiplier);
    const result = await cashOut(profit);

    if (!result.success) return (showError(result.error ?? 'Something went wrong'), false);

    setGameState(EGameState.Escaped);
    unlockTruck(setUiLocked, setTruckActive);
    await refreshProfile();
    refreshLeaderboard();
    return true;
  };

  const resetGame = () => {
    stopMultiplier();
    stopAudio();
    resetMultiplier();
    setGameState(EGameState.Idle);
    unlockTruck(setUiLocked, setTruckActive);
  };

  const getButtonText = () => getTruckButtonText(isBetting, gameState);

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

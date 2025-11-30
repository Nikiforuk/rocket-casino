import { useState } from 'react';

import { useBet } from './useBet';
import { useClearIntervalOnUnmount } from './useClearIntervalOnUnmount';
import { useToast } from '../../../features/toast/useToast';
import { generateCrashAt } from '../utils/generateCrashAt';

type GameState = 'idle' | 'accelerating' | 'moving' | 'crashed' | 'escaped';

export const useTruckGameLogic = () => {
  const { startBet, cashOut, loading: isBetting } = useBet();
  const { showError } = useToast();
  const [gameState, setGameState] = useState<GameState>('idle');
  const [currentMultiplier, setCurrentMultiplier] = useState(1.0);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [betAmount, setBetAmount] = useState(0);

  useClearIntervalOnUnmount(intervalId);

  const handleStartBet = async (amount: number) => {
    const result = await startBet(amount);
    if (!result.success) {
      showError(result.error ?? 'Something went wrong');
      return false;
    }

    setBetAmount(amount);
    const crashMultiplier = generateCrashAt();
    setCurrentMultiplier(1.0);
    setGameState('accelerating');

    setTimeout(() => {
      setGameState('moving');
      const id = setInterval(() => {
        setCurrentMultiplier((prev) => {
          const next = Number((prev + 0.01).toFixed(2));
          if (next >= crashMultiplier) {
            clearInterval(id);
            setIntervalId(null);
            setGameState('crashed');
            return prev;
          }
          return next;
        });
      }, 30);
      setIntervalId(id);
    }, 1200);

    return true;
  };

  const handleCashOut = async () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    const totalPayout = Math.floor(betAmount * currentMultiplier);
    const profit = totalPayout - betAmount;
    const result = await cashOut(profit);
    if (!result.success) {
      showError(result.error ?? 'Something went wrong');
      return false;
    }
    setGameState('escaped');
    return true;
  };

  const resetGame = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setGameState('idle');
    setCurrentMultiplier(1.0);
  };

  const getButtonText = () => {
    if (isBetting) return 'Starting...';
    if (gameState === 'accelerating' || gameState === 'moving') return 'Cash Out';
    if (gameState === 'crashed' || gameState === 'escaped') return 'Play Again';
    return 'Start';
  };

  const isActive = gameState === 'accelerating' || gameState === 'moving';
  const isCashOutActive = gameState === 'moving' || gameState === 'accelerating';

  return {
    gameState,
    currentMultiplier,
    isBetting,
    isActive,
    isCashOutActive,
    handleStartBet,
    handleCashOut,
    resetGame,
    getButtonText,
  };
};

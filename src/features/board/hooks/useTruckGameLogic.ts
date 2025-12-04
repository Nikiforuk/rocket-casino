import { useEffect, useRef, useState } from 'react';

import { useBet } from './useBet';
import { useClearIntervalOnUnmount } from './useClearIntervalOnUnmount';
import truckEngineMp3 from '../../../assets/audio/truck-engine.mp3';
import { useToast } from '../../../features/toast/useToast';
import { EGameState } from '../../../shared/types/board';
import { useBoardStore } from '../boardStore';
import { generateCrashAt } from '../utils/generateCrashAt';

export const useTruckGameLogic = () => {
  const { startBet, cashOut, isLoading: isBetting } = useBet();
  const { showError } = useToast();
  const setUiLocked = useBoardStore((s) => s.setUiLocked);
  const setTruckActive = useBoardStore((s) => s.setTruckActive);
  const balance = useBoardStore((s) => s.balance);
  const [gameState, setGameState] = useState<EGameState>(EGameState.Idle);
  const [currentMultiplier, setCurrentMultiplier] = useState(1.0);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [betAmount, setBetAmount] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [lockUI, setLockUI] = useState(false);
  const [truckActiveFlag, setTruckActiveFlag] = useState(false);

  useClearIntervalOnUnmount(intervalId);

  const handleStartBet = async (amount: number) => {
    if (balance < amount) {
      showError('Insufficient balance');
      return false;
    }
    const result = await startBet(amount);
    if (!result.success) {
      showError(result.error ?? 'Something went wrong');
      return false;
    }

    setBetAmount(amount);
    const crashMultiplier = generateCrashAt();
    setCurrentMultiplier(1.0);
    setGameState(EGameState.Accelerating);
    setLockUI(true);
    setTruckActiveFlag(true);
    const audio = audioRef.current || new Audio(truckEngineMp3);

    audioRef.current = audio;
    audio.currentTime = 0;
    audio.volume = 0.6;
    audio.play();

    const moving = setTimeout(() => {
      setGameState(EGameState.Moving);
      const id = setInterval(() => {
        setCurrentMultiplier((prev) => {
          const next = Number((prev + 0.01).toFixed(2));
          if (next >= crashMultiplier) {
            clearInterval(id);
            setIntervalId(null);
            setGameState(EGameState.Crashed);
            setLockUI(false);
            setTruckActiveFlag(false);
            if (audioRef.current) {
              try {
                audioRef.current.pause();
              } catch {}
              audioRef.current = null;
            }
            return prev;
          }
          return next;
        });
      }, 30);
      setIntervalId(id);
    }, 1200);

    return () => clearTimeout(moving);
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
    setGameState(EGameState.Escaped);
    setLockUI(false);
    setTruckActiveFlag(false);
    if (audioRef.current) {
      try {
        audioRef.current.pause();
      } catch {}
      audioRef.current = null;
    }
    return true;
  };

  const resetGame = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setGameState(EGameState.Idle);
    setCurrentMultiplier(1.0);
    setLockUI(false);
    setTruckActiveFlag(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
  };

  const getButtonText = () => {
    if (isBetting) return 'Starting...';
    if (gameState === EGameState.Accelerating || gameState === EGameState.Moving) return 'Cash Out';
    if (gameState === EGameState.Crashed || gameState === EGameState.Escaped) return 'Play Again';
    return 'Start';
  };

  const isActive = gameState === EGameState.Accelerating || gameState === EGameState.Moving;
  const isCashOutActive = gameState === EGameState.Moving || gameState === EGameState.Accelerating;

  useEffect(() => {
    setUiLocked(lockUI);
  }, [lockUI, setUiLocked]);

  useEffect(() => {
    setTruckActive(truckActiveFlag);
  }, [setTruckActive, truckActiveFlag]);

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

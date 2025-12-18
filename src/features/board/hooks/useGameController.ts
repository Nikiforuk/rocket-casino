import { useCallback } from 'react';

import { useBoardStore } from '../boardStore';
import { useBet } from './useBet';
import { EMinesState } from '../../../shared/types/mines';
import { useToast } from '../../toast/useToast';
import { useMinesStore } from '../mineStore/minesStore';
import {
  start as engineStart,
  reveal as engineReveal,
  cashOut as engineCashOut,
  end as engineEnd,
} from '../utils/gameEngine';

export const useGameController = () => {
  const setUiLocked = useBoardStore((s) => s.setUiLocked);
  const { startBet, cashOut, isLoading } = useBet();
  const balance = useBoardStore((s) => s.balance);
  const { showError } = useToast();
  const { state, betAmount, minesCount, currentMultiplier, setBetAmount, setMinesCount, setState } =
    useMinesStore();

  const onQuickAmount = useCallback((value: number) => setBetAmount(value), [setBetAmount]);
  const onQuickMines = useCallback((value: number) => setMinesCount(value), [setMinesCount]);

  const onStart = useCallback(async () => {
    if (betAmount <= 0) return showError('Enter valid amount');
    if (balance < betAmount) return showError('Insufficient balance');
    const result = await startBet(betAmount);
    if (!result.success) return showError(result.error ?? 'Something went wrong');
    setUiLocked(true);
    await engineStart(betAmount, minesCount);
  }, [betAmount, minesCount, startBet, setUiLocked]);

  const onReveal = useCallback(
    async (index: number) => {
      if (state !== EMinesState.PLAYING) return;
      await engineReveal(index);
    },
    [state],
  );

  const onCashOut = useCallback(async () => {
    if (state !== EMinesState.PLAYING) return;
    const { success, profit } = await engineCashOut();
    if (!success) return;
    await cashOut(profit);
    setUiLocked(false);
  }, [state, cashOut, setUiLocked]);

  const onNewGame = useCallback(() => {
    engineEnd();
    setState(EMinesState.IDLE);
    setUiLocked(false);
  }, [setState, setUiLocked]);

  const getMainButtonText = () => {
    if (isLoading) return 'Starting...';
    if (state === EMinesState.PLAYING) return 'Cash Out';
    return 'Start Game';
  };

  const isCashOutActive = state === EMinesState.PLAYING && currentMultiplier > 1;

  return {
    state,
    betAmount,
    minesCount,
    currentMultiplier,
    onQuickAmount,
    onQuickMines,
    onStart,
    onReveal,
    onCashOut,
    onNewGame,
    getMainButtonText,
    isLoading,
    isCashOutActive,
    setBetAmount,
  };
};

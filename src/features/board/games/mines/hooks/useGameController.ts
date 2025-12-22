import { useCallback } from 'react';

import { useToast } from '../../../../toast/hooks/useToast';
import { useBet } from '../../../hooks/useBet';
import { useBoardStore } from '../../../store/boardStore';
import { useMinesStore } from '../store/minesStore';
import { EMinesState } from '../types/mines';
import { cashOut as engineCashOut } from '../utils/cashOut';
import { end as engineEnd } from '../utils/end';
import { reveal as engineReveal } from '../utils/reveal';
import { start as engineStart } from '../utils/start';

export const useGameController = () => {
  const setUiLocked = useBoardStore((state) => state.setUiLocked);
  const { startBet, cashOut, isLoading } = useBet();
  const balance = useBoardStore((state) => state.balance);
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
  }, [betAmount, minesCount, startBet, setUiLocked, balance, showError]);

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

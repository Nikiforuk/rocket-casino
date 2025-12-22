import { useState } from 'react';

import { useCaseAnimation } from './useCaseAnimation';
import { useCaseBalance } from './useCaseBalance';
import { useCaseData } from './useCaseData';
import { useBoardStore } from '../../../store/boardStore';
import type CasesItem from '../types/cases';
import {
  DEFAULT_RARITY_ORDER,
  DEFAULT_RARITY_WEIGHTS,
  selectTargetLocalIndex,
} from '../utils/reel';

export const useCaseReel = () => {
  const { iCase, activeCase, items, reelItems, setCaseIndex } = useCaseData();
  const { canOpen, spendCase, applyPrize } = useCaseBalance();
  const { reelRef, trackRef, offset, setOffset, animateTo } = useCaseAnimation();
  const setUiLocked = useBoardStore((s) => s.setUiLocked);

  const [spinning, setSpinning] = useState(false);
  const [winning, setWinning] = useState<CasesItem | null>(null);
  const [splash, setSplash] = useState(true);

  const handleSelectCase = (idx: number) => {
    if (spinning) return;
    setCaseIndex(idx);
    setWinning(null);
    setOffset(0);
  };

  const handleOpen = async () => {
    if (spinning) return;
    const price = Number((activeCase.price || '$0').replace(/[^\d.]/g, ''));
    if (!canOpen(price)) return;
    setSpinning(true);
    setSplash(false);
    setUiLocked(true);
    const ok = await spendCase(price);
    if (!ok) {
      setSpinning(false);
      setUiLocked(false);
      setSplash(true);
      return;
    }
    const targetLocal = selectTargetLocalIndex(items, DEFAULT_RARITY_WEIGHTS, DEFAULT_RARITY_ORDER);
    const targetIndex = items.length * 8 + targetLocal;
    animateTo(items, targetIndex, async (_final, selected) => {
      setWinning(selected);
      setSpinning(false);
      setUiLocked(false);
      const prize = Number(selected.price.replace(/[^\d.]/g, '')) || 0;
      await applyPrize(prize);
    });
  };

  return {
    reelRef,
    trackRef,
    activeCase,
    iCase,
    isSpinning: spinning,
    trackOffset: offset,
    winningItem: winning,
    showSplash: splash,
    items,
    reelItems,
    handleSelectCase,
    handleOpen,
  };
};

import { useCaseAnimation } from './useCaseAnimation';
import { useCaseBalance } from './useCaseBalance';
import { useCaseData } from './useCaseData';
import { useBoardStore } from '../../../store/boardStore';
import { useCasesStore } from '../store/casesStore';
import {
  DEFAULT_RARITY_ORDER,
  DEFAULT_RARITY_WEIGHTS,
  selectTargetLocalIndex,
} from '../utils/reel';

export const useCaseReel = () => {
  const { iCase, activeCase, items, reelItems, setCaseIndex } = useCaseData();
  const { canOpen, spendCase, applyPrize } = useCaseBalance();
  const { reelRef, trackRef, offset, setOffset, animateTo } = useCaseAnimation();
  const setUiLocked = useBoardStore((state) => state.setUiLocked);

  const isSpinning = useCasesStore((state) => state.isSpinning);
  const showSplash = useCasesStore((state) => state.showSplash);
  const winningItem = useCasesStore((state) => state.winningItem);
  const setSpinning = useCasesStore((state) => state.setSpinning);
  const setShowSplash = useCasesStore((state) => state.setShowSplash);
  const setWinningItem = useCasesStore((state) => state.setWinningItem);

  const handleSelectCase = (idx: number) => {
    if (isSpinning) return;
    setCaseIndex(idx);
    setWinningItem(null);
    setOffset(0);
  };

  const handleOpen = async () => {
    if (isSpinning) return;
    const price = Number((activeCase.price || '$0').replace(/[^\d.]/g, ''));
    if (!canOpen(price)) return;
    setSpinning(true);
    setShowSplash(false);
    setUiLocked(true);
    const ok = await spendCase(price);
    if (!ok) {
      setSpinning(false);
      setUiLocked(false);
      setShowSplash(true);
      return;
    }
    const targetLocal = selectTargetLocalIndex(items, DEFAULT_RARITY_WEIGHTS, DEFAULT_RARITY_ORDER);
    const targetIndex = items.length * 8 + targetLocal;
    animateTo(items, targetIndex, async (_finalIndex, selected) => {
      setWinningItem(selected);
      setSpinning(false);
      setUiLocked(false);
      const prize = Number(selected.price.replace(/[^\d.]/g, '')) || 0;
      await applyPrize(prize);
    }, reelItems);
  };

  return {
    reelRef,
    trackRef,
    activeCase,
    iCase,
    isSpinning,
    trackOffset: offset,
    winningItem,
    showSplash,
    items,
    reelItems,
    handleSelectCase,
    handleOpen,
  };
};

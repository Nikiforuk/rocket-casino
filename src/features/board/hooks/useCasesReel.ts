import { useMemo, useRef, useState } from 'react';

import { cases } from '../../../shared/constants/cases';
import { emojis } from '../../../shared/constants/emojis';
import type CasesItem from '../../../shared/types/cases';
import { useToast } from '../../toast/useToast';
import { addWager, addWin, spendBalance } from '../api/boardApi';
import { useBoardStore } from '../boardStore';
import { useLeaderboardStore } from '../leaderboardStore';
import {
  animateToOffset,
  findCenterItem,
  align,
  DEFAULT_RARITY_ORDER,
  DEFAULT_RARITY_WEIGHTS,
  selectTargetLocalIndex,
} from '../utils/reel';
import { createAudio, startTick, stopTick, playChime } from '../utils/reelAudio';

type Item = CasesItem;

export const useCasesReel = () => {
  const reelRef = useRef<HTMLDivElement | null>(null),
    trackRef = useRef<HTMLDivElement | null>(null);
  const [iCase, setICase] = useState(0),
    [spin, setSpin] = useState(false),
    [offset, setOffset] = useState(0);
  const [win, setWin] = useState<Item | null>(null),
    [showSplash, setShowSplash] = useState(true);
  const audioRef = useRef<AudioContext | null>(null);
  const tickRef = useRef<number | null>(null);
  const activeCase = cases[iCase];
  const setBalance = useBoardStore((s) => s.setBalance);
  const setUiLocked = useBoardStore((s) => s.setUiLocked);
  const balance = useBoardStore((s) => s.balance);
  const refreshProfile = useBoardStore.getState().refreshProfile;
  const refreshLeaderboard = useLeaderboardStore.getState().fetchLeaderboard;
  const { showError } = useToast();
  const type = useMemo(
    () =>
      activeCase.name.startsWith('Animal')
        ? 'animal'
        : activeCase.name.startsWith('Space')
          ? 'space'
          : activeCase.name.startsWith('Food')
            ? 'food'
            : 'sports',
    [activeCase],
  );
  const items = useMemo(() => emojis.filter((e) => e.caseType === type), [type]);
  const reelItems = useMemo(() => Array.from({ length: 20 }).flatMap(() => items), [items]);
  const handleSelectCase = (idx: number) => {
    if (spin) return;
    setICase(idx);
    setOffset(0);
    setWin(null);
    if (trackRef.current) trackRef.current.style.transform = 'translateX(0px)';
  };
  const handleOpen = () => {
    if (spin) return;
    const casePrice = Number((activeCase.price || '$0').replace(/[^\d.]/g, ''));
    if (balance < casePrice) {
      showError('Insufficient balance');
      return;
    }
    setSpin(true);
    setShowSplash(false);
    setUiLocked(true);
    const cw = reelRef.current?.clientWidth ?? 610;
    const sample = reelRef.current?.querySelector('[data-role="reel-item"]') as HTMLElement | null;
    const sw = sample?.getBoundingClientRect().width ?? 130;
    const strideNow = sw + 16;
    const base = items.length * 3 * strideNow;
    setOffset(base);
    const targetLocal = selectTargetLocalIndex(items, DEFAULT_RARITY_WEIGHTS, DEFAULT_RARITY_ORDER);
    const target = items.length * 8 + targetLocal;
    const targetOffset = align(cw, strideNow, sw, target);
    setBalance((prev) => prev - casePrice);
    spendBalance(casePrice)
      .then(async (ok) => {
        if (!ok) {
          showError('Insufficient balance');
          setSpin(false);
          setUiLocked(false);
          setBalance((prev) => prev + casePrice);
          return;
        }
        await addWager(casePrice);
        refreshProfile();
        refreshLeaderboard();
      })
      .catch(() => {
        showError('Balance error');
        setBalance((prev) => prev + casePrice);
      });
    const ac = audioRef.current || (audioRef.current = createAudio());
    tickRef.current = startTick(ac);
    animateToOffset(trackRef, base, targetOffset, 2200, () => {
      setOffset(targetOffset);
      const selected = findCenterItem(reelRef, items);
      setWin(selected);
      setSpin(false);
      setUiLocked(false);
      stopTick(tickRef.current);
      if (audioRef.current) playChime(audioRef.current);
      const prize = Number(selected.price.replace(/[^\d.]/g, '') || 0);
      addWin(prize).finally(() => {
        refreshProfile();
        refreshLeaderboard();
      });
      setBalance((prev) => prev + prize);
    });
  };
  return {
    reelRef,
    trackRef,
    activeCase,
    iCase,
    isSpinning: spin,
    trackOffset: offset,
    winningItem: win,
    items,
    reelItems,
    showSplash,
    handleSelectCase,
    handleOpen,
  };
};

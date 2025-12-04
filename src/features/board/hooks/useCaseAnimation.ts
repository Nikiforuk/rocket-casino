import { useRef, useState } from 'react';

import type CasesItem from '../../../shared/types/cases';
import { align, findCenterItem } from '../utils/reel';
import { createAudio, playChime, startTick, stopTick } from '../utils/reelAudio';

export const useCaseAnimation = () => {
  const reelRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(0);

  const animateTo = (
    items: CasesItem[],
    targetIndex: number,
    onDone: (finalOffset: number, selected: CasesItem) => void,
  ) => {
    const ac = createAudio();
    const tickId = startTick(ac);
    const cw = reelRef.current?.clientWidth ?? 610;
    const sample = reelRef.current?.querySelector('[data-role="reel-item"]') as HTMLElement | null;
    const sw = sample?.getBoundingClientRect().width ?? 130;
    const stride = sw + 16;
    const base = items.length * 3 * stride;
    setOffset(base);
    const targetOffset = align(cw, stride, sw, targetIndex);

    const start = performance.now();
    const total = 2200;
    const step = (t: number) => {
      const p = Math.min(Math.max((t - start) / total, 0), 1);
      const next = base + (targetOffset - base) * (1 - Math.pow(1 - p, 3));
      if (trackRef.current) trackRef.current.style.transform = `translateX(-${next}px)`;
      if (p >= 1) {
        const selected = findCenterItem(reelRef, items);
        setOffset(targetOffset);
        onDone(targetOffset, selected);
        stopTick(tickId);
        playChime(ac);
        return;
      }
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  return { reelRef, trackRef, offset, setOffset, animateTo };
};

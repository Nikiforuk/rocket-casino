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
    const easeInQuad = (x: number) => x * x;
    const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
    const piecewise = (p: number) => {
      const w1 = 0.2;
      const w2 = 0.6;
      const w3 = 0.2;
      if (p <= w1) {
        const x = p / w1;
        return easeInQuad(x) * w1;
      }
      if (p <= w1 + w2) {
        const x = (p - w1) / w2;
        return w1 + x * w2;
      }
      const x = (p - w1 - w2) / w3;
      return w1 + w2 + easeOutCubic(x) * w3;
    };
    const step = (t: number) => {
      const p = Math.min(Math.max((t - start) / total, 0), 1);
      const progress = piecewise(p);
      const next = base + (targetOffset - base) * progress;
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

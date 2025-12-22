import { useRef, useState } from 'react';

import type CasesItem from '../types/cases';
import { align } from '../utils/reel';
import { createAudio, startTick, playChime } from '../utils/reelAudio';

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
    const tickController = startTick(ac, 5);

    const cw = reelRef.current?.clientWidth ?? 610;
    const sample = reelRef.current?.querySelector('[data-role="reel-item"]') as HTMLElement | null;
    const sw = sample?.getBoundingClientRect().width ?? 130;
    const stride = sw + 16;

    const base = items.length * 3 * stride;
    setOffset(base);

    const targetOffset = align(cw, stride, sw, targetIndex);

    const start = performance.now();
    const total = 5000;

    const easeFastStartSlowEnd = (x: number) => 1 - Math.pow(1 - x, 3);

    const step = (t: number) => {
      const p = Math.min(Math.max((t - start) / total, 0), 1);
      const progress = easeFastStartSlowEnd(p);
      const next = base + (targetOffset - base) * progress;

      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(-${next}px)`;
      }

      const centerIndex = Math.round(next / stride) % items.length;
      const selected = items[centerIndex];

      setOffset(next);

      if (p >= 1) {
        onDone(next, selected);
        tickController.stop();
        playChime(ac);
        return;
      }

      requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  return { reelRef, trackRef, offset, setOffset, animateTo };
};

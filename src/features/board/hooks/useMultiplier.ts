import { useEffect, useRef, useState } from 'react';

import { MINES_CONFIG } from '../games/mines/constants/mines';
import { useMinesStore } from '../games/mines/store/minesStore';

export const useMultiplier = () => {
  const target = useMinesStore((s) => s.currentMultiplier);
  const [animated, setAnimated] = useState(target);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const fromRef = useRef(target);

  useEffect(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const duration = MINES_CONFIG.animations.multiplierDurationMs;
    fromRef.current = animated;
    startRef.current = null;
    const step = (ts: number) => {
      if (startRef.current == null) startRef.current = ts;
      const p = Math.min(1, (ts - startRef.current) / duration);
      const next = fromRef.current + (target - fromRef.current) * p;
      setAnimated(Number(next.toFixed(6)));
      if (p < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target]);

  return { multiplier: animated };
};

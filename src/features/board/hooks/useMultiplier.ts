import { useEffect, useRef, useState } from 'react';

import { MINES_CONFIG } from '../games/mines/constants/mines';
import { useMinesStore } from '../games/mines/store/minesStore';

export const useMultiplier = () => {
  const target = useMinesStore((state) => state.currentMultiplier);
  const [animated, setAnimated] = useState(target);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const fromRef = useRef(target);

  useEffect(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const duration = MINES_CONFIG.animations.multiplierDurationMs;
    fromRef.current = animated;
    startRef.current = null;
    const step = (timestamp: number) => {
      if (startRef.current == null) startRef.current = timestamp;
      const progress = Math.min(1, (timestamp - startRef.current) / duration);
      const next = fromRef.current + (target - fromRef.current) * progress;
      setAnimated(Number(next.toFixed(6)));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [animated, target]);

  return { multiplier: animated };
};

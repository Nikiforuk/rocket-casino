import { useState } from 'react';

import { useClearIntervalOnUnmount } from './useClearIntervalOnUnmount';

export const useMultiplier = () => {
  const [multiplier, setMultiplier] = useState(1);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  useClearIntervalOnUnmount(intervalId);

  const start = (target: number, step = 0.01, interval = 30, onCrash?: () => void) => {
    const id = setInterval(() => {
      setMultiplier((prev) => {
        const next = +(prev + step).toFixed(2);
        if (next >= target) {
          clearInterval(id);
          setIntervalId(null);
          onCrash?.();
          return prev;
        }
        return next;
      });
    }, interval);
    setIntervalId(id);
  };

  const stop = () => {
    if (intervalId) clearInterval(intervalId);
    setIntervalId(null);
  };

  const reset = () => {
    stop();
    setMultiplier(1);
  };

  return { multiplier, start, stop, reset };
};

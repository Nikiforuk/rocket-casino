import { useEffect } from 'react';

export const useClearIntervalOnUnmount = (intervalId: number | null) => {
  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);
};

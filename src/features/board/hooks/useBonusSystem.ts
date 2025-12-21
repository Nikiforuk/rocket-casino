import { useEffect, useState } from 'react';

import { useToast } from '../../../features/toast/useToast';
import { addBalance } from '../api/balanceApi';
import { useBoardStore } from '../boardStore';

const BONUS_AMOUNT = 10;
const BONUS_INTERVAL_MS = 60 * 1000;

export const useBonusSystem = () => {
  const { refreshProfile } = useBoardStore();
  const { showSuccess, showError } = useToast();
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isClaiming, setIsClaiming] = useState(false);

  useEffect(() => {
    const lastClaimTime = localStorage.getItem('lastBonusClaimTime');
    const now = Date.now();

    if (lastClaimTime) {
      const timeSinceLastClaim = now - parseInt(lastClaimTime, 10);
      const remaining = Math.max(0, BONUS_INTERVAL_MS - timeSinceLastClaim);
      setTimeRemaining(remaining);
    } else {
      setTimeRemaining(0);
    }

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) return 0;
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const claimBonus = async () => {
    if (timeRemaining > 0 || isClaiming) {
      return;
    }

    setIsClaiming(true);

    try {
      await addBalance(BONUS_AMOUNT);
      await refreshProfile();
      localStorage.setItem('lastBonusClaimTime', Date.now().toString());
      setTimeRemaining(BONUS_INTERVAL_MS);
      showSuccess(`Successfully claimed $${BONUS_AMOUNT} bonus!`);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to claim bonus';
      showError(errorMsg);
    } finally {
      setIsClaiming(false);
    }
  };

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return {
    timeRemaining,
    canClaim: timeRemaining === 0,
    formattedTime: formatTime(timeRemaining),
    claimBonus,
    isClaiming,
  };
};

import { safeNumber } from '../../../utils/numberHelpers';

export const generateCrashAt = () => {
  const r = Math.random();
  return safeNumber(1 / (1 - r), 2);
};

export const generateCrashAt = () => {
  const r = Math.random();
  return Number((1 / (1 - r)).toFixed(2));
};

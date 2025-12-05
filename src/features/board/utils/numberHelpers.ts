export const formatNumber = (value: number | string | null | undefined, decimals = 2): string => {
  if (value === null || value === undefined) return '0';

  const num = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(num)) return '0';

  return num.toFixed(decimals);
};

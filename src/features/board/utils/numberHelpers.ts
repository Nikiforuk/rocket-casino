export const formatNumber = (value: number | string | null | undefined, decimals = 2): string => {
  if (value === null || value === undefined) return '0';

  const num = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(num)) return '0';

  return num.toFixed(decimals);
};

export const safeNumber = (value: number | null | undefined, decimals = 2): number => {
  if (value === null || value === undefined || isNaN(value)) return 0;
  return Number(value.toFixed(decimals));
};

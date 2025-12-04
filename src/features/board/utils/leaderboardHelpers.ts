export const getPercentageWin = (total_won: number, total_wagered: number) => {
  if (total_wagered === 0) return 0;
  const winPercentage = Math.round((total_won / total_wagered) * 100);
  return Math.min(winPercentage, 100);
};

import { BOARD_WIDTH } from '../constants/plinko';

export interface Peg {
  x: number;
  y: number;
}

/**
 * Creates a peg layout that matches the number of multipliers.
 * The pyramid structure ensures the bottom row has (lines) pegs,
 * which creates (lines) slots for multipliers.
 *
 * @param height - Board height
 * @param lines - Number of multipliers/bottom row pegs (3-16)
 */
export const createPegLayout = (height: number, lines: number = 9): Peg[] => {
  const numLines = Math.max(3, Math.min(16, lines));

  const rows: number[] = [];
  for (let i = 3; i <= numLines; i++) {
    rows.push(i);
  }

  const verticalPadding = 30;
  const topOffset = 60;
  const rowGap = (height - verticalPadding - topOffset) / (rows.length + 2);
  const pegs: Peg[] = [];

  const maxCount = Math.max(...rows);
  const hSpacing = BOARD_WIDTH / (maxCount + 1);
  const centerX = BOARD_WIDTH / 2;

  rows.forEach((count, rowIndex) => {
    const y = topOffset + (rowIndex + 1) * rowGap;
    const half = (count - 1) / 2;
    for (let i = 0; i < count; i++) {
      const x = centerX + (i - half) * hSpacing;
      pegs.push({ x, y });
    }
  });

  return pegs;
};

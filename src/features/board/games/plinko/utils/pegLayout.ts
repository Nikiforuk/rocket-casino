import { BOARD_WIDTH, PEG_ROWS } from '../constants/plinko';

export interface Peg {
  x: number;
  y: number;
}

export const createPegLayout = (height: number): Peg[] => {
  const rows = PEG_ROWS;
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

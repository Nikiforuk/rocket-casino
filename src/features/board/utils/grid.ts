import { MINES_CONFIG } from '../../../shared/constants/config';
import { EMinesTileStatus, type MinesGrid } from '../../../shared/types/mines';

export const createGrid = (): MinesGrid =>
  Array.from({ length: MINES_CONFIG.totalTiles }, (_, i) => ({
    index: i,
    status: EMinesTileStatus.HIDDEN,
  }));

export const revealTile = (grid: MinesGrid, index: number, isMine: boolean): MinesGrid =>
  grid.map((t) =>
    t.index === index
      ? { ...t, status: isMine ? EMinesTileStatus.MINE : EMinesTileStatus.SAFE }
      : t,
  );

export const countRevealedSafe = (grid: MinesGrid): number =>
  grid.reduce((acc, t) => (t.status === EMinesTileStatus.SAFE ? acc + 1 : acc), 0);

export const calcSafeTilesLeft = (minesCount: number, revealedSafeCount: number): number =>
  MINES_CONFIG.totalTiles - minesCount - revealedSafeCount;

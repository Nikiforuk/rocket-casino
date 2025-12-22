import { MINES_CONFIG } from '../constants/mines';
import { EMinesTileStatus, type MinesGrid } from '../types/mines';

export const createGrid = (): MinesGrid =>
  Array.from({ length: MINES_CONFIG.totalTiles }, (_, index) => ({
    index,
    status: EMinesTileStatus.HIDDEN,
  }));

export const revealTile = (grid: MinesGrid, index: number, isMine: boolean): MinesGrid =>
  grid.map((tile) =>
    tile.index === index
      ? { ...tile, status: isMine ? EMinesTileStatus.MINE : EMinesTileStatus.SAFE }
      : tile,
  );

export const countRevealedSafe = (grid: MinesGrid): number =>
  grid.reduce(
    (safeCount, tile) => (tile.status === EMinesTileStatus.SAFE ? safeCount + 1 : safeCount),
    0,
  );

export const calcSafeTilesLeft = (minesCount: number, revealedSafeCount: number): number =>
  MINES_CONFIG.totalTiles - minesCount - revealedSafeCount;

import { MINES_CONFIG } from '../constants/mines';
import { useMinesStore } from '../store/minesStore';
import { EMinesTileStatus } from '../types/mines';

export const revealAll = () => {
  const { minesPositions, setGrid, setSafeTilesLeft } = useMinesStore.getState();
  const total = MINES_CONFIG.totalTiles;
  const mines = new Set(minesPositions ?? []);
  const all = Array.from({ length: total }, (_, i) => ({
    index: i,
    status: mines.has(i) ? EMinesTileStatus.MINE : EMinesTileStatus.SAFE,
  }));
  setGrid(all);
  setSafeTilesLeft(0);
};

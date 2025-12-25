import { revealTile, calcSafeTilesLeft, countRevealedSafe } from './grid';
import { computeTotalMultiplier } from './multiplier';
import { revealAll } from './revealAll';
import { minesReveal } from '../api/minesApi';
import { useMinesStore } from '../store/minesStore';
import { EMinesState, EMinesTileStatus } from '../types/mines';

export const reveal = async (tileIndex: number) => {
  const {
    state,
    grid,
    minesCount,
    betAmount,
    gameId,
    minesPositions,
    setGrid,
    setTileStatus,
    setState,
    setMultiplier,
    setCurrentValue,
    setSafeTilesLeft,
  } = useMinesStore.getState();

  if (state !== EMinesState.PLAYING) return;
  const current = grid.find((t) => t.index === tileIndex);
  if (!current || current.status !== EMinesTileStatus.HIDDEN) return;

  let mined = false;
  try {
    if (gameId) {
      const data = await minesReveal(gameId, tileIndex);
      mined = Boolean((data as { mined?: boolean }).mined);
    } else {
      mined = Boolean(minesPositions?.includes(tileIndex));
    }
  } catch {
    mined = Boolean(minesPositions?.includes(tileIndex));
  }

  const nextGrid = revealTile(grid, tileIndex, mined);
  setGrid(nextGrid);
  setTileStatus(tileIndex, mined ? EMinesTileStatus.MINE : EMinesTileStatus.SAFE);

  if (mined) {
    setState(EMinesState.LOST);
    setMultiplier(1);
    setCurrentValue(0);
    setSafeTilesLeft(calcSafeTilesLeft(minesCount, countRevealedSafe(nextGrid)));
    revealAll();
    return;
  }

  const mult = computeTotalMultiplier(minesCount, countRevealedSafe(nextGrid));
  setMultiplier(mult);
  setCurrentValue(Number((betAmount * mult).toFixed(6)));
  setSafeTilesLeft(calcSafeTilesLeft(minesCount, countRevealedSafe(nextGrid)));
};

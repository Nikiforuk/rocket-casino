import { createGrid, revealTile, countRevealedSafe, calcSafeTilesLeft } from './grid';
import { computeTotalMultiplier } from './multiplier';
import { pickUniqueIndices } from './rng';
import { MINES_CONFIG } from '../../../shared/constants/config';
import { EMinesState, EMinesTileStatus } from '../../../shared/types/mines';
import { minesCashout, minesReveal, minesStart } from '../api/minesApi';
import { useMinesStore } from '../mineStore/minesStore';

export const start = async (betAmount: number, minesCount: number, clientSeed?: string) => {
  const {
    setState,
    setBetAmount,
    setMinesCount,
    setGrid,
    setGameId,
    setMinesPositions,
    setClientSeed,
    setMultiplier,
    setCurrentValue,
    setSafeTilesLeft,
  } = useMinesStore.getState();

  setBetAmount(betAmount);
  setMinesCount(minesCount);
  setGrid(createGrid());
  setMultiplier(1);
  setCurrentValue(betAmount);
  setSafeTilesLeft(MINES_CONFIG.totalTiles - minesCount);

  const seed = clientSeed ?? String(Date.now());
  setClientSeed(seed);
  setMinesPositions(pickUniqueIndices(minesCount, MINES_CONFIG.totalTiles, seed));

  try {
    const data = await minesStart(betAmount, minesCount, seed);
    const gameId = (data as { game_id?: string }).game_id ?? String(data);
    setGameId(gameId);
  } catch {
    setGameId(null);
  }

  setState(EMinesState.PLAYING);
};

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
  let revealedSafeCount = countRevealedSafe(grid);
  try {
    if (gameId) {
      const data = await minesReveal(gameId, tileIndex);
      mined = Boolean((data as { mined?: boolean }).mined);
      revealedSafeCount =
        (data as { revealed_safe_count?: number }).revealed_safe_count ??
        revealedSafeCount + (mined ? 0 : 1);
    } else {
      mined = Boolean(minesPositions?.includes(tileIndex));
      revealedSafeCount = revealedSafeCount + (mined ? 0 : 1);
    }
  } catch {
    mined = Boolean(minesPositions?.includes(tileIndex));
    revealedSafeCount = revealedSafeCount + (mined ? 0 : 1);
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

export const cashOut = async () => {
  const { state, gameId, betAmount, currentMultiplier, setState } = useMinesStore.getState();
  if (state !== EMinesState.PLAYING) return { success: false, profit: 0 };
  const total = Math.floor(betAmount * currentMultiplier);
  const profit = total - betAmount;
  try {
    if (gameId) await minesCashout(gameId);
  } catch {
    // local-only fallback
  }
  setState(EMinesState.ENDED);
  revealAll();
  return { success: true, profit, total };
};

export const end = () => {
  useMinesStore.getState().reset();
};

const revealAll = () => {
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

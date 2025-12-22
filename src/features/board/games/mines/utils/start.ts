import { createGrid } from './grid';
import { pickUniqueIndices } from './rng';
import { minesStart } from '../api/minesApi';
import { MINES_CONFIG } from '../constants/mines';
import { useMinesStore } from '../store/minesStore';
import { EMinesState } from '../types/mines';

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

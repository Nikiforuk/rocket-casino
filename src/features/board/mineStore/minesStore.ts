import { create } from 'zustand';

import { MINES_CONFIG } from '../../../shared/constants/config';
import { EMinesState, EMinesTileStatus, type MinesGrid } from '../../../shared/types/mines';

interface MinesState {
  state: EMinesState;
  betAmount: number;
  minesCount: number;
  grid: MinesGrid;
  revealedSafeCount: number;
  currentMultiplier: number;
  currentValue: number;
  safeTilesLeft: number;
  gameId: string | null;
  minesPositions: number[] | null;
  clientSeed: string | null;

  setBetAmount: (value: number) => void;
  setMinesCount: (value: number) => void;
  setGrid: (grid: MinesGrid) => void;
  setTileStatus: (index: number, status: EMinesTileStatus) => void;
  setState: (value: EMinesState) => void;
  setGameId: (id: string | null) => void;
  setMinesPositions: (indices: number[] | null) => void;
  setClientSeed: (seed: string | null) => void;
  setMultiplier: (value: number) => void;
  setCurrentValue: (value: number) => void;
  setSafeTilesLeft: (value: number) => void;
  reset: () => void;
}

const createEmptyGrid = (): MinesGrid =>
  Array.from({ length: MINES_CONFIG.totalTiles }, (_, i) => ({
    index: i,
    status: EMinesTileStatus.HIDDEN,
  }));

export const useMinesStore = create<MinesState>((set, get) => ({
  state: EMinesState.IDLE,
  betAmount: 0,
  minesCount: MINES_CONFIG.allowedMines[0],
  grid: createEmptyGrid(),
  revealedSafeCount: 0,
  currentMultiplier: 1,
  currentValue: 0,
  safeTilesLeft: MINES_CONFIG.totalTiles - MINES_CONFIG.allowedMines[0],
  gameId: null,
  minesPositions: null,
  clientSeed: null,

  setBetAmount: (value) => set({ betAmount: value }),
  setMinesCount: (value) =>
    set({ minesCount: value, safeTilesLeft: MINES_CONFIG.totalTiles - value }),

  setGrid: (grid) => set({ grid }),

  setTileStatus: (index, status) =>
    set((state) => ({
      grid: state.grid.map((t) => (t.index === index ? { ...t, status } : t)),
      revealedSafeCount:
        status === EMinesTileStatus.SAFE ? state.revealedSafeCount + 1 : state.revealedSafeCount,
    })),

  setState: (value) => set({ state: value }),
  setGameId: (id) => set({ gameId: id }),
  setMinesPositions: (indices) => set({ minesPositions: indices }),
  setClientSeed: (seed) => set({ clientSeed: seed }),
  setMultiplier: (value) => set({ currentMultiplier: value }),
  setCurrentValue: (value) => set({ currentValue: value }),
  setSafeTilesLeft: (value) => set({ safeTilesLeft: value }),

  reset: () =>
    set({
      state: EMinesState.IDLE,
      grid: createEmptyGrid(),
      revealedSafeCount: 0,
      currentMultiplier: 1,
      currentValue: 0,
      safeTilesLeft: MINES_CONFIG.totalTiles - get().minesCount,
      gameId: null,
      minesPositions: null,
    }),
}));

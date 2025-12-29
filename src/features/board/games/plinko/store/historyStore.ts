import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface BallResult {
  landedIndex: number;
  multiplier: number;
}

export interface PlinkoHistoryEntry {
  id: string;
  ts: number;
  risk: 'Low' | 'Medium' | 'High';
  lines: number;
  ballsCount: number;
  betAmount: number;
  ballResults: BallResult[];
  totalMultiplier: number;
  totalWin: number;
}

interface PlinkoHistoryState {
  entries: PlinkoHistoryEntry[];
  add: (entry: PlinkoHistoryEntry) => void;
  clear: () => void;
}

export const usePlinkoHistoryStore = create<PlinkoHistoryState>()(
  persist(
    (set) => ({
      entries: [],
      add: (entry) => set((s) => ({ entries: [entry, ...s.entries].slice(0, 100) })),
      clear: () => set({ entries: [] }),
    }),
    { name: 'plinko_history' },
  ),
);

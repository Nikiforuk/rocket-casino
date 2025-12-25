import { create } from 'zustand';

import type CasesItem from '../types/cases';

interface CasesState {
  caseIndex: number;
  isSpinning: boolean;
  showSplash: boolean;
  winningItem: CasesItem | null;
  setCaseIndex: (index: number) => void;
  setSpinning: (value: boolean) => void;
  setShowSplash: (value: boolean) => void;
  setWinningItem: (item: CasesItem | null) => void;
  reset: () => void;
}

export const useCasesStore = create<CasesState>()((set) => ({
  caseIndex: 0,
  isSpinning: false,
  showSplash: true,
  winningItem: null,
  setCaseIndex: (index) => set({ caseIndex: index }),
  setSpinning: (value) => set({ isSpinning: value }),
  setShowSplash: (value) => set({ showSplash: value }),
  setWinningItem: (item) => set({ winningItem: item }),
  reset: () => set({ isSpinning: false, showSplash: true, winningItem: null }),
}));

import { create } from 'zustand';

import { EGameState } from '../types/truck';

interface CrashState {
  isActive: boolean;
  gameState: EGameState;
  setActive: (value: boolean) => void;
  setGameState: (state: EGameState) => void;
}

export const useCrashStore = create<CrashState>()((set) => ({
  isActive: false,
  gameState: EGameState.Idle,
  setActive: (value) => set({ isActive: value }),
  setGameState: (state) => set({ gameState: state }),
}));

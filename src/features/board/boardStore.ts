import { create } from 'zustand';

interface BoardState {
  isModal: boolean;
  setIsModal: (isModal: boolean) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  isModal: false,
  setIsModal: (isModal: boolean) => set({ isModal }),
}));

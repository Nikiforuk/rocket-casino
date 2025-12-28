import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
}

export const useModalStore = create<ModalState>()((set) => ({
  isOpen: false,
  setOpen: (value) => set({ isOpen: value }),
}));

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type ToastType = 'error' | 'success' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastStore {
  toasts: Toast[];
  showToast: (message: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>()(
  immer((set) => ({
    toasts: [],
    showToast: (message: string, type: ToastType = 'error') => {
      const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
      set((state) => {
        state.toasts.push({ id, message, type });
      });

      setTimeout(() => {
        set((state) => {
          const index = state.toasts.findIndex((toast: { id: string }) => toast.id === id);
          if (index !== -1) state.toasts.splice(index, 1);
        });
      }, 5000);
    },
    removeToast: (id: string) => {
      set((state) => {
        const index = state.toasts.findIndex((toast: { id: string }) => toast.id === id);
        if (index !== -1) state.toasts.splice(index, 1);
      });
    },
  })),
);

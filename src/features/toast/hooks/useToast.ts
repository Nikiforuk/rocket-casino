import { useToastStore } from '../store/toastStore';

export const useToast = () => {
  const showToast = useToastStore((state) => state.showToast);

  return {
    showError: (message: string) => showToast(message, 'error'),
    showSuccess: (message: string) => showToast(message, 'success'),
    showInfo: (message: string) => showToast(message, 'info'),
  };
};

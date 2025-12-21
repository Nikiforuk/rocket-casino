import { resetProfile } from '../api/profileApi';
import { useBoardStore } from '../../board/store/boardStore';
import { useToast } from '../../toast/useToast';

export const useResetProfile = () => {
  const { showError, showSuccess } = useToast();
  const { resetLocal } = useBoardStore();

  const handleReset = async () => {
    try {
      await resetProfile();
      resetLocal();
      showSuccess('Profile has been reset successfully!');
    } catch (e) {
      showError(e instanceof Error ? e.message : 'Failed to reset profile');
    }
  };

  return { handleReset };
};

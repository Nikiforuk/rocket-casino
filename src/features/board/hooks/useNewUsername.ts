import { useState } from 'react';

import { supabase } from '../../../app/supabaseClient';
import { useAuthStore } from '../../auth/store/authStore';
import { updateUsername } from '../../modal/api/profileApi';
import { useToast } from '../../toast/hooks/useToast';

export const useNewUsername = () => {
  const session = useAuthStore((state) => state.session);
  const setSession = useAuthStore((state) => state.setSession);
  const { showSuccess, showError } = useToast();
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleNewUsername = async (newUsername: string) => {
    if (!session?.user?.id) {
      setErrorMessage('Session not found');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    const result = await updateUsername(newUsername, session.user.id);

    if (result.success) {
      const { data } = await supabase.auth.refreshSession();
      if (data.session) {
        setSession(data.session);
      }
      setErrorMessage('');
      showSuccess('Username updated successfully!');
    } else {
      const errorMsg = result.error?.message || 'Failed to update username';
      setErrorMessage(errorMsg);
      showError(errorMsg);
    }

    setIsLoading(false);
  };

  return { errorMessage, isLoading, handleNewUsername };
};

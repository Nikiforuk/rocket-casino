import { useState } from 'react';

import { supabase } from '../../../app/supabaseClient';
import { useToast } from '../../../features/toast/useToast';
import { useAuthStore } from '../../auth/authStore';
import { updateUsername } from '../api/boardApi';

export const useNewUsername = () => {
  const session = useAuthStore((state) => state.session);
  const setSession = useAuthStore((state) => state.setSession);
  const { showSuccess, showError } = useToast();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNewUsername = async (newUsername: string) => {
    if (!session?.user?.id) {
      setErrorMessage('Session not found');
      return;
    }

    setLoading(true);
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

    setLoading(false);
  };

  return { errorMessage, loading, handleNewUsername };
};

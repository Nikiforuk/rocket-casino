import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../../app/routes';
import { loginUser } from '../api/authApi';
import { useAuthStore } from '../authStore';

export const useSignIn = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);

  const handleSignIn = async (email: string, password: string) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const result = await loginUser(email, password);
      if (result.success && result.data) {
        setUser({ email, username: null });
        navigate(ROUTES.BOARD);
      } else if (result.error) {
        setErrorMessage(result.error.message);
      }
    } catch (err) {
      setErrorMessage('Unexpected error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  return { errorMessage, isLoading, handleSignIn };
};

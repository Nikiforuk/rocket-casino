import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../../app/routes';
import { signupUser } from '../api/authApi';
import { useAuthStore } from '../store/authStore';

export const useSignUp = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSignUp = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const result = await signupUser(username, email, password);
      if (result.success && result.data) {
        setUser({ username, email });
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
  return { isLoading, errorMessage, handleSignUp };
};

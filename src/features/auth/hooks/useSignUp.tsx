import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../../app/routes';
import { signupUser } from '../api/authApi';
import { useAuthStore } from '../authStore';

export const useSignUp = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSignUp = async (username: string, email: string, password: string) => {
    setLoading(true);
    setErrorMessage('');

    try {
      const result = await signupUser(username, email, password);

      if (result.success && result.data) {
        setUser({
          username,
          email,
        });

        navigate(ROUTES.HOME);
      } else if (result.error) {
        setErrorMessage(result.error.message);
      }
    } catch (err) {
      console.log(err);
      setErrorMessage('Unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { loading, errorMessage, handleSignUp };
};

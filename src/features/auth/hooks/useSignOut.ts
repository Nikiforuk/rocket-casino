import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../../app/routes';
import { signOut } from '../api/authApi';
import { useAuthStore } from '../authStore';

export const useSignOut = () => {
  const navigate = useNavigate();
  const { setSession } = useAuthStore();

  const handleSignOut = async () => {
    try {
      await signOut();
      setSession(null);
      navigate(ROUTES.SIGNIN);
    } catch (err) {
      throw err;
    }
  };

  return handleSignOut;
};

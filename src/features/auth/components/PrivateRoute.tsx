import { type ReactNode } from 'react';

import { Navigate } from 'react-router-dom';

import { ROUTES } from '../../../app/routes';
import { useAuthStore } from '../authStore';

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { session } = useAuthStore();
  return <>{session ? <>{children}</> : <Navigate to={ROUTES.SIGNUP} />}</>;
};

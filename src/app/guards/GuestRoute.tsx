import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@features';
import { ROUTES } from '@shared/config';

export const GuestRoute = () => {
  const { isAuth } = useAuth();
  return !isAuth ? <Outlet /> : <Navigate to={ROUTES.HOME} replace />;
};

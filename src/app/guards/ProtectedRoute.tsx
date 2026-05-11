import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@features';
import { ROUTES } from '@shared/config';

export const ProtectedRoute = () => {
  const { isAuth } = useAuth();
  return isAuth ? <Outlet /> : <Navigate to={ROUTES.AUTH} replace />;
};

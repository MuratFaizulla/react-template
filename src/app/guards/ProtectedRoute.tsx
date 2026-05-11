import { Navigate, Outlet } from 'react-router-dom';

import { useAuth, type UserRole } from '@features';
import { ROUTES } from '@shared/config';

interface ProtectedRouteProps {
  roles?: UserRole[];
}

export const ProtectedRoute = ({ roles }: ProtectedRouteProps = {}) => {
  const { isAuth, role } = useAuth();

  if (!isAuth) return <Navigate to={ROUTES.AUTH} replace />;
  if (roles && (!role || !roles.includes(role)))
    return <Navigate to={ROUTES.UNAUTHORIZED} replace />;

  return <Outlet />;
};

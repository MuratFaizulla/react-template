import React from 'react';

import { getCookie, deleteCookie } from '@shared/lib';
import { COOKIE_NAMES } from '@shared/config';

import type { UserRole } from '../model/types';
import { AuthContext } from './AuthContext';

const resolveInitialAuth = (): boolean => {
  const authCookie = getCookie(COOKIE_NAMES.AUTH_TOKEN);
  const isNotMyDevice = getCookie(COOKIE_NAMES.IS_NOT_MY_DEVICE);
  const deviceExpired =
    !!isNotMyDevice && new Date().getTime() > new Date(+isNotMyDevice).getTime();

  if (authCookie && deviceExpired) {
    deleteCookie(COOKIE_NAMES.AUTH_TOKEN);
    deleteCookie(COOKIE_NAMES.IS_NOT_MY_DEVICE);
    return false;
  }

  return !!(authCookie && !deviceExpired);
};

const resolveInitialRole = (): UserRole | null => {
  const role = getCookie(COOKIE_NAMES.USER_ROLE);
  return role === 'admin' || role === 'user' ? role : null;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuth, setIsAuth] = React.useState(resolveInitialAuth);
  const [role, setRole] = React.useState<UserRole | null>(resolveInitialRole);

  const value = React.useMemo(() => ({ isAuth, setIsAuth, role, setRole }), [isAuth, role]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

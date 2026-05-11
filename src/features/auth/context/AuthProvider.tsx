import React from 'react';

import { getCookie, deleteCookie } from '@shared/lib';
import { COOKIE_NAMES } from '@shared/config';

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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuth, setIsAuth] = React.useState(resolveInitialAuth);

  const value = React.useMemo(() => ({ isAuth, setIsAuth }), [isAuth]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

import React from 'react';

import type { UserRole } from '../model/types';

export interface AuthContextProps {
  isAuth: boolean;
  setIsAuth: (value: boolean) => void;
  role: UserRole | null;
  setRole: (role: UserRole | null) => void;
}

export const AuthContext = React.createContext<AuthContextProps>({
  isAuth: false,
  setIsAuth: () => {},
  role: null,
  setRole: () => {}
});

import React from 'react';

export interface AuthContextProps {
  isAuth: boolean;
  setIsAuth: (value: boolean) => void;
}

export const AuthContext = React.createContext<AuthContextProps>({
  isAuth: false,
  setIsAuth: () => {}
});

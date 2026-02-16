import React from 'react';

export interface IntlContextProps {
  locale: string;
  messages: Record<string, string>;
}

export const IntlContext = React.createContext<IntlContextProps>({ locale: 'en-US', messages: {} });

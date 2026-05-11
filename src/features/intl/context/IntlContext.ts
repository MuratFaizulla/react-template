import React from 'react';
import type { AcceptLocales } from '@shared/lib';

export interface IntlContextProps {
  locale: AcceptLocales;
  messages: Record<string, string>;
  setLocale: (locale: AcceptLocales) => void;
}

export const IntlContext = React.createContext<IntlContextProps>({
  locale: 'ru',
  messages: {},
  setLocale: () => {}
});

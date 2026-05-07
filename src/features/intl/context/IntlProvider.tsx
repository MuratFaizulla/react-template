import React from 'react';

import { getMessages } from '@utils/helpers';
import { setCookie } from '@utils/helpers';
import { COOKIE_NAMES } from '@utils/constants';
import type { AcceptLocales } from '@utils/helpers';
import type { IntlContextProps } from './IntlContext';
import { IntlContext } from './IntlContext';

type IntlProviderProps = Omit<IntlContextProps, 'setLocale'> & {
  children: React.ReactNode;
};

export const IntlProvider: React.FC<IntlProviderProps> = ({ locale: initialLocale, messages: initialMessages, children }) => {
  const [locale, setLocaleState] = React.useState(initialLocale);
  const [messages, setMessages] = React.useState(initialMessages);

  const setLocale = React.useCallback(async (newLocale: AcceptLocales) => {
    const newMessages = await getMessages(newLocale);
    setCookie(COOKIE_NAMES.LOCALE, newLocale);
    setMessages(newMessages);
    setLocaleState(newLocale);
  }, []);

  const value = React.useMemo(
    () => ({ locale, messages, setLocale }),
    [locale, messages, setLocale]
  );

  return <IntlContext.Provider value={value}>{children}</IntlContext.Provider>;
};

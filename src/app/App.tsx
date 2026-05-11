import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { HomePage, LoginPage, NotFoundPage, RegistrationPage } from '@pages';
import { deleteCookie, getCookie, getLocale, getMessages } from '@shared/lib';
import { IntlProvider, ThemeProvider, type Theme } from '@features';
import { Layout } from '@widgets';
import { COOKIE_NAMES, ROUTES } from '@shared/config';

import './App.css';

const App = () => {
  const [isAuth, setIsAuth] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [messages, setMessages] = React.useState({});
  const locale = getLocale();

  React.useEffect(() => {
    const authCookie = getCookie(COOKIE_NAMES.AUTH_TOKEN);
    const isNotMyDevice = getCookie(COOKIE_NAMES.IS_NOT_MY_DEVICE);

    const deviceExpire = isNotMyDevice && new Date().getTime() > new Date(+isNotMyDevice).getTime();
    if (authCookie && deviceExpire) {
      deleteCookie(COOKIE_NAMES.AUTH_TOKEN);
      deleteCookie(COOKIE_NAMES.IS_NOT_MY_DEVICE);
    }

    if (authCookie && !deviceExpire) {
      setIsAuth(true);
    }

    getMessages(locale).then((messages) => {
      setMessages(messages);
      setIsLoading(false);
    });
  }, [locale]);

  if (isLoading) return null;

  const theme = (getCookie(COOKIE_NAMES.THEME) as Theme) ?? 'light';

  return (
    <ThemeProvider theme={theme}>
      <IntlProvider locale={locale} messages={messages}>
        <BrowserRouter>
          <Layout isAuth={isAuth}>
            <Routes>
              <Route path={ROUTES.HOME} element={<HomePage />} />
              <Route path={ROUTES.AUTH} element={<LoginPage onAuthSuccess={() => setIsAuth(true)} />} />
              <Route path={ROUTES.REGISTRATION} element={<RegistrationPage />} />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </IntlProvider>
    </ThemeProvider>
  );
};

export default App;

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { HomePage, LoginPage, NotFoundPage, RegistrationPage } from '@pages';
import { getLocale, getMessages, getCookie } from '@shared/lib';
import { IntlProvider, ThemeProvider, AuthProvider, type Theme } from '@features';
import { Layout } from '@widgets';
import { COOKIE_NAMES, ROUTES } from '@shared/config';

import { ProtectedRoute, GuestRoute } from './guards';
import './App.css';

const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [messages, setMessages] = React.useState({});
  const locale = getLocale();

  React.useEffect(() => {
    getMessages(locale).then((msgs) => {
      setMessages(msgs);
      setIsLoading(false);
    });
  }, [locale]);

  if (isLoading) return null;

  const theme = (getCookie(COOKIE_NAMES.THEME) as Theme) ?? 'light';

  return (
    <ThemeProvider theme={theme}>
      <IntlProvider locale={locale} messages={messages}>
        <AuthProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route element={<ProtectedRoute />}>
                  <Route path={ROUTES.HOME} element={<HomePage />} />
                </Route>
                <Route element={<GuestRoute />}>
                  <Route path={ROUTES.AUTH} element={<LoginPage />} />
                  <Route path={ROUTES.REGISTRATION} element={<RegistrationPage />} />
                </Route>
                <Route path='*' element={<NotFoundPage />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </AuthProvider>
      </IntlProvider>
    </ThemeProvider>
  );
};

export default App;

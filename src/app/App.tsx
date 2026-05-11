import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import {
  AboutPage,
  AdminPage,
  HomePage,
  LoginPage,
  NotFoundPage,
  RegistrationPage,
  UnauthorizedPage
} from '@pages';
import { getLocale, getMessages, getCookie } from '@shared/lib';
import { ErrorBoundary } from '@shared/ui';
import { IntlProvider, ThemeProvider, AuthProvider, ToastContainer, type Theme } from '@features';
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
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <IntlProvider locale={locale} messages={messages}>
          <AuthProvider>
            <BrowserRouter>
              <Layout>
                <Routes>
                  {/* Public routes */}
                  <Route path={ROUTES.HOME} element={<HomePage />} />
                  <Route path={ROUTES.ABOUT} element={<AboutPage />} />

                  {/* Protected: admin only */}
                  <Route element={<ProtectedRoute roles={['admin']} />}>
                    <Route path={ROUTES.ADMIN} element={<AdminPage />} />
                  </Route>

                  {/* Guest only */}
                  <Route element={<GuestRoute />}>
                    <Route path={ROUTES.AUTH} element={<LoginPage />} />
                    <Route path={ROUTES.REGISTRATION} element={<RegistrationPage />} />
                  </Route>

                  <Route path={ROUTES.UNAUTHORIZED} element={<UnauthorizedPage />} />
                  <Route path='*' element={<NotFoundPage />} />
                </Routes>
              </Layout>
            </BrowserRouter>
            <ToastContainer />
          </AuthProvider>
        </IntlProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { useTheme, useIntl, useAuth } from '@features';
import { ROUTES } from '@shared/config';
import type { AcceptLocales } from '@shared/lib';

import styles from './Header.module.css';

const LOCALES: { value: AcceptLocales; label: string }[] = [
  { value: 'ru', label: 'RU' },
  { value: 'kk', label: 'KK' },
  { value: 'en-US', label: 'EN' }
];

const NAV_LINKS = [
  { label: 'Home', path: ROUTES.HOME },
  { label: 'About', path: ROUTES.ABOUT }
];

export const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { locale, setLocale, translateMessage } = useIntl();
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.logo} onClick={() => navigate(ROUTES.HOME)}>
          RT
          <span>React Template</span>
        </div>

        <nav className={styles.nav}>
          {NAV_LINKS.map(({ label, path }) => (
            <button
              key={path}
              className={`${styles.nav_link} ${pathname === path ? styles.nav_link_active : ''}`}
              onClick={() => navigate(path)}
            >
              {label}
            </button>
          ))}
          {isAuth && (
            <button
              className={`${styles.nav_link} ${pathname === ROUTES.CABINET ? styles.nav_link_active : ''}`}
              onClick={() => navigate(ROUTES.CABINET)}
            >
              Cabinet
            </button>
          )}
        </nav>
      </div>

      <div className={styles.controls}>
        <div className={styles.lang_group}>
          {LOCALES.map(({ value, label }) => (
            <button
              key={value}
              className={`${styles.lang_btn} ${locale === value ? styles.lang_btn_active : ''}`}
              onClick={() => setLocale(value)}
            >
              {label}
            </button>
          ))}
        </div>

        <button className={styles.theme_btn} onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>

        {!isAuth && (
          <button className={styles.sign_in_btn} onClick={() => navigate(ROUTES.AUTH)}>
            {translateMessage('button.signIn')}
          </button>
        )}
      </div>
    </header>
  );
};

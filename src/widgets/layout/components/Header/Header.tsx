import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useTheme, useIntl, useAuth } from '@features';
import { ROUTES } from '@shared/config';
import type { AcceptLocales } from '@shared/lib';

import styles from './Header.module.css';

const LOCALES: { value: AcceptLocales; label: string }[] = [
  { value: 'ru', label: 'RU' },
  { value: 'kk', label: 'KK' },
  { value: 'en-US', label: 'EN' }
];

export const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { locale, setLocale, translateMessage } = useIntl();
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={() => isAuth && navigate(ROUTES.HOME)} style={{ cursor: isAuth ? 'pointer' : 'default' }}>
        RT
        <span>React Template</span>
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

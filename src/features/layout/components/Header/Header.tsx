import React from 'react';

import { useTheme } from '@features';
import { useIntl } from '@features';
import type { AcceptLocales } from '@utils/helpers';

import styles from './Header.module.css';

const LOCALES: { value: AcceptLocales; label: string }[] = [
  { value: 'ru', label: 'RU' },
  { value: 'kk', label: 'KK' },
  { value: 'en-US', label: 'EN' }
];

export const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { locale, setLocale } = useIntl();

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <header className={styles.header}>
      <div className={styles.logo}>React Template</div>

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

        <button className={styles.theme_btn} onClick={toggleTheme} title={theme === 'light' ? 'Dark mode' : 'Light mode'}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
};

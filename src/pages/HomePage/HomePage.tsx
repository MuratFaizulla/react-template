import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@features';
import { ROUTES } from '@shared/config';

import styles from './HomePage.module.css';

const FEATURES = [
  {
    icon: '🚀',
    title: 'Fast & Modern Stack',
    desc: 'Built on React 19, Vite 7 and TypeScript. Instant hot-reload and optimized production builds out of the box.'
  },
  {
    icon: '🏗️',
    title: 'Scalable Architecture',
    desc: 'Feature-Sliced Design keeps your codebase clean as it grows. Every layer knows its responsibilities.'
  },
  {
    icon: '🔐',
    title: 'Auth & Access Control',
    desc: 'Cookie-based authentication with role-based route guards. Protect pages with a single prop.'
  },
  {
    icon: '🎨',
    title: 'Theming & i18n',
    desc: 'Light and dark themes plus multi-language support (RU / KK / EN) ready from day one.'
  },
  {
    icon: '📦',
    title: 'Global State',
    desc: 'Zustand stores for notifications and any future state. No Provider boilerplate required.'
  },
  {
    icon: '🛡️',
    title: 'Error Handling',
    desc: 'Error Boundary catches runtime errors and shows a friendly fallback instead of a blank screen.'
  }
];

export const HomePage: React.FC = () => {
  const { isAuth, role } = useAuth();
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.hero_badge}>Production-ready React template</div>
        <h1 className={styles.hero_title}>
          Build your next app
          <br />
          <span>faster than ever</span>
        </h1>
        <p className={styles.hero_subtitle}>
          Everything you need to start a modern web project — architecture, auth, theming, i18n,
          state management and more. All wired up and ready to go.
        </p>

        {isAuth ? (
          <div className={styles.hero_auth_row}>
            <div className={styles.auth_badge}>
              {role === 'admin' ? '👑' : '👤'}&nbsp;
              {role === 'admin' ? 'Administrator' : 'User'}
            </div>
            <button className={styles.btn_primary} onClick={() => navigate(ROUTES.CABINET)}>
              My Cabinet →
            </button>
          </div>
        ) : (
          <div className={styles.hero_actions}>
            <button className={styles.btn_primary} onClick={() => navigate(ROUTES.AUTH)}>
              Get started
            </button>
            <button className={styles.btn_ghost} onClick={() => navigate(ROUTES.ABOUT)}>
              Learn more →
            </button>
          </div>
        )}
      </section>

      <section className={styles.features}>
        <h2 className={styles.section_title}>What&apos;s included</h2>
        <div className={styles.features_grid}>
          {FEATURES.map(({ icon, title, desc }) => (
            <div key={title} className={styles.feature_card}>
              <span className={styles.feature_icon}>{icon}</span>
              <h3 className={styles.feature_title}>{title}</h3>
              <p className={styles.feature_desc}>{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth, useIntl } from '@features';
import { ROUTES } from '@shared/config';

import styles from './HomePage.module.css';

const FEATURE_KEYS = [
  { icon: '🚀', titleKey: 'home.features.stack.title', descKey: 'home.features.stack.desc' },
  {
    icon: '🏗️',
    titleKey: 'home.features.architecture.title',
    descKey: 'home.features.architecture.desc'
  },
  { icon: '🔐', titleKey: 'home.features.auth.title', descKey: 'home.features.auth.desc' },
  { icon: '🎨', titleKey: 'home.features.theming.title', descKey: 'home.features.theming.desc' },
  { icon: '📦', titleKey: 'home.features.state.title', descKey: 'home.features.state.desc' },
  { icon: '🛡️', titleKey: 'home.features.errors.title', descKey: 'home.features.errors.desc' }
];

export const HomePage: React.FC = () => {
  const { isAuth, role } = useAuth();
  const { translateMessage } = useIntl();
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.hero_badge}>{translateMessage('home.badge')}</div>
        <h1 className={styles.hero_title}>
          {translateMessage('home.hero.title1')}
          <br />
          <span>{translateMessage('home.hero.title2')}</span>
        </h1>
        <p className={styles.hero_subtitle}>{translateMessage('home.hero.subtitle')}</p>

        {isAuth ? (
          <div className={styles.hero_auth_row}>
            <div className={styles.auth_badge}>
              {role === 'admin' ? '👑' : '👤'}&nbsp;
              {role === 'admin'
                ? translateMessage('home.hero.role.admin')
                : translateMessage('home.hero.role.user')}
            </div>
          </div>
        ) : (
          <div className={styles.hero_actions}>
            <button className={styles.btn_primary} onClick={() => navigate(ROUTES.AUTH)}>
              {translateMessage('home.hero.getStarted')}
            </button>
            <button className={styles.btn_ghost} onClick={() => navigate(ROUTES.ABOUT)}>
              {translateMessage('home.hero.learnMore')}
            </button>
          </div>
        )}
      </section>

      <section className={styles.features}>
        <h2 className={styles.section_title}>{translateMessage('home.features.title')}</h2>
        <div className={styles.features_grid}>
          {FEATURE_KEYS.map(({ icon, titleKey, descKey }) => (
            <div key={titleKey} className={styles.feature_card}>
              <span className={styles.feature_icon}>{icon}</span>
              <h3 className={styles.feature_title}>{translateMessage(titleKey)}</h3>
              <p className={styles.feature_desc}>{translateMessage(descKey)}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

import React from 'react';

import styles from './AboutPage.module.css';

const FEATURES = [
  { icon: '⚡', title: 'Vite 7 + React 19', desc: 'Lightning fast dev server and builds' },
  { icon: '🏗️', title: 'FSD Architecture', desc: 'Feature-Sliced Design for scalable structure' },
  { icon: '🔐', title: 'Auth + RBAC', desc: 'Cookie-based auth with role-based access control' },
  { icon: '🌍', title: 'i18n (ru / kk / en)', desc: 'Multi-language support out of the box' },
  { icon: '🎨', title: 'Theming', desc: 'Light and dark theme with CSS variables' },
  { icon: '📦', title: 'Zustand', desc: 'Global state management without boilerplate' },
  { icon: '🛡️', title: 'Error Boundary', desc: 'Graceful error handling with fallback UI' },
  { icon: '🔔', title: 'Toast system', desc: 'Global notifications: success, error, warning, info' }
];

export const AboutPage: React.FC = () => (
  <div className={styles.page}>
    <div className={styles.hero}>
      <h1 className={styles.title}>About this template</h1>
      <p className={styles.subtitle}>
        A production-ready React starter template with everything you need to build modern web apps.
      </p>
    </div>

    <div className={styles.grid}>
      {FEATURES.map(({ icon, title, desc }) => (
        <div key={title} className={styles.card}>
          <span className={styles.icon}>{icon}</span>
          <h3 className={styles.card_title}>{title}</h3>
          <p className={styles.card_desc}>{desc}</p>
        </div>
      ))}
    </div>
  </div>
);

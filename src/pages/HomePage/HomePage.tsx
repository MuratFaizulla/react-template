import React from 'react';

import { IntlText } from '@features';

import styles from './HomePage.module.css';

const STATS = [
  { icon: '👥', value: '1,284', trendKey: '+12%', labelKey: 'home.stats.users' },
  { icon: '⚡', value: '3,920', trendKey: '+8%', labelKey: 'home.stats.sessions' },
  { icon: '🟢', value: '99.9%', trendKey: '+0.1%', labelKey: 'home.stats.uptime' },
  { icon: '📡', value: '48.2k', trendKey: '+23%', labelKey: 'home.stats.requests' }
];

const ACTIVITY = [
  { text: 'New user registered', time: '2 min ago' },
  { text: 'API request limit updated', time: '15 min ago' },
  { text: 'Server health check passed', time: '1 hr ago' },
  { text: 'Database backup completed', time: '3 hr ago' },
  { text: 'New session started', time: '5 hr ago' }
];

export const HomePage: React.FC = () => (
  <div className={styles.page}>
    <div className={styles.hero}>
      <h1 className={styles.welcome}>
        <IntlText path='home.welcome' /> <span>👋</span>
      </h1>
      <p className={styles.subtitle}>
        <IntlText path='home.subtitle' />
      </p>
    </div>

    <div className={styles.stats_grid}>
      {STATS.map(({ icon, value, trendKey, labelKey }) => (
        <div key={labelKey} className={styles.stat_card}>
          <div className={styles.stat_icon}>{icon}</div>
          <div className={styles.stat_value}>{value}</div>
          <div className={styles.stat_label}>
            <IntlText path={labelKey} />
          </div>
          <div className={styles.stat_trend}>{trendKey} this week</div>
        </div>
      ))}
    </div>

    <div>
      <h2 className={styles.section_title}>Recent activity</h2>
      <div className={styles.activity_list}>
        {ACTIVITY.map(({ text, time }) => (
          <div key={text} className={styles.activity_item}>
            <div className={styles.activity_dot} />
            <span className={styles.activity_text}>{text}</span>
            <span className={styles.activity_time}>{time}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

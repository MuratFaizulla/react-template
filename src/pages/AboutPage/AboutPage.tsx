import React from 'react';

import { useIntl } from '@features';

import styles from './AboutPage.module.css';

const TEAM = [
  { name: 'Alex Morgan', roleKey: 'about.team.roles.ceo', avatar: '👨‍💼' },
  { name: 'Sara Kim', roleKey: 'about.team.roles.designer', avatar: '👩‍🎨' },
  { name: 'Ivan Petrov', roleKey: 'about.team.roles.engineer', avatar: '👨‍💻' },
  { name: 'Maria Chen', roleKey: 'about.team.roles.pm', avatar: '👩‍💼' }
];

const VALUE_KEYS = [
  {
    icon: '💡',
    titleKey: 'about.values.innovation.title',
    descKey: 'about.values.innovation.desc'
  },
  {
    icon: '🤝',
    titleKey: 'about.values.collaboration.title',
    descKey: 'about.values.collaboration.desc'
  },
  { icon: '⭐', titleKey: 'about.values.quality.title', descKey: 'about.values.quality.desc' }
];

export const AboutPage: React.FC = () => {
  const { translateMessage } = useIntl();

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.hero_badge}>{translateMessage('about.badge')}</div>
        <h1 className={styles.hero_title}>
          {translateMessage('about.hero.title1')}{' '}
          <span>{translateMessage('about.hero.title2')}</span>
        </h1>
        <p className={styles.hero_subtitle}>{translateMessage('about.hero.subtitle')}</p>
      </section>

      <section className={styles.section}>
        <div className={styles.mission_card}>
          <span className={styles.mission_icon}>🎯</span>
          <div>
            <h2 className={styles.mission_title}>{translateMessage('about.mission.title')}</h2>
            <p className={styles.mission_text}>{translateMessage('about.mission.text')}</p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.section_title}>{translateMessage('about.values.title')}</h2>
        <div className={styles.values_grid}>
          {VALUE_KEYS.map(({ icon, titleKey, descKey }) => (
            <div key={titleKey} className={styles.value_card}>
              <span className={styles.value_icon}>{icon}</span>
              <h3 className={styles.value_title}>{translateMessage(titleKey)}</h3>
              <p className={styles.value_desc}>{translateMessage(descKey)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.section_title}>{translateMessage('about.team.title')}</h2>
        <div className={styles.team_grid}>
          {TEAM.map(({ name, roleKey, avatar }) => (
            <div key={name} className={styles.team_card}>
              <div className={styles.team_avatar}>{avatar}</div>
              <h3 className={styles.team_name}>{name}</h3>
              <span className={styles.team_role}>{translateMessage(roleKey)}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

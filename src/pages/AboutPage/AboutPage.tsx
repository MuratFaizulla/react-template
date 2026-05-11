import React from 'react';

import styles from './AboutPage.module.css';

const TEAM = [
  { name: 'Alex Morgan', role: 'Founder & CEO', avatar: '👨‍💼' },
  { name: 'Sara Kim', role: 'Lead Designer', avatar: '👩‍🎨' },
  { name: 'Ivan Petrov', role: 'Frontend Engineer', avatar: '👨‍💻' },
  { name: 'Maria Chen', role: 'Product Manager', avatar: '👩‍💼' }
];

const VALUES = [
  {
    icon: '💡',
    title: 'Innovation',
    desc: 'We embrace new ideas and modern technologies to solve real problems.'
  },
  {
    icon: '🤝',
    title: 'Collaboration',
    desc: 'Great products are built by great teams. We believe in open communication.'
  },
  {
    icon: '⭐',
    title: 'Quality',
    desc: 'We take pride in every detail — from code architecture to user experience.'
  }
];

export const AboutPage: React.FC = () => (
  <div className={styles.page}>
    <section className={styles.hero}>
      <div className={styles.hero_badge}>About us</div>
      <h1 className={styles.hero_title}>
        We build tools that <span>developers love</span>
      </h1>
      <p className={styles.hero_subtitle}>
        We are a small team of passionate engineers and designers on a mission to make modern web
        development faster, simpler and more enjoyable for everyone.
      </p>
    </section>

    <section className={styles.section}>
      <div className={styles.mission_card}>
        <span className={styles.mission_icon}>🎯</span>
        <div>
          <h2 className={styles.mission_title}>Our mission</h2>
          <p className={styles.mission_text}>
            To provide developers with a production-ready foundation so they can focus on building
            features that matter — not on setting up boilerplate. We obsess over architecture,
            developer experience and code quality so you don&apos;t have to.
          </p>
        </div>
      </div>
    </section>

    <section className={styles.section}>
      <h2 className={styles.section_title}>Our values</h2>
      <div className={styles.values_grid}>
        {VALUES.map(({ icon, title, desc }) => (
          <div key={title} className={styles.value_card}>
            <span className={styles.value_icon}>{icon}</span>
            <h3 className={styles.value_title}>{title}</h3>
            <p className={styles.value_desc}>{desc}</p>
          </div>
        ))}
      </div>
    </section>

    <section className={styles.section}>
      <h2 className={styles.section_title}>Meet the team</h2>
      <div className={styles.team_grid}>
        {TEAM.map(({ name, role, avatar }) => (
          <div key={name} className={styles.team_card}>
            <div className={styles.team_avatar}>{avatar}</div>
            <h3 className={styles.team_name}>{name}</h3>
            <span className={styles.team_role}>{role}</span>
          </div>
        ))}
      </div>
    </section>
  </div>
);

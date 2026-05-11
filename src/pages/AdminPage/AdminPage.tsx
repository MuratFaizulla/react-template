import React from 'react';

import styles from './AdminPage.module.css';

export const AdminPage: React.FC = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>Admin Panel</h1>
    <p className={styles.subtitle}>Only users with the &quot;admin&quot; role can see this page.</p>
  </div>
);

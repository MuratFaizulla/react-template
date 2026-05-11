import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@shared/config';

import styles from './UnauthorizedPage.module.css';

export const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.code}>403</div>
        <h1 className={styles.title}>Access Denied</h1>
        <p className={styles.message}>You don&apos;t have permission to view this page.</p>
        <button className={styles.btn} onClick={() => navigate(ROUTES.HOME)}>
          Go to Home
        </button>
      </div>
    </div>
  );
};

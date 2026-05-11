import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@features';
import { deleteCookie } from '@shared/lib';
import { COOKIE_NAMES, ROUTES } from '@shared/config';

import styles from './CabinetPage.module.css';

export const CabinetPage: React.FC = () => {
  const { role, setIsAuth, setRole } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    deleteCookie(COOKIE_NAMES.AUTH_TOKEN);
    deleteCookie(COOKIE_NAMES.USER_ROLE);
    setIsAuth(false);
    setRole(null);
    navigate(ROUTES.HOME);
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.avatar}>{role === 'admin' ? '👑' : '👤'}</div>
        <h1 className={styles.title}>Personal Cabinet</h1>
        <div className={styles.role_badge} data-role={role}>
          {role === 'admin' ? 'Administrator' : 'User'}
        </div>

        <div className={styles.info_list}>
          <div className={styles.info_row}>
            <span className={styles.info_label}>Role</span>
            <span className={styles.info_value}>{role}</span>
          </div>
          <div className={styles.info_row}>
            <span className={styles.info_label}>Status</span>
            <span className={styles.info_value_green}>Active</span>
          </div>
        </div>

        {role === 'admin' && (
          <button className={styles.btn_secondary} onClick={() => navigate(ROUTES.ADMIN)}>
            Go to Admin Panel
          </button>
        )}

        <button className={styles.btn_logout} onClick={handleLogout}>
          Log out
        </button>
      </div>
    </div>
  );
};

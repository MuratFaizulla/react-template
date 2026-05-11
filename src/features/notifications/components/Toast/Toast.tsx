import React from 'react';

import type { ToastItem } from '../../context/NotificationsContext';
import { NotificationsContext } from '../../context/NotificationsContext';

import styles from './Toast.module.css';

const ICONS: Record<ToastItem['type'], string> = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'i'
};

interface ToastProps {
  toast: ToastItem;
}

export const Toast: React.FC<ToastProps> = ({ toast }) => {
  const { hideToast } = React.useContext(NotificationsContext);

  return (
    <div className={`${styles.toast} ${styles[toast.type]}`}>
      <span className={styles.icon}>{ICONS[toast.type]}</span>
      <span className={styles.message}>{toast.message}</span>
      <button className={styles.close} onClick={() => hideToast(toast.id)}>✕</button>
    </div>
  );
};

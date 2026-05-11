import React from 'react';

import { useNotificationsStore } from '../../model/notificationsStore';
import { Toast } from '../Toast/Toast';

import styles from './ToastContainer.module.css';

export const ToastContainer: React.FC = () => {
  const toasts = useNotificationsStore((state) => state.toasts);

  if (!toasts.length) return null;

  return (
    <div className={styles.container}>
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  );
};

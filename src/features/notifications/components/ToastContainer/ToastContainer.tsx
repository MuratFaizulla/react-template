import React from 'react';

import { NotificationsContext } from '../../context/NotificationsContext';
import { Toast } from '../Toast/Toast';

import styles from './ToastContainer.module.css';

export const ToastContainer: React.FC = () => {
  const { toasts } = React.useContext(NotificationsContext);

  if (!toasts.length) return null;

  return (
    <div className={styles.container}>
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  );
};

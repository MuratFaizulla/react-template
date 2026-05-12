import React from 'react';

import styles from './ConfirmDialog.module.css';

interface Props {
  title?: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<Props> = ({
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel
}) => (
  <div className={styles.backdrop} onClick={onCancel}>
    <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
      {title && <h3 className={styles.title}>{title}</h3>}
      <p className={styles.message}>{message}</p>
      <div className={styles.actions}>
        <button className={styles.btn_cancel} onClick={onCancel}>
          {cancelText}
        </button>
        <button className={styles.btn_confirm} onClick={onConfirm}>
          {confirmText}
        </button>
      </div>
    </div>
  </div>
);

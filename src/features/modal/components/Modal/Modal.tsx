import React from 'react';
import ReactDOM from 'react-dom';

import styles from './Modal.module.css';

interface Props {
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<Props> = ({ onClose, children }) =>
  ReactDOM.createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );

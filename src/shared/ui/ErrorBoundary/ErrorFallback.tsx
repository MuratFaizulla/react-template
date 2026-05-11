import React from 'react';

import styles from './ErrorBoundary.module.css';

interface ErrorFallbackProps {
  error: Error | null;
  onReset: () => void;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, onReset }) => (
  <div className={styles.container}>
    <div className={styles.box}>
      <div className={styles.code}>500</div>
      <h1 className={styles.title}>Something went wrong</h1>
      {error && <p className={styles.message}>{error.message}</p>}
      <div className={styles.actions}>
        <button className={styles.btn_primary} onClick={onReset}>
          Try again
        </button>
        <button className={styles.btn_secondary} onClick={() => window.location.reload()}>
          Reload page
        </button>
      </div>
    </div>
  </div>
);

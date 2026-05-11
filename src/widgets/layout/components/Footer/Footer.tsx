import React from 'react';

import { useIntl } from '@features';

import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const { translateMessage } = useIntl();

  return (
    <footer className={styles.footer}>
      <span className={styles.copyright}>
        {translateMessage('footer.copyright', { year: new Date().getFullYear() })}
      </span>
    </footer>
  );
};

import React from 'react';
import styles from './Spinner.module.css';

interface Props {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Spinner: React.FC<Props> = ({ size = 'md', className }) => (
  <div className={`${styles.spinner} ${styles[size]} ${className ?? ''}`} />
);

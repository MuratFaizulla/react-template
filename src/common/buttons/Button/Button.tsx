import React from 'react';
import styles from './Button.module.css';
interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  isError?: boolean;
  // You can add custom props here if needed
}
export const Button: React.FC<ButtonProps> = ({ children, isError = false }) => {
  return (
    <button className={`${styles.button} ${isError ? styles.button_error : ''}`}>{children}</button>
  );
};

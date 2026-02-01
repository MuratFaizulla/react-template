import React from 'react';
import './Button.css';
interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  isError?: boolean;
  // You can add custom props here if needed
}
export const Button: React.FC<ButtonProps> = ({ children, isError = false }) => {
  return <button className={isError ? 'error' : ''}>{children}</button>;
};

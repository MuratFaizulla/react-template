import React from 'react';

import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

import styles from './Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
  isAuth?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, isAuth = false }) => (
  <div className={styles.layout}>
    <Header isAuth={isAuth} />
    <main className={styles.content}>{children}</main>
    <Footer />
  </div>
);

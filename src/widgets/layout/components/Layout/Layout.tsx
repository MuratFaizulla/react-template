import React from 'react';

import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

import styles from './Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className={styles.layout}>
    <Header />
    <main className={styles.content}>{children}</main>
    <Footer />
  </div>
);

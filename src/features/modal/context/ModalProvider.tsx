import React from 'react';

import { Modal } from '../components/Modal/Modal';
import { ModalContext } from './ModalContext';

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = React.useState<React.ReactNode>(null);

  const openModal = React.useCallback((node: React.ReactNode) => setContent(node), []);
  const closeModal = React.useCallback(() => setContent(null), []);

  React.useEffect(() => {
    if (!content) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [content, closeModal]);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {content && <Modal onClose={closeModal}>{content}</Modal>}
    </ModalContext.Provider>
  );
};

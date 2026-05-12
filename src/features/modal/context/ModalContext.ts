import React from 'react';

interface ModalContextValue {
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
}

export const ModalContext = React.createContext<ModalContextValue | null>(null);

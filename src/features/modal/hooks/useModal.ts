import React from 'react';

import { ModalContext } from '../context/ModalContext';

export function useModal() {
  const ctx = React.useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used within ModalProvider');
  return ctx;
}

import React from 'react';

export interface ConfirmOptions {
  title?: string;
  confirmText?: string;
  cancelText?: string;
}

interface ConfirmContextValue {
  confirm: (message: string, options?: ConfirmOptions) => Promise<boolean>;
}

export const ConfirmContext = React.createContext<ConfirmContextValue | null>(null);

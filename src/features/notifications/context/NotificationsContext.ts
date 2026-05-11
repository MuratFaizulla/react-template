import React from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
}

export interface ShowToastParams {
  type: ToastType;
  message: string;
  duration?: number;
}

export interface NotificationsContextProps {
  toasts: ToastItem[];
  showToast: (params: ShowToastParams) => void;
  hideToast: (id: string) => void;
}

export const NotificationsContext = React.createContext<NotificationsContextProps>({
  toasts: [],
  showToast: () => {},
  hideToast: () => {}
});

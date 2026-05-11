import React from 'react';

import { NotificationsContext } from './NotificationsContext';
import type { ToastItem, ShowToastParams } from './NotificationsContext';

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  const hideToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = React.useCallback(
    ({ type, message, duration = 3000 }: ShowToastParams) => {
      const id = crypto.randomUUID();
      setToasts((prev) => [...prev, { id, type, message }]);
      setTimeout(() => hideToast(id), duration);
    },
    [hideToast]
  );

  const value = React.useMemo(
    () => ({ toasts, showToast, hideToast }),
    [toasts, showToast, hideToast]
  );

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
};

import { create } from 'zustand';

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

interface NotificationsStore {
  toasts: ToastItem[];
  showToast: (params: ShowToastParams) => void;
  hideToast: (id: string) => void;
}

export const useNotificationsStore = create<NotificationsStore>((set) => ({
  toasts: [],

  showToast: ({ type, message, duration = 3000 }) => {
    const id = crypto.randomUUID();
    set((state) => ({ toasts: [...state.toasts, { id, type, message }] }));
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, duration);
  },

  hideToast: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }))
}));

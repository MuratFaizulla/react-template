import { useNotificationsStore } from '../model/notificationsStore';

export const useToast = () => {
  const showToast = useNotificationsStore((state) => state.showToast);
  return { showToast };
};

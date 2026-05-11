import React from 'react';

import { NotificationsContext } from '../context/NotificationsContext';

export const useToast = () => {
  const { showToast } = React.useContext(NotificationsContext);
  return { showToast };
};

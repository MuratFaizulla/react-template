import React from 'react';
import ReactDOM from 'react-dom';

import { ConfirmDialog } from '../components/ConfirmDialog/ConfirmDialog';
import { ConfirmContext, type ConfirmOptions } from './ConfirmContext';

interface ConfirmState {
  message: string;
  options: Required<ConfirmOptions>;
  resolve: (value: boolean) => void;
}

export const ConfirmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = React.useState<ConfirmState | null>(null);

  const confirm = React.useCallback(
    (message: string, options: ConfirmOptions = {}): Promise<boolean> =>
      new Promise((resolve) =>
        setState({
          message,
          options: {
            title: options.title ?? '',
            confirmText: options.confirmText ?? 'Confirm',
            cancelText: options.cancelText ?? 'Cancel'
          },
          resolve
        })
      ),
    []
  );

  const handleResolve = (value: boolean) => {
    state?.resolve(value);
    setState(null);
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      {state &&
        ReactDOM.createPortal(
          <ConfirmDialog
            title={state.options.title || undefined}
            message={state.message}
            confirmText={state.options.confirmText}
            cancelText={state.options.cancelText}
            onConfirm={() => handleResolve(true)}
            onCancel={() => handleResolve(false)}
          />,
          document.body
        )}
    </ConfirmContext.Provider>
  );
};

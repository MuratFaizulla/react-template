import React from 'react';

export function useClickOutside<T extends HTMLElement>(callback: () => void): React.RefObject<T> {
  const ref = React.useRef<T>(null);

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) callback();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [callback]);

  return ref;
}

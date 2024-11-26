import React from 'react';

const useOverflowBody = (lock: boolean) => {
  React.useLayoutEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    const originalStyle = window.getComputedStyle(document.body).overflow;
    if (lock) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      if (lock) {
        document.body.style.overflow = originalStyle;
      }
    };
  }, [lock]);
};

export default useOverflowBody;

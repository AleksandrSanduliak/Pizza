import React, { useEffect, useState } from 'react';

const useOverflowBody = (lock: boolean) => {
  React.useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    const originalStyle = window.getComputedStyle(document.body).overflow;
    if (lock) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalStyle;
    }

    return () => {
      if (lock) {
        document.body.style.overflow = originalStyle;
      }
    };
  }, [lock]);
};

export default useOverflowBody;

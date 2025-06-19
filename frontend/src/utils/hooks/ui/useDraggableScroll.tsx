'use client';
import React from 'react';

const useDraggableScroll = <T extends HTMLElement>(draggableElementRef: React.RefObject<T>) => {
  const targetElement = draggableElementRef?.current;

  const isDragging = React.useRef<boolean>(false);
  const scrollSensivity: number = 3;

  const scrollLeft = React.useRef<number>(0);
  const startX = React.useRef<number>(0);

  const handleMouseMove = React.useCallback(
    (e: MouseEvent) => {
      if (!isDragging.current || !targetElement) return;
      const x = e.pageX - targetElement.offsetLeft;
      const walk = (x - startX.current) * scrollSensivity;
      targetElement.scrollLeft = scrollLeft.current - walk;
    },
    [targetElement],
  );

  const handleMouseUp = React.useCallback(() => {
    isDragging.current = false;
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);

  const handleMouseDown = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!targetElement || !targetElement.contains(e.target as Node)) {
        isDragging.current = false;
        window.removeEventListener('mousemove', handleMouseMove);
        return;
      }

      isDragging.current = true;
      startX.current = e.pageX - targetElement.offsetLeft;
      scrollLeft.current = targetElement.scrollLeft;

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    },
    [handleMouseMove, handleMouseUp, targetElement],
  );

  return { events: { onMouseDown: handleMouseDown, onMouseUp: handleMouseUp } };
};

export default useDraggableScroll;

'use client';

import { RefObject, useEffect, useRef } from 'react';

import { useAppDispatch } from '@shared/store/hooks';
import { visibleStatus } from '@widgets/card-sections/card-sections-navigation/card-sections-navigation.slice';

const useElementVisibility = (
  ref: RefObject<HTMLElement | null>,
  onVisibilityChange: (isVisible: boolean) => void,
  rootMargin = '0px',
) => {
  useEffect(() => {
    const element = ref?.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => onVisibilityChange(!entry.isIntersecting),
      { rootMargin },
    );

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [ref, onVisibilityChange, rootMargin]);
};

const withHandleVisibility = (Component: React.ComponentType) => {
  return function WithVisibility(props: any) {
    console.log('props', props);
    const dispatch = useAppDispatch();
    const wrapperRef = useRef<HTMLDivElement>(null);

    useElementVisibility(wrapperRef, (status) => {
      dispatch(visibleStatus(status));
    });

    return (
      <>
        <div ref={wrapperRef} aria-hidden="true" />
        <Component {...props} />
      </>
    );
  };
};

export default withHandleVisibility;

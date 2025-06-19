'use client';
import React from 'react';

import { useAppDispatch } from 'store/hooks';
import { visibleStatus } from 'store/slices/categoriesSlice';
import useIsVisibleElement from 'utils/hooks/ui/useIsVisibleElement';

// отслеживает конкретный компонент находится ли он в зоне viewport
const withHandleVisibility = (TargetComponent: React.ComponentType) => {
  return function () {
    const dispatch = useAppDispatch();
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const dispatchStatus = (status: boolean) => dispatch(visibleStatus(status as boolean));

    useIsVisibleElement({
      ref: wrapperRef,
      cb: dispatchStatus,
      rootMargin: '0px',
    }); // логика обнаружения компонента, -84px - срабатывание по началу блока

    return (
      <>
        <div ref={wrapperRef}> </div>
        <TargetComponent />
      </>
    );
  };
};

export default withHandleVisibility;

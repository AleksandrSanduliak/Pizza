'use client';

import React from 'react';

import Portal from '@shared/ui/portal';

import Loader from '../Loader/Loader';

import cl from './FullScreenLoader.module.scss';

const FullScreenLoader = () => {
  return (
    <Portal isShow={true} target="fullscreen-loader-root">
      <div className={cl.loaderWrapper}>
        <Loader />
      </div>
    </Portal>
  );
};

export default FullScreenLoader;

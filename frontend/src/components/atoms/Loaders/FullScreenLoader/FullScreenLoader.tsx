'use client';
import React from 'react';

import Portal from 'molecules/modals/Portal';

import cl from './FullScreenLoader.module.scss';
import Loader from '../Loader/Loader';

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

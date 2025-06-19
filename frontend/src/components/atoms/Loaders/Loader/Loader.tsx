'use client';
import React from 'react';

import cn from 'classnames';

import cl from './Loader.module.scss';

interface ILoader {
  loaderClassName?: string;
}

const Loader = ({ loaderClassName }: ILoader) => {
  return <div className={cn(cl.loader, loaderClassName)} />;
};

export default Loader;

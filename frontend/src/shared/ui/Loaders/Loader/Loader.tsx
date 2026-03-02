'use client';
import cn from 'classnames';
import React from 'react';

import cl from './Loader.module.scss';

interface ILoader {
  className?: string;
}

const Loader = ({ className }: ILoader) => {
  return <div className={cn(cl.loader, className)} />;
};

export default Loader;

import cn from 'classnames';
import React from 'react';


import cl from './FooterWrapper.module.scss';

interface IFooterWrapper {
  children: React.ReactNode;
}

const FooterWrapper = ({ children }: IFooterWrapper) => {
  return <div className={cn('subtitle', cl.footer)}>{children}</div>;
};

export default FooterWrapper;

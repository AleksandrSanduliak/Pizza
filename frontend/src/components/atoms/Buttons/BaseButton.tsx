import React from 'react';

import cn from 'classnames';

import cl from './BaseButton.module.scss';

type TButtonProps = {
  buttonMode: 'primary' | 'secondary';
  type: 'submit' | 'button';
};

type TOptionalButtonProps = {
  isLoading: boolean;
  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  className: string;
  children: React.ReactNode;
};

type TButton = TButtonProps & Partial<TOptionalButtonProps>;

const BaseButton = ({
  buttonMode = 'primary',
  type = 'button',
  children,
  className,
  onClick,
}: TButton) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn('normal', cl.button, cl[buttonMode], className)}>
      {children}
    </button>
  );
};

export default BaseButton;

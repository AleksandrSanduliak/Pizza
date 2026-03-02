import cn from 'classnames';
import Image from 'next/image';
import React from 'react';

import logoLetters from 'public/icons/logo-letters.svg';
import logo from 'public/icons/pizzaLogo.svg';

import cl from './logo.module.scss';

const LogoComponent = () => {
  return (
    <div className={cn(cl.wrapper)}>
      <Image className="mr-2" loading="lazy" src={logo} alt="Логотип" />
      <Image loading="lazy" src={logoLetters} alt="Куда пицца" />
    </div>
  );
};

export default LogoComponent;

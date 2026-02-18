'use client';

import cn from 'classnames';
import { motion } from 'framer-motion';
import Image from 'next/image';

import logoLetters from 'public/icons/logo-letters.svg';
import logo from 'public/icons/pizzaLogo.svg';

import cl from './logo.module.scss';

type TLogoType = 'header' | 'fixedHeader' | 'footer' | 'default';
type THideType = 'logo' | 'logoLetters';
type TLogoClasses = {
  logoClass: string;
  logoLettersClass?: string;
  wrapperClass?: string;
};

const logoClasses: Record<TLogoType, TLogoClasses> = {
  footer: {
    logoLettersClass: cl.footerImg,
    logoClass: cl.footerLogo,
    wrapperClass: cl.footerLogoWrapper,
  },
  header: {
    logoLettersClass: cl.img,
    logoClass: cl.logo,
    wrapperClass: cl.headerWrapper,
  },
  fixedHeader: {
    logoClass: cl.fixedHeaderLogo,
  },
  default: {
    logoLettersClass: cl.img,
    logoClass: cl.logo,
  },
};

const getLogoClasses = (type: TLogoType) => {
  const classes = logoClasses[type] || logoClasses.default;

  return {
    ...classes,
  };
};

const LogoImage = ({
  className,
  src,
  alt,
  isHidden,
}: {
  className: string;
  src: string;
  alt: string;
  isHidden?: boolean;
}) => {
  if (isHidden) return null;

  return <Image className={cn(className)} loading="lazy" src={src} alt={alt} />;
};

interface ILogo {
  logoType: TLogoType;
  isHidden?: boolean;
  targetToHidden?: THideType;
  onClickCb?: () => void;
  logoStyles?: string;
}

const Logo = ({ logoType, isHidden, targetToHidden, onClickCb, logoStyles }: ILogo) => {
  const { logoLettersClass, logoClass, wrapperClass } = getLogoClasses(logoType);

  return (
    <motion.div className={cn(cl.wrapper, wrapperClass)} onClick={onClickCb}>
      <LogoImage
        isHidden={isHidden && targetToHidden === 'logo'}
        className={cn(logoClass, logoStyles)}
        src={logo}
        alt="Логотип ToTo Pizza"
      />
      <LogoImage
        isHidden={isHidden && targetToHidden === 'logoLetters'}
        className={logoLettersClass as string}
        src={logoLetters}
        alt="Куда пицца"
      />
    </motion.div>
  );
};

export default Logo;

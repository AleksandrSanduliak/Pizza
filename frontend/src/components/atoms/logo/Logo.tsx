import logoLetters from 'assets/icons/logo-letters.svg';
import logo from 'assets/icons/pizzaLogo.svg';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
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
  },
  fixedHeader: {
    // logoLettersClass hidden,
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

  return <img className={cn(className)} loading="lazy" src={src} alt={alt} />;
};

const Logo = ({
  logoType,
  isHidden,
  targetToHidden,
  navigateTo,
  onClickCb,
  logoStyles,
}: {
  logoType: TLogoType;
  isHidden?: boolean;
  targetToHidden?: THideType;
  navigateTo?: string;
  onClickCb?: () => void;
  logoStyles?: string;
}) => {
  const { logoLettersClass, logoClass, wrapperClass } =
    getLogoClasses(logoType);

  return (
    <NavLink
      to={navigateTo ?? ''}
      className={cn(cl.wrapper, wrapperClass)}
      onClick={onClickCb}>
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
    </NavLink>
  );
};

export default Logo;

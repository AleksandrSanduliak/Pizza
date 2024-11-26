import Backward from 'atoms/backward/Backward';
import Logo from 'atoms/logo/Logo';
import cn from 'classnames';
import cl from 'molecules/burger/burger.module.scss';
import BurgerContent from 'molecules/burger/BurgerContent';
import BurgerButton from 'molecules/burger/BurgetButton';
import ShoppingBag from 'molecules/shoppingBag/ShoppingBag';
import CategoriesSwiper from 'molecules/swipers/CategoriesSwiper/CategoriesSwiper';
import React from 'react';
import useAccount from 'utils/hooks/useAccount';
import useCheckVisible from 'utils/hooks/useCheckVisible';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import useUserLocation from 'utils/hooks/useUserLocation';
import './header.scss';
import HeaderTop from './HeaderTop/HeaderTop';

const Header = () => {
  const isMobile = useMediaQuery();

  const { isBurgerClick } = useAccount();
  const { isUrlMainPage, userLocation } = useUserLocation();
  const childRef = React.useRef<HTMLElement>(null);
  const [visible] = useCheckVisible(childRef, '0px');

  return (
    <>
      <HeaderTop />
      <header className="header__navWrapper">
        <nav
          className={cn('header__nav', 'header__container', {
            isBurgerClick: cl.burgerContent,
          })}>
          <div className="header__middle">
            <div className="logoWrapper">
              <Backward />
              <Logo
                logoType="header"
                targetToHidden="logoLetters"
                navigateTo={userLocation as string}
              />
            </div>
            {isUrlMainPage && <ShoppingBag />}
            {isMobile && visible && <BurgerButton />}
          </div>
          {isMobile && isBurgerClick && <BurgerContent />}
        </nav>
      </header>
      <div ref={childRef as React.RefObject<HTMLDivElement>} />
      <CategoriesSwiper />
    </>
  );
};

export default Header;

import cn from 'classnames';

import Backward from 'atoms/Backward/Backward';
import Logo from 'atoms/logo/Logo';
import BurgerButton from 'molecules/burger/BurgerButton/BurgerButton';
import BurgerContent from 'molecules/burger/BurgerContent';
import ShoppingBag from 'molecules/ShoppingBag/ShoppingBag';
import useUserLocation from 'utils/hooks/navigation/useUserLocation';
import useAccount from 'utils/hooks/ui/useAccount';
import useMediaQuery from 'utils/hooks/ui/useMediaQuery';

import cl from './HeaderMain.module.scss';

const HeaderLogo = () => {
  const { userLocation } = useUserLocation();

  return (
    <div className={cl.logoWrapper}>
      <Backward />
      <Logo logoType="header" navigateTo={userLocation as string} />
    </div>
  );
};

const HeaderControlBar = () => {
  const { isUrlMainPage } = useUserLocation();
  const isMobile = useMediaQuery();

  return (
    <div className={cl.headerMiddle}>
      <div className="header__container">
        <div className={cl.headerMiddleInner}>
          <HeaderLogo />
          {isUrlMainPage && <ShoppingBag />}
          {isMobile && <BurgerButton />}
        </div>
      </div>
    </div>
  );
};

const HeaderMiddle = () => {
  const isMobile = useMediaQuery();
  const { isBurgerClick } = useAccount();

  return (
    <header className={cl.headerNav}>
      <nav
        className={cn(cl.headerNavWrapper, {
          [cl.headerOverflowScroll]: isBurgerClick,
        })}>
        <HeaderControlBar />
        {isMobile && isBurgerClick && <BurgerContent />}
      </nav>
    </header>
  );
};

export default HeaderMiddle;

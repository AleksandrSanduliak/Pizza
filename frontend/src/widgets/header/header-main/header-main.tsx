'use client';

import cn from 'clsx';
import Link from 'next/link';

import { useUserLocationContext } from '@app/providers/LocationProvider';
import useUserMenu from '@entities/user-menu/useUserMenu';
import ShoppingBag from '@features/shoppingBag/ShoppingBag';
import useMediaQuery from '@shared/hooks/ui/useMediaQuery';
import Logo from '@shared/ui/logo/Logo';
import Backward from '@widgets/header/backward/Backward';
import BurgerButton from '@widgets/user-menu/burger-user-menu/BurgerButton/BurgerButton';
import BurgerContent from '@widgets/user-menu/burger-user-menu/BurgerContent';

import styles from './header-main.module.scss';

const HeaderLogo = () => {
  const { userLocation } = useUserLocationContext();
  const href: string = (userLocation as string) ?? '/';
  return (
    <div className={styles.logoWrapper}>
      <Backward />
      <Link href={href}>
        <Logo logoType="header" />
      </Link>
    </div>
  );
};

const HeaderControlBar = () => {
  const { isUrlMainPage } = useUserLocationContext();
  const isMobile = useMediaQuery();

  return (
    <div className={styles.headerMiddle}>
      <div className="header__container">
        <div className={styles.headerMiddleInner}>
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
  const { isBurgerClick } = useUserMenu();

  return (
    <header className={styles.headerNav}>
      <nav
        className={cn(styles.headerNavWrapper, {
          [styles.headerOverflowScroll]: isBurgerClick,
        })}>
        <HeaderControlBar />
        {isMobile && isBurgerClick && <BurgerContent />}
      </nav>
    </header>
  );
};

export default HeaderMiddle;

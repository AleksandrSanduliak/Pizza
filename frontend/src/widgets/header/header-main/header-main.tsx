'use client';

import cn from 'clsx';
import Link from 'next/link';

import { CityInfo } from '@entities/city/model/city.schema';
import useUserMenu from '@entities/user-menu/useUserMenu';
import ShoppingBag from '@features/shoppingBag/ShoppingBag';
import useMediaQuery from '@shared/hooks/ui/useMediaQuery';
import Logo from '@shared/ui/logo/Logo';
import Backward from '@widgets/header/backward/Backward';
import BurgerButton from '@widgets/user-menu/burger-user-menu/BurgerButton/BurgerButton';
import BurgerContent from '@widgets/user-menu/burger-user-menu/BurgerContent';

import styles from './header-main.module.scss';

const HeaderLogo = () => {
  return (
    <div className={styles.logoWrapper}>
      <Backward />
      <Link href="/">
        <Logo logoType="header" />
      </Link>
    </div>
  );
};

const HeaderMain = ({ data }: { data: CityInfo }) => {
  const isMobile = useMediaQuery();
  const { state } = useUserMenu();

  return (
    <header className={styles.headerNav}>
      <nav
        className={cn(styles.headerNavWrapper, {
          [styles.headerOverflowScroll]: state.isBurgerClicked,
        })}>
        <div className={styles.headerMiddle}>
          <div className="header__container">
            <div className={styles.headerMiddleInner}>
              <HeaderLogo />
              <ShoppingBag />
              {isMobile && <BurgerButton />}
            </div>
          </div>
        </div>
        {isMobile && state.isBurgerClicked && <BurgerContent />}
      </nav>
    </header>
  );
};

export default HeaderMain;

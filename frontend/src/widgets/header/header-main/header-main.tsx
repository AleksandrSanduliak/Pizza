'use client';

import cn from 'clsx';
import Link from 'next/link';

import { CityInfo } from '@entities/city/model/city.schema';
import { userMenuSlice } from '@entities/user-menu/user-menu.slice';
import ShoppingBag from '@features/shoppingBag/ShoppingBag';
import useMediaQuery from '@shared/hooks/ui/useMediaQuery';
import { useAppSelector } from '@shared/store/hooks';
import Logo from '@shared/ui/logo/Logo';
import Backward from '@widgets/header/backward/Backward';
import BurgerButton from '@widgets/user-menu/burger-user-menu/burger-button/burger-button';
import BurgerContent from '@widgets/user-menu/burger-user-menu/burger-content';

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
  const isBurgerClicked = useAppSelector((state) => userMenuSlice.selectors.isBurgerClicked(state));
  return (
    <header className={styles.headerNav}>
      <nav
        className={cn(styles.headerNavWrapper, {
          [styles.headerOverflowScroll]: isBurgerClicked,
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
        {isMobile && isBurgerClicked && <BurgerContent />}
      </nav>
    </header>
  );
};

export default HeaderMain;

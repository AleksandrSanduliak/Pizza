'use client';
import { isServer } from '@tanstack/react-query';
import cn from 'clsx';

import { userMenuSlice } from '@entities/user-menu/user-menu.slice';
import useMediaQuery from '@shared/hooks/ui/useMediaQuery';
import { useAppSelector } from '@shared/store/hooks';
import HeaderChangeCity from '@widgets/header/header-change-city';
import BurgerDrawer from '@widgets/user-menu/burger-user-menu/buger-menu';
import BurgerButton from '@widgets/user-menu/burger-user-menu/burger-button/burger-button';
import BurgerContent from '@widgets/user-menu/burger-user-menu/burger-content';
import UserMenu from '@widgets/user-menu/user-menu/user-menu';

import styles from './header-top.module.scss';

const CafeInformation = () => {
  return (
    <>
      <div className={styles.leftBlock}>
        <p className={cn('mini', styles.delivery)}>
          Среднее время доставки*:
          <br />
          <span className="minibold">00:24:19</span>
        </p>
      </div>
      <div className={styles.rightBlock}>
        <p className={styles.rightBlockText}>
          Время работы:
          <br />с 11:00 до 23:00
        </p>
      </div>
    </>
  );
};

const HeaderTop = ({ cityName }: { cityName: string }) => {
  const isMobile = useMediaQuery();
  const isBurgerClicked = useAppSelector((state) => userMenuSlice.selectors.isBurgerClicked(state));
  return (
    <header className={styles.headerTop}>
      <div className="header__container">
        <div className={styles.headerTopInner}>
          <HeaderChangeCity cityName={cityName} />
          {/* <CafeInformation /> */}
          {/* {isMobile && <BurgerButton />} */}
          {isMobile && <BurgerDrawer />}
          {!isMobile && <UserMenu />}
          {/* {isMobile && isBurgerClicked && <BurgerContent />} */}
        </div>
      </div>
    </header>
  );
};

export default HeaderTop;

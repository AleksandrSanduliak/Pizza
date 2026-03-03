import cn from 'clsx';
import { Suspense } from 'react';

import { CityInfo } from '@entities/city/model/city.schema';
import HeaderChangeCity from '@widgets/header/header-change-city';
import UserMenu from '@widgets/user-menu/user-menu/user-menu';
import UserMenuServer from '@widgets/user-menu/user-menu/user-menu-server';

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

const HeaderTop = ({ data }: { data: CityInfo }) => {
  const { name } = data;
  return (
    <header className={styles.headerTop}>
      <div className="header__container">
        <div className={styles.headerTopInner}>
          <HeaderChangeCity currentCity={name} />
          <CafeInformation />
          {/* <Suspense fallback={<div> ...loading user menu</div>}>
            <UserMenuServer />
          </Suspense> */}
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default HeaderTop;

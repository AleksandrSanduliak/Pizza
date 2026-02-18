'use client';

import cn from 'clsx';
import dynamic from 'next/dynamic';

import useMediaQuery from '@shared/hooks/ui/useMediaQuery';
import FullScreenLoader from '@shared/ui/Loaders/FullScreenLoader/FullScreenLoader';

import styles from './header-top.module.scss';

const ChangeCity = dynamic(() => import('@features/change-city/change-city'), {
  loading: () => <FullScreenLoader />,
  ssr: false,
});
const UserMenu = dynamic(() => import('@widgets/user-menu/user-menu/user-menu'), {
  loading: () => <FullScreenLoader />,
  ssr: false,
});

const CafeInformation = () => {
  const isMatching400px = useMediaQuery(400);

  return (
    <>
      <div className={styles.leftBlock}>
        <p className={cn('mini', styles.delivery)}>
          {isMatching400px ? 'Ср.' : 'Среднее '}время доставки*:
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

const HeaderTop = () => {
  const isMobile = useMediaQuery();

  return (
    <header className={styles.headerTop}>
      <div className="header__container">
        <div className={styles.headerTopInner}>
          <ChangeCity />
          <CafeInformation />
          {!isMobile && <UserMenu />}
        </div>
      </div>
    </header>
  );
};

export default HeaderTop;

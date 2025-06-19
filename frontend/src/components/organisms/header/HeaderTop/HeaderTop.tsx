'use client';
import dynamic from 'next/dynamic';

import cn from 'classnames';

import FullScreenLoader from 'atoms/Loaders/FullScreenLoader/FullScreenLoader';
import useMediaQuery from 'utils/hooks/ui/useMediaQuery';

import cl from './HeaderTop.module.scss';

const ChangeCityBlock = dynamic(() => import('molecules/ChangeCityBlock/ChangeCityBlock'), {
  loading: () => <FullScreenLoader />,
  ssr: false,
});
const Account = dynamic(() => import('organisms/Account/Account'), {
  loading: () => <FullScreenLoader />,
  ssr: false,
});
// const useMediaQuery = dynamic(() => import('utils/hooks/ui/useMediaQuery'), {
//   loading: () => <p>Loading...</p>,
// });
// import ChangeCityBlock from 'molecules/ChangeCityBlock/ChangeCityBlock';
// import Account from 'organisms/Account/Account';

const CafeInformation = () => {
  const isMatching400px = useMediaQuery(400);

  return (
    <>
      <div className={cl.leftBlock}>
        <p className={cn('mini', cl.delivery)}>
          {isMatching400px ? 'Ср.' : 'Среднее '}время доставки*:
          <br />
          <span className="minibold">00:24:19</span>
        </p>
      </div>
      <div className={cl.rightBlock}>
        <p className={cl.rightBlockText}>
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
    <header className={cl.headerTop}>
      <div className="header__container">
        <div className={cl.headerTopInner}>
          <ChangeCityBlock />
          <CafeInformation />
          {!isMobile && <Account />}
        </div>
      </div>
    </header>
  );
};

export default HeaderTop;

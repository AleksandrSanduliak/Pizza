'use client';
import dynamic from 'next/dynamic';

import FullScreenLoader from 'atoms/Loaders/FullScreenLoader/FullScreenLoader';
import withHandleVisibility from 'utils/hoc/withHandleVisibility';
import useAccount from 'utils/hooks/ui/useAccount';

// import HeaderMain from './HeaderMain/HeaderMain';
// import HeaderNavigation from './HeaderNavigation/HeaderNavigation';
// import HeaderTop from './HeaderTop/HeaderTop';
const HeaderTop = dynamic(() => import('./HeaderTop/HeaderTop'), {
  loading: () => <FullScreenLoader />,
  ssr: false,
});
const HeaderMain = dynamic(() => import('./HeaderMain/HeaderMain'), {
  loading: () => <FullScreenLoader />,
  ssr: false,
});
const HeaderNavigation = dynamic(() => import('./HeaderNavigation/HeaderNavigation'), {
  loading: () => <FullScreenLoader />,
  ssr: false,
});

const Header = () => {
  const { isBurgerClick } = useAccount();
  const EnchantedHeaderNavigation = withHandleVisibility(HeaderNavigation);

  return (
    <>
      <HeaderTop />
      <HeaderMain />
      {!isBurgerClick && <EnchantedHeaderNavigation />}
    </>
  );
};

export default Header;

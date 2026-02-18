'use client';

import dynamic from 'next/dynamic';

import withHandleVisibility from '@shared/hoc/withHandleVisibility';
import FullScreenLoader from '@shared/ui/Loaders/FullScreenLoader/FullScreenLoader';
import useUserMenu from '@entities/user-menu/useUserMenu';

const HeaderTop = dynamic(() => import('./header-top/header-top'), {
  loading: () => <FullScreenLoader />,
  ssr: false,
});
const HeaderMain = dynamic(() => import('./header-main/header-main'), {
  loading: () => <FullScreenLoader />,
  ssr: false,
});
const HeaderNavigation = dynamic(() => import('./header-navigation/header-navigation'), {
  loading: () => <FullScreenLoader />,
  ssr: false,
});

const EnchantedHeaderNavigation = withHandleVisibility(HeaderNavigation);

const Header = () => {
  const { isBurgerClick } = useUserMenu();

  return (
    <>
      <HeaderTop />
      <HeaderMain />
      {!isBurgerClick && <EnchantedHeaderNavigation />}
    </>
  );
};

export default Header;

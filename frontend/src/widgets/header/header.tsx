'use client';

import dynamic from 'next/dynamic';

import useUserMenu from '@entities/user-menu/useUserMenu';
import withHandleVisibility from '@shared/hoc/withHandleVisibility';
import FullScreenLoader from '@shared/ui/Loaders/FullScreenLoader/FullScreenLoader';

const HeaderTop = dynamic(() => import('./header-top/header-top'), {
  loading: () => <FullScreenLoader />,
  ssr: false,
});
const HeaderMain = dynamic(() => import('./header-main/header-main'), {
  loading: () => <FullScreenLoader />,
  ssr: false,
});

interface HeaderData {
  city: string;
  id: number;
  isActive: boolean;
  name: string;
  restaurants: [];
  url: string;
}
const Header = ({ data }: { data: HeaderData }) => {
  console.log('data', data);

  return (
    <>
      <HeaderTop />
      <HeaderMain />
    </>
  );
};

export default Header;

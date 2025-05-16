import withHandleVisibility from 'utils/hoc/withHandleVisibility';
import useAccount from 'utils/hooks/ui/useAccount';

import HeaderMain from './HeaderMain/HeaderMain';
import HeaderNavigation from './HeaderNavigation/HeaderNavigation';
import HeaderTop from './HeaderTop/HeaderTop';

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

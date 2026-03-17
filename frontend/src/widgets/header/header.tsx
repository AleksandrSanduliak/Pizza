import HeaderMain from '@widgets/header/header-main/header-main';
import HeaderTop from '@widgets/header/header-top/header-top';

const Header = ({ cityName }: { cityName: string }) => {
  return (
    <>
      <HeaderTop cityName={cityName} />
      {/* <HeaderMain /> */}
    </>
  );
};

export default Header;

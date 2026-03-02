import { CityInfo } from '@entities/city/city.schema';
import HeaderMain from '@widgets/header/header-main/header-main';
import HeaderTop from '@widgets/header/header-top/header-top';

const Header = ({ data }: { data: CityInfo }) => {
  console.log('data', data);

  return (
    <>
      <HeaderTop data={data} />
      <HeaderMain data={data} />
    </>
  );
};

export default Header;

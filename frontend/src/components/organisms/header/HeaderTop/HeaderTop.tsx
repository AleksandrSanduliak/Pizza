import CityModal from 'molecules/CityModal/CityModal';
import Account from 'organisms/account/Account';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import cl from './HeaderTop.module.scss';

const HeaderTop = () => {
  const isMobile = useMediaQuery();
  const matching400px = useMediaQuery(400);

  return (
    <header className="header">
      <div className="HeaderTop">
        <div className="header__container">
          <div className={cl.headerTop}>
            <CityModal />
            <div className={cl.leftBlock}>
              <p className={cl.delivery}>
                {matching400px ? 'Ср.' : 'Среднее '}время доставки*:
                <br />
                <span className="bold-span">00:24:19</span>
              </p>
            </div>
            <div className={cl.rightBlock}>
              <p className={cl.text}>
                Время работы:
                <br />с 11:00 до 23:00
              </p>
            </div>
            {!isMobile && <Account />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderTop;

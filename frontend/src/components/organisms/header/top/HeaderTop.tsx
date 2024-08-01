import cl from "./HeaderTop.module.scss";
import { HashLink } from "react-router-hash-link";
import Account from "organisms/account/Account";
import CityModal from "molecules/select/CityModal";

const HeaderTop = () => {
  return (
    <div className="HeaderTop">
      <div className="header__container">
        <div className={cl.HeaderTop}>
          <CityModal />
          <div className={cl.HeaderTop_leftblock}>
            <HashLink
              className={cl.HeaderTop_leftblock__checkaddress}
              smooth
              to={`/#checkaddress`}
            >
              Проверить адрес
            </HashLink>
            <p className={cl.HeaderTop_leftblock__delivery}>
              Среднее время доставки*:
              <span className="bold-span">00:24:19</span>
            </p>
          </div>
          <div className={cl.HeaderTop_rightblock}>
            <p className={cl.HeaderTop_rightblock__text}>
              Время работы: с 11:00 до 23:00
            </p>
          </div>
          <Account />
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;

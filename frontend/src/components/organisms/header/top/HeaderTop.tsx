import React, { Suspense } from "react";
const LazyDropdown = React.lazy(() => import("molecules/dropdown/Dropdown"));
import "./HeaderTop.scss";
import { HashLink } from "react-router-hash-link";
import Account from "molecules/account/Account";
const HeaderTop = () => {
  // console.log(user, "user data account");
  // console.log(userdata, "user data account");
  console.log("headerTop render");

  return (
    <div className="HeaderTop">
      <Suspense fallback={<div>...Loading Citys</div>}>
        <LazyDropdown />
      </Suspense>
      <div className="HeaderTop-leftblock">
        <HashLink
          className="HeaderTop-leftblock--checkaddress"
          smooth
          to={`/#checkaddress`}
        >
          Проверить адрес
        </HashLink>
        <p className="HeaderTop-leftblock--delivery">
          Среднее время доставки*:<span className="bold-span">00:24:19</span>
        </p>
      </div>
      <div className="HeaderTop-rightblock">
        <p className="HeaderTop-rightblock--text">
          Время работы: с 11:00 до 23:00
        </p>
      </div>
      <Account />
    </div>
  );
};

export default HeaderTop;

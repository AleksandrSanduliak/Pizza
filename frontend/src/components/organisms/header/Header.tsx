import Logo from "atoms/logo/Logo";
import ShoppingBag from "molecules/shoppingBag/ShoppingBag";
import Account from "organisms/account/Account";
import Burger from "molecules/burger/Burger";
import "./header.scss";
import HeaderTop from "./top/HeaderTop";

import Categories from "molecules/cart/Categories";
import RegisterForm from "molecules/forms/registerForm/RegisterForm";
import LoginContent from "molecules/loginContent/LoginContent";
import cl from "molecules/burger/burger.module.scss";
import useMediaQuery from "utils/hooks/useMediaQuery";
import NavMiddle from "./navMiddle/NavMiddle";

import useAccount from "utils/hooks/useAccount";

import BurgerContent from "molecules/burgerContent/BurgerContent";
import ShopCartModal from "molecules/modals/ShoppingCartModal/ShopCartModal";
import Backward from "atoms/backward/Backward";
import { useLocation } from "react-router-dom";

const Header = () => {
  const [isMobile] = useMediaQuery();
  const { isAccountClick, isRegisterClick, isBurgerClick, isShoppingBagClick } =
    useAccount();
  const location = useLocation();
  // console.log("isAccountClick", isAccountClick);
  // console.log("isRegisterClick", isRegisterClick);
  // console.log("isBurgerClick", isBurgerClick);

  // isAccountClick ||
  // isBurgerClick ||
  // isShoppingBagClick ||
  // (isAccountClick && isBurgerClick)
  //   ? addOverflowBody()
  //   : removeOverflowBody();

  return (
    <>
      <header className="header">
        <HeaderTop />
      </header>
      <div className="header__navWrapper">
        <nav
          className={`header__nav  header__container ${
            isBurgerClick && cl.burgerContent
          }`}
        >
          {/* <div className="header__middle">
            <div className="logoWrapper">
              <Backward />
              <Logo headerVisible={true} />
            </div>
            <NavMiddle />
            {location.pathname === "/" && <ShoppingBag />}
            <Burger />
          </div> */}
          <div
            className={`${cl.burger__inner} ${
              isBurgerClick ? cl.inner__active : ""
            }`}
          >
            <div className={cl.burger__accountWrap}>
              {!isMobile && <Account />}
              {isMobile && !isShoppingBagClick && !isAccountClick && (
                <Account />
              )}
            </div>
            {/* 
            <div className={cl.burgerContent}>
              {isAccountClick && isMobile && isRegisterClick && (
                <div className={cl.modalContainer}>
                  <RegisterForm />
                </div>
              )}
              {isAccountClick && isMobile && !isRegisterClick && (
                <div className={cl.modalContainer}>
                  <LoginContent />
                </div>
              )}
              {!isAccountClick && isMobile && !isRegisterClick && (
                <BurgerContent />
              )}
            </div> */}
          </div>
        </nav>
      </div>
      {/* <Categories /> */}
    </>
  );
};

export default Header;

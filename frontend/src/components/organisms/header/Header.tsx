import Backward from 'atoms/backward/Backward';
import Logo from 'atoms/logo/Logo';
import cn from 'classnames';
import Burger from 'molecules/burger/Burger';
import cl from 'molecules/burger/burger.module.scss';
import BurgerContent from 'molecules/burgerContent/BurgerContent';
import Categories from 'molecules/cart/Categories';
import RegisterForm from 'molecules/forms/registerForm/RegisterForm';
import Login from 'molecules/Login/Login';
import ShopCartModal from 'molecules/modals/ShoppingCartModal/ShopCartModal';
import ShoppingBag from 'molecules/shoppingBag/ShoppingBag';
import Account from 'organisms/account/Account';
import React from 'react';
import { useLocation } from 'react-router-dom';
import useAccount from 'utils/hooks/useAccount';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import './header.scss';
import HeaderTop from './HeaderTop/HeaderTop';
import NavMiddle from './NavMiddle/NavMiddle';

const Header = () => {
  const isMobile = useMediaQuery();
  const { isAccountClick, isRegisterClick, isBurgerClick, isShoppingBagClick } =
    useAccount();
  const location = useLocation();

  return (
    <>
      {/* <header className="header"> */}
      <HeaderTop />
      {/* </header> */}
      <header className="header__navWrapper">
        <nav
          className={cn('header__nav', 'header__container', {
            isBurgerClick: cl.burgerContent,
          })}>
          <div className="header__middle">
            <div className="logoWrapper">
              <Backward />
              <Logo headerVisible={true} />
            </div>
            <NavMiddle />
            {location.pathname === '/' && <ShoppingBag />}
            <Burger />
          </div>
          <div
            className={`${cl.burger__inner} ${
              isBurgerClick ? cl.inner__active : ''
            }`}>
            <div className={cl.burger__accountWrap}>
              {!isMobile && <Account />}
              {isMobile && !isShoppingBagClick && !isAccountClick && (
                <Account />
              )}
            </div>

            <div className={cl.burgerContent}>
              {isAccountClick && isMobile && isRegisterClick && (
                <div className={cl.modalContainer}>
                  <RegisterForm />
                </div>
              )}
              {isAccountClick && isMobile && !isRegisterClick && (
                <div className={cl.modalContainer}>
                  <Login />
                </div>
              )}
              {!isAccountClick && isMobile && !isRegisterClick && (
                <BurgerContent />
              )}
            </div>
          </div>
        </nav>
      </header>
      {/* <Categories /> */}
    </>
  );
};

export default Header;

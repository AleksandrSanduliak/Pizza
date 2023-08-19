import React from "react";
import "./header.scss";
import HeaderTop from "./top/HeaderTop";
import Nav from "../../molecules/nav/Nav";
import ShoppingBag from "../../molecules/shoppingBag/ShoppingBag";
import Logo from "../../atoms/logo/Logo";

const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <HeaderTop />
        <div className="header__middle">
          <Logo />
          <Nav />
          <ShoppingBag />
        </div>
      </div>
    </header>
  );
};

export default Header;

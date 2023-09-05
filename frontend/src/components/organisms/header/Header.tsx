import React from "react";
import "./header.scss";
import HeaderTop from "./top/HeaderTop";
import Nav from "molecules/nav/Nav";
import ShoppingBag from "molecules/shoppingBag/ShoppingBag";
import Logo from "atoms/logo/Logo";
import Burger from "organisms/burger/Burger";
import Account from "molecules/account/Account";
import cl from "organisms/burger/burger.module.scss";
import { selectorApp } from "store/store";
import Contacts from "molecules/contacts/Contacts";
import { BurgerCategories } from "utils/data/burgerCategories";
const Header = () => {
  console.log("header render");
  const isOpen = selectorApp((state) => state.reducer.isOpen.isOpen);
  const MemoList = React.useMemo(() => {
    console.log("render list");
    return (
      <ul className={cl.burger__list}>
        {BurgerCategories.map((el) => {
          return <li key={el.name}>{el.name}</li>;
        })}
      </ul>
    );
  }, [BurgerCategories]);
  return (
    <header className={`header ${isOpen ? "fixed-header" : ""}`}>
      <div className="header__container">
        <HeaderTop />
        <div className="header__middle">
          <Logo />
          <Nav />
          <ShoppingBag />
          <Burger />
        </div>
        <div
          className={`${cl.burger__inner} ${isOpen ? cl.inner__active : ""}`}
        >
          <div className={cl.burger__accountWrap}>
            <Account />
          </div>

          <nav className={cl.burger__nav}>{MemoList}</nav>

          <div className={cl.burger__contacts}>
            <Contacts />
          </div>
          <div className={cl.burger__footer}>
            Время работы: с 11:00 до 23:00
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

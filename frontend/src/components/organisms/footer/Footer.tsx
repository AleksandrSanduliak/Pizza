import React from "react";
import cl from "./footer.module.scss";
import Contacts from "molecules/contacts/Contacts";
import { BurgerCategories } from "utils/data/burgerCategories";
import Logo from "atoms/logo/Logo";
const Footer = () => {
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
    <footer className="footer">
      <div className="footer__container">
        <div className={cl.footer__inner}>
          <div className={cl.footer__logo}>
            <Logo />© Copyright 2021 — Куда Пицца
          </div>
          {MemoList}
          <div>
            <p className={cl.footer__title}>Контакты</p>
            <Contacts />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import cl from "./burger.module.scss";
import { BurgerCategories } from "../../../utils/data/burgerCategories";
// import Account from "../../molecules/account/Account";
// import { stopBubling } from "../../../utils/funcs/stopBubling";
// import Contacts from "../../molecules/contacts/Contacts";
import { setCloseBurger, setOpenBurger } from "../../../store/burgerSlice";
import { dispatchApp, selectorApp } from "../../../store/store";
import { useDispatch } from "react-redux";
const Burger = React.memo(() => {
  const dispatch = useDispatch();
  const isOpenStatus = selectorApp((state) => state.reducer.isOpen.isOpen);
  const handleOpen = () => {
    console.log("render fn");
    console.log(isOpenStatus);
    if (isOpenStatus) {
      dispatch(setCloseBurger());
      document.body.style.overflowY = "visible";
    } else {
      dispatch(setOpenBurger());
      document.body.style.overflowY = "hidden";
    }
  };

  console.log("Burger render");

  return (
    <div
      className={`${cl.burger} ${isOpenStatus ? cl.burger_active : ""}`}
      aria-label={
        isOpenStatus ? "Закрыть главное меню" : "Открыть главное меню"
      }
      onClick={handleOpen}
    >
      <span className={cl.line}></span>
    </div>
  );
});

export default Burger;

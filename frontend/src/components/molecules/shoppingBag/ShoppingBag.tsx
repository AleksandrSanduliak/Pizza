import React from "react";
import { Button } from "../../atoms/button/Button";
import cl from "./shoppingbag.module.scss";
const ShoppingBag = () => {
  return (
    <div className={cl.shoppingbag}>
      <Button primary={true}>0 ₽</Button>
    </div>
  );
};

export default ShoppingBag;

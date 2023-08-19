import React from "react";
import cl from "./checkadress.module.scss";
import { Button } from "../../atoms/button/Button";
const CheckAdress = () => {
  return (
    <section className={cl.checkadress}>
      <p>Проверить адрес доставки</p>
      <input placeholder="Адрес" />
      <Button primary={true}>Проверить</Button>
    </section>
  );
};

export default CheckAdress;

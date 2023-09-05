import React from "react";
import cl from "./checkadress.module.scss";
import { Button } from "atoms/button/Button";
import { YMaps, Map } from "@pbe/react-yandex-maps";
const CheckAdress = () => {
  console.log("CheckAdres render");
  return (
    <section className={cl.checkadress} id="checkaddress">
      <p>Проверить адрес доставки</p>
      <input placeholder="Адрес" className="input" />
      <Button primary={true}>Проверить</Button>
    </section>
  );
};

export default CheckAdress;

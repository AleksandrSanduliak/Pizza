import React from "react";

// import { Button } from "atoms/button/Button";
import cl from "./checkadress.module.scss";

import { YMaps, withYMaps } from "react-yandex-maps";

const Button = (props) => {
  const { ymaps } = props;
  const onClick = async () => {
    if (ymaps) {
      const data = await ymaps.SuggestView("1671141286");
      console.log(data);
    }
  };

  return <button onClick={onClick}> get </button>;
};

const ButtonWithYMap = withYMaps(Button, true);
const CheckAdress = () => {
  return (
    <>
      <YMaps
        query={{
          apikey: "ca13e5b7-6cd4-430e-9943-3a37419ee06e",
        }}
      >
        <ButtonWithYMap />
      </YMaps>
    </>
  );
};
export default CheckAdress;

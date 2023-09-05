import React, { FC } from "react";
import "./dropdown.scss";
import Loc from "assets/icons/isLogo.svg";
import Select from "react-select";
// import Icons from "../../atoms/icons/Icons";
type itemObj = {
  value: string;
  label: string;
};
interface Dropdown {
  isIcon?: boolean;
  items?: itemObj[] | null | undefined;
}
const Dropdown: FC<Dropdown> = ({ isIcon = true }) => {
  console.log("dropdown render");
  const [items, setItems] = React.useState([
    { value: "Москва", label: "Москва" },
    { value: "Санкт-Петербург", label: "Санкт-Петербург" },
    { value: "Сочи", label: "Сочи" },
    { value: "Калининград", label: "Калининград" },
    { value: "Тюмень", label: "Тюмень" },
    { value: "Астрахань", label: "Астрахань" },
    { value: "Новосибирск", label: "Новосибирск" },
  ]);
  const Selected: FC<Dropdown> = ({ items }) => {
    if (!items) {
      console.log(new Error("Ошибка отсутствия городов"));
      const alert = "Города не найдены";
      return (
        <Select
          defaultValue={alert}
          className="dropdown-select"
          classNamePrefix="dropdown-select"
          options={[alert]}
        />
      );
    }
    return (
      <div className="dropdown-wrapper">
        {isIcon ? (
          <img className="icon" src={Loc} alt="Иконка локации"></img>
        ) : (
          false
        )}
        <Select
          defaultValue={items[0]}
          className="dropdown-select"
          classNamePrefix="dropdown-select"
          options={items}
        />
      </div>
    );
  };

  return (
    <div className="dropdown">
      <Selected items={items} />
    </div>
  );
};

export default React.memo(Dropdown);

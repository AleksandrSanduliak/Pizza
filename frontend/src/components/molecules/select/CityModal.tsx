import React, { FC } from "react";
import Loc from "assets/icons/isLogo.svg";
import useGeo from "utils/hooks/useGeo";
import crosshair from "assets/icons/cart-cross.svg";
import { getCookie, setCookie, strToObj } from "utils/funcs/cookie";
import Modal from "molecules/modals/Modal/Modal";
import cl from "./CityModal.module.scss";

const citys = [
  "Москва",
  "Санкт-Петербург",
  "Сочи",
  "Калининград",
  "Тюмень",
  "Астрахань",
  "Новосибирск",
];

const cityList = {
  Moscow: {},
};

const CityModal: FC = () => {
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const userLocation = getCookie("location");

  const [actualLocation, setActualLocation] = React.useState(
    userLocation ? JSON.parse(userLocation) : ""
  );

  React.useEffect(() => {
    if (!userLocation && !actualLocation) {
      setIsOpenModal(true);
      return;
    }
  }, [actualLocation, userLocation]);

  const onChangeLocation = (city: string) => {
    setActualLocation(city);
    setCookie("location", JSON.stringify(city), 30);
  };

  return (
    <div className={cl.SelectWrapper}>
      <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal}>
        <div className={cl.modalWrapper}>
          <div className={cl.modal}>
            {actualLocation && (
              <img
                width="32px"
                height="32px"
                src={crosshair}
                alt={`Кнопка закрытия окна`}
                className={cl.crosshair}
                onClick={() => setIsOpenModal(false)}
              />
            )}
            <h1 className={`h1 ${cl.modalTitle}`}>Выберите город</h1>
            <ul className={cl.list}>
              {citys.map((item) => {
                return (
                  <li
                    className={`bigtext ${cl.listItem}`}
                    key={item}
                    onClick={() => onChangeLocation(item)}
                  >
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Modal>

      <div className={cl.content}>
        <img className="icon" src={Loc} loading="lazy" alt="Иконка локации" />
        <span
          onClick={() => setIsOpenModal((prev) => !prev)}
          className={`bigtext ${cl.location}`}
        >
          {actualLocation}
        </span>
      </div>
    </div>
  );
};

export default CityModal;

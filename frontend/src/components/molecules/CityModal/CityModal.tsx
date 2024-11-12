import crosshair from 'assets/icons/cart-cross.svg';
import Loc from 'assets/icons/isLogo.svg';
import Modal from 'molecules/modals/Modal/Modal';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { getUserCity } from 'store/slices/citySlice';
import { setCookie } from 'utils/funcs/cookie';
import { useAppDispatch, useAppSelector } from 'utils/hooks/redux';
import cl from './CityModal.module.scss';

export const cityInfo = [
  {
    name: 'moscow',
    title: 'Москва',
    url: `${import.meta.env.VITE_CLIENT_URL}/moscow`,
  },
  {
    name: 'stpetersburg',
    title: 'Санкт-Петербург',
    url: `${import.meta.env.VITE_CLIENT_URL}/stpetersburg`,
  },
];

const CityModal: FC = () => {
  const dispatch = useAppDispatch();
  const actualLocation = useAppSelector(
    (state) => state.reducer.userCity.currentCity,
  );
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  React.useEffect(() => {
    if (actualLocation === undefined || actualLocation === null) {
      setIsOpenModal(true);
    } else {
      setIsOpenModal(false);
    }
  }, [actualLocation]);

  const onChangeLocation = (city: string) => {
    setCookie('location', city, 30);
    dispatch(getUserCity(city));
    setIsOpenModal(false);
  };

  const isActiveCity = cityInfo.find(
    (item) => item.name === actualLocation,
  )?.title;
  return (
    <div className={cl.cityModal}>
      <Modal
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        disableFadeClick={!actualLocation}>
        <div className={cl.modalWrapper}>
          <div className={cl.modal}>
            {actualLocation && (
              <img
                width="32px"
                height="32px"
                src={crosshair}
                alt="Кнопка закрытия окна"
                className={cl.crosshair}
                onClick={() => setIsOpenModal(false)}
              />
            )}
            <h1 className={`h1 ${cl.modalTitle}`}>Выберите город</h1>
            <ul className={cl.list}>
              {cityInfo.map((item) => {
                return (
                  <Link
                    to={item.url}
                    className={`bigtext ${cl.listItem} ${
                      isActiveCity === item.title && cl.isActive
                    }`}
                    key={item.name}
                    onClick={() => onChangeLocation(item.name)}>
                    {item.title}
                  </Link>
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
          className={`bigtext ${cl.location}`}>
          {isActiveCity ?? 'Выберите город'}
        </span>
      </div>
    </div>
  );
};

export default CityModal;

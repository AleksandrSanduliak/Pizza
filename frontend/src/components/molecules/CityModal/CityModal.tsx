import React, { FC } from 'react';
import Loc from 'assets/icons/isLogo.svg';
import crosshair from 'assets/icons/cart-cross.svg';
import { getCookie, setCookie } from 'utils/funcs/cookie';
import Modal from 'molecules/modals/Modal/Modal';
import cl from './CityModal.module.scss';
import { Link } from 'react-router-dom';
import { getUserCity } from 'store/slices/citySlice';
import { useAppDispatch, useAppSelector } from 'utils/hooks/redux';

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
  const userLocation = getCookie('location');

  React.useEffect(() => {
    dispatch(getUserCity(userLocation));
  }, [dispatch, getUserCity]);

  React.useEffect(() => {
    if (userLocation === undefined || userLocation === null) {
      setIsOpenModal(true);
    } else {
      setIsOpenModal(false);
    }
  }, [userLocation]);

  const onChangeLocation = (city: string) => {
    setCookie('location', city, 30);
    dispatch(getUserCity(city));
    setIsOpenModal(false);
  };

  const isActiveCity = cityInfo.find(
    (item) => item.name === actualLocation,
  )?.title;
  console.log('!!actualLocation', !actualLocation);
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
                alt={`Кнопка закрытия окна`}
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
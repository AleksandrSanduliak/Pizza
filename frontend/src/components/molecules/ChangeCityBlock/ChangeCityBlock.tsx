import React, { FC } from 'react';

import cn from 'classnames';
import { Link } from 'react-router-dom';

import crosshair from 'assets/icons/crosshairs/cart-cross.svg';
import Loc from 'assets/icons/isLogo.svg';
import FullPageModal from 'molecules/modals/ReusableAbstractModals/Modal/Modal';
import { getUserCity } from 'store/slices/citySlice';
import { cityInfo } from 'utils/consts/cityInfo';
import { setCookieAndDispatch } from 'utils/funcs/setCookieAndDispatchUserLocation';
import useUserLocation from 'utils/hooks/navigation/useUserLocation';
import { useAppDispatch } from 'utils/hooks/redux';
import { TUserCityName, TUserLocation } from 'utils/types/appNavigation';

import cl from './ChangeCityBlock.module.scss';

const CityList = ({
  userCityName,
  cb,
}: {
  userCityName: TUserCityName;
  cb: (name: string) => void;
}) => {
  return (
    <ul className={cl.list}>
      {cityInfo.map((item) => {
        return (
          <Link
            to={item.url}
            className={cn('bigtext', cl.listItem, {
              [cl.isActive]: userCityName === item.title,
            })}
            key={item.name}
            onClick={() => cb(item.name)}>
            {item.title}
          </Link>
        );
      })}
    </ul>
  );
};

const CityModal = ({
  userCityName,
  userLocation,
  isOpenModal,
  setIsOpenModal,
}: {
  userCityName: TUserCityName;
  userLocation: TUserLocation;
  isOpenModal: boolean;
  setIsOpenModal: (isOpen: boolean) => void;
}) => {
  const dispatch = useAppDispatch();
  const onChangeLocation = (city: string) => {
    setCookieAndDispatch(city, dispatch, getUserCity);
    setIsOpenModal(false);
  };
  const handleCloseModal = () => setIsOpenModal(false);

  return (
    <FullPageModal isOpen={isOpenModal} onClose={handleCloseModal} disableFadeClick={!userLocation}>
      <div className={cl.modalWrapper}>
        <div className={cl.modal}>
          {userLocation && (
            <img
              loading="lazy"
              width="32px"
              height="32px"
              src={crosshair}
              alt="Кнопка закрытия окна"
              className={cl.crosshair}
              onClick={() => setIsOpenModal(false)}
            />
          )}
          <h1 className={cn('h1', cl.modalTitle)}>Выберите город</h1>
          <CityList userCityName={userCityName} cb={onChangeLocation} />
        </div>
      </div>
    </FullPageModal>
  );
};

const ActualUserLocation = ({
  userCityName,
  cb,
}: {
  userCityName: TUserCityName;
  cb: () => void;
}) => {
  return (
    <div className={cl.content}>
      <img className="icon" src={Loc} loading="lazy" alt="Иконка локации" />
      <span onClick={() => cb()} className={cn('bigtext', cl.location)}>
        {userCityName ?? 'Выберите город'}
      </span>
    </div>
  );
};

const ChangeCityBlock: FC = () => {
  const { userCityName, userLocation } = useUserLocation();
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  React.useEffect(() => {
    if (userLocation === undefined || userLocation === null) {
      setIsOpenModal(true);
    } else {
      setIsOpenModal(false);
    }
  }, [userLocation]);

  const toggleModal = () => setIsOpenModal((prev) => !prev);

  return (
    <div className={cl.cityModal}>
      {isOpenModal && (
        <CityModal
          userCityName={userCityName}
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          userLocation={userLocation}
        />
      )}
      <ActualUserLocation userCityName={userCityName} cb={toggleModal} />
    </div>
  );
};

export default ChangeCityBlock;

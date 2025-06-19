'use client';
import React, { FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import cn from 'classnames';

import { useUserLocationContext } from 'app/providers/LocationProvider';
import FullPageModal from 'molecules/modals/views/Modal/Modal';
import crosshair from 'public/icons/crosshairs/cart-cross.svg';
import logo from 'public/icons/isLogo.svg';
import { cityInfo } from 'utils/consts/cityInfo';
import { setCookie } from 'utils/funcs/cookie2';
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
        console.log('item', item);
        return (
          <Link
            href={item.url}
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
  startTransition,
}: {
  userCityName: TUserCityName;
  userLocation: TUserLocation;
  isOpenModal: boolean;
  setIsOpenModal: (isOpen: boolean) => void;
  startTransition;
}) => {
  const router = useRouter();
  const onChangeLocation = (city: string) => {
    startTransition(() => {
      console.log('city 123', city);
      setCookie({ name: 'location', value: city, expiresType: 'days', expiresValue: 30 });
      setIsOpenModal(false);
      router.push(city);
    });
  };
  const handleCloseModal = () => setIsOpenModal(false);

  return (
    <FullPageModal isOpen={isOpenModal} onClose={handleCloseModal} disableFadeClick={!userLocation}>
      <div className={cl.modalWrapper}>
        <div className={cl.modal}>
          {userLocation && (
            <Image
              src={crosshair.src}
              alt="Кнопка закрытия окна"
              width={32}
              height={32}
              onClick={() => setIsOpenModal(false)}
              className={cl.crosshair}
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
      <Image src={logo.src} alt="Иконка локации" width={24} height={24} className="icon" />
      <span onClick={() => cb()} className={cn('bigtext', cl.location)}>
        {userCityName ?? 'Выберите город'}
      </span>
    </div>
  );
};

const ChangeCityBlock: FC = () => {
  const { userCityName, userLocation } = useUserLocationContext();
  console.log('userCityName', userCityName);

  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [isChange, startTransition] = React.useTransition();
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
          startTransition={startTransition}
        />
      )}
      <ActualUserLocation userCityName={userCityName} cb={toggleModal} />
    </div>
  );
};

export default ChangeCityBlock;

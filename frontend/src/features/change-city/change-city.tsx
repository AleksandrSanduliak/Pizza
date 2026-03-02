'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useState } from 'react';

import { CitiesList, type CityList } from '@entities/city/client-api';
import { setCookie } from '@shared/funcs/cookie2';
import { CityData } from '@shared/interfaces/city';
import { TUserCityName } from '@shared/types/appNavigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@shared/ui/dialog';
import { cn } from '@shared/utils/shadcn-utils';

import styles from './change-city.module.scss';

const CityList = ({
  userCityName,
  cityList,
  cb,
}: {
  userCityName: TUserCityName;
  cityList: CityList;
  cb: (name: string) => void;
}) => {
  return (
    <ul className={styles.list}>
      {cityList?.length > 0 &&
        cityList.map((item: CityData) => {
          console.log('item', item);
          return (
            <Link
              href={item.url}
              className={cn('bigtext', styles.listItem, {
                [styles.isActive]: userCityName === item.name,
              })}
              key={item.city}
              onClick={() => cb(item.city)}>
              {item.name}
            </Link>
          );
        })}
    </ul>
  );
};

function ChangeCity({
  currentCity,
  isOpenModal = false,
  buttonSlot,
  cityList,
  renderPropButton,
}: {
  currentCity: string;
  isOpenModal?: boolean;
  cityList: CitiesList;
  buttonSlot?: React.ReactNode;
  renderPropButton?: (setIsOpen: React.Dispatch<React.SetStateAction<boolean>>) => ReactNode;
}) {
  console.log('cityList', cityList);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(isOpenModal);
  const onChangeLocation = (city: string) => {
    console.log('city 123', city);
    setCookie({ name: 'location', value: city, expiresType: 'days', expiresValue: 30 });
    router.push(city);
  };
  return (
    <div className={styles.cityModal}>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        {buttonSlot}
        {renderPropButton && renderPropButton(setIsOpen)}
        <DialogContent className="min-h-[15rem] bg-white">
          <DialogHeader>
            <DialogTitle className="mt-4">
              <p className="h1 text-center">Выберите город</p>
            </DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <CityList cityList={cityList} userCityName={currentCity} cb={onChangeLocation} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default ChangeCity;

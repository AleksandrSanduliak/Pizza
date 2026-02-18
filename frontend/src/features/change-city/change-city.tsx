'use client';

import cn from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';

import { useUserLocationContext } from '@app/providers/LocationProvider';
import { cityInfo } from '@shared/consts/cityInfo';
import { setCookie } from '@shared/funcs/cookie2';
import { TUserCityName } from '@shared/types/appNavigation';
import { Button } from '@shared/ui/button/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@shared/ui/dialog';
import logo from 'public/icons/isLogo.svg';

import styles from './change-city.module.scss';

const CityList = ({
  userCityName,
  cb,
}: {
  userCityName: TUserCityName;
  cb: (name: string) => void;
}) => {
  return (
    <ul className={styles.list}>
      {cityInfo.map((item) => {
        console.log('item', item);
        return (
          <Link
            href={item.url}
            className={cn('bigtext', styles.listItem, {
              [styles.isActive]: userCityName === item.title,
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

const ActualUserLocation = ({ userCityName }: { userCityName: TUserCityName }) => {
  return (
    <div className="flex items-center">
      <Image src={logo.src} alt="Иконка локации" width={24} height={24} className="icon" />
      <span className={cn('bigtext', styles.location)}>{userCityName ?? 'Выберите город'}</span>
    </div>
  );
};

const ChangeCity: FC = () => {
  const { userSelectedCityName } = useUserLocationContext();
  const router = useRouter();
  const onChangeLocation = (city: string) => {
    console.log('city 123', city);
    setCookie({ name: 'location', value: city, expiresType: 'days', expiresValue: 30 });
    router.push(city);
  };
  return (
    <div className={styles.cityModal}>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <ActualUserLocation userCityName={userSelectedCityName} />
          </Button>
        </DialogTrigger>
        <DialogContent className="min-h-[15rem] bg-white">
          <DialogHeader>
            <DialogTitle className="mt-4">
              <p className="h1 text-center">Выберите город</p>
              <DialogDescription />
            </DialogTitle>
          </DialogHeader>

          <CityList userCityName={userSelectedCityName} cb={onChangeLocation} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChangeCity;

'use client';

import { useQuery } from '@tanstack/react-query';
import cn from 'clsx';
// import { Link } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

import { CITY_API_URL } from '@shared/api/api-list';
import { axiosInstance } from '@shared/api/axios';
import { setCookie } from '@shared/funcs/cookie2';
import { CityData } from '@shared/interfaces/city';
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

const UseCityList = () => {
  return useQuery({
    queryKey: [],
    queryFn: async () => {
      const cityListResponse = await axiosInstance(`${CITY_API_URL}/cityList`, {
        withCredentials: false,
      });
      console.log('cityListResponse', cityListResponse);
      return cityListResponse.data;
    },
    retry: false,
  });
};

const CityList = ({
  userCityName,
  cb,
}: {
  userCityName: TUserCityName;
  cb: (name: string) => void;
}) => {
  const { data: cityList, isError, isLoading, error } = UseCityList();
  console.log('cityList', cityList);
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

const ActualUserLocation = ({ userCityName }: { userCityName: TUserCityName }) => {
  return (
    <div className="flex items-center">
      <Image src={logo.src} alt="Иконка локации" width={24} height={24} className="icon" />
      <span className={cn('bigtext', styles.location)}>{userCityName ?? 'Выберите город'}</span>
    </div>
  );
};

const ChangeCity = () => {
  const router = useRouter();
  const city = 'Москва';
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
            <ActualUserLocation userCityName={city} />
          </Button>
        </DialogTrigger>
        <DialogContent className="min-h-[15rem] bg-white">
          <DialogHeader>
            <DialogTitle className="mt-4">
              <p className="h1 text-center">Выберите город</p>
              <DialogDescription />
            </DialogTitle>
          </DialogHeader>

          <CityList userCityName={city} cb={onChangeLocation} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChangeCity;

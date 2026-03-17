// 'use client';

import Link from 'next/link';
import React from 'react';

// import { getCityList } from '@entities/city/api/cities-list';
import FetchCityLoader from '@features/change-city/ui/loaders/fetch-city-loader';
// import { setCookie } from '@shared/funcs/cookie2';
import { CityData } from '@shared/interfaces/city';
import { cn } from '@shared/utils/shadcn-utils';

import styles from './city-list.module.scss';

// const onChangeLocation = (city: string) => {
//   console.log('city 123', city);
//   setCookie({ name: 'location', value: city, expiresType: 'days', expiresValue: 30 });
// };

type CityListItem = {
  url: string;
  name: string;
  city: string;
};

interface CityList {
  data: CityListItem[] | undefined;
  currentCity: string | null;
}

const CityList = ({ data, currentCity }: CityList) => {
  if (!data) return <FetchCityLoader />;
  return (
    <ul className={styles.list}>
      {data &&
        data.length > 0 &&
        data.map((item: CityData) => {
          return (
            <Link
              href={item.url}
              className={cn('bigtext', styles.listItem, {
                [styles.isActive]: currentCity === item.name,
              })}
              key={item.city}
              // onClick={() => onChangeLocation(item.city)}
            >
              {item.name}
            </Link>
          );
        })}
    </ul>
  );
};

export default CityList;

import { useRouter } from 'next/navigation';
import React from 'react';

import { setCookie } from '@shared/funcs/cookie2';
import { TSetLocationAndNavigateFn } from '@shared/types/appNavigation';

const useUserActions = () => {
  const router = useRouter();

  const setLocationAndNavigate: TSetLocationAndNavigateFn = React.useCallback(
    (city, paths, hash) => {
      const userPath = paths ? `/${paths}` : '';
      const userHash = hash ? `${hash}` : '';
      const url = `/${city}${userHash}${userPath}`;
      setCookie({ name: 'location', value: city, expiresType: 'days', expiresValue: 30 });
      router.push(url);
    },
    [router],
  );

  const findCityInList = React.useCallback((city: string) => {
    return cityInfo.find((item) => item.name === city);
  }, []);

  return { findCityInList, setLocationAndNavigate };
};

export default useUserActions;

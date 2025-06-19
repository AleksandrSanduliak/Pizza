'use client';
import React from 'react';

import { usePathname } from 'next/navigation';

import { getCookie } from 'utils/funcs/cookie';
import useUserActions from 'utils/hooks/navigation/useUserActions';
import { TUseUserLocationResult } from 'utils/types/appNavigation';

const Context = React.createContext<TUseUserLocationResult | null>(null);
const LocationProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { findCityInList } = useUserActions();

  const data = React.useMemo((): TUseUserLocationResult => {
    const userSelectedLocation = getCookie('location') ?? null;

    // Парсинг города в URL
    const [cityFromUrl, ...restPaths] = pathname.split('/').filter(Boolean);
    const subPaths = restPaths.length > 0 ? restPaths : null;

    // HASH в url
    const urlHash = pathname.split('#')[1] ?? null;

    const cityInUrlMatchedInList = userSelectedLocation
      ? findCityInList(userSelectedLocation as string)
      : null;
    const userSelectedCityName = cityInUrlMatchedInList?.title;
    const userLocationMatchedInList = userSelectedLocation ? findCityInList(cityFromUrl) : null;
    const isMainPage = !subPaths || (subPaths.length === 0 && cityFromUrl === userSelectedLocation); // проверка нахождения на главной странице http://localhost/moscow

    return {
      userSelectedLocation,
      userSelectedCityName,
      cityFromUrl,
      subPaths,
      isMainPage,
      urlHash,
      userLocationMatchedInList,
      cityInUrlMatchedInList,
    };
  }, [findCityInList, pathname]);

  return <Context.Provider value={{ ...data }}>{children}</Context.Provider>;
};

export const useUserLocationContext = () => {
  const context = React.useContext(Context);
  if (!context) throw new Error('Use app context within provider!');
  return context;
};

export default LocationProvider;

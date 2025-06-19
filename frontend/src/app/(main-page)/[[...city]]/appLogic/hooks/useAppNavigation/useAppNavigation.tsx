'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { useUserLocationContext } from 'app/providers/LocationProvider';
import useUserActions from 'utils/hooks/navigation/useUserActions';

import { routeStrategiesHandlers } from './routerStrategies';

const useAppNavigation = () => {
  const {
    userSelectedLocation,
    userLocationMatchedInList,
    cityInUrlMatchedInList,
    cityFromUrl,
    subPaths,
  } = useUserLocationContext();

  const { setLocationAndNavigate } = useUserActions();

  const router = useRouter();
  React.useEffect(() => {
    const createRoutes = routeStrategiesHandlers({
      router,
      cityFromUrl,
      userSelectedLocation,
      setLocationAndNavigate,
      cityInUrlMatchedInList,
      userLocationMatchedInList,
      subPaths,
    });

    for (const strategy of Object.values(createRoutes)) {
      if (strategy()) return; // Если одна из стратегий обработала навигацию, выход из функции
    }
  }, [
    cityFromUrl,
    cityInUrlMatchedInList,
    subPaths,
    router,
    userSelectedLocation,
    setLocationAndNavigate,
    userLocationMatchedInList,
  ]);
};

export default useAppNavigation;

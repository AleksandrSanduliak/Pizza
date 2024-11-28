import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  defaultUserStrategy,
  differentCityInParamsStrategy,
  noLocationStrategy,
  staticRouteStrategy,
} from 'utils/funcs/strategies/routerStrategies';
import useUserLocation from './useUserLocation';

const useAppNavigation = () => {
  const navigate = useNavigate();
  const {
    userLocation,
    userLocationEqualsList,
    cityInUrlEqualsList,
    cityInUrl,
    paths,
    setLocationAndNavigate,
  } = useUserLocation();

  React.useEffect(() => {
    const strategies = [
      () => staticRouteStrategy({ navigate, cityInUrl }),
      () => noLocationStrategy({ navigate, userLocation, cityInUrl }),
      () =>
        differentCityInParamsStrategy({
          navigate,
          cityInUrl,
          userLocation,
          setLocationAndNavigate,
          cityInUrlEqualsList,
          paths,
        }),
      () =>
        defaultUserStrategy({
          setLocationAndNavigate,
          userLocationEqualsList,
          paths,
        }),
    ];

    for (const strategy of Object.values(strategies)) {
      if (strategy()) return; // Если одна из стратегий обработала навигацию, выход из функции
    }
  }, [
    cityInUrl,
    cityInUrlEqualsList,
    navigate,
    paths,
    setLocationAndNavigate,
    userLocation,
    userLocationEqualsList,
  ]);
};

export default useAppNavigation;

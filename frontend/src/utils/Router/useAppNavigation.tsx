import React from 'react';

import { useNavigate } from 'react-router-dom';

import { routeStrategiesHandlers } from 'utils/funcs/strategies/routerStrategies';
import useUserLocation from 'utils/hooks/navigation/useUserLocation';

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
    const createRoutes = routeStrategiesHandlers({
      navigate,
      cityInUrl,
      userLocation,
      setLocationAndNavigate,
      cityInUrlEqualsList,
      userLocationEqualsList,
      paths,
    });
    for (const strategy of Object.values(createRoutes)) {
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

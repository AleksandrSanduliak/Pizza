'use client';
import {
  TDefaultUseStrategy,
  TDifferentCityInParamsStrategy,
  TNoLocationRouteStrategy,
  TRouteStrategy,
  TStaticRouteStrategy,
} from './routerStrategiesTypes';

const staticRouteStrategy: TStaticRouteStrategy = ({ router, cityFromUrl }) => {
  const staticRoutes = [
    {
      path: 'settings',
    },
  ];
  // парсинг url на наличие статичных маршрутов
  const urlInRouteIsStatic = staticRoutes?.find((item) => cityFromUrl === item.path) ?? '';
  if (!urlInRouteIsStatic) return false;
  router.push(urlInRouteIsStatic.path);

  return true;
};

const noLocationStrategy: TNoLocationRouteStrategy = ({ router, userLocation, cityFromUrl }) => {
  // проверка на наличие города в LS и в queryParams
  console.log('userLocation', userLocation);
  return !userLocation && !cityFromUrl ? (router.push('/'), true) : false;
};

const differentCityInParamsStrategy: TDifferentCityInParamsStrategy = ({
  router,
  cityFromUrl,
  userLocation,
  setLocationAndNavigate,
  cityInUrlEqualsList,
  paths,
}) => {
  // если город в queryparams !== list перенаправляем его, данные не записываем
  if (cityFromUrl && cityFromUrl !== userLocation) {
    if (!cityInUrlEqualsList) {
      router.push(cityFromUrl);
      return true;
    }
    console.log('paths', paths);
    // проверка на наличие города в queryParams, проверка если город в url !== город в LS
    setLocationAndNavigate(cityFromUrl, paths);
    return true;
  }
  return false;
};

const defaultUserStrategy: TDefaultUseStrategy = ({
  setLocationAndNavigate,
  userLocationEqualsList,
  paths,
}) => {
  // проверка города со списком
  // console.log('userLocationEqualsList', userLocationEqualsList);
  if (!userLocationEqualsList) return false;
  console.log('paths', paths);
  console.log('userLocationEqualsList.name', userLocationEqualsList.name);
  setLocationAndNavigate(userLocationEqualsList.name, paths);
  return true;
};

const routeStrategiesHandlers = ({
  router,
  cityFromUrl,
  userLocation,
  setLocationAndNavigate,
  cityInUrlEqualsList,
  userLocationEqualsList,
  paths,
}: TRouteStrategy): Array<() => boolean> => {
  return [
    () => staticRouteStrategy({ router, cityFromUrl }),
    () => noLocationStrategy({ router, userLocation, cityFromUrl }),
    () =>
      differentCityInParamsStrategy({
        router,
        cityFromUrl,
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
};

export { routeStrategiesHandlers };

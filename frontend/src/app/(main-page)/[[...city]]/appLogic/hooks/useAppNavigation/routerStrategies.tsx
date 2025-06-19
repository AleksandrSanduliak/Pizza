'use client';
import {
  TDefaultUseStrategy,
  TDifferentCityInParamsStrategy,
  TNoLocationRouteStrategy,
  TRouteStrategy,
  TStaticRouteStrategy,
} from './routerStrategiesTypes';

const staticRouteStrategy: TStaticRouteStrategy = ({ router, cityInUrl }) => {
  const staticRoutes = [
    {
      path: 'settings',
    },
  ];
  // парсинг url на наличие статичных маршрутов
  const urlInRouteIsStatic = staticRoutes?.find((item) => cityInUrl === item.path) ?? '';
  if (!urlInRouteIsStatic) return false;
  router.push(urlInRouteIsStatic.path);

  return true;
};

const noLocationStrategy: TNoLocationRouteStrategy = ({ router, userLocation, cityInUrl }) => {
  // проверка на наличие города в LS и в queryParams
  return !userLocation && !cityInUrl ? (router.push('/'), true) : false;
};

const differentCityInParamsStrategy: TDifferentCityInParamsStrategy = ({
  router,
  cityInUrl,
  userLocation,
  setLocationAndNavigate,
  cityInUrlEqualsList,
  paths,
}) => {
  // если город в queryparams !== list перенаправляем его, данные не записываем
  if (cityInUrl && cityInUrl !== userLocation) {
    if (!cityInUrlEqualsList) {
      router.push(cityInUrl);
      return true;
    }
    // проверка на наличие города в queryParams, проверка если город в url !== город в LS
    setLocationAndNavigate(cityInUrl, paths);
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
  setLocationAndNavigate(userLocationEqualsList.name, paths);
  return true;
};

const routeStrategiesHandlers = ({
  router,
  cityInUrl,
  userLocation,
  setLocationAndNavigate,
  cityInUrlEqualsList,
  userLocationEqualsList,
  paths,
}: TRouteStrategy): Array<() => boolean> => {
  return [
    () => staticRouteStrategy({ router, cityInUrl }),
    () => noLocationStrategy({ router, userLocation, cityInUrl }),
    () =>
      differentCityInParamsStrategy({
        router,
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
};

export { routeStrategiesHandlers };

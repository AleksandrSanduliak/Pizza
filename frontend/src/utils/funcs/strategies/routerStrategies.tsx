import { staticRoutes } from 'utils/Router/StaticRoutes';
import {
  TDefaultUseStrategy,
  TDifferentCityInParamsStrategy,
  TNoLocationRouteStrategy,
  TRouteStrategy,
  TStaticRouteStrategy,
} from './routerStrategiesTypes';

const staticRouteStrategy: TStaticRouteStrategy = ({ navigate, cityInUrl }) => {
  // парсинг url на наличие статичных маршрутов
  const urlInRouteIsStatic = staticRoutes?.find((item) => cityInUrl === item.path);
  if (!urlInRouteIsStatic) return false;
  navigate(urlInRouteIsStatic.path);

  return true;
};

const noLocationStrategy: TNoLocationRouteStrategy = ({ navigate, userLocation, cityInUrl }) => {
  // проверка на наличие города в LS и в queryParams
  return !userLocation && !cityInUrl ? (navigate('/'), true) : false;
};

const differentCityInParamsStrategy: TDifferentCityInParamsStrategy = ({
  navigate,
  cityInUrl,
  userLocation,
  setLocationAndNavigate,
  cityInUrlEqualsList,
  paths,
}) => {
  // если город в queryparams !== list перенаправляем его, данные не записываем
  if (cityInUrl && cityInUrl !== userLocation) {
    if (!cityInUrlEqualsList) {
      navigate(cityInUrl);
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
  if (!userLocationEqualsList) return false;
  setLocationAndNavigate(userLocationEqualsList.name, paths);
  return true;
};

const routeStrategiesHandlers = ({
  navigate,
  cityInUrl,
  userLocation,
  setLocationAndNavigate,
  cityInUrlEqualsList,
  userLocationEqualsList,
  paths,
}: TRouteStrategy): Array<() => boolean> => {
  return [
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
};

export { routeStrategiesHandlers };

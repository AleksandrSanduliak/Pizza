import { NavigateFunction } from 'react-router-dom';
import { staticRoutes } from 'utils/Router/StaticRoutes';
import {
  TCityInUrl,
  TCityInUrlEqualsList,
  TPaths,
  TSetLocationAndNavigateFn,
  TUserLocation,
  TUserLocationEqualsList,
} from 'utils/types/appNavigation';

type TNavigate = { navigate: NavigateFunction }; // navigate
type TCommonArgs = TNavigate & { cityInUrl: TCityInUrl }; // navigate + cityInUrl
type TNavigateAndCityUrl = TCommonArgs & { userLocation: TUserLocation }; // navigate + cityInUrl + userlocation общий тип для 3х стратегий

type TLocationNavigationOptions = {
  setLocationAndNavigate: TSetLocationAndNavigateFn;
  paths: TPaths;
};

// FUNCTION ARGS
type TNoLocationArgs = { userLocation: TUserLocation } & TNavigateAndCityUrl;
type TDifflrentCityArgs = {
  cityInUrlEqualsList: TCityInUrlEqualsList;
} & TLocationNavigationOptions &
  TNavigateAndCityUrl;
type TDefaultUserArgs = {
  userLocationEqualsList: TUserLocationEqualsList;
} & TLocationNavigationOptions;

// STRATEGY TYPES
type TStaticRouteStrategy = (arg: TCommonArgs) => boolean;
type TNoLocationRouteStrategy = (args: TNoLocationArgs) => boolean;
type TDifferentCityInParamsStrategy = (args: TDifflrentCityArgs) => boolean;
type TDefaultUsestrategy = (args: TDefaultUserArgs) => boolean;

// STRATEGY CREATION
const staticRouteStrategy: TStaticRouteStrategy = ({ navigate, cityInUrl }) => {
  // парсинг url на наличие статичных маршрутов
  const urlInRouteIsStatic = staticRoutes.find((item) => cityInUrl === item.path);
  if (urlInRouteIsStatic) {
    navigate(urlInRouteIsStatic.path);
    return true;
  }
  return false;
};

const noLocationStrategy: TNoLocationRouteStrategy = ({ navigate, userLocation, cityInUrl }) => {
  // проверка на наличие города в LS и в queryParams
  if (!userLocation && !cityInUrl) {
    navigate('/');
    return true;
  }
  return false;
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

const defaultUserStrategy: TDefaultUsestrategy = ({
  setLocationAndNavigate,
  userLocationEqualsList,
  paths,
}) => {
  // проверка города со списком
  if (!userLocationEqualsList) return false;
  setLocationAndNavigate(userLocationEqualsList.name, paths);
  return true;
};

export {
  defaultUserStrategy,
  differentCityInParamsStrategy,
  noLocationStrategy,
  staticRouteStrategy,
};

import {
  TCityInUrl,
  TCityInUrlEqualsList,
  TPaths,
  TSetLocationAndNavigateFn,
  TUserLocation,
  TUserLocationEqualsList,
} from 'utils/types/appNavigation';

import { NavigateFunction } from 'react-router-dom';
export type NavigationArgs = {
  navigate: NavigateFunction;
  cityInUrl: TCityInUrl;
  userLocation: TUserLocation;
};

export type TStaticRouteStrategy = (arg: {
  navigate: NavigateFunction;
  cityInUrl: TCityInUrl;
}) => boolean;
export type TNoLocationRouteStrategy = (args: NavigationArgs) => boolean;
export type TDifferentCityInParamsStrategy = (
  args: NavigationArgs & {
    cityInUrlEqualsList: TCityInUrlEqualsList;
    setLocationAndNavigate: TSetLocationAndNavigateFn;
    paths: TPaths;
  },
) => boolean;
export type TDefaultUseStrategy = (args: {
  setLocationAndNavigate: TSetLocationAndNavigateFn;
  userLocationEqualsList: TUserLocationEqualsList;
  paths: TPaths;
}) => boolean;

export type TRouteStrategy = NavigationArgs & {
  setLocationAndNavigate: TSetLocationAndNavigateFn;
  cityInUrlEqualsList: TCityInUrlEqualsList;
  userLocationEqualsList: TUserLocationEqualsList;
  paths: TPaths;
};

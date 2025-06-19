import {
  TCityInUrl,
  TCityInUrlEqualsList,
  TPaths,
  TUserLocation,
  TUserLocationEqualsList,
  TSetLocationAndNavigateFn,
} from 'utils/types/appNavigation';

export type NavigationArgs = {
  router: any;
  cityInUrl: TCityInUrl;
  userLocation: TUserLocation;
};

export type TStaticRouteStrategy = (arg: { router: any; cityInUrl: TCityInUrl }) => boolean;
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

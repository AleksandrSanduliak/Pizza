import {
  TCityInUrl,
  TUserLocation,
  TCityInUrlEqualsList,
  TSetLocationAndNavigateFn,
  TPaths,
  TUserLocationEqualsList,
} from '@shared/types/appNavigation';

export type NavigationArgs = {
  router: any;
  cityFromUrl: TCityInUrl;
  userLocation: TUserLocation;
};

export type TStaticRouteStrategy = (arg: { router: any; cityFromUrl: TCityInUrl }) => boolean;
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
  userSelectedLocation: TUserLocation;
  cityInUrlMatchedInList: TCityInUrlEqualsList;
  userLocationMatchedInList: TUserLocationEqualsList;
  paths: TPaths;
};

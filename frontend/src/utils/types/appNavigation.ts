import { ICityInfo } from 'utils/consts/cityInfo';
type TCheckCityInfo = ICityInfo | undefined; // для функций поиска городов

export type TSetLocationAndNavigateFn = (city: string, paths: string, hash?: string) => void;

export type TUserLocation = string | null;
export type TCityInUrl = string;

export type TUserLocationEqualsList = TCheckCityInfo;
export type TCityInUrlEqualsList = TCheckCityInfo;

export type TPaths = string;
export type TIsUrlMainPage = boolean;
export type TAppHash = string;

type TUseUserLocationResult = {
  userLocation: TUserLocation;
  userLocationEqualsList: TUserLocationEqualsList;
  cityInUrlEqualsList: TCityInUrlEqualsList;
  cityInUrl: TCityInUrl;
  paths: TPaths;
  setLocationAndNavigate: TSetLocationAndNavigateFn;
  isUrlMainPage: TIsUrlMainPage;
  appHash: TAppHash;
};
export type TUseUseLocation = () => TUseUserLocationResult;

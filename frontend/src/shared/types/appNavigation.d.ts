import { ICityInfo } from 'utils/consts/cityInfo';

type TCheckCityInfo = ICityInfo | undefined; // для функций поиска городов

export type TUserLocation = string | null | undefined;
export type TCityInUrl = string;

export type TUserLocationEqualsList = TCheckCityInfo | null;
export type TCityInUrlEqualsList = TCheckCityInfo | null;

export type TPaths = string[] | null;
export type TIsUrlMainPage = boolean;
export type TAppHash = string;
export type TUserCityName = string | undefined;

type TUseUserLocationResult = {
  userSelectedLocation: TUserLocation;
  // userSelectedCityName: TUserCityName;
  cityFromUrl: TCityInUrl;
  subPaths: TPaths;
  // isMainPage: TIsUrlMainPage;
  urlHash: TAppHash;
  // userLocationMatchedInList: TUserLocationEqualsList;
  // cityInUrlMatchedInList: TCityInUrlEqualsList;
};

export type TUseUseLocation = () => TUseUserLocationResult;
export type TSetLocationAndNavigateFn = (city: string, paths: string, hash?: string) => void;

import React from 'react';

import { useNavigate } from 'react-router-dom';

import { getUserCity } from 'store/slices/citySlice';
import { cityInfo } from 'utils/consts/cityInfo';
import { getCookie } from 'utils/funcs/cookie';
import { setCookieAndDispatch } from 'utils/funcs/setCookieAndDispatchUserLocation';
import { TSetLocationAndNavigateFn, TUseUseLocation } from 'utils/types/appNavigation';

import { useAppDispatch } from '../redux';

const useUserLocation: TUseUseLocation = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userLocation = getCookie('location') !== undefined ? getCookie('location') : null;

  React.useEffect(() => {
    dispatch(getUserCity(userLocation));
  }, [dispatch, userLocation]);

  const [cityInUrl, paths] = location.pathname.replace('/', '').split('/');
  const setLocationAndNavigate: TSetLocationAndNavigateFn = React.useCallback(
    (city, paths, hash) => {
      const userPath = paths ? `/${paths}` : '';
      const userHash = hash ? `${hash}` : '';
      const url = `/${city}${userHash}${userPath}`;

      setCookieAndDispatch(city, dispatch, getUserCity);
      navigate(url);
    },
    [dispatch, navigate],
  );
  const findCityInList = React.useCallback((city: string) => {
    return cityInfo.find((item) => item.name === city);
  }, []);

  const appHash = location.hash;
  const userLocationEqualsList = findCityInList(userLocation as string);
  const userCityName = userLocationEqualsList?.title;
  const cityInUrlEqualsList = findCityInList(cityInUrl);
  const isUrlMainPage = !paths && cityInUrl === userLocation; // проверка нахождения на главной странице http://localhost/moscow

  return {
    userLocation,
    userLocationEqualsList,
    cityInUrlEqualsList,
    cityInUrl,
    paths,
    setLocationAndNavigate,
    isUrlMainPage,
    appHash,
    userCityName,
  };
};

export default useUserLocation;

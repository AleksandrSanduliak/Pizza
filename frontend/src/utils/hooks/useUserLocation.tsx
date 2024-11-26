import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserCity } from 'store/slices/citySlice';
import { cityInfo } from 'utils/consts/cityInfo';
import { getCookie, setCookie } from 'utils/funcs/cookie';
import { useAppDispatch } from './redux';

const useUserLocation = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userLocation =
    getCookie('location') !== undefined ? getCookie('location') : null;

  React.useEffect(() => {
    dispatch(getUserCity(userLocation));
  }, [dispatch, userLocation]);

  const [cityInUrl, paths] = location.pathname.replace('/', '').split('/');
  const setLocationAndNavigate = React.useCallback(
    (city: string, paths: string, hash?: string): void => {
      const userPath = paths ? `/${paths}` : '';
      const userHash = hash ? `${hash}` : '';
      const url = `/${city}${userHash}${userPath}`;

      navigate(url);
      setCookie('location', city, 30);
      dispatch(getUserCity(city));
    },
    [dispatch, navigate],
  );
  const findCityInList = React.useCallback((city: string) => {
    return cityInfo.find((item) => item.name === city);
  }, []);

  const appHash = location.hash;
  const userLocationEqualsList = findCityInList(userLocation as string);
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
  };
};

export default useUserLocation;

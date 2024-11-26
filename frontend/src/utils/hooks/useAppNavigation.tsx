import React from 'react';
import { useNavigate } from 'react-router-dom';
import { staticRoutes } from 'utils/Router/Router';
import { useAppDispatch } from './redux';
import useUserLocation from './useUserLocation';

const useAppNavigation = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    userLocation,
    userLocationEqualsList,
    cityInUrlEqualsList,
    cityInUrl,
    paths,
    setLocationAndNavigate,
    appHash,
  } = useUserLocation();

  React.useEffect(() => {
    const urlInRouteIsStatic = staticRoutes.find(
      (item) => cityInUrl === item.path,
    );
    if (urlInRouteIsStatic) return navigate(urlInRouteIsStatic.path); // парсинг url на наличие статичных маршрутов
    if (!userLocation && !cityInUrl) return navigate('/'); // проверка на наличие города в LS и в queryParams
    if (cityInUrl && cityInUrl !== userLocation) {
      if (!cityInUrlEqualsList) return navigate(cityInUrl); // если город в queryparams !== list перенаправляем его, данные не записываем
      return setLocationAndNavigate(cityInUrl, paths, appHash); // проверка на наличие города в queryParams, проверка если город в url !== город в LS
    }
    if (!userLocationEqualsList) return; // проверка города со списком
    setLocationAndNavigate(userLocationEqualsList.name, paths, appHash);
  }, [
    cityInUrl,
    cityInUrlEqualsList,
    dispatch,
    navigate,
    paths,
    setLocationAndNavigate,
    userLocation,
    userLocationEqualsList,
    appHash,
  ]);
};

export default useAppNavigation;

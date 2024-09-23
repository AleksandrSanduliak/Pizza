import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import MainPage from 'pages/MainPage';
import Layout from 'src/components/templates/Layout';
import NotFound from 'pages/NotFound';
import RequireAuth from 'utils/hoc/RequireAuth';
import Settings from 'pages/Settings';
import OrderHistory from 'pages/OrderHistory';
import Order from 'pages/Order/Order';
import { cityInfo } from 'molecules/CityModal/CityModal';
import { getCookie, setCookie } from 'utils/funcs/cookie';
import React from 'react';
import { useAppDispatch } from 'utils/hooks/redux';
import { getUserCity } from 'store/slices/citySlice';

const Router = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Берем из cookies - user location при первой загрузке приложения
  const userLocation =
    getCookie('location') !== undefined ? getCookie('location') : null;

  React.useEffect(() => {
    if (userLocation) {
      navigate(userLocation);
    }
  }, [userLocation]);

  // Меняем cookies - user location при изменении query params
  React.useEffect(() => {
    const path = location.pathname.replace('/', '');

    if (!path) return;
    navigate(location.pathname);
    setCookie('location', path, 30);
    dispatch(getUserCity(path));
  }, [location.pathname]);

  return (
    <Routes location={location}>
      <Route path={`/`} element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route
          path="settings"
          element={
            <RequireAuth>
              <Settings />
            </RequireAuth>
          }
        />
        <Route
          path="orderhistory"
          element={
            <RequireAuth>
              <OrderHistory />
            </RequireAuth>
          }
        />
        <Route
          path="order"
          element={
            <RequireAuth>
              <Order />
            </RequireAuth>
          }
        />
        {cityInfo?.map((city) => {
          return (
            <Route
              key={`/${city.name}`}
              path={city.name}
              element={<MainPage />}
            />
          );
        })}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default Router;

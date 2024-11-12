import { cityInfo } from 'molecules/CityModal/CityModal';
import MainPage from 'pages/MainPage';
import NotFound from 'pages/NotFound';
import Order from 'pages/Order/Order';
import OrderHistory from 'pages/OrderHistory';
import Settings from 'pages/Settings';
import React from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Layout from 'src/components/templates/Layout';
import { getUserCity } from 'store/slices/citySlice';
import { getCookie, setCookie } from 'utils/funcs/cookie';
import RequireAuth from 'utils/hoc/RequireAuth';
import { useAppDispatch } from 'utils/hooks/redux';

const Router = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Берем из cookies - user location при первой загрузке приложения, подставляем в роут и запрашиваем товары по городу
  // Если город из queryParams !== городу из localStorage - используем город из queryParams
  const userLocation =
    getCookie('location') !== undefined ? getCookie('location') : null;

  React.useEffect(() => {
    dispatch(getUserCity(userLocation));

    if (!userLocation) {
      console.log('123');
      navigate('/');
      return;
    }

    const findUserCity = cityInfo.find((item) => item.name === userLocation);
    if (!findUserCity) return;

    const [city, paths] = location.pathname.replace('/', '').split('/');
    if (city && city !== userLocation) {
      navigate(`/${city}/${paths ?? ''}`);
      setCookie('location', city, 30);
      dispatch(getUserCity(city));
      return;
    }

    navigate(`/${findUserCity.name}/${paths ?? ''}`);
    setCookie('location', findUserCity.name, 30);
    dispatch(getUserCity(findUserCity.name));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes location={location}>
      <Route path="/" element={<Layout />}>
        {cityInfo.map((item) => {
          return (
            <React.Fragment key={`${item.name} route`}>
              <Route index path={item.name} element={<MainPage />} />
              <Route
                path={`${item.name}/orderhistory`}
                element={
                  <RequireAuth>
                    <OrderHistory />
                  </RequireAuth>
                }
              />
              <Route
                path={`${item.name}/order`}
                element={
                  <RequireAuth>
                    <Order />
                  </RequireAuth>
                }
              />
            </React.Fragment>
          );
        })}
        <Route
          path="settings"
          element={
            <RequireAuth>
              <Settings />
            </RequireAuth>
          }
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;

import MainPage from 'pages/MainPage';
import NotFound from 'pages/NotFound';
import Order from 'pages/Order/Order';
import OrderHistory from 'pages/OrderHistory';
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from 'src/components/templates/Layout';
import { cityInfo, ICityInfo } from 'utils/consts/cityInfo';
import RequireAuth from 'utils/hoc/RequireAuth';
import useAppNavigation from 'utils/hooks/useAppNavigation';
import { staticRoutes } from 'utils/Router/StaticRoutes';

const CityRoutes = (item: ICityInfo) => {
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
};

const Router = () => {
  const location = useLocation();
  useAppNavigation();
  return (
    <Routes location={location}>
      <Route path="/" element={<Layout />}>
        {cityInfo.map(CityRoutes)}
        {staticRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.component} />
        ))}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;

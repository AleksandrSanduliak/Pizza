import React from 'react';

import { Route, Routes, useLocation } from 'react-router-dom';

const MainPage = React.lazy(() => import('pages/MainPage'));
const NotFound = React.lazy(() => import('pages/NotFound'));
const Order = React.lazy(() => import('pages/Order/Order'));
const OrderHistory = React.lazy(() => import('pages/OrderHistory'));
const Layout = React.lazy(() => import('src/components/templates/Layout'));
import FullScreenLoader from 'atoms/loader/Loader';
import { cityInfo, ICityInfo } from 'utils/consts/cityInfo';
import RequireAuth from 'utils/hoc/RequireAuth';
import { staticRoutes } from 'utils/Router/StaticRoutes';

import useAppNavigation from './useAppNavigation';

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
    <React.Suspense fallback={<FullScreenLoader />}>
      <Routes location={location}>
        <Route path="/" element={<Layout />}>
          {cityInfo.map(CityRoutes)}
          {staticRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.component} />
          ))}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Suspense>
  );
};

export default Router;

import React from 'react';

import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';

import FullScreenLoader from 'atoms/loader/Loader';
import 'react-toastify/dist/ReactToastify.css';
import { useLazyRefreshTokenQuery } from 'store/api/authApi';
import 'styles/App.scss';
import { useLazyGetGoodsQuery } from 'store/api/goodsApi';
import { selectorApp } from 'store/store';
import { getCookie } from 'utils/funcs/cookie';
// import NotificationFacade from 'utils/funcs/facades/NotificationFacade';
import Router from 'utils/Router/Router';

const ymaps3Reactify = await ymaps3.import('@yandex/ymaps3-reactify');
const reactify = ymaps3Reactify.reactify.bindTo(React, ReactDOM); // todo
const App = () => {
  const [refreshToken, { isLoading, isError }] = useLazyRefreshTokenQuery();
  const [getGoods] = useLazyGetGoodsQuery();
  const currentCity = selectorApp((state) => state.reducer.userCity.currentCity) as string;

  React.useLayoutEffect(() => {
    const accessToken = getCookie('accessToken');

    if (!accessToken) return;
    refreshToken();
  }, [refreshToken]);

  React.useEffect(() => {
    getGoods();
  }, [getGoods, currentCity]);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  // if (isError) {
  //   NotificationFacade.toastError({
  //     message: 'Ошибка входа',
  //   });
  // }

  return (
    <>
      <ToastContainer className="toast-root" />
      <Router />
    </>
  );
};

export default App;

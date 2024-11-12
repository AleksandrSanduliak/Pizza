import Loader from 'atoms/loader/Loader';
import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLazyRefreshTokenQuery } from 'store/api/authApi';
import 'styles/App.scss';
import { getCookie } from 'utils/funcs/cookie';
import Router from 'utils/Router/Router';
const ymaps3Reactify = await ymaps3.import('@yandex/ymaps3-reactify');
const reactify = ymaps3Reactify.reactify.bindTo(React, ReactDOM);

const App = () => {
  const [refreshToken, { data, isLoading, isError, error, isSuccess }] =
    useLazyRefreshTokenQuery();

  React.useEffect(() => {
    const accessToken = getCookie('accessToken');

    if (!accessToken) return;
    refreshToken();
  }, [refreshToken]);

  if (isLoading) {
    return <Loader type="absolute" />;
  }

  if (isError) {
    toast.error('Ошибка входа', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  }

  return (
    <>
      <ToastContainer style={{ marginTop: '5.5rem' }} />
      <Router />
    </>
  );
};

export default App;

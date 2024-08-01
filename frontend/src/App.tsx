import "styles/App.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "utils/Router/Router";
import React from "react";
import { useRefreshTokenMutation } from "store/api/authApi";
import Loader from "atoms/loader/Loader";
import ReactDOM from "react-dom";
const ymaps3Reactify = await ymaps3.import("@yandex/ymaps3-reactify");
const reactify = ymaps3Reactify.reactify.bindTo(React, ReactDOM);

function App() {
  const [refreshToken, { data, isLoading, isError, error, isSuccess }] =
    useRefreshTokenMutation();
  React.useEffect(() => {
    const accessToken = document.cookie.split("accesToken=")[1];

    if (!accessToken) return;
    refreshToken();
  }, [refreshToken]);

  if (isLoading) {
    return <Loader type="absolute" />;
  }

  if (isError) {
    toast.error("Ошибка входа", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  return (
    <>
      <ToastContainer style={{ marginTop: "5.5rem" }} />
      <Router />
    </>
  );
}

export default App;

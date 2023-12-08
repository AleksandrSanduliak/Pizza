import "styles/App.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "utils/Router/Router";
import React from "react";
import { dispatchApp } from "store/store";
import { useRefreshTokenMutation } from "store/api/authApi";

function App() {
  const [refreshToken, { data, isLoading, isError, error, isSuccess }] =
    useRefreshTokenMutation();
  React.useEffect(() => {
    const accessToken = document.cookie.split("accesToken=")[1];
    if (!accessToken) return;
    refreshToken();
  }, [dispatchApp]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isSuccess) {
    console.log(data, "refresh token");
  }
  return (
    <>
      <ToastContainer />
      <Router />
    </>
  );
}

export default App;

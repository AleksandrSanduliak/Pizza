import "./App.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "./Router";
import React from "react";
import { dispatchApp } from "./store/store";
import { useRefreshTokenMutation } from "./store/authApi";

function App() {
  const [refreshToken, { data, isLoading, isError, error, isSuccess }] =
    useRefreshTokenMutation();
  React.useEffect(() => {
    refreshToken();
  }, [dispatchApp]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <ToastContainer />
      <Router />
    </>
  );
}

export default App;

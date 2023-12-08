import { useLocation, Navigate } from "react-router-dom";
import React from "react";
import { useGetUserMutation } from "store/api/authApi";
import { dispatchApp } from "store/store";
import { useAppDispatch, useAppSelector } from "utils/hooks/redux";
import { setCloseBurger } from "store/slices/burgerSlice";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const [getUser, { data, isLoading, isError, error, isSuccess }] =
    useGetUserMutation();
  const dispatch = useAppDispatch();
  // const burger = useAppSelector((store) => store.reducer.isOpen);
  // console.log(burger);

  React.useEffect(() => {
    getUser();
  }, [dispatchApp]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    console.log(isError, "isError");
    return <Navigate to="/" state={{ from: location }} />;
  }
  if (isSuccess) {
    console.log(data, "GET USER");
    dispatch(setCloseBurger());
    return children;
  }
};

export default RequireAuth;

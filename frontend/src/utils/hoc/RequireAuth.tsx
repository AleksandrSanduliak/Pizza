'use client';
import React from 'react';

import { useAppSelector } from 'store/hooks';

type TRequireAuth = {
  children: React.ReactElement;
};
const RequireAuth = ({ children }: TRequireAuth) => {
  const location = useLocation();
  const isAuth = useAppSelector((store) => store.reducer.auth.isAuth);

  if (!isAuth) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;

'use client';

// import { isServer } from '@tanstack/react-query';
import { ReactNode, useEffect, useRef } from 'react';
import { Provider } from 'react-redux';

import { City } from '@entities/city/city';
import { setCityInfo } from '@entities/city/city.slice';
import { AuthData } from '@features/auth/auth.interface';
import { setUser } from '@features/auth/authSlice';
import { AppStore, makeStore } from '@shared/store/store';

export default function StoreProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState: {
    userData: AuthData;
    cityData: City;
  };
}) {
  const storeRef = useRef<AppStore | null>(null);

  if (storeRef.current === null) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    if (initialState.userData && storeRef.current) {
      storeRef.current.dispatch(setUser(initialState.userData));
    }
    if (initialState.cityData && storeRef.current) {
      storeRef.current.dispatch(setCityInfo(initialState.cityData));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}

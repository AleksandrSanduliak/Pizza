'use client';

// import { isServer } from '@tanstack/react-query';
import { setupListeners } from '@reduxjs/toolkit/query';
import { ReactNode, useEffect, useRef } from 'react';
import { Provider } from 'react-redux';

import { type City } from '@entities/city/city.schema';
import { setCityInfo } from '@entities/city/city.slice';
import { AuthState, setUser } from '@features/auth/authSlice';
import { isServer } from '@shared/consts/helpers';
import { AppStore, makeStore } from '@shared/store/store';

export default function StoreProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState: {
    userData: AuthState;
    cityData: City;
  };
}) {
  const storeRef = useRef<AppStore | null>(null);

  if (storeRef.current === null) {
    storeRef.current = makeStore();
    // setupListeners(storeRef.current.dispatch);
    console.log('initialState', initialState);
    // if (!isServer && initialState) {
    //   // if (initialState.userData) storeRef.current.dispatch(setUser(initialState.userData));
    //   // if (initialState.cityData) storeRef.current.dispatch(setCityInfo(initialState.cityData));
    // }
  }

  // useEffect(() => {
  //   if (initialState.userData && storeRef.current) {
  //     storeRef.current.dispatch(setUser(initialState.userData));
  //   }
  //   if (initialState.cityData && storeRef.current) {
  //     console.log('initialState', initialState);
  //     storeRef.current.dispatch(setCityInfo(initialState.cityData));
  //   }
  // }, [initialState.cityData, initialState.userData]);

  return <Provider store={storeRef.current}>{children}</Provider>;
}

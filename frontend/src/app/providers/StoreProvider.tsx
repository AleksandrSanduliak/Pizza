'use client';

import { isServer } from '@tanstack/react-query';
import { ReactNode, useRef } from 'react';
import { Provider } from 'react-redux';

import { AuthState, setUser } from '@features/auth/authSlice';
import { AppStore, makeStore } from '@shared/store/store';

export default function StoreProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState: {
    userData: AuthState;
  };
}) {
  const storeRef = useRef<AppStore | null>(null);

  if (storeRef.current === null) {
    storeRef.current = makeStore();
    console.log('initialState', initialState);
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}

'use client';
import { useEffect, useRef } from 'react';

import { UserData } from '@entities/user/user.schema';
import { setUser } from '@features/auth/auth.slice';
import { AppStore } from '@shared/store/store';

const useUpdateAuthStore = ({
  userData,
  store,
}: {
  userData: UserData | undefined;
  store: AppStore;
}) => {
  // const initialized = useRef(false);
  // if (!initialized.current) {
  //   if (userData) {
  //     store.dispatch(setUser(userData));
  //     initialized.current = true;
  //   }
  // }

  useEffect(() => {
    if (userData) store.dispatch(setUser(userData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useUpdateAuthStore;

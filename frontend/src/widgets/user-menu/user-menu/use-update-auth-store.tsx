'use client';
import { useRef } from 'react';

import { UserData } from '@entities/user/user.schema';
import { setUser } from '@features/auth/auth.slice';
import { useAppStore } from '@shared/store/hooks';

const useUpdateAuthStore = ({ userData }: { userData: UserData | undefined }) => {
  const store = useAppStore();
  const initialized = useRef(false);
  if (!initialized.current) {
    if (userData) {
      store.dispatch(setUser(userData));
      initialized.current = true;
    }
  }
};

export default useUpdateAuthStore;

'use client';

import { ReactNode, useState } from 'react';
import { Provider } from 'react-redux';

// import useUpdateAuthStore from '@app/providers/store/use-update-auth-store';
// import { useUserData } from '@entities/user/use-user-data';
import { makeStore } from '@shared/store/store';

export default function StoreProvider({ children }: { children: ReactNode }) {
  // const storeRef = useRef<AppStore | null>(null);
  const [store] = useState(() => makeStore());
  // const { data: userData } = useUserData();
  // useUpdateAuthStore({ userData, store });
  return <Provider store={store}>{children}</Provider>;
}

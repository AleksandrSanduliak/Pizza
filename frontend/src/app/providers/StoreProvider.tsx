'use client';

import { ReactNode, useState } from 'react';
import { Provider } from 'react-redux';

import { AppStore, makeStore } from '@shared/store/store';

export default function StoreProvider({ children }: { children: ReactNode }) {
  const [store] = useState<AppStore>(() => makeStore());

  return <Provider store={store}>{children}</Provider>;

  // const storeRef = useRef<AppStore>(undefined);
  // if (storeRef.current === undefined) {
  //   storeRef.current = makeStore();
  // }

  // // eslint-disable-next-line react-hooks/refs
  // return <Provider store={storeRef.current}>{children}</Provider>;
}

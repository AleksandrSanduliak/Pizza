import '@shared/styles/shadcn.css';
import '@shared/styles/App.scss';
import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';
import React, { cloneElement, ReactNode, Suspense } from 'react';

import { getCityInfo } from '@app/actions/getCityInfo';
import { AppProvider } from '@app/providers/AppProvider';
import { refreshRequest } from '@features/auth/authApi';
import { CityData } from '@shared/interfaces/city';
import FullScreenLoader from '@shared/ui/Loaders/FullScreenLoader/FullScreenLoader';
import { Toaster } from '@shared/ui/sonner';

const Header = dynamic(() => import('@widgets/header/header'), {
  loading: () => <FullScreenLoader />,
  ssr: true,
});
const Footer = dynamic(() => import('@widgets/footer/footer'), {
  loading: () => <FullScreenLoader />,
  ssr: true,
});

const getUserData = async () => {
  const cookieStorie = cookies();
  const accessToken = (await cookieStorie).get('accessToken')?.value;
  console.log('accessToken', accessToken);
  if (!accessToken) return;
  console.log('startrefresh');
  const allCookies = (await cookies()).toString();
  const refresh = await refreshRequest(allCookies);
  console.log('refresh', refresh);
  return refresh;
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
  rootSlot: (cityData: CityData) => ReactNode;
}) {
  const userData = await getUserData();
  const cityData = await getCityInfo();
  console.log('userData', userData);
  console.log('cityData', cityData);
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<FullScreenLoader />}>
          <AppProvider initialState={{ userData, cityData }}>
            <div id="root">
              <div className="wrapper">
                <Header data={cityData} />
                <main className="main">{children}</main>
                {/* <main className="main">{cloneElement(children, { cityData })}</main> */}
                <Footer />
              </div>
            </div>
            <div id="modal-root" />
            <div id="fullscreen-loader-root" />
            <div id="dropdown-root" />
            <Toaster richColors className="toast-root pointer-events-auto" />
          </AppProvider>
        </Suspense>
      </body>
    </html>
  );
}

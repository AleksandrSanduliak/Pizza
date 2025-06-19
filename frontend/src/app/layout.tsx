'use client';

import React, { Suspense } from 'react';

import dynamic from 'next/dynamic';

// import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';

import FullScreenLoader from 'atoms/Loaders/FullScreenLoader/FullScreenLoader';

// import LocationProvider from './locationData/LocationProvider';
import StoreProvider from './providers/StoreProvider';

import 'react-toastify/dist/ReactToastify.css';
import '../styles/App.scss';

const Header = dynamic(() => import('organisms/Header/Header'), {
  loading: () => <FullScreenLoader />,
  ssr: true,
});
const Footer = dynamic(() => import('organisms/Footer/Footer'), {
  loading: () => <FullScreenLoader />,
  ssr: true,
});
const LocationProvider = dynamic(() => import('./providers/LocationProvider'), {
  loading: () => <FullScreenLoader />,
  ssr: false,
});

// export const metadata: Metadata = {
//   title: 'ToTo Pizza - React/TS',
// };

// const ymaps3Reactify = await ymaps3.import('@yandex/ymaps3-reactify');
// const reactify = ymaps3Reactify.reactify.bindTo(React, ReactDOM); // todo
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* <meta charSet="UTF-8" /> */}
        {/* <link rel="icon" type="image/svg+xml" href="./src/assets/icons/pizzaLogo.ico" /> */}
        {/* <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}
        {/* <title>ToTo Pizza - React/TS</title> */}
      </head>
      <body>
        <Suspense fallback={<FullScreenLoader />}>
          <StoreProvider>
            <LocationProvider>
              <div id="root">
                <div className="wrapper">
                  <Header />
                  <main className="main">{children}</main>
                  <Footer />
                </div>
              </div>
              <div id="modal-root" />
              <div id="fullscreen-loader-root" />
              <div id="dropdown-root" />
            </LocationProvider>
          </StoreProvider>
          <ToastContainer className="toast-root" />
        </Suspense>
      </body>
    </html>
  );
}

/* <!-- <script src="https://api-maps.yandex.ru/2.1/?apikey=ca13e5b7-6cd4-430e-9943-3a37419ee06e&lang=ru_RU"
    type="text/javascript">
    </script> --> */
// <div id="modal-root" />
// <div id="fullscreen-loader-root" />
// <div id="dropdown-root" />
// <script src="https://api-maps.yandex.ru/v3/?apikey=ca13e5b7-6cd4-430e-9943-3a37419ee06e&lang=ru_RU" />
// <script type="module" src="/src/main.tsx" />

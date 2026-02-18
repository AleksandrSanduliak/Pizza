import 'react-toastify/dist/ReactToastify.css';
import '@shared/styles/shadcn.css';
import '@shared/styles/App.scss';
import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';

// import { ToastContainer } from 'react-toastify';
import { AppProvider } from '@app/providers/AppProvider';
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
          <AppProvider>
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
            <Toaster richColors className="toast-root pointer-events-auto" />
            {/* <ToastContainer className="toast-root" /> */}
          </AppProvider>
        </Suspense>
      </body>
    </html>
  );
}

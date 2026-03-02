import '@shared/styles/shadcn.css';
import '@shared/styles/App.scss';
import React, { ReactNode, Suspense } from 'react';

import { AppProvider } from '@app/providers/AppProvider';
import FullScreenLoader from '@shared/ui/Loaders/FullScreenLoader/FullScreenLoader';
import { Toaster } from '@shared/ui/sonner';

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<FullScreenLoader />}>
          <AppProvider>
            {/* <AppProvider initialState={{ userData, cityData }}> */}
            <div id="root">{children}</div>
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

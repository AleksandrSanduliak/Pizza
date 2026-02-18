'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

import LocationProvider from './LocationProvider';
import StoreProvider from './StoreProvider';

export const QueryClientContext = React.createContext<QueryClient | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
          mutations: {
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <LocationProvider>
          <QueryClientContext.Provider value={queryClient}>
            {children}

            {/* <ToastContainer className="toast-root" /> */}
          </QueryClientContext.Provider>
        </LocationProvider>
      </StoreProvider>
    </QueryClientProvider>
  );
}

export const useQueryClientContext = () => {
  const context = React.useContext(QueryClientContext);
  if (!context) {
    throw new Error('useQueryClientContext must be used within MainProvider');
  }
  return context;
};

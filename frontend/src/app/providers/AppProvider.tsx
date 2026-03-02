'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

import { City } from '@entities/city/city.schema';
import { AuthState } from '@features/auth/authSlice';

import LocationProvider from './LocationProvider';
import StoreProvider from './StoreProvider';

export const QueryClientContext = React.createContext<QueryClient | null>(null);

const queryClient = new QueryClient({
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
});
export function AppProvider({
  children,
  initialState,
}: {
  children: React.ReactNode;
  initialState: {
    userData: AuthState;
    cityData: City;
  };
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider initialState={initialState}>
        {/* <LocationProvider>
          {children}

        </LocationProvider> */}
        {children}
      </StoreProvider>
    </QueryClientProvider>
  );
}

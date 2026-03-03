'use client';

import { isServer, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

import { UserData } from '@entities/user/user.schema';
import { AuthState } from '@features/auth/authSlice';

import StoreProvider from './StoreProvider';

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 60 * 1000,
//       refetchOnWindowFocus: false,
//       retry: 1,
//     },
//     mutations: {
//       retry: 1,
//     },
//   },
// });

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export function AppProvider({
  children,
  initialState,
}: {
  children: React.ReactNode;
  initialState: {
    userData: UserData;
  };
}) {
  const queryClient = getQueryClient();
  console.log('initialState app', initialState);
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider initialState={initialState}>{children}</StoreProvider>
    </QueryClientProvider>
  );
}

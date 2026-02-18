import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { refreshRequest } from '@features/auth/authApi';

export function middleware(request: NextRequest) {
  // route middleware
  const location = request.cookies.get('location')?.value;
  if (!location) {
    NextResponse.redirect(new URL('/', request.url));
  }
  NextResponse.redirect(new URL(`/${location}`, request.url));
  // route middleware

  //auth middleware
  const accessToken = request.cookies.get('accessToken')?.value;
  console.log('accessToken0, accessToken', accessToken);
  if (accessToken) {
    const refreshData = refreshRequest();
    console.log('refreshData', refreshData);
  }
  //auth middleware
}

export const config = {
  matcher: '/',
};

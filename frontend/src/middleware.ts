import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const location = request.cookies.get('location')?.value;
  // const refreshToken = request.cookies.get('refreshToken')?.value;
  // const accessToken = request.cookies.get('accessToken')?.value;
  // console.log('location', location);
  // console.log('refreshToken', refreshToken);
  // console.log('accessToken', accessToken);
  // // const url = request.nextUrl;
  // const protectedRoutes = [`/${location}/settings`, `/${location}/orderhistory`];
  // console.log('request.nextUrl.pathname', request.nextUrl.pathname);
  // console.log(
  //   'is protected',
  //   protectedRoutes.includes(request.nextUrl.pathname) && refreshToken && accessToken,
  // );
  // console.log('is protected', protectedRoutes.includes(request.nextUrl.pathname));
  // console.log('is protected', !refreshToken);
  // console.log('is protected', !accessToken);
  // if (protectedRoutes.includes(request.nextUrl.pathname) && !!refreshToken && !!accessToken) {
  //   // return NextResponse.redirect(new URL(`/${location}`, request.url));
  //   console.log('request.url', request.url);
  //   return NextResponse.redirect(new URL(request.url, request.url));
  // }
  if (location) {
    return NextResponse.redirect(new URL(`/${location}`, request.url));
  }
  console.log(' request.url', request.url);
  // if (url === 'settings')
  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
// (`/:city/settings`, `/:city/orderhistory`);

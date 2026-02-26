import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const location = request.cookies.get('location')?.value;
  if (!location) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.redirect(new URL(`/${location}`, request.url));
}

export const config = {
  matcher: ['/'],
};

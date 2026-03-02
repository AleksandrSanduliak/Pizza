import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const location = request.cookies.get('location')?.value;
  console.log('location', location);
  if (!location) {
    console.log('!location', !location);
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL(`/${location}`, request.url));
}

export const config = {
  matcher: ['/'],
};

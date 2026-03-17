import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  const location = request.cookies.get('location')?.value;
  console.log('location 123', location);
  if (location) {
    return NextResponse.redirect(new URL(`/${location}`, request.url));
  }
  console.log(' request.url', request.url);
  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};

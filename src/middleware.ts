import { NextRequest, NextResponse } from 'next/server';
import { getSessionServer, refreshSession } from './lib/session';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoggedIn = await getSessionServer();
  const isAuthRoute = pathname.startsWith('/auth');


  if (!isLoggedIn && ['/', '/auth'].includes(pathname)) {
    const loginUrl = new URL('/auth/signin', request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (isLoggedIn && isAuthRoute) {
    const loginUrl = new URL('/', request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (isLoggedIn) {
    const refreshedResponse = await refreshSession(request);
    if (refreshedResponse) {
      return refreshedResponse; // Return the refreshed response
    }
  }
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

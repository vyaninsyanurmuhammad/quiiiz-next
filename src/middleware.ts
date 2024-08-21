import { NextRequest, NextResponse } from 'next/server';
import { getSessionServer, refreshSession } from './lib/session';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoggedIn = await getSessionServer();
  const isAuthRoute = pathname.startsWith('/auth');
  const isProtectedRoute = ['/quiz'].some((route) =>
    pathname.startsWith(route),
  );

  if (!isLoggedIn && isProtectedRoute) {
    // Redirect to login if not logged in and accessing a protected route
    const loginUrl = new URL('/auth/signin', request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (isLoggedIn && isAuthRoute) {
    // Prevent logged-in users from accessing auth routes
    const homeUrl = new URL('/', request.url);
    return NextResponse.redirect(homeUrl);
  }

  if (isLoggedIn) {
    // Attempt to refresh session if logged in
    const refreshedResponse = await refreshSession(request);
    if (refreshedResponse) {
      return refreshedResponse;
    }
  }

  // Allow request to continue if no redirects are needed
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

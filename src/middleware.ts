import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('authToken')?.value;

  // Public routes that don't require auth
  const publicRoutes = ['/auth'];
  const isPublicRoute =
    publicRoutes.includes(pathname) ||
    publicRoutes.some((route) => pathname.startsWith(route + '/'));

  // If no token and trying to access protected route
  if (!token && !isPublicRoute) {
    console.log(`Redirecting ${pathname} to /auth - no token`);
    // return NextResponse.redirect(new URL('/auth', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images|.*\\..*).*)',
  ],
};

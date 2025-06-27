// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('authToken')?.value

  // Define public routes that don't need authentication
  const publicRoutes = [ '/auth']
  
  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.includes(pathname) || 
                       publicRoutes.some(route => pathname.startsWith(route + '/'))

  // If user has no token and trying to access protected route
  if (!token && !isPublicRoute) {
    console.log(`Redirecting ${pathname} to /auth - no token`)
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  // If user has token and trying to access auth page, redirect to home
  if (token && pathname === '/auth') {
    console.log(`Redirecting from /auth to / - user has token`)
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|.*\\..*).*)',
  ],
}
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/user', '/carrito'];
const authRoutes = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if user is authenticated by looking for the cookie
  const userCookie = request.cookies.get('upgrade-auth');
  const isAuthenticated = !!userCookie;

  // If trying to access protected route without auth, redirect to login
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (authRoutes.some(route => pathname.startsWith(route))) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/user', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/user/:path*',
    '/carrito/:path*',
    '/login',
    '/register'
  ]
};


import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rutas protegidas que solo pueden acceder usuarios normales (clientes)
// Los trabajadores y administradores NO tienen la cookie 'upgrade-auth',
// por lo que serán bloqueados automáticamente
const customerOnlyRoutes = ['/user', '/carrito', '/checkout'];
const authRoutes = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Solo los usuarios normales (clientes) tienen la cookie 'upgrade-auth'
  // Los trabajadores y administradores no tienen esta cookie
  const userCookie = request.cookies.get('upgrade-auth');
  const isCustomer = !!userCookie;

  // Bloquear acceso a rutas de cliente (carrito, checkout, pedidos) 
  // si no es un cliente autenticado (esto incluye staff)
  if (customerOnlyRoutes.some(route => pathname.startsWith(route))) {
    if (!isCustomer) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Redirigir a /user si un cliente autenticado intenta acceder a login/register
  if (authRoutes.some(route => pathname.startsWith(route))) {
    if (isCustomer) {
      return NextResponse.redirect(new URL('/user', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/user/:path*',
    '/carrito/:path*',
    '/checkout/:path*',
    '/login',
    '/register'
  ]
};


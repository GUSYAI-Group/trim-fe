import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Protected dashboard routes that require authentication
const PROTECTED_PREFIXES = [
  '/',
  '/accounts',
  '/barbers',
  '/services',
  '/products',
  '/hairstyles',
  '/queue',
  '/payments',
  '/settings',
  '/profile',
];

// Routes strictly restricted to 'owner' role based on TRIM_TRD RBAC
const OWNER_ONLY_ROUTES = ['/accounts'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Allow static files, api routes, and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get('trim_auth_token')?.value;
  const userRole = request.cookies.get('trim_user_role')?.value;

  const isAuthPage = pathname.startsWith('/login');

  // 2. If user is already authenticated and visits /login, redirect to Dashboard
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 3. If accessing dashboard routes without authentication, redirect to /login
  const isProtectedRoute = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (isProtectedRoute && !token && !isAuthPage) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 4. Role-Based Access Control (RBAC): /accounts is only accessible by Owner
  if (token && userRole && OWNER_ONLY_ROUTES.some((route) => pathname.startsWith(route))) {
    if (userRole !== 'owner') {
      // Forbidden: redirect to home dashboard if not owner
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};


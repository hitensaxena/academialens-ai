import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const { pathname } = request.nextUrl;

  console.log('\n--- Middleware Debug ---');
  console.log('Path:', pathname);
  console.log('Has token:', !!token);
  console.log('Method:', request.method);
  console.log('Headers:', Object.fromEntries(request.headers.entries()));

  if (token) {
    console.log('Token found, length:', token.length);
  }

  // Public routes that don't require authentication
  const publicRoutes = [
    '/login',
    '/signup',
    '/forgot-password',
    '/reset-password',
    '/verify-email',
    '/_next',
    '/favicon.ico',
    '/api',
    '/test',
  ];

  // Dashboard routes that require authentication
  const dashboardRoutes = [
    '/dashboard',
    '/dashboard/documents',
    '/dashboard/research',
    '/dashboard/settings',
  ];

  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // Allow public assets and API routes
  if (isPublicRoute) {
    console.log('Allowing public route:', pathname);
    return NextResponse.next();
  }

  // If the user is not authenticated and tries to access a protected route
  const isDashboardRoute = dashboardRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isDashboardRoute && !token) {
    console.log('No auth token for dashboard route, redirecting to login');
    const loginUrl = new URL('/login', request.url);
    // Only set the redirect if it's not already set to avoid redirect loops
    if (pathname !== '/login') {
      loginUrl.searchParams.set('redirect', pathname);
    }
    return NextResponse.redirect(loginUrl);
  }

  // If we have a token, allow the request to proceed
  console.log('User is authenticated, allowing access to:', pathname);
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

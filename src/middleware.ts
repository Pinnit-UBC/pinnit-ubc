import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  console.log('--- Middleware Debugging ---');
  console.log('Middleware triggered for:', req.nextUrl.pathname);

  // Step 1: Get session token
  const sessionToken = req.cookies.get('sessionToken')?.value;
  console.log('Session Token from Cookie:', sessionToken);

  if (!sessionToken) {
    console.log('No session token found. Redirecting to /login.');
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Step 2: Assume session is valid for now
  // Move actual validation logic to an API route like /api/validateSession
  console.log('Valid session token found. Allowing access.');
  return NextResponse.next();
}

export const config = {
  matcher: ['/protected/:path*'], // Apply middleware to /protected routes
};

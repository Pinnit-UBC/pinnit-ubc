import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  console.log('Middleware triggered for:', req.nextUrl.pathname);

  const sessionToken = req.cookies.get('sessionToken')?.value;

  if (!sessionToken) {
    console.log('No session token found. Redirecting to /login.');
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    const validateResponse = await fetch(`${req.nextUrl.origin}/api/validateSession`, {
      headers: { Cookie: `sessionToken=${sessionToken}` },
    });

    if (!validateResponse.ok) {
      console.log('Invalid session token. Redirecting to /login.');
      return NextResponse.redirect(new URL('/login', req.url));
    }

    console.log('Valid session token. Access granted.');
    return NextResponse.next();
  } catch (err) {
    console.error('Middleware validation error:', err);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/protected/:path*', '/profile'], // Apply middleware to /protected routes and /profile
};

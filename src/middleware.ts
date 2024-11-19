import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/lib/db';
import Session from '@/models/Session';

export async function middleware(req: NextRequest) {
  console.log('--- Middleware Debugging ---');
  console.log('Middleware triggered for:', req.nextUrl.pathname);

  // Step 1: Get session token from cookies
  const sessionToken = req.cookies.get('sessionToken')?.value;
  console.log('Session Token from Cookie:', sessionToken);

  if (!sessionToken) {
    console.log('No session token found. Redirecting to /login.');
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Step 2: Connect to MongoDB
  try {
    console.log('Connecting to MongoDB...');
    await connectMongo();
    console.log('MongoDB connection successful.');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Step 3: Validate session in MongoDB
  try {
    const session = await Session.findOne({ session_token: sessionToken });
    console.log('Session Found in Database:', session);

    if (!session) {
      console.log('Session not found in database. Redirecting to /login.');
      return NextResponse.redirect(new URL('/login', req.url));
    }

    if (new Date() > new Date(session.expires_at)) {
      console.log('Session expired. Redirecting to /login.');
      return NextResponse.redirect(new URL('/login', req.url));
    }
  } catch (error) {
    console.error('Error querying session in MongoDB:', error);
    return NextResponse.redirect(new URL('/login', req.url));
  }

  console.log('Valid session found. Allowing access.');
  return NextResponse.next();
}

export const config = {
  matcher: ['/protected/:path*'], // Protect /protected route
};

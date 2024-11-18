export async function middleware(req: NextRequest) {
    console.log('Middleware triggered for:', req.nextUrl.pathname);
  
    const sessionToken = req.cookies.get('sessionToken')?.value;
    console.log('Session Token from Cookie:', sessionToken);
  
    if (!sessionToken) {
      console.log('No session token found. Redirecting to /login.');
      return NextResponse.redirect(new URL('/login', req.url));
    }
  
    try {
      await connectMongo();
      const session = await Session.findOne({ session_token: sessionToken });
      console.log('Session Found in Database:', session);
  
      if (!session) {
        console.log('Session not found in the database. Redirecting to /login.');
        return NextResponse.redirect(new URL('/login', req.url));
      }
  
      if (new Date() > new Date(session.expires_at)) {
        console.log('Session expired. Redirecting to /login.');
        return NextResponse.redirect(new URL('/login', req.url));
      }
    } catch (error) {
      console.error('Middleware error:', error);
      return NextResponse.redirect(new URL('/login', req.url));
    }
  
    const response = NextResponse.next();
    response.headers.set('Cache-Control', 'no-store');
    console.log('Valid session found. Allowing access.');
    return response;
  }
  
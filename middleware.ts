import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET || '' });

    const { pathname } = req.nextUrl;

    // Allow access to public routes
    if (
        pathname.startsWith('/sign-in') ||
        pathname.startsWith('/sign-up') ||
        pathname.startsWith('/_next') ||
        pathname.startsWith('/favicon.ico')
    ) {
        return NextResponse.next();
    }

    if (!token) {
        return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    const userType = (token.user as { type?: string })?.type;
    console.log('userType is :::=>', userType)

    if (pathname.startsWith('/cu/') && userType !== 'CUSTOMER') {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    if (pathname.startsWith('/admin/') && userType !== 'ADMIN') {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    return NextResponse.next();
}

export default NextAuth(authConfig).auth;

export const config = {
    // determinte whether or not to call the middleware
    matcher: ["/((?!_next/static|_next/image|favicon.ico|sign-in|sign-up).*)"],
};
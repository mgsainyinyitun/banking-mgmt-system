import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/sign-in',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            // console.log('auth:', auth);
            // console.log('nextUrl', nextUrl);
            const isLoggedIn = !!auth?.user;
            const home = nextUrl.pathname.startsWith('/');

            if (home) {
                if (isLoggedIn) return true;
                return false;
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/', nextUrl));
            }
            return true;
        },
    },
    trustHost:true,
    providers: []
} satisfies NextAuthConfig;